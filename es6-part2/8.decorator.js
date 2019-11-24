
function desc(id){
    console.log('out'+id);
    return function(target,key,descriptor){
        console.log('inner'+id);
    }   
}
// 洋葱模型 compose方法 redux koa
class My{
    @desc('1')
    @desc('2')
    my(){}
}

// 周五  休息一天
// 分组 交作业
// 不会es6的  周六晚上公开课 jwt 开课课 8.30