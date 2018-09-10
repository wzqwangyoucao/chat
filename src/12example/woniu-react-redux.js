import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'C:/Users/lenovo/AppData/Local/Microsoft/TypeScript/2.9/node_modules/redux';
//connect 负责链接组件  给到redux里的数据放到组件的属性里

export class Provider extends React.Component {
    static childContextTypes = {
        store:PropTypes.object
    }
    getChildContext(){
        return {store:this.store}
    }
    constructor(props,context) {
        super(props,context);
        this.store = props.store
        this.state = {
         };
    }
    render(){
        return this.props.children
    }
}
// export function connect(mapStateToProps,mapDispatchToprops){
//     return function (WrapComponent){
//         return class ConnctComponent extends React.Component{

//         }
//     }
// }
//Provider负责接收一个组件 把store放到context里面，所有的子元素可以直接取到store
export const connect = (mapStateToProps=state=>state,mapDispatchToprops={})=>(WrapComponent)=>{
    return class ConnctComponent extends React.Component{
        static contextTypes={
            store:PropTypes.object
        }
        constructor(props,context) {
            super(props,context);
            this.state = {
                props
             };
        }
        componentDidMount(){
            const {store} = this.context
            store.subscribe(()=>this.updata())
            this.updata()
        }
        updata(){
            // 获取mapStateToProps,mapDispatchToprops 放入this.props里
            const {store} = this.context
            const stateProps = mapStateToProps(store.getState())
            const dispatchProps = bindActionCreators(mapDispatchToprops,store.dispatch)
            //方法不能直接给  因为需要dispatch
            //要执行store.dispatch(addGun())才有意义
            //addGun = ()=>store.dispatch(addGun())才有意义，其实就是dispatch把actionCreator包了一层
            this.setState({
                props:{
                    ...this.state.props,
                    ...this.stateProps,
                    ...dispatchProps
                }
            })
        }
        render(){
            return <WrapComponent {...this.state.props}></WrapComponent>
        }
    }
}
//Propvidrt 把store放到contex里，把所有的子元素可以直接store