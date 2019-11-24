let loaderUtils = require('loader-utils');
let path = require('path');
function loader(source) {
  // 1.要先生产一个随机的图片的名字
  // 需要取到文件的后缀名 
  let ext = path.extname(this.resourcePath);
  // xxxxx.jpg
  let url = loaderUtils.interpolateName(this, `[hash]${ext}`, { content: source});
  // 创造文件 文件路径 文件的内容
  this.emitFile(url, source);
  return `module.exports = "${url}"`
}
loader.raw = true; // 设置source是buffer类型
module.exports = loader;