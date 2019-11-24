// 继承 实例上的属性 公有属性

function Parent(){
    this.name = {name:'zfpx'};
}
Parent.prototype.eat = function(){
    console.log('eat');
}
function Child(){
    Parent.call(this);
}
function create(parentPrototype){
    function Fn(){}
    Fn.prototype = parentPrototype;
    let fn = new Fn();
    fn.constructor = Child
    return fn;
}
Child.prototype = create(Parent.prototype);
let child = new Child();
console.log(child.constructor);
child.eat();