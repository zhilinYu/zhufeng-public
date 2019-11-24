let esprima  = require('esprima');
let code =  `function ast(){}`
let tree = esprima.parseScript(code);
let estraverse = require('estraverse');
estraverse.traverse(tree,{
    enter(node){ // 直接用enter
        if(node.type === 'Identifier'){
            node.name = 'zfpx';
        }
    }
    // leave(node){
    //     console.log('leave',node.type)
    // }
});
let escodegen = require('escodegen');
let r = escodegen.generate(tree);
console.log(r);

// babel babel-plugin-arrow-function