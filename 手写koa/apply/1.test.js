// koa核心非常小，中间件，http服务封装 req,res => ctx
// npm install koa

// Koa是一个类
let Koa = require('koa');
let app = new Koa(); // app可以实现常用的方法 listen use方法
app.use((ctx,next)=>{
  ctx.body = 'hello zfpx';
});
app.listen(3000);
