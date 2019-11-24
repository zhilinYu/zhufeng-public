// express是一个函数
let express = require('./express');
// app 监听函数
let app = express();
// RESTFul API 根据方法的名的不同 做对应的资源的处理

app.get('/name', function (req, res) { //req代表的是请求 res代表的是响应
  res.end('zfpx');
});
app.get('/age', function (req, res) {
  res.end('9');
});
app.post('/name', function (req, res) {
  res.end('post name');
});
// all代表的是匹配所有的方法 * 表示匹配所有的路径
app.all('*', function (req, res) {
  res.end(req.method + 'user');
});
app.listen(3000, function () {
  console.log(`server start 3000`);
}); // 在3000端口上开启服务

