let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let webpack = require('webpack');
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
let LessExtract = new ExtractTextWebpackPlugin('css/less.css');
let cssExtract = new ExtractTextWebpackPlugin('css/css.css');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve('./build')
  },
  devServer: {
    contentBase: './build',
    port: 3000,
    compress: true,
    open: true,
    hot: true
  },
  plugins: [
    LessExtract,
    cssExtract,
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['./build']),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: '珠峰架构',
      hash: true,
    }),
  ],
  mode: 'development',
  resolve: {},
  module: {
    rules: [ // 从右往左写
      {
        test: /\.css$/, use: cssExtract.extract({
          use: [
            { loader: 'css-loader' }
          ]
        })
      },
      {
        test: /\.less$/, use: LessExtract.extract({
          use:[
            { loader: 'css-loader' },
            { loader: 'less-loader' }
          ]
        })
      }
    ]
  }
}

// 1.抽离样式 抽离到一个css文件 通过css文件的方式来引用