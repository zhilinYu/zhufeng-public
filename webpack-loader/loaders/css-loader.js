// css-loader的作用就是把所有url的内容 都变成require('文件名的形式')
function loader(source) {
  let reg = /url\((.*?)\)/g;
  let current;
  let pos = 0;
  let arr = [`let lists = []`];
  while (current = reg.exec(source)) { //lastIndex
    // 数组类型 [匹配的字符串,分组中的内容]
    let [matchUrl, p] = current;
    let index = reg.lastIndex - matchUrl.length
    // lastIndex就是匹配结束的位置
    arr.push(`lists.push(${JSON.stringify(source.slice(pos, index))})`);
    arr.push(`lists.push("url("+require(${p})+")")`)
    pos = reg.lastIndex;
  }
  arr.push(`lists.push(${JSON.stringify(source.slice(pos))})`);
  arr.push(`module.exports = lists.join('')`);
  console.log(arr.join('\r\n'));
  return arr.join('\r\n');
}
module.exports = loader;
// div {
//   color: palegreen;
// }
// body {
//   background: url('./public.jpg');
// }

// let lists = [`div {color: palegreen;}body {background: `]
// lists.push("url("+require('./public.jpg')+")")
// lists.push(";}")
// module.exports = lists.join('');