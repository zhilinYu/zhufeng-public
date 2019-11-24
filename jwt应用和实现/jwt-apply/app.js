// 后端服务器 
let express = require('express');
let bodyParser = require('body-parser');
// 监听函数 
let app = express();
app.use(bodyParser.json()); // a=b&c=d
let User = require('./model/user');
let jwt = require('./jwt-simple');
let { secret } = require('./config');

// jwt 跟cookie没关系 
app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,DELETE,PUT,OPTIONS');
    if(req.method === 'OPTIONS'){
        res.end();
    }else{
        next();
    }
});

// 用户能注册 
app.post('/reg', async function (req, res, next) {
    let user = req.body;
    try {
        user = await User.create(user); //  添加成功后返回的就是添加后的结果
        res.json({
            code: 0,
            data: {
                user: { id: user._id, username: user.username }
            }
        })
    } catch (e) {
        res.json({
            code: 1,
            data: '注册失败'
        });
    }
});
// 用户能登录 
app.post('/login', async function (req, res, next) {
    let user = req.body;
    user = await User.findOne(user); // {_id,username}
    if (user) { // 用户找到了 数据库有这个
        let token = jwt.encode({
            id: user._id,
            username: user.username,
            exp:Date.now() + 1000*10
        }, secret);
        res.json({
            code: 0,
            data: {
                token
            }
        })
    } else {
        res.json({
            code: 1,
            data: '用户不存在'
        })
    }
});

// 用户可以校验他是否登录过
// 请求头 Authorization:Bearer token
let auth = function (req, res, next) {
    let authorization = req.headers['authorization'];
    if (authorization) {
        let token = authorization.split(' ')[1];
        try {
            let user = jwt.decode(token, secret);
            req.user = user;
            next(); // 取出token表示的内容 当前没有篡改过
        } catch (e) {
            res.status(401).send('Not Allowed');
        }
    } else {
        res.status(401).send('Not Allowed');
    }
}
app.get('/order', auth, function (req, res, next) {
    res.json({
        code: 0,
        data: { user: req.user }
    });
});


app.listen(3000);