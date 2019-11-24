// 1.每次promise执行then后都会返回一个新的promise
// 2.如果then中返回的是一个结果的话会把这个结果传递下一次then中的成功回调
// 3.如果then中出现异常 会走下一个then的失败 将错误传递到失败中
// 4.如果失败后还可以成功,如果返回undefined 会把undefined 传递给下一次
// 5.catch 会捕获到没有捕获的异常
// 6.成功或者失败是一个可选参数
// 7. 如果then方法返回的是一个promise 那么会等待这个promise执行完决定返回的那个promise是成功还是失败
// 8.为什么要返回一个新的promise而不是this promise状态确定后 就是不能更改。

let Promise = require('./promise');

let p = new Promise((resolve,reject)=>{
  resolve();
})

p.then(data=>{
  return new Promise((resolve,reject)=>{
    resolve(1000);
  })
}).then(data=>{
  console.log(data);
},(err)=>{
  console.log('err',err);
})


let p = new Promise((resolve,reject)=>{
  reject(1);
})
p.then(null, (err)=> {
  throw err;
}).then((val)=>{ //  then是异步的 (微任务)
  console.log(val);
},(err)=>{
  console.log('----',err);
})