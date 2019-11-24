let fs = require('mz/fs');
// async 函数就是promise es7
// 回调的问题 不能try/catch 并发问题
async function read() { 
    let age = await fs.readFile('name.txt','utf8')
    return age
}
read().then(data=>{
  console.log(data);
})

// async + await = generator + co

// callback -> promise -> generator -> async + await