let less = require('less');
function loader(source) {
  let callback = this.async(); // 声明一个callback函数
  // 解析后调用callback 会走到下一个loader中
  // this.resource代表的就是当前文件
  less.render(source,{filename:this.resource},(err,output)=>{
    callback(err, output.css);
  });
}

module.exports = loader;