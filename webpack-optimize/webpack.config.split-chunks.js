let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let DllReferencePlugin = require('webpack/lib/DllReferencePlugin')
let HappyPack = require('happypack');
module.exports = {
  mode:'production', 
  entry:{
    pageA:'./src/pageA.js',
    pageB:'./src/pageB.js'
  },
  output:{
    filename:'[name].js',
    path: path.resolve(__dirname,'dist')
  },
  optimization:{
    splitChunks:{
      cacheGroups:{
        common:{
          chunks:'initial',
          minChunks:2,
          minSize:0
        },
        vendor:{
          test:/node_modules/, // 限制只有第三方的我要
          chunks: 'initial',
          minChunks: 2,
          minSize: 0,
          priority:10
        }
      }
    }
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
      template:'./src/index.html',
    })
  ]
}