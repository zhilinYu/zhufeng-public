// 渲染方法
function isType(type) {
  return function (content) {
    return Object.prototype.toString.call(content) === `[object ${type}]`
  }
}
let util = {}
let arr = ['String','Object','Function','Null','Number'];
arr.forEach(t =>{
  util['is' + t] = isType(t);
})
function render(vnode,container) {
  container.appendChild(_render(vnode));
}
// 把一个虚拟dom渲染成真实dom
function setAttribute(element,key,value) {
  if(key === 'className') key = 'class';
  if(key === 'style'){
    if(util.isObject(value)){
      for (let k in value) {
        element['style'][k] = value[k];
      }
    }
    return;
  }
  // 绑定事件
  if(key.startsWith('on')){
    key = key.toLowerCase();
    element[key] = value;
    return;
  }
  element.setAttribute(key,value);
}
function createComponent(component, props) {
  if(component.prototype.render){ // 类组件
    // 如果是类组件自己就有render方法，new类把属性传递到组件中
    component = new component(props)
  }else{
    component.render = function () {
      return component(props); // 调用render就会让函数执行
    }
  }
  return component;
}
export function renderComponent(component) {
  let dom;
  if(!component.dom){
    if (component.componentWillMount) {
      component.componentWillMount();
    }
  }
  dom = _render(component.render()); // 渲染真实dom
  if(!component.dom){
    if (component.componentDidMount) {
      component.componentDidMount();
    }
  }
  return dom;
}
function _render(vnode){
  if (util.isNumber(vnode)) vnode = vnode.toString(); 
  if (util.isString(vnode)) return document.createTextNode(vnode)
  let { type,props, children} = vnode;
  // 如果type是函数 说明他是一个组件
  if(util.isFunction(type)){
    // 1.先创建组件 目的是实现一个方法 专门用来渲染的
    let component = createComponent(type,props);
    component.props = props;
    // 2.把这个组件进行渲染 渲染返回的是真实dom
    let dom = renderComponent(component);
    component.dom = dom; // 这个用来表示组件是否渲染过
    return dom;
  }
  let element = document.createElement(type);
  if(props){
    for (let key in props){
      setAttribute(element,key,props[key]);
    }
  }
  // 如果元素有孩子 就递归
  if(children){
    children.forEach(child => render(child,element));
  }
  return element
}

let ReactDOM = {
  render
}
export default ReactDOM;