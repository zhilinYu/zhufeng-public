let jwt = {
    decode(token,secret){
        let [header,ccc,sign] = token.split('.');
        let h = JSON.parse(this.fromBase64ToString(header));
        let c = JSON.parse(this.fromBase64ToString(ccc));
        if(sign !== this.sign([header,ccc].join('.'),secret)){
            throw new Error('Not allowd'); // 报错
        }
        if(ccc.exp && ccc.exp < Date.now()){
            throw new Error('Not allowd')
        }
        return c;
    },
    fromBase64ToString(base64){
        return Buffer.from(base64,'base64').toString('utf8');
    },
    toBase64(str){ // 转化成base64
        return Buffer.from(str).toString('base64');
    },
    sign(str,secret){
        // 签名
        return require('crypto').createHmac('sha256',secret).update(str).digest('base64');
    },
    encode(payload,secret){
        let header = this.toBase64(JSON.stringify({'typ':'JWT',alg:'HS256'}));
        let content = this.toBase64(JSON.stringify(payload));
        // 签名使用 header + . + content 
        let sign = this.sign([header,content].join('.'),secret);
        // 生成好签名了
        return [header,content,sign].join('.');
    }
}
module.exports = jwt


// 第五期 明天node第一天 想报名同学可以参加这一期
// 1 3 5 晚上 8-10  周日全天