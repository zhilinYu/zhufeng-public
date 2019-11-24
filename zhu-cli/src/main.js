// 找到要执行的核心文件
// 1) 要解析用户的参数
const program = require('commander');
const path = require('path');
const { version } = require('./constants');
// vue create projectname
// npm i eslint
// npx eslint --init
// vscode中配置eslint 保存时修复
const mapActions = {
  create: {
    alias: 'c',
    description: 'create a project',
    examples: [
      'zhu-cli create <project-name>',
    ],
  },
  config: {
    alias: 'conf',
    description: 'config project variable',
    examples: [
      'zhu-cli config set <k> <v>',
      'zhu-cli config get <k>',
    ],
  },
  '*': {
    alias: '',
    description: 'command not found',
    examples: [],
  },
};
// Object.keys()
Reflect.ownKeys(mapActions).forEach((action) => {
  program
    .command(action) // 配置命令的名字
    .alias(mapActions[action].alias) // 命令的别名
    .description(mapActions[action].description)// 命令对应的描述
    .action(() => {
      if (action === '*') { // 访问不到对应的命令 就打印找不到命令
        console.log(mapActions[action].description);
      } else { // create config ....
        // console.log(action); // create / config
        // zhu-cli create xxx // [node,zhu-cli,create,xxx]
        require(path.resolve(__dirname, action))(...process.argv.slice(3));
      }
    });
});
// 监听用户的help 事件
program.on('--help', () => {
  console.log('\nExamples:');
  Reflect.ownKeys(mapActions).forEach((action) => {
    mapActions[action].examples.forEach((example) => {
      console.log(`  ${example}`);
    });
  });
});

// 解析用户传递过来的参数
program.version(version).parse(process.argv);
