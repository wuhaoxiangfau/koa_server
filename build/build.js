const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;

const dirPath = path.join(__dirname, '../src/interface');
const importList = []; 
const nameList = [];
const files = fs.readdirSync( dirPath);
files.filter(fileNmae => /.ts/.test(fileNmae)).forEach( fileName => {
       
    if(fileName){
        const name = fileName.split('.')[0];
        importList.push(`import * as ${ name } from './interface/${ name }';`)
        nameList.push(name);
    }
    
});
const tsFilePath = path.join(__dirname, '../src/server.ts');
// 读原文件
let serverTsData = fs.readFileSync( tsFilePath ,  'utf-8' );
// 备份文件
fs.renameSync(tsFilePath,  `${tsFilePath}.build.bk`);

importList.forEach( importStr => {
    serverTsData = `${importStr}\n${serverTsData}`;
})
serverTsData += `const __importData = [${nameList.join(',')}];`;

// 写出新文件
fs.writeFileSync( tsFilePath, serverTsData,'utf-8');


const curPath = path.join(__dirname, '../src');


// 执行
var compile=`cd /d "${curPath}" && tsc`;

execSync(compile);

fs.unlinkSync(tsFilePath);

fs.renameSync(`${tsFilePath}.build.bk`, tsFilePath);

console.log('compile success');


