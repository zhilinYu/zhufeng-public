// 直接用babel来实现
// babel-core,转化

// 改ast，babel-types

let babel = require('babel-core');
let t = require('babel-types');
// 1.就是生成ast
// 2.判断是不是某个东西

let code = `let sum = (a,b)=>a+b`;

// .babelrc
let ArrowPlugin = {
    visitor:{
        // path是树的路径
      VariableDeclaration(p){
        console.log(p);
      },
        ArrowFunctionExpression(path){
            let node = path.node;
            let params = node.params;
            let body = node.body;
            // 生成一个函数表达式
            if(!t.isBlockStatement(body)){
                // 不是代码块
                let returnStatement = t.returnStatement(body);
                body = t.blockStatement([returnStatement]);
            }
            let funcs = t.functionExpression(null,params,body,false,false);
            path.replaceWith(funcs);
        }
    }
}
let r = babel.transform(code,{
    plugins:[
        ArrowPlugin
    ]
});
console.log(r.code);