// 服务端 koa

let Koa = require('koa');
let path = require('path');
let Server = require('koa-static');

let app = new Koa();

app.use(async (ctx,next)=>{
  if(ctx.path == '/api/list'){
    ctx.body = {name:'zfpx',age:9}
  }else{
    return next();
  }
});
app.use(Server(path.join(__dirname, 'client')));
app.use(Server(path.join(__dirname, 'node_modules')));
app.listen(3000,function () { // 启动本地服务 以client和node_modules作为静态目录
  console.log('server start 3000');
});