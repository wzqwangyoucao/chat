import React from 'react'
import {connect} from 'react-redux'
import { List, Badge } from 'antd-mobile';
import { Brief } from 'antd-mobile/lib/list/ListItem';

@connect(
    state=>state
)
class Msg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    getLast(arr){
        return arr[arr.length-1]
    }
    render() {
        // console.log(this.props)
        //按照聊天用户分组 根据chatid

        const msgGroup={};
        const Item = List.Item;
        this.props.chat.chatmsg.forEach(v => {
            msgGroup[v.chatid]=msgGroup[v.chatid]||[]
            msgGroup[v.chatid].push(v)
        });
        console.log(msgGroup);
        // console.log([3,1,5,7,4].sort(function(a,b){
        //     return b-a
        // }))
        const chatList = Object.values(msgGroup).sort((a,b)=>{
            const a_last = this.getLast(a).create_time;
            const b_last = this.getLast(b).create_time;
            return b_last-a_last
        })//不要key值
        console.log(chatList)
        // console.log(Object.values({name:'imooc',age:18}))
        const userid = this.props.user._id;
        const userinfo = this.props.chat.users;

        // const name = userinfo[targetId]?userinfo[targetId].name:'';
        // const avatar = userinfo[targetId]?userinfo[targetId].avatar:'';
        return (
            // <h2>消息列表</h2>
            <div>
                    {chatList.map(v=>{
                        console.log(v);
                        const lastItem = this.getLast(v);
                        const targetId = lastItem.from == userid?lastItem.to:lastItem.from;
                        console.log(targetId)
                        console.log(userinfo);
                        const unreadNum = v.filter(v=>!v.read&&v.to==userid).length//v.read==flase
                        if(!userinfo[targetId]){
                            return null
                        }
                        return(
                            <List key={lastItem._id}>
                                <Item  extra={<Badge text={unreadNum}></Badge>} thumb={require(`../img/${userinfo[targetId].avatar}.png`)}  arrow="horizontal" onClick={this.props.history.push(`/chat/${targetId}`)}>
                                            {/* 水平箭头 */}
                                    {lastItem.content}
                                    <Brief>{userinfo[targetId].name}</Brief>
                                </Item>
                            </List>
                        )
                    })}

            </div>
        );
    }
}

export default Msg;


// 1、eslint代码校验工具
// 2、react16特有的处理机制
// 3、react性能优化 接口 或者路由  渲染优化等
// 4、同步未读取数量