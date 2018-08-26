import React from 'react'
import {BrowserRouter,Route,Link,Redirect,Switch} from 'react-router-dom';
import {connect} from 'react-redux'
import { NavBar } from 'antd-mobile';
import {withRouter} from 'react-router-dom'//可以进行路由
import NavLinkBar from '../navlink/navlink.js'
import Boss from '../../component/boss/boss.js'
import Genius from '../../component/genius/genius.js'
// import {Switch,Route} from 'react-router-dom'

// function Boss(){
//     return <h2>Boss页面</h2>
// }

// function Genius(){
//     return <h2>Genius页面</h2>
// }
function Msg(){
    return <h2>消息列表</h2>
}
function User(){
    return <h2>个人中心</h2>
}
@connect(
    state=>state
)
class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        // console.log(this.props)
        const {pathname} = this.props.location
        const user = this.props.user;
        const navList = [
            {
                path:'/boss',
                test:'牛人',
                icon:'boss',
                title:'牛人列表',
                component:Boss,
                hide:user.type=='genius'
            },
            {
                path:'/genius',
                test:'boss',
                icon:'job',
                title:'BOSS列表',
                component:Genius,
                hide:user.type=='boss'
            },
            {
                path:'/msg',
                test:'消息',
                icon:'msg',
                title:'消息列表',
                component:Msg
            },
            {
                path:'/me',
                test:'我',
                icon:'user',
                title:'个人中心',
                component:User
            }
        ];
        return (
            <div>
                {/* <h2>header</h2> */}
                <NavBar className='fixd-header' mode='dard'>
                    {navList.find(v=>v.path==pathname).title}
                </NavBar>
                {/* <h2>中间内容</h2> */}
                {/* <Route path='/boss' Component={Boss}></Route> */}
                {/* <Route path='/genius' Component={Genius}></Route> */}
                {/* <h2>footer</h2> */}
                <div style={{marginTop:45}}>
                    <Switch>
                        {navList.map(v=>(
                            <Route key={v.path} path={v.path} component={v.component}></Route>
                        ))}
                    </Switch>
                </div>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        );
    }
}

export default Dashboard;