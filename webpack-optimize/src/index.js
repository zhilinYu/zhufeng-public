
import React,{Component} from 'react'
import {render} from 'react-dom';

import {HashRouter as Router ,Route} from 'react-router-dom';
// import Home from './Home';
// import About from './About';
class AsyncComponent extends React.Component{
  constructor(){
    super();
    this.state = {Comp:null}
  }
  componentWillMount(){
    this.props.load().then(res=>{  // {default:"组件"}
      this.setState({ Comp: res.default});
    })
  }
  render(){
    let {Comp} = this.state;
    return Comp?<Comp></Comp>:<div>loading</div>
  }
}
let Home = (props) => <AsyncComponent {...props} load={() => import(/* webpackChunkName: "xxxx" */'./Home')}></AsyncComponent>;
let About = (props) => <AsyncComponent {...props} load={() => import('./About')}></AsyncComponent>;
render(<Router>
  <div>
    <Route path="/home" component={Home}></Route>
    <Route path="/about" component={About}></Route>
  </div>
</Router>,window.root)