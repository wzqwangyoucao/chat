import axios from 'axios'
import {getRedirectPath} from '../util.js'

// const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';
const AUTH_SECCESS = 'AUTH_SECCESS'
const LOGOUT = 'LOGOUT'

const initState={
    redirectTo:'',//用户跳转的地址
    // isAuth:false,
    msg:'',
    user:'',
    // pwd:'',
    type:''
}

function authSuccess(obj){
    const {pwd,...data} = obj
    return {type:AUTH_SECCESS,payload:data}
}

export function user(state=initState,action){
    switch(action.type){
        case AUTH_SECCESS:
            return{...state,msg:'',redirectTo:getRedirectPath(action.payload),...action.payload}//,pwd:''}
        // case REGISTER_SUCCESS:
        //     return{...state,msg:'',redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload}
            // return{...state,msg:'',redirectTo:getReadirectPath(action.payload),isAuth:true,...action.payload}
        // case LOGIN_SUCCESS:
        //     return{...state,msg:'',redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload}
        case ERROR_MSG:
            return{...state,isAuth:false,msg:action.msg}
        case LOAD_DATA:
            return{...state,...action.payload}
        case LOGOUT:
            return{...initState,redirectTo:'/login'}
        default:
            return state
    }
}

export function logoutSubmit(){
    return {type:LOGOUT}
}

// export function userinfo(){
//      //获取用户信息
//         axios.get('/user/info')//发请求
//         .then(res=>{
//             if(res.status==200){
//                 if(res.data.code==0){

//                 }
//                 else{
//                     // this.props.loadData(res.data.data)
//                     this.props.history.push('/login')
//                 }
//             }
//         })
     
//  // 是否登陆
//  // 现在的url地址 login是不需要跳转的

//  // 用户的type 身份是boss还是牛人
// }

export function loadData(userinfo){
    // console.log(loadData);
    return{type:LOAD_DATA,payload:userinfo}
}

export function updata(data){
    return dispatch=>{
        axios.post('/user/update',data)
        .then(res=>{
            if(res.status==200&&res.data.code===0){
                // console.log(res.data);
                // console.log(res.data.data);
                //规定msg是错误信息 data是真的数据
                dispatch(authSuccess(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}

// function registerSuccess(data){
//     return {type:REGISTER_SUCCESS,payload:data}
// }

// function loginSuccess(data){
//     return {type:LOGIN_SUCCESS,payload:data,}
// }

export function login({user,pwd}){
    if(!user||!pwd){
        return errorMsg('用户名密码必须输入');
    }
    return dispatch=>{
    axios.post('/user/login',{user,pwd})
        .then(res=>{
            if(res.status==200&&res.data.code==0){
                console.log(res.data);
                console.log(res.data.data);
                //规定msg是错误信息 data是真的数据
                // dispatch(loginSuccess(res.data.data))
                dispatch(authSuccess(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
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
                    // dispatch(registerSuccess({user,pwd,type}))
                    dispatch(authSuccess({user,pwd,type}))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}