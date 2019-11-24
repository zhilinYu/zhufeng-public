## 1. 模块化
模块化是指把一个复杂的系统分解到多个模块以方便编码。  

###　1.1 命名空间
开发网页要通过命名空间的方式来组织代码
- 命名空间冲突，两个库可能会使用同一个名称
- 无法合理地管理项目的依赖和版本；
- 无法方便地控制依赖的加载顺序。

### 1.2 CommonJS
CommonJS 是一种使用广泛的`JavaScript`模块化规范，核心思想是通过`require`方法来同步地加载依赖的其他模块，通过 module.exports 导出需要暴露的接口。
#### 1.2.1 用法
采用 CommonJS 导入及导出时的代码如下：
```
// 导入
const moduleA = require('./moduleA');

// 导出
module.exports = moduleA.someFunc;
```

#### 1.2.2 原理
a.js
```javascript
let fs = require('fs');
let path = require('path');
let b = req('./b.js');
function req(mod) {
    let filename = path.join(__dirname, mod);
    let content = fs.readFileSync(filename, 'utf8');
    let fn = new Function('exports', 'require', 'module', '__filename', '__dirname', content + '\n return module.exports;');
    let module = {
        exports: {}
    };

    return fn(module.exports, req, module, __filename, __dirname);
}
```
b.js
```javascript
console.log('bbb');
exports.name = 'zfpx';
```

### 1.3 AMD
AMD 也是一种 JavaScript 模块化规范，与 CommonJS 最大的不同在于它采用异步的方式去加载依赖的模块。 AMD 规范主要是为了解决针对浏览器环境的模块化问题，最具代表性的实现是 requirejs。

AMD 的优点
- 可在不转换代码的情况下直接在浏览器中运行
- 可加载多个依赖
- 代码可运行在浏览器环境和 Node.js 环境下

AMD 的缺点
- JavaScript 运行环境没有原生支持 AMD，需要先导入实现了 AMD 的库后才能正常使用。

#### 1.3.1 用法
```javascript
// 定义一个模块
define('a', [], function () {
    return 'a';
});
define('b', ['a'], function (a) {
    return a + 'b';
});
// 导入和使用
require(['b'], function (b) {
    console.log(b);
});
```
#### 1.3.2 原理
```javascript
let factories = {};
function define(modName, dependencies, factory) {
    factory.dependencies = dependencies;
    factories[modName] = factory;
}
function require(modNames, callback) {
    let loadedModNames = modNames.map(function (modName) {
        let factory = factories[modName];
        let dependencies = factory.dependencies;
        let exports;
        require(dependencies, function (...dependencyMods) {
            exports = factory.apply(null, dependencyMods);
        });
        return exports;
    })
    callback.apply(null, loadedModNames);
}


```


### 1.4 ES6 模块化
ES6 模块化是`ECMA`提出的`JavaScript`模块化规范，它在语言的层面上实现了模块化。浏览器厂商和` Node.j`s `都宣布要原生支持该规范。它将逐渐取代`CommonJS`和`AMD`规范，成为浏览器和服务器通用的模块解决方案。
采用 ES6 模块化导入及导出时的代码如下
```javascript
// 导入
import { name } from './person.js';
// 导出
export const name = 'zfpx';
```

ES6模块虽然是终极模块化方案，但它的缺点在于目前无法直接运行在大部分 JavaScript 运行环境下，必须通过工具转换成标准的 ES5 后才能正常运行。


## 2. 自动化构建
构建就是做这件事情，把源代码转换成发布到线上的可执行 JavaScrip、CSS、HTML 代码，包括如下内容。

- 代码转换：ECMASCRIPT6 编译成 ECMASCRIPT5、LESS 编译成 CSS 等。
- 文件优化：压缩 JavaScript、CSS、HTML 代码，压缩合并图片等。
- 代码分割：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载。
- 模块合并：在采用模块化的项目里会有很多个模块和文件，需要构建功能把模块分类合并成一个文件。
- 自动刷新：监听本地源代码的变化，自动重新构建、刷新浏览器。
- 代码校验：在代码被提交到仓库前需要校验代码是否符合规范，以及单元测试是否通过。
- 自动发布：更新完代码后，自动构建出线上发布代码并传输给发布系统。


## 3. Webpack(style-loader)
Webpack 是一个打包模块化 JavaScript 的工具，在 Webpack 里一切文件皆模块，通过 Loader 转换文件，通过 Plugin 注入钩子，最后输出由多个模块组合成的文件。Webpack 专注于构建模块化项目。

一切文件：JavaScript、CSS、SCSS、图片、模板，在 Webpack 眼中都是一个个模块，这样的好处是能清晰的描述出各个模块之间的依赖关系，以方便 Webpack 对模块进行组合和打包。 经过 Webpack 的处理，最终会输出浏览器能使用的静态资源。

## 3.1 安装 Webpack
在用 Webpack 执行构建任务时需要通过 webpack 可执行文件去启动构建任务，所以需要安装 webpack 可执行文件

## 3.1.1  安装 Webpack 到本项目
```javascript
# 安装最新稳定版
npm i -D webpack webpack-cli

