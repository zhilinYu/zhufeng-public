import { repoList, tagList, downloadLocal } from './utils/git';
import ora from 'ora';
import inquirer from 'inquirer';
let install = async () => {
    // 下载模板 选择模板使用
    // 通过配置文件 获取模板信息（有哪些模板 ）
    let loading = ora('fetching template......');
    loading.start();
    let list = await repoList();
    loading.succeed();
    list = list.map(({ name }) => name);
    console.log(list);

    let answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'project',
            choices: list,
            questions: 'pleace choice template'
        }
    ]);
    // 项目名字
    let project = answer.project;

    //获取当前项目的 版本号
    loading = ora('fetching tag ....');
    loading.start();
    list = await tagList(project);
    loading.succeed();
    list = list.map(({ name }) => name);
    answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'tag',
            choices: list,
            questions: 'pleace choice tag'
        }
    ]);
    let tag = answer.tag;
    console.log(project, tag);
    // 下载文件(先下载到缓存文件中 )
    // zf-cli init

    // 下载啦!
    loading = ora('download project ....');
    loading.start();
    await downloadLocal(project, tag);
    loading.succeed();
}
// vue会使模板引擎
// vue init 当前的下载好的模板 生成到项目目录中
// vue uninstall
// 选择技术 
export default install;


// 7月 15 架构师正式课开始了 
// 下一期 上课时间  1 3 5 晚上8-10  周日全天
// http://www.zhufengpeixun.com/main/course/index.html
// QQ:3276033605
