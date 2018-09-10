import { bindActionCreators, applyMiddleware } from "C:/Users/lenovo/AppData/Local/Microsoft/TypeScript/2.9/node_modules/redux";

export function createStore(reducer,enhancer){
    if(enhancer){//如果有中间件
        return enhancer(createStore)(reducer)
    }
    let currentState = {}//当前状态
    let currentListeners = []//监听器

    function getState(){
        return currentState;
    }
    function subscribe(listener){//listener用于dispatch出一个action的
        currentListeners.push(listener);
    }
    function dispatch(action){
        currentState = reducer(currentState,action)
        currentListeners.forEach(v=v())
        return action;
    }
    dispatch({type:'@imooc/woniu-Redux'})
    return {getState,subscribe,dispatch}
}

function bindActionCreator(creator,dispatch){
    return (...args) =>dispatch(creators(...args))
}
export function bindActionCreators(creators,dispatch){
    // let bound = {}
    // Object.keys(creators).forEach(v=>{
    //     let creator = creators(v)
    //     bound[v] = bindActionCreator(creator,dispatch)
    // })
    return Object.keys(creators).reduce((ret,item)=>{
        //                               结果 里面的每一个变量
        ret[item] = bindActionCreator(creators[item],dispatch)
        return ret
    },{})
    //初始值
}

export function applyMiddleware(middlewares){//有多个中间件
    return createStore =>(...args)=>{
        const store = createStore(...args)
        let dispatch = store.dispatch

        const midApi = {//中间件的接口
            getState:store.getState,
            dispatch:(...args)=>dispatch(...args),
        }
        //dispatch = middleware(midApi)(store.dispatch)
	//middleware(midApi)(store.dispatch)(action)
	const middlewareChain = middlewares.map(middleware=>middleware(midApi))
	dispatch=compose(...middlewareChain)(store.dispatch)
        return{
            ...store,
            dispatch
        }
    }
}

compose(fn1,fn2,fn3){}
//最终转换fn(fn(fn3()))

export function compose(...funs){
	if(func.length==0){
	  	return arg=>arg
	}
	if(funcs.length==1){
		return funcs[0]
	}
	return funcs.reduce((ret,item)=>(...args)=>ret(item(...args)))
}