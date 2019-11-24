import { observable, autorun, action,configure,computed} from 'mobx'
// configure({enforceActions:true})
// observable 把普通的数据变成可观察的数据 Object.defineProperty proxy
import {observer} from 'mobx-react';
// 写一个计数器的功能  可以增加 可以算当前的值是奇数还是偶数
import React from 'react';
import ReactDom from 'react-dom';

class Store {
  @observable num = 1;
  @computed get type(){
    return this.num%2? '奇数':'偶数'
  }
  @action add = ()=>{
    this.num += 1;
  }
}
let store = new Store();
@observer
class Counter extends React.Component{
  render(){
    return <div>
      {this.props.store.num}
      <button onClick={()=>{
        this.props.store.add();
      }}>+</button>
      {this.props.store.type}
    </div>
  }
}
ReactDom.render(<Counter store={store}></Counter>,window.root);
// 下一期架构课 8.25 日
// 全部订单中 有一个评价按钮 追加评价
// observe 可以监控数据的变化
// when 当xxx时
// reaction 
// spy ....

// class Person {
//   // 类的装饰器
//   @observable name = 'zfpx';
//   @observable age = '9';
//   get allName(){
//     return this.name + '-'+this.age
//   }
//   @action add = () =>{ // 可以把this绑定死
//     this.age += 1;
//   }
// }
// let p = new Person;
// autorun(()=>{
//   console.log(p.allName)
// })
// p.name = 'jw';


// 装饰器
// 3) 原型的上的方法的装饰器
// class Person{
//   @say
//   say(){
//     console.log('哈哈')
//   }
// }
// function say(target,key,descriptor) {
//   let oldSay = descriptor.value
//   descriptor.value = function () {
//     console.log('start say');
//     oldSay();
//     console.log('end say');
//   }
// }
// let p = new Person;
// p.say();
// 2)属性装饰
// class Circle {
//   @readonly PI = 3.14
// }

// function readonly(target,key,descriptor) {
//     descriptor.writable = false;
//     return descriptor
// }
// let c = new Circle();
// c.PI = 100

// 1)类装饰
// @add
// class My {

// }
// function add(target) { // 修饰类的时候 target指代的就是类
//   target.flag = 'ok'
// }
// console.log(My.flag)

// let o = observable([]);
// autorun(()=>{
//   console.log(o.length); // 在这里肯定会调用get
// });
// o.push('123');



// 收集依赖 o.age.num = autorun




// es7 语法 Object.defineProperty getter setter
// 一层墙 可以再中途干你想干的事
// function fn() {
//   alert(1);
// }
// // Object.defineProperty 不支持监控数组 (只能监控已有的属性)
// let obj = {a:1}
// let o = new Proxy(obj,{
//   set(target,key,value){
//     fn();
//     return Reflect.set(target,key,value)
//   },
//   get(target,key){
//     return Reflect.get(target,key)
//   }
// })
// o.a = 1000;
// console.log(o.a)



