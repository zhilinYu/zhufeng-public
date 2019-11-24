let loaderUtils = require('loader-utils');
function loader(source) { // source 就是处理好的样式
  console.log(source);
  // let script = `
  //   let style = document.createElement('style');
  //   style.innerHTML = ${JSON.stringify(source)}
  //   document.head.appendChild(style);
  // `
  // // 返回的结果 会在浏览器中运行
  // return script;
}
// pitch !! stringifyRequest
loader.pitch = function(request){  // 这个request的就是当前路径 没有包含当前
  //  css-loader less-loader
  console.log(request);
  let script = `
    let style = document.createElement('style');
    style.innerHTML = require(${loaderUtils.stringifyRequest(this, '!!' + request)});
    document.head.appendChild(style);
  `
  // 返回的结果 会在浏览器中运行
  return script;

}
module.exports = loader;

// 第七期的架构课 10月14号正式开班
// 前30个报名 有优惠 
