let Promise = require('./promise');
let fs = require('mz/fs'); // 把所有的fs方法变成promise

// 多个请求并发 如何处理

// 1.解决输出的顺序的问题
// all方法的参数 是一个数组，会按照数组的结果放到成功的回调里(只有全成功才算成功)
// race方法参数也是一个数组。会同时发起并发，但是以返回最快的结果为结果
// 两个 
Promise.race([fs.readFile('./name.txt', 'utf8'), fs.readFile('./age.txt', 'utf8')]).then((data) => {
  console.log(data);
}, err => {
  console.log(err);
});
// gennerator aysnc await 