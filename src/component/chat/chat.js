import React from 'react'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile';
import io from 'socket.io-client'
import {connect} from 'react-redux'
import {getMsgList,sendMsg,recvMsg} from '../../redux/chat.redux.js'
import { getChatId } from '../../util.js';
const socket = io('ws://localhost:9093')//手动发起连接

@connect(
    state=>state,
    {getMsgList,sendMsg,recvMsg}

)
class Chat extends React.Component {
    constructor(props){
        super(props);
        this.state={
            text:'',
            msg:[]
        }
    }
    // componentDidMount(){
        // this.props.getMsgList();
        // this.props.recvMsg();
        // const socket = io('ws://localhost:9093')
        // socket.on('recvmsg',(data)=>{
        //     // console.log(data)
        //     this.setState({
        //         msg:[...this.state.msg,data.text]
        //     })
        // })

    // }
    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList();
            this.props.recvMsg();
        }
    }
    fixCarousel(){
        setTimeout(function(){
            window.dispatchEvent(new Event('resize'))
        },0)
    }
    handleSubmit(){
        // socket.emit('sendmsg',{text:this.state.text})
        // console.log(this.state)
        // this.setState({text:''})
        const from = this.props.user._id;
        const to   = this.props.match.params.user;//从地址中获取
        const msg = this.state.text
        this.props.sendMsg({from,to,msg})
        this.setState({text:'',showEmoji:false})
    }
    render() {
        const userid = this.props.match.params.user
        const Item = List.Item
        const users = this.props.chat.users;
        const chatid = getChatId(userid,this.props.user._id)
        const chatmsg = this.props.chat.chatmsg.filter(v=>v.chatid==chatid);
        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
					.split(' ')
					.filter(v=>v)//过滤空格
                    .map(v=>({text:v}))
        
        if(!users[userid]){
            return null
        }
        return (
            <div id='chat-page'>
                <NavBar model='dark' icon={<Icon type='left' />} onLeftClick={()=>this.props.history.goBack()} >
                    {users[userid].name}
                </NavBar>
                {chatmsg.map(v=>{
                    const avatar = require(`../img/${users[v.from].avatar}.png`)
                    return v.from==userid?(
                        <List key={v._id}>
                           <Item thumb={avatar}>{v.content}</Item>
                        </List>
                    ):(
                        <List key={v._id} >
                            <Item className='chat-me' extra={<img src={avatar} />}> {v.content}</Item>
                        </List>
                    )
                    // return <p key={v._id}>{v.content}</p>
                })}
                <div className='stick-footer'>
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={(v)=>{
                                this.setState({text:v})
                            }}
                            extra={
                                <div>
                                    <span
                                        style={{marginRight:15}}
                                        onClick={()=>{this.setState({showEmoji:!this.state.showEmoji});this.fixCarousel()}}
                                    >😃</span>
                                    <span onClick={()=>this.handleSubmit()}>发送</span>
                                </div>
                            }
                        >
                            信息
                        </InputItem>
                    </List>
                    {this.state.showEmoji?
                    (<Grid
                        data={emoji}
                        columnNum={9}
                        carouselMaxRow={4}
                        isCarousel={true}
                        onClick={el=>{
                            this.setState({
                                text:this.state.text+el.text
                            })
                            console.log(el)
                        }}
                    >
                    </Grid>
                    ):null
                    }
                </div>
                {/* // <h2>chat with user:{this.props.match.params.user}</h2> */}
            </div>
        );
    }
}

export default Chat;