(function (modules) {
    function require(moduleId) {
      var module  = {
        exports: {}
      };
      modules[moduleId].call(module.exports, module, module.exports, require);
      return module.exports;
    }
    return require( "./src/index.js");
  })
    ({
      "./src/index.js":
        (function (module, exports, require) {
          eval(`
let result = require('src\a.js');
require('src\index.css');
console.log(result);`);
        })
        ,
            "src\a.js":
            (function (module, exports, require) {
                eval(`module.exports = '3.4架构课2期'
`);
            })
        ,
            "src\index.css":
            (function (module, exports, require) {
                eval(`
        let style = document.createElement('style');
        style.innerText= "body{    background: red}";
        document.head.appendChild(style)
    `);
            })
        
    });