// (剩余运算符 函数中使用) (展开运算符/拓展)

// 剩余运算符 必须是最后一个
function sum(a,b,...args){
    return eval(args.join('+'))
}
console.log(sum(1,2,3,4,5,6,7,8));

let arr1 = [1,2,3];
let arr2 = [4,5,6];
let arr3 = [...arr1,...arr2];

function max(){
    // 将类数组转化成数组
    return [...arguments]; //Array.from();
    // return Math.max(...arguments)
}
console.log(max(1,2,3,4,5));

// 对象也可以展开运算
// 通过展开运算符 和 Object.assign实现的都是浅拷贝
// 浅拷贝 和 深拷贝
// let newObj ={};
// Object.assign(newObj,school,age); // $.extend
// console.log(newObj);
// 1) 浅拷贝
// let school = {name:'zfpx',n:{n:1}};
// let age = {age:9};
// let newObj = {...school,...age};
// school.n.n = 100; // 这个是浅拷贝
// console.log(newObj);
// 2)深拷贝
let school = {name:'zfpx',n:{n:1},fn:()=>{}};
let newObj = JSON.parse(JSON.stringify(school));
school.n.n = 100;
console.log(newObj);
// 3)实现深拷贝 (递归拷贝)
function deepClone(obj){
    if(obj === null) return null;
    if(typeof obj !== 'object') return obj; 
    if(obj instanceof RegExp) return new RegExp(obj);
    if(obj instanceof Date) return new Date(obj);
    let newObj = new obj.constructor();
    for(let key in obj){
        newObj[key] = deepClone(obj[key]);
    }
    return newObj;
};
let o = {name:{name:1}}
let test = deepClone(o);
o.name.name = 'hello';
console.log(test);