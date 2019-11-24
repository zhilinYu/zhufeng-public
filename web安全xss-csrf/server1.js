
// 当用户登录后 返回一个标识 cookie

let express = require('express');
let app = express();
let path = require('path'); // 帮我们拼接路径
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname)));
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); // a=1&b=2 = {a:1,b:2} =  req.body

app.listen(3001);

