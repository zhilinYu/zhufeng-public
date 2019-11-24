import React from './react';
import ReactDOM from './react-dom';
// 会转化成 React.createElement 参数是固定的 type,props,child1,child2,child3
// let element = <h1 className="style" name="zfpx" style={{color:'red'}} onClick={()=>{
//   alert(1);
// }}>珠峰
// </h1>;

// 组件 函数组件 类组件 (必须首字母大写)
// function MyComponent(props) {
//   return <h1>hello {props.value} {props.age}</h1>
// }
class MyComponent extends React.Component{
  constructor(props){
    super();
    this.state = {a:'hello'}
  }
  componentWillMount(){
    console.log('组件简要挂载')
  }
  render(){
    return <h1 onClick={()=>{
      this.setState({a:'world'});
    }}>hello zfpx class {this.state.a}</h1>
  }
  componentDidMount(){
    console.log('组件挂载完成')
  }
}
ReactDOM.render(<MyComponent value="zfpx" age={9}></MyComponent>,document.getElementById('root'));



// react JSX语法
// 虚拟dom 描述真实dom
// babel JSX-> react语法