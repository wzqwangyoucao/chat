const thunk = ({dispatch,getState})=>next=>action=>{

    //如果是函数执行一下 参数是dispatch和getState
    if(typeof action=='function'){
        return action(dispatch,getState)
    }

    //默认什么都没做
    return next(action)
}
export default thunk