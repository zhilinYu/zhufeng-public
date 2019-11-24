import { version } from '../../package.json';

// 当前package.json的版本号
export const VERSION = version;


// 找到用户的根 目录

const HOME = process.env[process.platform === 'win32'?'USERPROFILE':'HOME'];

export const RC = `${HOME}/.zfclirc`;

// RC配置下载(模板)的地方 给github的api来用的
export const DEFAULTS = {
    registry:'zhufeng-cli',
    type:'orgs'   
}

// 下载目录
export const DOWNLOAD = `${HOME}/.template`;
