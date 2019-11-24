const axios = require('axios');
const ora = require('ora');
const Inquirer = require('inquirer');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
let downloadGitReop = require('download-git-repo');
const MetalSmith = require('metalsmith'); // 遍历文件夹 找需不需要渲染
// consolidate 统一了  所有的模板引擎
let { render } = require('consolidate').ejs;

render = promisify(render);
// 可以把异步的api转换成promise
downloadGitReop = promisify(downloadGitReop);
let ncp = require('ncp');
const { downloadDirectory } = require('./constants');

ncp = promisify(ncp);
// create 的所有的逻辑
// create功能是创建项目
// 拉取你自己的所有项目列出来 让用户选 安装哪个项目 projectName
// 选完后 在显示所有的版本号 1.0
// https://api.github.com/orgs/zhu-cli/repos 获取组织下的仓库
// 可能还需要用户配置一些数据 来结合渲染我的项目

// 1) 获取项目列表
const fetchRepoList = async () => {
  const { data } = await axios.get('https://api.github.com/orgs/zhu-cli/repos');
  return data;
};
// 抓取tag列表
const fechTagList = async (repo) => {
  const { data } = await axios.get(`https://api.github.com/repos/zhu-cli/${repo}/tags`);
  return data;
};
// 封装loading效果
const waitFnloading = (fn, message) => async (...args) => {
  const spinner = ora(message);
  spinner.start();
  const result = await fn(...args);
  spinner.succeed();
  return result;
};
const download = async (repo, tag) => {
  let api = `zhu-cli/${repo}`;
  if (tag) {
    api += `#${tag}`;
  }
  // /user/xxxx/.template/repo
  const dest = `${downloadDirectory}/${repo}`;
  await downloadGitReop(api, dest);
  return dest; // 下载的最终目录
};
module.exports = async (projectName) => {
  // 1) 获取项目的模板 （所有的）
  let repos = await waitFnloading(fetchRepoList, 'fetching template ....')();

  repos = repos.map((item) => item.name);
  // 在获取之前 显示loading 关闭loading
  // 选择模板 inquirer
  const { repo } = await Inquirer.prompt({
    name: 'repo', // 获取选择后的结果
    type: 'list',
    message: 'please choise a template to create project',
    choices: repos,
  });
  // 2) 通过当前选择的项目 拉取对应的版本

  // 获取对应的版本号https://api.github.com/repos/zhu-cli/vue-simple-template/tags
  let tags = await waitFnloading(fechTagList, 'fetching tags ....')(repo);
  tags = tags.map((item) => item.name);

  const { tag } = await Inquirer.prompt({
    name: 'tag', // 获取选择后的结果
    type: 'list',
    message: 'please choise tags to create project',
    choices: tags,
  });
  // 3) 把模板放到一个临时目录里 存好，以备后期使用

  // download-git-repo
  const result = await waitFnloading(download, 'download template')(repo, tag);

  // 我拿到了下载的目录 直接拷贝当前执行的目录下即可  ncp

  // 复杂的需要模板渲染 渲染后在拷贝
  // 把template 下的文件 拷贝到执行命令的目录下
  // 4) 拷贝操作
  // 这个目录 项目名字是否已经存在 如果存在提示当前已经存在

  // 如果有ask.js 文件 // .template/xxx
  if (!fs.existsSync(path.join(result, 'ask.js'))) {
    await ncp(result, path.resolve(projectName));
  } else {
    // 复杂的模板
    // 把git上的项目下载下来，如果有ask 文件就是一个复杂的模板,我们需要用户选择，选择后编译模板
    // 1) 让用户填信息
    console.log(result);
    await new Promise((resolve, reject) => {
      MetalSmith(__dirname) // 如果你传入路径 他默认会遍历当前路径下的src文件夹
        .source(result)
        .destination(path.resolve(projectName))
        .use(async (files, metal, done) => {
          const args = require(path.join(result, 'ask.js'));
          const obj = await Inquirer.prompt(args);
          const meta = metal.metadata();
          Object.assign(meta, obj);
          delete files['ask.js'];
          done();
        })
        .use((files, metal, done) => {
          const obj = metal.metadata();
          Reflect.ownKeys(files).forEach(async (file) => {
            // 这个是要处理的  <%
            if (file.includes('js') || file.includes('json')) {
              let content = files[file].contents.toString(); // 文件的内容
              if (content.includes('<%')) {
                content = await render(content, obj);
                files[file].contents = Buffer.from(content); // 渲染
              }
            }
          });
          // 根据用户的输入 下载模板
          done();
        })
        .build((err) => {
          if (err) {
            reject();
          } else {
            resolve();
          }
        });
    });
    // 2) 用用户填写的信息去渲染模板
    // metalsmith 只要是模板编译 都需要这个模块
  }
};

// config install add ....


// 10分钟


// 下一期架构课 9月22日 开新班
// 团购有优惠


//
