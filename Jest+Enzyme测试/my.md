## 为什么需要测试
- 修改模块 其他模块挂了
- 添加测试用例 方便项目的后续迭代

## 为什么很少接触测试

> 前端缺乏测试 TDD 编写测试用例，前端工程师不会去测试

## TDD BDD是什么
Test-Driven Development
Behavior Driven Development

## 我们一直在进行测试
- 测试代码运行是否正常
- 看结果很痛苦  不直观
- 污染程序源代码 写在源码中
- 零散  测得时候也不能分类
- 没有持久化 写完了这个代码就不要了
- 自动显示结果

## 介绍测试库
mocha node & browser expressjs 
jasmine ng
karma a test runner 
React + Rn + koa   jest零配置 内置代码覆盖率 强大的Mocks

## describe expect it
表达程序设计人员对于系统应达到状态的一种预期 （测试核心）
npx jest  以**test.js 结尾
asset 断言

## machers
语义化 ：相等 逻辑 包含

## 异步 done

##  文件配置项
配置 jest.config.js  命令行 package.json
```
module.exports = {
    testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)(spec|test).js?(x)'],//设置识别哪些文件是测试文件（glob形式），与testRegex互斥，不能同时写
    testRegex: '(/__tests__).*|(\\.|/)(test|spec))\\.jsx?$',//设置识别哪些文件是测试文件（正则形式），与testMatch互斥，不能同时写
    testEnvironment: 'jsdom',//测试环境，默认值是：jsdom，可修改为node
    rootDir: '',//默认值：当前目录，一般是package.json所在的目录。
    moduleFileExtensions: ['js', 'json', 'jsx', 'node']//测试文件的类型
}
```

## dom测试
- 删除节点
- 绑定事件
- 测试选项卡

## mock function 
forEach测试
jest.mock

## 测试reducer

// todoApp
## 测试标题
## 测试删除
## 测试切换 代办事项
## 增加待办事项

// todoItem
## 完成事项切换