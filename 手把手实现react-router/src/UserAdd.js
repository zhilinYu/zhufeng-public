import React,{Component} from 'react';
import ReactDOM from 'react-dom';
export default class UserAdd extends Component{
    constructor(){
        super();
        // 16.3新提供的
        this.text = React.createRef();
   }
   handleSubmit = (e)=>{
     e.preventDefault();
    this.props.history.push('/user/list');
   }
   render(){
      return (<form onSubmit={this.handleSubmit}>
        <input type="text" ref={this.text}/>
        <button type="submit">提交</button>
      </form>)
 }
}