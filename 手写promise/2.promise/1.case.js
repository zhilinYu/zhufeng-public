// 1.new Promise时需要传递一个executor执行器,执行器会立刻执行
// 2.执行器中传递了两个参数 resolve成功的函数 他调用时可以传一个值 值可以是任何值 reject失败的函数 他调用时可以传一个值 值可以是任何值
// 3.只能从pending态转到成功或者失败
// 4.promise实例。每个实例都有一个then方法，这个方法传递两个参数，一个是成功另一个是失败
// 5.如果调用then时 发现已经成功了 会让成功函数执行并且把成功的内容当作参数传递到函数中
// 6.promise 中可以同一个实例then多次,如果状态是pengding 需要将函数存放起来 等待状态确定后 在依次将对应的函数执行 (发布订阅)
// 7.如果类执行时出现了异常 那就变成失败态
let Promise = require('./promise');

let p = new Promise((resolve,reject)=>{
  resolve();
})
p.then((value) => {
  console.log(value)
}, (reason) => {
  console.log('err', reason);
})
p.then((value)=>{
  console.log(value)
},(reason)=>{
  console.log('err',reason);
})