'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DOWNLOAD = exports.DEFAULTS = exports.RC = exports.VERSION = undefined;

var _package = require('../../package.json');

// 当前package.json的版本号
const VERSION = exports.VERSION = _package.version;

// 找到用户的根 目录

const HOME = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];

const RC = exports.RC = `${HOME}/.zfclirc`;

// RC配置下载(模板)的地方 给github的api来用的
const DEFAULTS = exports.DEFAULTS = {
    registry: 'zhufeng-cli',
    type: 'orgs'

    // 下载目录
};const DOWNLOAD = exports.DOWNLOAD = `${HOME}/.template`;