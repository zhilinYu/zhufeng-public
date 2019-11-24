// 创建react元素
import {renderComponent} from '../react-dom';
function createElement(type, props, ...children) {
  return { type, props, children };
}
class Component{
  constructor(props){
    this.props = props;
    this.state = {};
  }
  setState(newState){
    // 更替状态
    Object.assign(this.state,newState);
    let old = this.dom;
    let newEle = renderComponent(this);
    // dom-diff
    old.parentNode.replaceChild(newEle,old);
  }
}
let React = {
  createElement,
  Component
}
export default React;
