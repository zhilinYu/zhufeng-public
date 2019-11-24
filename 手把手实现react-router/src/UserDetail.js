import React,{Component} from 'react';
import ReactDOM from 'react-dom';
export default class Detail extends Component{
    constructor(){
        super();
   }
   render(){
      return (<div>
         Detail {this.props.match.params.id}
     </div>)
 }
}

// WithRouter 路由权限校验 render children方法