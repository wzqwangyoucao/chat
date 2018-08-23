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

class BossInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            title:''
         };
    }
    onChange(key,val){
        this.setState({
            [key]:val
        })
    }
    render() {
        return (
            <div>
                {this.props.redirectTo?<Redirect to={this.props.redirectTo}></Redirect>:null}
                <NavBar mode="dark">BOSS完善信息页面</NavBar>
                <AvatarSelector SelectorAvatar={(imgname)=>{
                    this.setState({
                        avatar:imgname
                    })
                }}>
                </AvatarSelector>
                <InputItem onChange={(v)=>{this.onChange('title',v)}}>
                招聘职位
                </InputItem>
                <InputItem onChange={(v)=>{this.onChange('company',v)}}>
                公司名称
                </InputItem>
                <InputItem onChange={(v)=>{this.onChange('money',v)}}>
                职位薪资
                </InputItem>
                <TextareaItem
                    rows={3}
                    title='职位要求'
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

export default BossInfo;