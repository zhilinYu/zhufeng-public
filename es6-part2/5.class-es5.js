// 类的校验 
function _classCallCheck(constructor,instan){
    if(!(instan instanceof constructor)){
        throw TypeError('not new');
    }
}
function defineProperty(target,props){
    for(let i = 0;i<props.length;i++){
        Object.defineProperty(target,props[i].key,{
            enumerable:true,
            writable:true,
            ...props[i]
        });
    }
}
function _createClass (constructor,protoProperties,staticProperties){
    if(protoProperties.length>0){
        defineProperty(constructor.prototype,protoProperties)
    }
    if(staticProperties.length>0){
        defineProperty(constructor,staticProperties);
    }
}
// 实例属性 公有属性 静态属性 描述器
let Parent = (function(){
    function Parent(){
        //_classCallCheck(Parent,this);
        this.name = 'p';
    }
    _createClass(Parent,[ // 描述公有属性的 descriptor
        {key:'eat',value:function(){console.log('eat')}},
        {key:'drink',value:function(){console.log('drink')}}
    ],[
        {key:'myName',value:function(){return '父亲'}}
    ]);
    return Parent;
})();
function _inherit(ctor,ptor){
    ctor.prototype = Object.create(ptor.prototype,{constructor:{value:ctor}}); // 公有 
    ctor.__proto__ = ptor; //  静态
}
let Child = (function(Parent){
    _inherit(Child,Parent);
    function Child(){
        _classCallCheck(Child,this);
        Parent.call(this); // 实例上的属性
    }
    return Child;
})(Parent);
let c = new Child();
console.log(Child.myName());


