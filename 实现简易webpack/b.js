let fs = require('fs');
// common.js
function req(moduleName) {
    // content代表的是文件内容
    let content = fs.readFileSync(moduleName, 'utf8');
    // 最后一个参数是函数的内容体
    let fn = new Function('exports', 'module', 'require', '__dirname', '__filename', content + '\n return module.exports');
    let module = {
        exports:{}
    }
    return fn(module.exports,module,req,__dirname,__filename);
}
let str = req('./a.js');
console.log(str)
/*
    function(exports,module,require,__dirname,__filename){
        module.exports = '欢迎参加珠峰架构公开课'
        return module.exports
    }

*/