// 给我们对象 添加属性的
// let obj = {name:'zfpx'};

// 拦截的功能 数据劫持


let obj = {};
let num;
Object.defineProperty(obj,'name',{
    enumerable:true,// 是否可枚举
    // writable:false, // 是否可写
    configurable:false, // 能不能被删除
    get(){
        alert('你取值了')
        return num;
    },
    set(newValue){
        alert('你设置了')
        num = newValue
    }
});
obj.name = '123';
console.log(obj.name)

// 如何实现双向绑定 (如何实现数据劫持)
