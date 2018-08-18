import React from 'react'
import axios from 'axios'//获取后端信息
import {withRouter} from 'react-router-dom'//可以进行路由


@withRouter
class AuthRoute extends React.Component {
    componentDidMount(){
        const publicList = ['/login','/register']
        const pathname = this.props.location.pathname
        // console.log(this.props.location.pathname);
        if(publicList.indexOf(pathname)>-1){
            return null;
        }
        //获取用户信息
        axios.get('/user/info')//发请求
            .then(res=>{
                if(res.status===200){
                    if(res.data.code==0){
                        //有登陆信息的
                    }
                    else{
                        this.props.history.push('/login')
                        // console.log(this.props.history)
                        //undefine  因为这不是一个路由组件在加上
                        //withRouter组件和@withRouter之前
                    }
                    // console.log(res.data)
                }
            })
        // 是否登陆
        // 现在的url地址 login是不需要跳转的

        // 用户的type 身份是boss还是牛人
        // 用户是否完善信息（选择头像，个人简介）
    }
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            null
        );
    }
}

export default AuthRoute;