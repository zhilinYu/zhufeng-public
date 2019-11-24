// var let / const



for(let i = 0 ;i <3;i++){
    setTimeout(function(){
        console.log(i);
    },1000)
}
const ABC = {name:'ABC'};
ABC.name = 'BBB'
// 1.变量提升
// 2.在同一个作用域下 同一个变量不能声明多次
// 3.用let声明不会声明到window上
// 4.let 和 {} 可以产生一个作用域
// 5.const声明的变量不能更改其引用地址


