// 装饰器 装饰类的
@myFunction('person')
class Person {
    @readOnly PI = 3.1415926
    @decoratorMy 
    my(){console.log('run')}
}
function myFunction(value){
   return function (target){
    target.myName = 'zfpx1';
   }
}
function decoratorMy(target,key,descriptor){
    // 如果修饰的是方法，第一个参数是Person.prototype
    let fn = descriptor.value;
    descriptor.value = function(){ // 装饰模式
        console.log(key+'调用');
        fn();
    }
}
function readOnly(target,key,descriptor){
    descriptor.writable = false; // 不支持改写
}
let person = new Person();
// person.PI = 4;
console.log(person.my());