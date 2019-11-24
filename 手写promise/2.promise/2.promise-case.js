
// 1.链式调用异步
let fs = require('fs');
function read(url) {
  return new Promise((resolve, reject) => {
    fs.readFile(url, 'utf8', (err, data) => {
      if (err) reject(err);
      resolve(data);
    })
  });
}
// 1.每次promise执行then后都会返回一个新的promise
// 2.如果then中返回的是一个结果的话会把这个结果传递下一次then中的成功回调
// 3.如果then中出现异常 会走下一个then的失败 将错误传递到失败中
// 4.如果失败后还可以成功,如果返回undefined 会把undefined 传递给下一次
// 5.catch 会捕获到没有捕获的异常
// 6.成功或者失败是一个可选参数
// 7. 如果then方法返回的是一个promise 那么会等待这个promise执行完决定返回的那个promise是成功还是失败
// 8.为什么要返回一个新的promise而不是this promise状态确定后 就是不能更改。
// 1.流程管理 (1.去掉data中.txt后缀 2.加一个jpg)

// let p = new Promise((resolve,reject)=>{
//   resolve();
// })
// p.then(data=>{
//   throw new Error();
// }).then(null,(err)=>{
//   console.log(err);
// })
read(data).then(data=>{
  
},err=>{

})
// read('./name.txt').then(data=>{
//   return read(data);// 返回的如果是一个promise的话会等待这个promise执行完 promise 如果成功就走下一个then的成功，如果失败 就走下一个的失败
// }).then(data=>{
//   return read(data);
// }).then(data=>{
//   console.log(data);
// }).catch(err=>{
//   console.log(err);
// })


// read('./name.txt').then(data => {
//   return data.split('.')[0];
// }).then(data => {
//   return data + '.jpg';
// }).then(data => {
//   throw new Error();
// }).then(data => {
//   throw new Error();
// }).then(null, (err) => {
//   console.log('err', err)
// }).then(data => {
//   console.log(data);
// }).catch(err => {
//   console.log('catch', err);
// }).then(data => {
//   console.log(data);
// })