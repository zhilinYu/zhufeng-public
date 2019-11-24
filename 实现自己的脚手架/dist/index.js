'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _common = require('./utils/common');

var _path = require('path');

// 命令行的命令拿到后 这个是主的流程控制
let apply = (action, ...args) => {
    // babal-env export default  => module.exports = {default:xxx} 
    (0, _common.betterRequire)((0, _path.resolve)(__dirname, `./${action}`))(...args);
};
exports.default = apply;