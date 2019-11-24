let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let DllReferencePlugin = require('webpack/lib/DllReferencePlugin')
let HappyPack = require('happypack');

// HappyPack 使用多线程打包 js单线程的 启用子进程
  // antd babel-plugin-import 
  // import {Button} from 'antd' 
  // AST import Button from 'antd/lib/Button'
module.exports = {
  mode:'production', // 内部会调用uglifyjs tree shaking
  entry:'./src/index.js',
  output:{
    filename:'bundle.js',
    path: path.resolve(__dirname,'dist')
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        use:"happypack/loader?id=js",
        exclude:/node_modules/,
        include:path.resolve(__dirname,'src')
      },
      {
        test:/\.css$/,
        use:"happypack/loader?id=css"
      }
    ]
  },
  devServer:{
    contentBase:'./dist'
  },
  plugins:[
    new HappyPack({
      id:'js',
      use: ['babel-loader'],
    }),
    new HappyPack({
      id: 'css',
      use: ['style-loader', 'css-loader'],
    }),
    new DllReferencePlugin({
      manifest:path.resolve(__dirname,'dist','react.manifest.json')
    }),
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    })
  ]
}