let Promise = require('./promise');
let fs = require('fs');

// angularjs Q 语法糖
function read(url) {
  let dfd = Promise.defer()
  fs.readFile(url, 'utf8', (err, data) => {
    if (err) dfd.reject(err);
    dfd.resolve(data);
  });
  return dfd.promise;
}
read('./name.txt').then(data=>{
  console.log(data)
});
