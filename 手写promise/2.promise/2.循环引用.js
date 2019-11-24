let p = new Promise((resolve, reject) => {
  resolve()
})
// 不能自己等待自己完成
let promise2 = p.then(data => {
  return promise2;
})
promise2.then(data => {

}, (err) => {
  console.log(err);
})