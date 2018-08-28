import React from 'react'
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile'
import Logo from '../../component/logo/logo.js'
import {login} from '../../redux/user.redux'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import imoocForm from '../../component/imooc-form/imooc-form.js'

// function hello(){
//     console.log('hello-imooc');
// }

// hello();

// function WrapperHello(fn){
//     return function(){
//         console.log('Before say hello')
//         fn();
//         console.log('After say hello')

//     }
// }

// hello = WrapperHello(hello);
// hello();
// 装饰器*******************************************
//高阶组件两个功能
//1.属性代理
//2.反向继承
// function WrapperHello(Comp){
    // class WrapComp extends React.Component{
    //     render(){
    //         return(
    //             <div>
    //                 <h2>这里HOC高阶组件特有的元素</h2>
    //                 <Comp name='text' {...this.props}></Comp>
    //             </div>
    //         )
    //     }
    // }
    
    // class WrapComp extends Comp {
    //     componentDidMount(){
    //         console.log('高阶组件新增的生命周期加载完成')
    //     }
    //     render(){
    //         return(
    //             <div>
    //                 <h2>这里HOC高阶组件特有的元素</h2>
    //                 <Comp name='text' {...this.props}></Comp>
    //             </div>
    //         )
    //     }
    // }
    // return WrapComp

// }

// @WrapperHello
// class Hello extends React.Component {
//     render() {
//         return (
//             <h2>Hello imooc,i love React,redux</h2>
//         );
//     }
// }



// Hello = WrapperHello(Hello);



@connect(
    state=>state.user,
    {login}
)
@imoocForm//这里为什么不是挨个挨个传入的？要用到handlerchange的组件才进行@
class Login extends React.Component {
    constructor(props) {
        super(props);
        // this.state = { 
        //     user:'',
        //     pwd:''
        //  };
        this.register = this.register.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    register(){
        console.log(this.props)
        this.props.history.push('/register')
    }
    // handleChange(key,val){
    //     this.setState({
    //         [key]:val
    //     })
    // }
    handleLogin(){
        this.props.login(this.props.state)
    }
    render() {
        return (
            <div>
                {/* <Hello></Hello> */}
                {(this.props.redirectTo&&this.props.redirectTo!='/login')?<Redirect to={this.props.redirectTo}/>:null}
                <Logo></Logo>
                <h2>登陆</h2>
                <WingBlank>
                    <List>
                        {this.props.msg?<p className="error-msg">{this.props.msg}</p>:null}
                        <InputItem onChange={v=>this.props.handleChange('user',v)}>用户</InputItem>
                        <WhiteSpace/>
                        <InputItem type='password' onChange={v=>this.props.handleChange('pwd',v)}>密码</InputItem>
                    </List>
                    <Button onClick={this.handleLogin} type="primary">登陆</Button>
                    <WhiteSpace/>
                    <Button onClick={this.register} type="primary">注册</Button>
                </WingBlank>
            </div>
        );
    }
}

export default Login;