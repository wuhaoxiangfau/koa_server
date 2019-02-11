import * as Koa from 'koa';
import * as path from 'path';
import * as STATIC from 'koa-static';
import * as bodyParser from 'koa-bodyparser';
import { configure, getLogger } from 'log4js';

configure(path.join(__dirname, '../config/log4js.json'));


const logger = getLogger('app');
const loggerErr = getLogger('errors');

import { Api } from './service/index';
import { parseGet } from './middleware/index';



const app = new Koa();
const staticPath = './static';



app.use(bodyParser());

// response format log
app.use(async (ctx, next) => {
    await next();
    if(ctx.body) {
        ctx.body = {
            code: '1',
            type: 'success',
            data: ctx.body
        }
    } else {
        ctx.body = {
            code: '0',
            type: 'error'
        }
    }
    logger.info('response:'+ JSON.stringify(ctx.body));
});

// request log
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);

    logger.info('request:' + JSON.stringify(ctx.request));
    
});

// 处理get/post请求
app.use(async (ctx, next) => {
    let reqData = ctx.method ==='GET'?parseGet(ctx):ctx.request.body;
    let matchList = ctx.url.match(/[^\?]*/);
    const apiName = matchList && matchList[0] || '';
    try{
        ctx.body = Api.call(apiName, reqData, ctx.method);
    }catch(e) {
        ctx.response.status = Number(e.name);
        loggerErr.error(apiName + e.toString());
    }
});



// 静态资源
app.use(STATIC(
    path.join(__dirname, staticPath)
));

app.listen(3000);

console.log('app listening 3000');
