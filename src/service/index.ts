const path = require('path');




// 接口类
export class Api {
    // get 接口列表
    static _getApiMap = new Map<string, (param: object) => object|void>();
    // post 接口列表
    static _postApiMap = new Map<string, (param: object) => object|void>();
    constructor() {
        
    }
    
    static addGet(fnName: string, fn: (param: object) => object|void) {
        if(this._getApiMap.hasOwnProperty(fnName)){
            throw 'API 已注册该方法不能重复注册' + fnName;
        }
        this._getApiMap.set(fnName, fn);
    }

    static addPost(fnName: string, fn: (param: object) => object|void) {
        if(this._postApiMap.hasOwnProperty(fnName)){
            throw 'API 已注册该方法不能重复注册' + fnName;
        }
        this._postApiMap.set(fnName, fn);
    }

    static getGET(apiName: string) {
        return this._getApiMap.get(apiName);
    }

    static getPOST(apiName: string) {
        return this._postApiMap.get(apiName);
    }

    // 调用方法
    static call(fnName: string, param: object, type: string) {
        const fn = type==='GET'?this.getGET(fnName):this.getPOST(fnName);
        if(!fn) {
            let err = new Error('not Found');
            err.name = '404';
            throw err;
        }else {
            return fn(param);
        }
    }
}

export function regGet( url: string ){
    return function ( target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Api.addGet(url, target[propertyKey]);
    }
}

export function regPost( url: string){
    return function ( target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Api.addPost(url, target[propertyKey]);
    }
}

