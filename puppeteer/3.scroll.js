let puppeteer = require('puppeteer');


; (async () => {
  let browser = await puppeteer.launch({
    headless: false,
    executablePath: 'C:\\Users\\speedly\\Downloads\\chrome-win32\\chrome-win32\\chrome'
  });
  let page = await browser.newPage();
  await page.goto('https://account.36kr.com/#/login');
  await page.click('#kr-shield-submit');
  await page.waitFor(3000);
  let {left,top} = await page.evaluate(()=>{
    let $ = window.$;
    let left = $('.geetest_slider_button').offset().left - $(window).scrollLeft() + 10
    let top = $('.geetest_slider_button').offset().top - $(window).scrollTop() + 10;
    return {left,top}
  });
  // 拖拽到指定的位置
  dragEle(page,left,top);
  
})();
async function dragEle(page, left, top) { // 拖拽元素
   // 算下图片的真正拖动的距离
   let distance = await page.evaluate(()=>{
     // 全图
     let ele1 = document.querySelector('.geetest_canvas_fullbg').getContext('2d');
     // 残图
     let ele2 = document.querySelector('.geetest_canvas_bg').getContext('2d');
     let shadow = 30;
     let result = [];
     for(let i = 50;i<260;i++){
       for(let j = 0; j<160;j++){
         let data1 = ele1.getImageData(i,j,1,1).data; // [r,g,b,a]
         let data2 = ele2.getImageData(i,j,1,1).data; // [r,g,b,a]
         /// 比较出阴影
         let res1 = data1[0] - data2[0];
         let res2 = data1[1] - data2[1];
         let res3 = data1[2] - data2[2];
         if(!(res1<30 && res2<30 && res3<30)){
           if(!result.includes(i)){
             result.push(i); 
           }
         }
       }
     }
     return result[0] - 5;
   })
  page.mouse.click(left, top, { delay: 2000 });
  page.mouse.down(left, top);
  page.mouse.move(left + distance-10, top, { steps: 20 });
  await page.waitFor(800);
  page.mouse.move(left + distance, top, { steps: 30 });
  await page.waitFor(800);
  page.mouse.up();
  let flag = await page.evaluate(()=>{
    let r = document.querySelector('.geetest_result_content').innerHTML;
    if (r.includes('拖动滑块将悬浮图像正确拼合')){
      return true; // 需要重新拖动
    }
    if (r.includes('怪物')) {
      return true; // 需要重新拖动
    }
  });
  if(flag){
    await page.waitFor(1000);
    dragEle(page, left, top);
  }
}
// 珠峰架构课  第六期开课 可以参见课程
// ke.qq.com
// 发给正式学员