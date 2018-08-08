import React from 'react'
// import { addGUNAsync } from './index.redux';
import {connect}   from 'react-redux'
import {addGUN,removeGUN,addGUNAsync} from './index.redux.js'
class App extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {  };
    // }
    render() {
        // const store = this.props.store;
        const addGUN = this.props.addGUN;
        const removeGUN = this.props.removeGUN;
        const addGUNAsync=this.props.addGUNAsync;
        // const num = store.getState();
        const num=this.props.num;
        return (
            
            <div>
                <h1>机舱有{num}把</h1>
                {/* <button onClick={()=>{store.dispatch(addGUN())}}>申请武器</button>
                {/* 注意dispatch */}
                {/* <button onClick={()=>{store.dispatch(removeGUN())}}>减少武器</button>
                <button onClick={()=>{store.dispatch(addGUNAsync())}}>等下武器</button> */}
                {/* <button onClick={()=>{store.dispatch(addGUN())}}>申请武器</button> */} 
                {/* 注意dispatch */}
                <button onClick={removeGUN}>减少武器</button>
                <button onClick={addGUNAsync}>等下武器</button>
                <button onClick={addGUN}>申请武器</button> 
            </div>
        );
    }
}

const mapStatetoProps=(state)=>{
    return {num:state};
}//要什么数据
const actionCreators={addGUN,removeGUN,addGUNAsync}
App = connect(mapStatetoProps,actionCreators)(App)//装饰器模式  新的组件  传四个参数  主要两个
export default App;
