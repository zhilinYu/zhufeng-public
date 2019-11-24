let fs = require('mz/fs');
// let co = require('co');
// koa1.0 generator  => async + await
function * read() { // 可以暂停 可以支持promise 
  let age = yield fs.readFile('./name.txt','utf8');
  let adress = yield fs.readFile(age,'utf8');
  let r = yield fs.readFile(adress,'utf8');
  return r;
}
function co(it) {
  return new Promise((resolve,reject)=>{
     // 异步线性执行怎么实现 koa express
    function next(data) {
      let { value, done } = it.next(data);
       if(!done){
         value.then(data=>{
           next(data)
         }, reject);
       }else{
         resolve(value);
       }
     }
     next();
  })
}
co(read()).then(data=>{
  console.log(data);
},err=>{
  console.log(err);
});
// let it = read();
// it.next().value.then(data=>{
//   it.next(data).value.then(data=>{
//     it.next(data).value.then(data=>{
//       console.log(it.next(data).value);
//     })
//   })
// })