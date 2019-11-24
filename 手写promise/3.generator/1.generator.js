// generator  生产迭代器

// 将类数组转化成数组
// 迭代器函数的定义 迭代器中需要返回一个对象这个对象中需要有一个next方法，next方法调用后，可以返回一个对象对象中有两个参数 第一个done value迭代出的结果
// function sum() {
//   let arr = [...{
//     0: 1, 1: 2, 2: 3, length: 3, [Symbol.iterator]: function () {
//       let len = this.length; // 3
//       let that = this;
//       let index = 0;
//       return {
//         next() {
//           return { done: index == len, value: that[index++] }
//         }
//       }
//     }
//   }];
//   // 类数组中有迭代器 可以通过展开预算符变成数组
//   console.log(Array.isArray(arr), arr);
// }
// sum(1, 2, 3);

// generator 生产迭代器的
// 生成器函数 *  generator 一般配合 yield
function * read() {
    yield 1;
    yield 2;
    yield 3;
    return 100
}
let it = read();
console.dir(it.next());
console.dir(it.next());
console.dir(it.next());
console.dir(it.next());

// 迭代器 next => {done,value}
function sum() {
  let arr = [...{
    0: 1, 1: 2, 2: 3, length: 3, [Symbol.iterator]: function * () {
      let index = 0;
      while (index != this.length) {
        yield this[index++]; // {done:false,value:1}
      }
    }
  }];
  console.log(Array.isArray(arr), arr);
}
sum(1, 2, 3);