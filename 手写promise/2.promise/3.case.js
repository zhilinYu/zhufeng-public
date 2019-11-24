let Promise1 = require('./promise');
let promise = new Promise1((resolve,reject)=>{
  resolve();
});
// q bluebird
promise.then(function () {
  // es6 promise
    return new Promise((resolve,reject)=>{
      setTimeout(() => {
        resolve(new Promise((resolve,reject)=>{
          resolve(1000);
        }));
      }, 2000);
    })
}).then(data=>{
  console.log(data);
});