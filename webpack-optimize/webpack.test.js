let path = require('path');
// 动态链接库
let DllPlugin = require('webpack/lib/DllPlugin');
module.exports = {
  mode: 'development',
  entry: {
    react:['react','react-dom']
  },
  output: {
    filename: 'dll.js',
    path: path.resolve(__dirname, 'dist'),
    library:'[name]_dll'
  },
  plugins:[
    new DllPlugin({
      name: '[name]_dll',
      path:path.resolve(__dirname,'dist','[name].manifest.json')
    })
  ]
}