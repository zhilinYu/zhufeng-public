let http = require('http');
let url = require('url');
function createApplication() {
  let app = (req,res) =>{
    // 取出每一个layer
    // 1.获取请求的方法
    let m =  req.method.toLowerCase();
    let {pathname}  = url.parse(req.url,true);
    for (let i = 0; i < app.routes.length;i++){
      let { method, path, handler} = app.routes[i];
      if((method === m||method === 'all') && (path === pathname || path ==='*')){
        handler(req,res); // 这里就是匹配成功后执行对的callback
      }
    }
    res.end(`Cannot ${m} ${pathname}`);
  }
  app.routes = [];
  app.all = function (path,handler) {
    let layer = {
      method:'all', // 如果method是all表示全部匹配
      path,
      handler
    }
    app.routes.push(layer);
  }
  http.METHODS.forEach(method =>{
    method = method.toLocaleLowerCase(); // 将方法转换成小写的
    app[method] = function (path, handler) {
      let layer = {
        method,
        path,
        handler
      }
      app.routes.push(layer);
    }
  })
  
  app.listen = function () {
    let server = http.createServer(app);
    server.listen(...arguments);
  }
  return app;
}
module.exports = createApplication;