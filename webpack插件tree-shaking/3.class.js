let babel = require('babel-core');
let t = require('babel-types');
/*
    function Zfpx(name){
        this.name = name
    }
    Zfpx.prototype.getName = function(){
        return this.name
    }

*/
let code = `
class Zfpx{
    constructor(name){
        this.name = name;
    }
    getName(){
        return this.name
    }
}
`
let ClassPlugin = {
    visitor:{
        ClassDeclaration(path){
            let {node} = path;
            let className = node.id.name;
            let classList = node.body.body;

            className = t.identifier(className); //函数名必须是一个标识符
            let funcs = t.functionDeclaration(className,[],t.blockStatement([]),false,false);
            path.replaceWith(funcs);
            let es5Func = [];
            classList.forEach((item,index)=>{
                // 函数的代码体
                let body = classList[index].body;
                if(item.kind === 'constructor'){
                    //如果是够赞函数那就生成新的函数将默认的空函数替换掉
                    let params = item.params.length?item.params.map(item=>item.name) : [];
                    params = t.identifier(params);
                    funcs = t.functionDeclaration(className,[params],body,false,false);
                  
                }else{
                    // 替他情况就是原型上的方法
                    let protoObj = t.memberExpression(className,t.identifier('prototype'));
                    let left = t.memberExpression(protoObj,t.identifier(item.key.name));
                    let right = t.functionExpression(null,[],body,false,false);
                    let assign = t.assignmentExpression('=',left,right);
                    // 多个原型上的方法
                    es5Func.push(assign);
                }
            });
            if(es5Func.length ==0){
                path.replaceWith(funcs);
            }else{
                es5Func.push(funcs);
                // 替换n个节点
                path.replaceWithMultiple(es5Func);
                // 有原型上的方法
            }
        }
    }
}
// class => function

let r = babel.transform(code,{
    plugins:[
        ClassPlugin
    ]
})
console.log(r.code);