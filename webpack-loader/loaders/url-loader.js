let loaderUtils = require('loader-utils');
let mime = require('mime');
function loader(source){
  let {limit} = loaderUtils.getOptions(this);
  if (limit && source.length<limit){
    // 如果在限制之内 转化成base64
    let type = mime.getType(this.resourcePath);
    let base64 = `data:${type};base64,${source.toString('base64')}`;
    return `module.exports = ${JSON.stringify(base64)}`
  }else{
    let fileLoader = require('./file-loader');
    return fileLoader.call(this, source);
  }
}
loader.raw = true;
module.exports = loader;