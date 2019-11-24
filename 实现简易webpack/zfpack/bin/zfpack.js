#! /usr/bin/env node
// 这个文件就要描述如何打包
let entry = './src/index.js'; //入口文件
let output = './dist/main.js';// 出口
let fs = require('fs');
let script = fs.readFileSync(entry,'utf8');
let path = require('path');
let modules = [];
let styleLoader = function(source){ // 负责将结果进行更改 更改后继续走
    //source代表的就是样式文件中的内容
    return `
        let style = document.createElement('style');
        style.innerText= ${JSON.stringify(source).replace(/\\r\\n/g,'')};
        document.head.appendChild(style)
    `
}
// 处理依赖关系
script = script.replace(/require\(['"](.+?)['"]\)/g,function(){
    let name = path.join('./src',arguments[1]);  //./src/a.js
    let content = fs.readFileSync(name,'utf8');
    if(/\.css$/.test(name)){
        content = styleLoader(content)
    }
    modules.push({
        name,content
    })
    return `require('${name}')`
})
let ejs = require('ejs');

let template = `(function (modules) {
    function require(moduleId) {
      var module  = {
        exports: {}
      };
      modules[moduleId].call(module.exports, module, module.exports, require);
      return module.exports;
    }
    return require( "<%-entry%>");
  })
    ({
      "<%-entry%>":
        (function (module, exports, require) {
          eval(\`<%-script%>\`);
        })
        <%for(let i = 0;i<modules.length;i++){
            let module = modules[i];%>,
            "<%-module.name%>":
            (function (module, exports, require) {
                eval(\`<%-module.content%>\`);
            })
        <%}%>
    });`
let result = ejs.render(template,{
    entry,
    script,
    modules
});
fs.writeFileSync(output,result);
console.log('编译成功')