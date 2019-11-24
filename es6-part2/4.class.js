// es6 类
class Parent{
    constructor(){
        this.name = 'zfpx'
    }
    static myName(){ // 类上的方法,也会被继承
        return 'parent';
    }
    eat(){
        console.log('eat');
    }
}
class Child extends Parent{ // Object.create(Child.prototype,Parent.prototype);
    constructor(){
        super(); // Parent.call(this);
    }
}
let child = new Child()
console.log(Child.myName());