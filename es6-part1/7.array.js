// 类数组转化成数组
console.log(Array.from({ 0: 1, 1: 2, 2: 3, length: 3 }));

// let arr = [...{0:1,1:2,2:3,length:3}];

// 如果想用...方式需要提供迭代器 arguments map set
// Symbol string number null undefined boolean object 


let sy1 = Symbol('foo'); // 独一无二的值 做常量
let sy2 = Symbol('foo');
console.log(sy1 === sy2);
// let obj = {
//     [sy1]:1,
//     [sy2]:2
// }
// console.log(obj);

let s1 = Symbol.for('foo'); // Symbol.for()和Symbol是一样的
let s2 = Symbol.for('foo');
console.log(s1 === s2);
console.log(Symbol.keyFor(s1));
console.log(typeof (Symbol()));

// 迭代器 需要生成器返回 Array.from不需要迭代器 
let arr = [...{
    0: 1, 1: 2, 2: 3, 3: 4, length: 4, [Symbol.iterator]: function* () {
        let index = 0;
        while (index != this.length) {
            yield this[index++];
        }
    }
}];
console.log(arr); // [1,2,3]

// reduce map forEach findIndex find every some filter........ includes ES7

// 编程式 声明式
// 收敛
let arr = [1, 2, 3, 4, 5];
// Array.prototype.myReduce = function(callback){
//     let prev = this[0];
//     for(let i = 0; i<this.length-1;i++){
//         console.log(prev,this[i+1],i+1,this)
//         prev = callback(prev,this[i+1],i+1,this);
//     }
//     return prev;
// }
let arr = [{ price: 1, count: 2 }, { price: 2, count: 3 }, { price: 3, count: 5 }]
let total = arr.reduce(function (prev, next, currentIndex, arr) {
    return prev + next.price * next.count;
},0);
console.log(total);


let arr = [0,1,2].map(item=>item+2);
console.log(arr)
// map映射 可以把数组返回一个映射后的数组 forEach findIndex 
let arr = [1,2,3,2];
let val = arr.find(item=>item === 2); // 找到后就不继续找了 找不到返回undefined
// every 找false  some 找true includes是否包含
//  filter 过滤 返回false就相当于把数组这一项删掉，返回的是一个过滤后的数组

// 周三
// map set
// class的实现 
// 装饰器 mobx
// 箭头函数
// 模板字符串 模板引擎 ejs