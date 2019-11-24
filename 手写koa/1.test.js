let Koa = require('./koa/application');
let app = new Koa();
app.use((req,res)=>{
  res.end('hello zfpx');
});
app.listen(3000);