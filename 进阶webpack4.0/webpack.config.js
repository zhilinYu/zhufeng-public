let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let webpack = require('webpack');
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
let cssExtract = new ExtractTextWebpackPlugin({
  filename: 'css/css.css',
});
let CopyWebpackPlugin = require('copy-webpack-plugin');
let PurifycssWebpack = require('purifycss-webpack');
let glob = require('glob');
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
    cssExtract,
    // 拷贝插件
    new CopyWebpackPlugin([
      {
        from: './src/doc',
        to: 'public'
      }
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['./build']),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: '珠峰架构',
      hash: true,
    }),
    // 没用的css会被消除掉，一定放在htmlwebpackPlugin后面
    new PurifycssWebpack({
      paths:glob.sync(path.resolve('src/*.html'))
    })
  ],
  mode: 'development',
  resolve: {},
  module: {
    rules: [ // 从右往左写
      {
        test: /\.css$/, use: cssExtract.extract({
          fallback:'style-loader',
          use: [
            { loader: 'css-loader' },
            {loader:'postcss-loader'}
          ]
        })
      }
    ]
  }
}

// 1.抽离样式 抽离到一个css文件 通过css文件的方式来引用