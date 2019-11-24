// 高阶函数 ： 函数当作参数传递 函数返回一个函数 满足一个就叫做高阶函数

// 偏函数(参数个数不定项)  函数柯里化 redux


// after lodash 方法
function after(times,callback) {
  return function () {
    if (--times == 0){
      callback()
    }
  }
}
let fn = after(3,function () {
  console.log('after 函数被调用了三次')
});
fn();
fn();

// array forEach filter reduce

// 处理异步 多个异步请求同时执行,在某一个时间点 获取他们的结果
// a接口想获取 数据内容 姓名
// b接口想获取 数据内容 年龄 {name,age}