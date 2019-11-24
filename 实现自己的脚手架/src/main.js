import program from 'commander';
import { VERSION } from './utils/constants';
import main from './index';
// zf-cli config set a 1
// zf-cli install 

let actionMap = {
    install: {
        alias: 'i',
        description: 'install template',
        examples: [
            'zf-cli i',
            'zf-cli install'
        ]
    },
    config: {
        alias: 'c',
        description: 'config .zfclirc',
        examples: [
            'zf-cli config set <k> <v>',
            'zf-cli config get <k>',
            'zf-cli config remove <k>'
        ]
    },
    '*': {
        description: 'not found',
        examples: []
    }
}

Object.keys(actionMap).forEach(action => {
    program.command(action)
        .description(actionMap[action].description)
        .alias(actionMap[action].alias)
        .action(() => {
            // 判断一下你当前用的是什么操作
            if(action === 'config'){
                // 实现可以更改配置文件?
                main(action,...process.argv.slice(3));
            }else if(action === 'install'){
                main(action)
            }
        })
});
function help() {
    console.log('\r\n  ' + 'how to use command');
    Object.keys(actionMap).forEach(action => {
        actionMap[action].examples.forEach(example => {
            console.log('    - ' + example)
        })
    });
}
program.on('-h', help);
program.on('--help', help);
program.version(VERSION, '-v --version').parse(process.argv);
