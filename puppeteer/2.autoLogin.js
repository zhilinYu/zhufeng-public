let username = '3035465284@qq.com';
let password = 'abc123456';
// 自己注册账号密码

let puppeteer = require('puppeteer');
let validate = require('./valiadate');
;(async ()=>{
  let browser = await puppeteer.launch({
    headless:false,
    executablePath:'C:\\Users\\speedly\\Downloads\\chrome-win32\\chrome-win32\\chrome'
  });
  let page = await browser.newPage();
  await page.goto('https://accounts.douban.com/login');
  await page.type('#email', username,{delay:30});
  await page.waitFor(500);
  await page.type('#password', password, { delay: 20 });
  // 要获取图片的路径
  let imageSrc = await page.$eval('#captcha_image',ele=>ele.src);
  let code = await validate(imageSrc);
  await page.type('#captcha_field',code,{delay:20});
  await page.waitFor(1000);
  await page.click('.btn-submit');
  await page.waitForNavigation(); // loaded
  await page.screenshot({path:'ok.png'});
  await browser.close();
})();