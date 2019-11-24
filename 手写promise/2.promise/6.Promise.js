let Promise = require('./promise');
let bluebird = require('bluebird');
// bluebird
let fs = require('fs');

// js bind
function promisify(fn) {
  return function (...args) {// args =['./age.txt1','utf8']
    return new Promise((resolve,reject)=>{
      fn(...args,function(err,data) {
        if(err)reject(err);
        resolve(data);
      });
    });
  }
}
function promisifyAll(obj) {
  for(let key in obj){
    if(typeof obj[key] === 'function'){
      obj[key + 'Async'] = promisify(obj[key]);
    }
  }
}
promisifyAll(fs); // mz

// node方法 所有的回调第一个参数都是err 第二个结果
fs.readFileAsync('./age.txt','utf8').then(data=>{
  console.log(data);
},err=>{
  console.log(err);
})
