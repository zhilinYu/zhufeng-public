'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _rc = require('./utils/rc');

let config = async (action, k, v) => {
    switch (action) {
        case 'get':
            if (k) {
                let key = await (0, _rc.get)(k);
                console.log(key);
            } else {
                let obj = await (0, _rc.getAll)();
                Object.keys(obj).forEach(key => {
                    console.log(`${key}=${obj[key]}`);
                });
            }
            break;
        case 'set':
            (0, _rc.set)(k, v);
            break;
        case 'remove':
            (0, _rc.remove)(k);
            break;
    }
}; // 专门管理.zfclirc文件(当前的用户目录下)

// zf-cli config set key value
exports.default = config;