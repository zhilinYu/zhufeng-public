// 虚拟DOM元素的类
class Element {
  constructor(type, props, children) {
    this.type = type;
    this.props = props;
    this.children = children;
  }
}
// 设置属性
function setAttr(node,key,value){
  switch (key) {
    case 'value': // node是一个input或者textarea
      if(node.tagName.toUpperCase() === 'INPUT'|| node.tagName.toUpperCase()=== 'TEXTAREA'){
        node.value = value;
      }else{
        node.setAttribute(key,value);
      }
      break;
    case 'style':
      node.style.cssText = value;
      break;
    default:
      node.setAttribute(key, value);
      break;
  }
}
// 返回虚拟节点的 返回object的
function createElement(type, props, children) {
  return new Element(type, props, children);
};
// render方法可以将vnode转化成真实dom
function render(eleObj) {
  let el = document.createElement(eleObj.type);
  for(let key in eleObj.props){
     // 设置属性的方法
    setAttr(el, key, eleObj.props[key]);
  }
  // 遍历儿子 如果是虚拟dom继续渲染，不是就代表的是文本节点
  eleObj.children.forEach(child=>{
    child = (child instanceof Element)?render(child):document.createTextNode(child);
    el.appendChild(child);
  })
  return el;
}
// 将元素插入到页面内
function renderDom(el,target) {
  target.appendChild(el);
}
export { createElement, render, Element, renderDom}