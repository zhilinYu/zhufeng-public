// 继承 实例上的属性 公有属性

function Parent(){
    this.name = {name:'zfpx'};
}
Parent.prototype.eat = function(){
    console.log('eat');
}
let p = new Parent();
console.log(p.constructor === p.__proto__.constructor);
console.log(Parent.prototype === p.__proto__);
// 继承的方式 公有属性
function Child(){
    Parent.call(this);
}

// es6
Object.setPrototypeOf(Child.prototype,Parent.prototype);
// Child.prototype.__proto__= Parent.prototype;
let child = new Child();
child.eat();
// console.log(child.constructor);
// console.log(child.__proto__.constructor === Child);



// Child.prototype = new Parent(); 没人用