import axios from 'axios'
// import {getReadirectPath} from '../util.js'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const initState={
    redirectTo:'',
    isAuth:false,
    msg:'',
    user:'',
    pwd:'',
    type:''
}

export function user(state=initState,action){
    switch(action.type){
        case REGISTER_SUCCESS:
            return{...state,msg:'',isAuth:true,...action.payload}
            // return{...state,msg:'',redirectTo:getReadirectPath(action.payload),isAuth:true,...action.payload}
        case ERROR_MSG:
            return{...state,isAuth:false,msg:action.msg}
        default:
            return state
    }
}

function registerSuccess(data){
    return {type:REGISTER_SUCCESS,payload:data}
}

function errorMsg(msg){//登陆和注册是一个错误
    return {type:ERROR_MSG,msg:msg}
}

export function register({user,pwd,type,repeatpwd}){
    if(!user||!pwd||!type){
        return errorMsg('用户名密码必须输入');
        
    }
    if(pwd!==repeatpwd){
        return errorMsg('两次密码输入不一致');
    }
    return dispatch=>{
        axios.post('/user/register',{user,pwd,type})//传递参数
            .then(res=>{
                if(res.status==200&&res.data.code===0){
                    dispatch(registerSuccess({user,pwd,type}))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}