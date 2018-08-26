import React from 'react'
import { NavBar, InputItem,TextareaItem,Button } from 'antd-mobile';
import AvatarSelector from '../../component/avatar-selector/avatar-selector.js'
import {connect} from 'react-redux'
import {updata} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
@connect(
    state=>state.user,
    {updata}
)

class GeniusInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            title:'',
            desc:''
         };
    }
    onChange(key,val){
        this.setState({
            [key]:val
        })
    }
    render() {
        const path = this.props.location.pathname;
        const redirect = this.props.redirectTo


        return (
            <div>
                {redirect&&redirect!=path?<Redirect to={this.props.redirectTo}></Redirect>:null}
                <NavBar mode="dark">牛人完善信息页面</NavBar>
                <AvatarSelector SelectorAvatar={(imgname)=>{
                    this.setState({
                        avatar:imgname
                    })
                }}>
                </AvatarSelector>
                <InputItem onChange={(v)=>{this.onChange('title',v)}}>
                求职岗位
                </InputItem>
                
                <TextareaItem
                    rows={3}
                    title='自我简介'
                    autoHeight
                    onChange={(v)=>{this.onChange('desc',v)}}
                >
                职位简介
                </TextareaItem>
                <Button onClick={()=>{this.props.updata(this.state)}} type='primary'>保存</Button>
            </div>
        );
    }
}

export default GeniusInfo;