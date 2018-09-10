import { applyMiddleware } from "C:/Users/lenovo/AppData/Local/Microsoft/TypeScript/2.9/node_modules/redux";
import thunk from "redux-thunk";

const add = (num)=>num+3;
const res = add(2);//5

function add2(x){
    return function(y){
        return x+y+3
    }
}
const add2 = x=>y=>x+y+3;
const res2 = add2(2)(3)//8

const obj = {name:'蜗牛','type':'react'}
console.log(Object.keys(obj))

function sayHello(...args){
    console.log(args)
}
sayHello('hello','React','And','Imooc')

// .compose(//合并使用多个中间件的作用
//     applyMiddleware(thunk),
//     window.devToolsExtension?window.devToolsExtension():f=>f//是否有调试工具
// )

const srore = createStore(counter,applyMiddleware(thunk))