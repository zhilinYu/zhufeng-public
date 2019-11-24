'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _constants = require('./utils/constants');

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// zf-cli config set a 1
// zf-cli install 

let actionMap = {
    install: {
        alias: 'i',
        description: 'install template',
        examples: ['zf-cli i', 'zf-cli install']
    },
    config: {
        alias: 'c',
        description: 'config .zfclirc',
        examples: ['zf-cli config set <k> <v>', 'zf-cli config get <k>', 'zf-cli config remove <k>']
    },
    '*': {
        description: 'not found',
        examples: []
    }
};

Object.keys(actionMap).forEach(action => {
    _commander2.default.command(action).description(actionMap[action].description).alias(actionMap[action].alias).action(() => {
        // 判断一下你当前用的是什么操作
        if (action === 'config') {
            // 实现可以更改配置文件?
            (0, _index2.default)(action, ...process.argv.slice(3));
        } else if (action === 'install') {
            (0, _index2.default)(action);
        }
    });
});
function help() {
    console.log('\r\n  ' + 'how to use command');
    Object.keys(actionMap).forEach(action => {
        actionMap[action].examples.forEach(example => {
            console.log('    - ' + example);
        });
    });
}
_commander2.default.on('-h', help);
_commander2.default.on('--help', help);
_commander2.default.version(_constants.VERSION, '-v --version').parse(process.argv);