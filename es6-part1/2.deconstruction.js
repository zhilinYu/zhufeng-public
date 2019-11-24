// 对象的解构赋值
// 数组的解构

let arr = [0, 1, 2];
let a = arr[0];
let b = arr[1];
let c = arr[2];

// 既声明 有赋值 等号的左边和右边结构相同
let arr = [, 1, 2];
let [a = 'hello', b, c] = arr;
console.log(a, b, c);

let { name:Name, age } = { name: 'zfpx', age: 9 };
console.log(Name,age,name)


let {name="zfpx"} = {}
console.log(name)

let [a] = [{name:'zfpx'}];
console.log(a);

let {length} = '123456';

function ajax({method="post",url}){
    console.log(method,url)
}
ajax({method:'get',url:'/'});