# 安装指定版本
npm i -D webpack@<version>

# 安装最新体验版本
npm i -D webpack@beta
```
> npm i -D 是 `npm install --save-dev` 的简写，是指安装模块并保存到 `package.json` 的 `devDependencies`


## 3.1.2  安装 Webpack 到全局
安装到全局后你可以在任何地方共用一个 Webpack 可执行文件，而不用各个项目重复安装
```javascript
npm i -g webpack
```

> 推荐安装到当前项目，原因是可防止不同项目依赖不同版本的 Webpack 而导致冲突


## 3.1.2 使用 Webpack

## 3.1.3 使用 Webpack
```javascript
(function (modules) {
    function require(moduleId) {
        var module = {
            exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports, require);
        return module.exports;

    }
    return require("./index.js");
})
    ({
        "./index.js":
            (function (module, exports, require) {
                eval("console.log('hello');\n\n");
            })
    });
```

```javascript
#! /usr/bin/env node
const pathLib = require('path');
const fs = require('fs');
let ejs = require('ejs');
let cwd = process.cwd();
let { entry, output: { filename, path } } = require(pathLib.join(cwd, './webpack.config.js'));
let script = fs.readFileSync(entry, 'utf8');
let bundle = `
(function (modules) {
    function require(moduleId) {
        var module = {
            exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports, require);
        return module.exports;

    }
    return require("<%-entry%>");
})
    ({
        "<%-entry%>":
            (function (module, exports, require) {
                eval("<%-script%>");
            })
    });
`
let bundlejs = ejs.render(bundle, {
    entry,
    script
});
try {
    fs.writeFileSync(pathLib.join(path, filename), bundlejs);
} catch (e) {
    console.error('编译失败 ', e);
}
console.log('compile sucessfully!');
```

## 3.1.4 依赖其它模块
```javascript
#! /usr/bin/env node
const pathLib = require('path');
const fs = require('fs');
let ejs = require('ejs');
let cwd = process.cwd();
let { entry, output: { filename, path } } = require(pathLib.join(cwd, './webpack.config.js'));
let script = fs.readFileSync(entry, 'utf8');
let modules = [];
script.replace(/require\(['"](.+?)['"]\)/g, function () {
    let name = arguments[1];
    let script = fs.readFileSync(name, 'utf8');
    modules.push({
        name,
        script
    });
});
let bundle = `
(function (modules) {
    function require(moduleId) {
        var module = {
            exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports, require);
        return module.exports;
    }
    return require("<%-entry%>");
})
    ({
        "<%-entry%>":
            (function (module, exports, require) {
                eval(\`<%-script%>\`);
            })
       <%if(modules.length>0){%>,<%}%>
        <%for(let i=0;i<modules.length;i++){
            let module = modules[i];%>   
            "<%-module.name%>":
            (function (module, exports, require) {
                eval(\`<%-module.script%>\`);
            })
        <% }%>    
    });
`
let bundlejs = ejs.render(bundle, {
    entry,
    script,
    modules
});
try {
    fs.writeFileSync(pathLib.join(path, filename), bundlejs);
} catch (e) {
    console.error('编译失败 ', e);
}
console.log('compile sucessfully!');




```# webpack-public



// 本地安装q
```
npm init -y
npm install webpack webpack-cli -D
```