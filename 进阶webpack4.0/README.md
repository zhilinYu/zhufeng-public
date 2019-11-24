## 珠峰架构师培训公开课

## 1. 什么是WebPack
WebPack可以看做是模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其打包为合适的格式以供浏览器使用。

构建就是把源代码转换成发布到线上的可执行 JavaScrip、CSS、HTML 代码，包括如下内容。

- 代码转换：TypeScript 编译成 JavaScript、SCSS 编译成 CSS 等。
- 文件优化：压缩 JavaScript、CSS、HTML 代码，压缩合并图片等。
- 代码分割：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载。
- 模块合并：在采用模块化的项目里会有很多个模块和文件，需要构建功能把模块分类合并成一个文件。
- 自动刷新：监听本地源代码的变化，自动重新构建、刷新浏览器。
- 代码校验：在代码被提交到仓库前需要校验代码是否符合规范，以及单元测试是否通过。
- 自动发布：更新完代码后，自动构建出线上发布代码并传输给发布系统。

构建其实是工程化、自动化思想在前端开发中的体现，把一系列流程用代码去实现，让代码自动化地执行这一系列复杂的流程。 构建给前端开发注入了更大的活力，解放了我们的生产力。

## 2. 初始化项目
```js
mkdir webpack-start
cd webpack-start
npm init
```

## 3. 快速上手
### 3.1 webpack核心概念
- Entry：入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。
- Module：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。
- Chunk：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。
- Loader：模块转换器，用于把模块原内容按照需求转换成新内容。
- Plugin：扩展插件，在 Webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情。
- Output：输出结果，在 Webpack 经过一系列处理并得出最终想要的代码后输出结果。



### 3.2 配置webpack
```js
npm install webpack webpack-cli -D
```
- 创建src
- 创建dist
  - 创建index.html
- 配置文件webpack.config.js
  - entry：配置入口文件的地址
  - output：配置出口文件的地址
  - module：配置模块,主要用来配置不同文件的加载器
  - plugins：配置插件
  - devServer：配置开发服务器


## 4. 配置开发服务器
```js
npm i webpack-dev-server –D
```

- contentBase 配置开发服务运行时的文件根目录
- host：开发服务器监听的主机地址
- compress 开发服务器是否启动gzip等压缩
- port：开发服务器监听的端口

```diff
+ devServer:{
+        contentBase:path.resolve(__dirname,'dist'),
+        host:'localhost',
+        compress:true,
+        port:8080
+ }
```
```diff
+  "scripts": {
+    "build": "webpack --mode development",
+    "dev": "webpack-dev-server --open --mode development "
+  }
```

## 5. 支持加载css文件
### 5.1 什么是Loader
通过使用不同的Loader，Webpack可以要把不同的文件都转成JS文件,比如CSS、ES6/7、JSX等

- test：匹配处理文件的扩展名的正则表达式
- use：loader名称，就是你要使用模块的名称
- include/exclude:手动指定必须处理的文件夹或屏蔽不需要处理的文件夹
- query：为loaders提供额外的设置选项

loader三种写法
- use
- loader
- use+loader

### 5.2 css-loader
```js
npm i style-loader css-loader -D
```
配置加载器
```diff
    module: {
+        rules:[
+            {
+                test:/\.css$/,
+                use:['style-loader','css-loader'],
+                include:path.join(__dirname,'./src'),
+                exclude:/node_modules/
+            }
+        ]
    },
```

## 6. 自动产出html
我们希望自动能产出HTML文件，并在里面引入产出后的资源
```js
npm i html-webpack-plugin -D
```
- minify 是对html文件进行压缩，removeAttrubuteQuotes是去掉属性的双引号
- hash 引入产出资源的时候加上哈希避免缓存
- template 模版路径

```diff
    plugins: [
+        new HtmlWebpackPlugin({
+       minify: {
+            removeAttributeQuotes:true
+        },
+        hash: true,
+        template: './src/index.html',
+        filename:'index.html'
    })]
```

