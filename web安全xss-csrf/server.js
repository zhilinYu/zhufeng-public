
// 当用户登录后 返回一个标识 cookie

let express = require('express');
let app = express();
let path = require('path'); // 帮我们拼接路径
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname)));
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let svgCaptcha = require('svg-captcha');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); // a=1&b=2 = {a:1,b:2} =  req.body
let userList = [{ username: 'zfpx', password: 'zfpx', money: 10000 }, { username: 'jw', password: 'jw', money: 20 }];
let SESSION_ID = 'connect.sid';
let session = {};
app.post('/api/login', function (req, res) {
  let { username, password } = req.body;
  let user = userList.find(user => (user.username === username) && (user.password === password));
  if (user) {
    // 服务器需要在用户登录后 给一个信息  珠峰:110
    let cardId = Math.random() + Date.now();
    session[cardId] = { user };
    res.cookie(SESSION_ID, cardId, { httpOnly: false });
    res.json({ code: 0 });
  } else {
    res.json({ code: 1, error: '用户不存在' });
  }
})
// 反射型xss  http://localhost:3000/welcome?type=<script>alert(document.cookie)</script>
// chrome 发现路径存在异常 会有xss屏蔽功能
// 一般情况下会让cookie在前端不可以获取 并不是解决xss的方案 只是降低受损的范围
// 诱导用户自己点开(一次性)
// 查询参数 可以加上encodeURIComponent 方式解决
app.get('/welcome', function (req, res) {
  res.send(`${encodeURIComponent(req.query.type)}`);
});

// 用户评论信息
let comments = [{ username: 'zfpx', content: '欢迎大家参加珠峰架构课' }, { username: 'zs', content: '进阿里 选珠峰' }]

app.get('/api/list', function (req, res) {
  res.json({ code: 0, comments });
})
app.post('/api/addcomment', function (req, res) {
  // 当你访问添加留言时 就执行到这里了
  let r = session[req.cookies[SESSION_ID]] || {} // {user:{username:passord}}
  let user = r.user
  if (user) { // 这个人登录过
    comments.push({ username: user.username, content: req.body.content });
    res.json({ code: 0 });
  } else {
    res.json({ code: 1, error: '用户未登录' })
  }
});
// xss 存储型 恶意的脚本存储到了服务器上，所有人访问时都会造成攻击,比 反射型和DOM-Based 范围更大

app.get('/api/userinfo', function (req, res) {
  let r = session[req.cookies[SESSION_ID]] || {}
  // data表示的是 svg内容  text表示的是验证码对应的结果
  let {data,text} = svgCaptcha.create();
  r.text = text; // 下次请求时应该拿到返回的结果和上次存好的结果做对比
  let user = r.user;
  if (user) {
    res.json({
      code: 0,
      user: {
        username: user.username,
        money: user.money,
        svg: data
      }
    })
  } else {
    res.json({ code: 1, error: '用户未登录' })
  }
})
app.post('/api/transfer',function (req,res) {
  let r = session[req.cookies[SESSION_ID]] || {}
  let user = r.user;
  // 不靠谱 可以通过node自己发请求来实现为伪造
  let referer = req.headers['referer'] || '';
  if(referer.includes('http://localhost:3000')){
    if (user) {
      let { target, money, code ,token} = req.body;
      if(('my_' + req.cookies[SESSION_ID]) === token ){
        if (code && code === r.text) { // 如果有验证码 并且验证码和我给你的一致 转钱
          money = Number(money);
          userList.forEach(u => {
            if (u.username === user.username) {
              u.money -= money;
            }
            if (u.username === target) {
              u.money += money;
            }
          });
          res.json({ code: 0 });
        } else {
          res.json({ code: 1, error: '验证不正确' });
        }
      }else{
        res.json({code:1}); // 没有tocken
      }
    } else {
      res.json({ code: 1, error: '用户未登录' })
    }
  }else{
    res.json({code:1,error:'被人攻击了'})
  }
  
})
app.listen(3000);

// xss + csrf  = xsrf
// 跨站请求伪造  钓鱼网站
// 给个吸引他的网站 



// 架构课 第六期 8月25日
// 在腾讯课堂通过 右上角 我的订单 课程评价
// 