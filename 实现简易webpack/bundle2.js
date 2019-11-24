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
          eval("\r\nlet result = require(/*! ./a.js */ \"./src/a.js\");\r\nconsole.log(result);\n\n//# sourceURL=webpack:///./src/index.js?");
        }),
      "./src/a.js":
        (function (module, exports) {
          eval("module.exports = '3.4架构课2期'\r\n\n\n//# sourceURL=webpack:///./src/a.js?");
        })
    });