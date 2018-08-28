import React from 'react'
import {connect} from 'react-redux'
import {Result,List, WhiteSpace,Modal, Button} from 'antd-mobile'
import { Brief } from 'antd-mobile/lib/list/ListItem';
import browserCookie from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'

@connect(
    state=>state.user,
    {logoutSubmit}
)
class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
        this.logout = this.logout.bind(this)
    }
    logout(){
        const alert = Modal.alert;
        alert('注销', '确认退出登录吗???', [
            { text: '取消', onPress: () => console.log('cancel') },
            {
              text: '确认',
              onPress: () =>{
                browserCookie.erase('userid');
                // window.location.href = window.location.href
                this.props.logoutSubmit();
                // {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
              }
            },
          ])
        // console.log('log out');
        // browserCookie.erase('userid');
        // window.location.href = window.location.href//这里如何强制刷新的？
    }
    render() {
        const Item = List.Item
        const props = this.props;
        console.log(this.props)
        return props.user?(
            <div>
                <Result 
                    img={<img style={{width:50}} src={require(`../img/${this.props.avatar}.png`)} alt=''/>}
                    title={this.props.user}
                    message={props.type=='boss'?props.company:null}
                />

                <List renderHeader={()=>'简介'}>
                    <Item multipleLine>
                        {props.title}
                        {/* 公司和简介等 */}
                        {props.desc.split('\n').map(v=>{
                            <Brief key={v}>{v}</Brief>
                        })}
                        {props.money?<Brief>薪资：{props.money}</Brief>:null}
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <Item onClick={this.logout}>
                        退出登陆
                    </Item>
                </List>
            </div>
        ):<Redirect to={props.redirectTo}/>
    }
}

export default User;