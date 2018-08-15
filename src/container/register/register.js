import React from 'react'
import Logo from '../../component/logo/logo.js'
import {List,InputItem,WingBlank,WhiteSpace,Button,Radio} from 'antd-mobile'
import ListItem from 'antd-mobile/lib/list/ListItem';

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            type:'genius'
         };
        this.register = this.register.bind(this);
    }
    register(){
        console.log(this.props);
        this.props.history.push('/register')
    }
    render() {
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                <Logo></Logo>
                <List>
                    <InputItem>用户</InputItem>
                    <WhiteSpace />
                    <InputItem>密码</InputItem>
                    <WhiteSpace />
                    <InputItem>确认密码</InputItem>
                    <WhiteSpace />
                    <RadioItem checked={this.state.type=='genius'}>牛人</RadioItem>
                    <WhiteSpace />
                    <RadioItem checked={this.state.type=='boss'}>BOSS</RadioItem>
                    <WhiteSpace />
                    <Button type="primary">登陆</Button>
                </List>
            </div>
        );
    }
}

export default Register;