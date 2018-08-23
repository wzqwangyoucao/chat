import React from 'react'
import ReactDom from 'react-dom'
import {createStore,applyMiddleware,compose} from 'redux'//applyMiddleware处理中间件的
// //渲染页面用的
import {BrowserRouter,Route,Link,Redirect,Switch} from 'react-router-dom';
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import axios from 'axios'
import 'antd-mobile/dist/antd-mobile.css'
import AuthRoute from './component/anthroute/anthroute.js'
import './config'//拦截请求
import reducers from './reducer.js'//多个reducer合并
import Login from './container/login/login.js';
import Register from './container/register/register.js';
import './index.css'
import BossInfo from './container/bossinfo/bossinfo.js'



//注册到store上面将所有事件
const store = createStore(reducers,compose(
    applyMiddleware(thunk),//使用中间件
    window.devToolsExtension?window.devToolsExtension():f=>f//是否有调试工具
));

function Boss(){
    return <h2>Boss页面</h2>
}

ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                {/* 检测路由 */}
                {/* <Route path="/boss" component={Boss}></Route> */}

                <Route path="/bossinfo" component={BossInfo}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/register" component={Register}></Route>
            </div>
        </BrowserRouter>
    </Provider>)
    ,document.getElementById('root')
);

