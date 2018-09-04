import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')//连接server的

//获取聊天列表   用户之前与用户之间的聊天   进行聊天记录的显示
const MSG_LIST='MSG_LIST'
//读取信息   用户发送一条  我们能够收到信息
const MSG_RECV='MSG_RECV'
//标识以读   标识出我们的信息是不是已经读过
const MSG_READ='MSG_READ'

const initState = {
    chatmsg:[],//每条聊天信息
    unread:0,//未读信息
    users:{}
}

export function chat(state=initState,action){
    switch(action.type){
        case MSG_LIST:
            return {...state,users:action.payload.users,chatmsg:action.payload.msgs,unread:action.payload.msgs.filter(v=>!v.read&&v.to==action.payload.userid).length}
        case MSG_RECV:
            const n = action.payload.to == action.userid?1:0;
            return {...state,chatmsg:[...state.chatmsg,action.payload],unread:state.unread+n}
        case MSG_READ:
            return {...state,chatmsg:state.chatmsg.map(v=>{
                v.read = true
                return v;
            }),unread:state.unread-action.payload.num}
            default:
                return state
    }
}

function msgList(msgs,users,userid){
    return{type:MSG_LIST,payload:{msgs,users,userid}}
}

export function sendMsg({from,to,msg}){
    return dispatch=>{
        console.log({from,to,msg})
        socket.emit('sendmsg',{from,to,msg})

    }
}

function msgRecv(msg,userid){
    return{userid,type:MSG_RECV,payload:msg}
}

export function recvMsg(){
    return (dispatch,getState)=>{//getState获取当前redux里面所有的数据
        socket.on('recvmsg',function(data){
            console.log(data)
            const userid = getState().user._id
            dispatch(msgRecv(data,userid))
        })
    }
}

function msgRead({from,userid,num}){
    return {type:MSG_READ,payload:{from,userid,num}}
}

export function readMsg(from){
    console.log(from);
    return (dispatch,getState)=>{
        axios.post('/user/readmsg',{from})
            .then(res=>{
                const userid = getState().user._id;
                if(res.status==200&&res.data.code==0){
                    dispatch(msgRead({from,userid,num:res.data.num}))
                }
            })
    }
}

export function getMsgList(){
    return (dispatch,getState)=>{
        axios.get('/user/getmsglist')
            .then(res=>{
                // console.log('getState',getState())
                //获取当前redux里面所有的数据
                // {user: {…}, chatuser: {…}, chat: {…}}
                // chat
                // :
                // {chatmsg: Array(0), unread: 0, users: {…}}
                // chatuser
                // :
                // {userlist: Array(2)}
                // user
                // :
                // {redirectTo: "/genius", msg: "", user: "1", type: "genius", _id: "5b89598a95374f1044b13137", …}
                if(res.status==200&&res.data.code==0){
                    const userid = getState().user._id
                    dispatch(msgList(res.data.msgs,res.data.users,userid))
                }
            })
    }
}