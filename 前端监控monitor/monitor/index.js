// 1）我们要监控页面的性能 -  算时间差 Performance Api
// import perf from './performance.js';
// let fotmatObj = (data) =>{
//   let arr = [];
//   for(let key in data){
//     arr.push(`${key}=${data[key]}`);
//   }
//   return arr.join('&'); //{a:1,b:2} =>a=1&b=2
// }
// perf.init((data)=>{ // 获取到页面性能相关的数据
//   // 图片可能没大小 空的图片
//   new Image().src = "/p.gif?" + fotmatObj(data);
//   console.log(data);
// });
// 2）我们要监控页面静态资源的加载情况
// import resource from './resource.js'
// resource.init((data)=>{
//   console.log(data);
// })

// 3）ajax 监控ajax 发送时间
// import xhr from './xhr';
// xhr.init((data)=>{
//   console.log(data);
// })

// 页面的错误捕获
// try/catch 代码出错了
import errCatch from './errCatch';
errCatch.init((data)=>{
  console.log(data);
});
// 监控用户的行为

// 1.通过ajax   2.通过image