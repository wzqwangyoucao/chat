const ADD_GUN='加一';
const REMOVE_GUN='减一';


//reducer
export function counter(state=0,action){
    switch(action.type){
        case ADD_GUN:
        return state+1;
        case REMOVE_GUN:
        return state-1;
        default:
        return 10;
    }
}
//当我按下机关枪哪个开关，产生相应的什么操作

//定义不同的按钮
//action creater
export function addGUN(){
    return {type:ADD_GUN};
}
export function removeGUN(){
    return {type:REMOVE_GUN};
}


//管理的方法

export function addGUNAsync(){
    return dispatch=>{
        setTimeout(() => {
            dispatch(addGUN())//需要提交参数的地方 用dispatch执行一下
        }, 2000);
    }
}