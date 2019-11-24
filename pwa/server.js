let express = require('express');

// 中间层
let axios = require('axios');
let app = express(); // 创建一个应用

app.use(express.static(__dirname)); // http://localhost:3000/package.json

app.get('/api/list', async (req, res) => {
    let r = await axios.get('https://www.fullstackjavascript.cn/api/img');
    let result = r.data;
    res.json(result);
});

app.listen(3000);