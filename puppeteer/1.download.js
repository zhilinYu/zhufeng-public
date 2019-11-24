let puppeteer = require('puppeteer');
let path = require('path');
let fs = require('fs');
// 必须要会promise puppeteer的api 都返回的是一个promise
// promise + async +await


;(async()=>{
  // 模拟用户操作 可以帮我运行一个浏览器 默认这个浏览器 无头浏览器
  let browser = await puppeteer.launch({
    headless:false,
    executablePath:'C:\\Users\\speedly\\Downloads\\chrome-win32\\chrome-win32\\chrome'
  });
  // 打开一个空白页面
  let page = await  browser.newPage();
  // 打开页面后去哪里
  await page.goto('http://image.baidu.com/search/index?tn=baiduimage&ps=1&ct=201326592&lm=-1&cl=2&nc=1&ie=utf-8&word=%E6%9F%AF%E5%8D%97');

  // 希望下载到哪里 
  let downloadPath = path.resolve(__dirname,'download');
  let count = 0; 
  let MIN_SIZE = 5*1024; //图片的大小限制
  page.on('response',async (res) => {
    let header = res.headers();
    if (header['content-type'].includes('image')){
      if (header['content-length'] > MIN_SIZE){
        let buffer = await res.buffer(); // 把接口中内容取出来
        let extName = header['content-type'].split('/')[1]
        fs.writeFile(`${downloadPath}/${count++}.${extName}`, buffer,()=>{
          console.log(`${downloadPath}/${count++}.${extName}:ok`)
        });
      }
    }
  });

  // 实现自己滚动
  await page.evaluate(()=>{
    return new Promise((resovle,reject)=>{
      // 每一秒向下滚动依次
      let pos = 0; // 默认位置
      let i = 0;
      // 模拟用户的滚动操作
      let timer = setInterval(() => {
        window.scrollBy(0, 100);
        // 每次滚动后距离顶端的内容
        let scrollTop = document.documentElement.scrollTop;
        if (scrollTop === pos) { // 网络比较慢 可能没加载完
          if (i > 100) {
            clearTimeout(timer);
            resolve();
          } else {
            i++;
          }
        } else {
          pos = scrollTop;
          i = 0;
        }
      }, 100)
    })
  });
  await browser.close();
})();
