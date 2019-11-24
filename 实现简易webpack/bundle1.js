(function (modules) {
    function require(moduleId) {
      var module  = {
        exports: {}
      };
      modules[moduleId].call(module.exports, module, module.exports, require);
      return module.exports;
    }
    return require("./src/index.js");
  })
    ({
      "./src/index.js":
        (function (module, exports) {
          eval("\r\nconsole.log('欢迎参加珠峰公开课');\n\n//# sourceURL=webpack:///./src/index.js?");
        })
    });