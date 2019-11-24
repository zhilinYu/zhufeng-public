// promise 允诺 有三个状态 不买 reject 买 resolve pending 等待态
// 他可以干     1.处理异步回调的问题  恶魔金字塔
// 多个异步请求 2.同步最终的结果问题

// 更有流程感 处理异步并发获取结果问题

// promise es6 规范  类
// 1.new Promise时需要传递一个executor执行器,执行器会立刻执行
// 2.执行器中传递了两个参数 resolve成功的函数 他调用时可以传一个值 值可以是任何值 reject失败的函数 他调用时可以传一个值 值可以是任何值
// 3.只能从pending态转到成功或者失败
// 4.promise实例。每个实例都有一个then方法，这个方法传递两个参数，一个是成功另一个是失败
// 5.如果调用then时 发现已经成功了 会让成功函数执行并且把成功的内容当作参数传递到函数中
// 6.promise 中可以同一个实例then多次,如果状态是pengding 需要将函数存放起来 等待状态确定后 在依次将对应的函数执行 (发布订阅)
let promise = new Promise((resolve,reject)=>{
  setTimeout(() => {
   resolve();
  }, 1000);
  // resolve(2);// pending -> resolved
  // reject(); // pending -> reject
});
promise.then((value) => { // pending
  console.log(value);
}, (reason) => {
  console.log(reason);
});
promise.then((value)=>{
  console.log(value);
},(reason)=>{
  console.log(reason);
});