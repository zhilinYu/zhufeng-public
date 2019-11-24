let req = require('request');




async function validate(imgUrl) {
  return new Promise((resolve,reject)=>{
    let rs = req({
      url: imgUrl,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36(KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
      }
    });

    var showapiSdk = require('showapi-sdk');

    //设置你测试用的appId和secret,img
    var appId = '73938';
    var secret = '1135d625f0564e1cba48d9458824da2a';
    //开启debug
    //showapiSdk.debug(true);
    if (!(appId && secret)) {
      console.error('请先设置appId等测试参数,详见样例代码内注释!')
      return;
    }
    //全局默认设置
    showapiSdk.setting({
      url: "http://route.showapi.com/184-4",//你要调用的API对应接入点的地址,注意需要先订购了相关套餐才能调
      appId: appId,//你的应用id
      secret: secret,//你的密钥
      timeout: 5000,//http超时设置
      options: {//默认请求参数,极少用到
        testParam: 'test'
      }
    })

    var request = showapiSdk.request();
    request.appendText('typeId', '20');
    request.appendText('convert_to_jpg', '0');
    request.appendText('needMorePrecise', '0');
    request.appendFile('image', {
      value: rs,
      options: {
        filename: 'topsecret.jpg',
        contentType: 'image/jpeg'
      }
    })
    request.post(function (data) {
      console.log(data);
      resolve(data.showapi_res_body.Result)
    })
  })
}

module.exports = validate