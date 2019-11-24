let Promise = require('./promise')
let p = new Promise((resolve,reject)=>{
  resolve();
});
// catch 就是不写成功的回调的then方法
// finally 实现
p.then(data=>{
  throw new Error();
}).then(null).catch().then(null,(err)=>{
  console.log('err',err);
})