## 7. 支持图片
### 7.1 手动添加图片
```js
npm i file-loader url-loader -D
```
- [file-loader](http://npmjs.com/package/file-loader) 解决CSS等文件中的引入图片路径问题
- [url-loader](https://www.npmjs.com/package/url-loader) 当图片较小的时候会把图片BASE64编码，大于limit参数的时候还是使用file-loader 进行拷贝

```js
let logo=require('./images/logo.png');
let img=new Image();
img.src=logo;
document.body.appendChild(img);
```

```js
  {
    test:/\.(jpg|png|gif|svg)$/,
    use:'url-loader',
    include:path.join(__dirname,'./src'),
    exclude:/node_modules/
  }
```

### 7.2 在CSS中引入图片
还可以在CSS文件中引入图片
```css
.img-bg{
    background: url(./images/logo.png);
    width:173px;
    height:66px;
}
```

## 8. 分离CSS
因为CSS的下载和JS可以并行,当一个HTML文件很大的时候，我们可以把CSS单独提取出来加载

```js
npm install --save-dev extract-text-webpack-plugin@next
```

```diff
{
                test:/\.css$/,
+                use: ExtractTextWebpackPlugin.extract({
+                    use:'css-loader'
+                }),
                include:path.join(__dirname,'./src'),
                exclude:/node_modules/
            },

   plugins: [
+        new ExtractTextWebpackPlugin('css/index.css'),
```



处理图片路径问题
```js
const PUBLIC_PATH='/';

output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
+        publicPath:PUBLIC_PATH
    },
```

指定打包后的图片位置

```diff
use: [
    {
     loader: 'url-loader',
     options: {
       limit: 1024,
+      outputPath:'images/'
     }
    }
],
```

在HTML中使用图片
```js
npm i html-withimg-loader -D
```

```js
<div class="img-container "><img src="./images/logo.png" alt="logo.png"></div>
```

```js
  {
+    test:/\.(html|html)$/,
+    use:'html-withimg-loader',
+    include:path.join(__dirname,'./src'),
+    exclude:/node_modules/
  }
```

## 9. 编译less 和 sass
```js
npm i less less-loader -D
npm i node-saas sass-loader -D
```

```css
@color:orange;
.less-container{
	border:1px solid @color;
}

$color:green;
.sass-container{
	border:1px solid $color;
}
```

```js
const cssExtract=new ExtractTextWebpackPlugin('css.css');
const lessExtract=new ExtractTextWebpackPlugin('less.css');
const sassExtract=new ExtractTextWebpackPlugin('sass.css');

 {
                test:/\.less$/,
                use: lessExtract.extract({
                    use:['css-loader','less-loader']
                }),
                include:path.join(__dirname,'./src'),
                exclude:/node_modules/
            },
            {
                test:/\.scss$/,
                use: sassExtract.extract({
                    use:['css-loader','sass-loader']
                }),
                include:path.join(__dirname,'./src'),
                exclude:/node_modules/
            },
```

## 10. 处理CSS3属性前缀
为了浏览器的兼容性，有时候我们必须加入-webkit,-ms,-o,-moz这些前缀
- Trident内核：主要代表为IE浏览器, 前缀为-ms
- Gecko内核：主要代表为Firefox, 前缀为-moz
- Presto内核：主要代表为Opera, 前缀为-o
- Webkit内核：产要代表为Chrome和Safari, 前缀为-webkit
```js
npm i postcss-loader autoprefixer -D
```
[postcss-loader](https://github.com/postcss/postcss-loader)

postcss.config.js
```js
module.exports={
	plugins:[require('autoprefixer')]
}
```

```css
.circle {
+    transform: translateX(100px);
```

```diff
{
                test:/\.css$/,
                use: cssExtract.extract({
+                   use:['css-loader','postcss-loader']
                }),
                include:path.join(__dirname,'./src'),
                exclude:/node_modules/
            },
```

## 11. 转义ES6/ES7/JSX
Babel其实是一个编译JavaScript的平台,可以把ES6/ES7,React的JSX转义为ES5
```js
npm i babel-core babel-loader babel-preset-env babel-preset-stage-0 babel-preset-react -D
```

```js
{
        test:/\.jsx?$/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ["env","stage-0","react"]
            }
        },
        include:path.join(__dirname,'./src'),
        exclude:/node_modules/
        },
```

## 12. 如何调试打包后的代码
webapck通过配置可以自动给我们`source maps`文件，`map`文件是一种对应编译文件和源文件的方法
- source-map 把映射文件生成到单独的文件，最完整最慢
- cheap-module-source-map 在一个单独的文件中产生一个不带列映射的Map
- eval-source-map 使用eval打包源文件模块,在同一个文件中生成完整sourcemap
- cheap-module-eval-source-map sourcemap和打包后的JS同行显示，没有映射列

```js
devtool:'eval-source-map'
```


## 13. 拷贝静态文件
有时项目中没有引用的文件也需要打包到目标目录
```
npm i copy-webpack-plugin -D
```

```
 new CopyWebpackPlugin([{
            from: path.join(__dirname,'public'),//静态资源目录源地址
            to:'./public' //目标地址，相对于output的path目录
        }]),
```

## 14. 打包前先清空输出目录
```js
npm i  clean-webpack-plugin -D
```

```js
new cleanWebpaclPlugin(path.join(__dirname,'dist'))
```


## 15. 压缩CSS
webpack可以消除未使用的CSS，比如bootstrap中那些未使用的样式
```js
npm i -D purifycss-webpack purify-css
npm i bootstrap -S
```

```js
{
                test:/\.css$/,
                use: cssExtract.extract({
                    use: [{
                         loader: 'css-loader',
 +                       options:{minimize:true}
                    },'postcss-loader']
                }),
            },
```

```
+ new PurifyCSSPlugin({
+             //purifycss根据这个路径配置遍历你的HTML文件，查找你使用的CSS
+            paths:glob.sync(path.join(__dirname,'src/*.html'))
+ }),
```



## 16. resolve解析
### 16.1 extensions
指定extension之后可以不用在require或是import的时候加文件扩展名,会依次尝试添加扩展名进行匹配
```js
+ resolve: {
    //自动补全后缀，注意第一个必须是空字符串,后缀一定以点开头
+   extensions: [" ",".js",".css",".json"],
+ },
```

### 16.2 alias
配置别名可以加快webpack查找模块的速度
- 每当引入jquery模块的时候，它会直接引入jqueryPath,而不需要从node_modules文件夹中按模块的查找规则查找
- 不需要webpack去解析jquery.js文件

```js
const bootstrap=path.join(__dirname,'node_modules/bootstrap/dist/css/bootstrap.css')
resolve: {
 +       alias: {
 +           'bootstrap': bootstrap
 +       }
    },
```

## 17. 区分环境变量
许多 library 将通过与 process.env.NODE_ENV 环境变量关联，以决定 library 中应该引用哪些内容。例如，当不处于生产环境中时，某些 library 为了使调试变得容易，可能会添加额外的日志记录(log)和测试(test)。其实，当使用 process.env.NODE_ENV === 'production' 时，一些 library 可能针对具体用户的环境进行代码优化，从而删除或添加一些重要代码。我们可以使用 webpack 内置的 DefinePlugin 为所有的依赖定义这个变量：
```js
npm install cross-env -D
```

```js
  "scripts": {
+    "build": "cross-env NODE_ENV=production webpack --mode development",
     "dev": "webpack-dev-server --open --mode development "
  },
```

```js
 plugins: [
+        new webpack.DefinePlugin({
+            NODE_ENV:JSON.stringify(process.env.NODE_ENV)
+        }),
```

```js
if (process.env.NODE_ENV == 'development') {
	console.log('这是开发环境');
} else {
	console.log('这是生产环境');
}
```


## 18. 多入口
有时候我们的页面可以不止一个HTML页面，会有多个页面，所以就需要多入口

```js
entry: {
        index: './src/index.js',
        main:'./src/main.js'
    },
     output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].[hash].js',
            publicPath:PUBLIC_PATH
        },
        new HtmlWebpackPlugin({
                    minify: {
                        removeAttributeQuotes:true
                    },
                    hash: true,
                    template: './src/index.html',
                    chunks:['index'],
                    filename:'index.html'
                }),
                new HtmlWebpackPlugin({
                    minify: {
                        removeAttributeQuotes:true
                    },
                    hash: true,
                    chunks:['main'],
                    template: './src/main.html',
                    filename:'main.html'
                })],
```


