let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolveLoader:{ // 解析loader的规则
    modules:[
      path.resolve(__dirname,'loaders'),
      path.resolve(__dirname,'node_modules')
    ]
  },
  devtool:'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        include:path.resolve(__dirname,'src'),
        use:{
          loader:'babel-loader', // @babel/core @babel/preset-env
          options:{
            "presets": ['@babel/preset-env']
          }
        }
      },
      {
        test:/\.less$/,
        // loader的执行顺序
        use:['style-loader','css-loader','less-loader']
      },
      {
        test: /\.jpg|\.png/,
        // loader的执行顺序
        use:{
          loader: "url-loader", // 内部可能会调用file-loader
          options:{
            limit:8
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
}