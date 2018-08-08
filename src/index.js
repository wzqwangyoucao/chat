// //安装redux  npm install redux --save

// //新建store
// import {createStore} from 'redux'
// //通过reducer建立
// //根据老的状态和action，生成新的状态
// function counter(state=0,action){
//     switch(action.type){
//         case '加机关枪':
//         return state+1
//         case '减机关枪':
//         return state-1;
//         default:
//             return 10;
//     }
// }

// const store= createStore(counter);//如何新建一个store   参数是处理状态的函数
// console.log(store);

// const init = store.getState();
// console.log(init);

// function listener(){
//     const current=store.getState();
//     console.log(`现在的机关枪${current}把`)
// }

// store.subscribe(listener)//通过subscribe监听每次修改
// //派发事件 传递action
// store.dispatch({type:'加机关枪'});//通过dispatch修改状态
// console.log(store.getState())

// import {createStore} from 'redux';

// function b(state=0,action){
//     switch(action.type){
//         case '加一':
//         return state+1;
//         case '减一':
//         return state-1;
//         default:
//         return 10;
//     }
// }
// const a=createStore(b);//a是用来存储如何进行状态操作的函数等   里面的传参的函数就是如何进行状态改变的函数
// console.log(a);
// console.log(a.getState());//得到初始化状态


// a.dispatch({type:'加一'});//进行操作状态  派发事件
// a.dispatch({type:'加一'});


// a.subscribe(function(){//状态操作了进行获取   状态改变后执行函数
//     console.log(a.getState());
//     //这里面得到状态值，可以根据状态值，直接进行render函数，渲染组件
// })

// 为什么这两个代码不能交换  不能进行改变  再去监听值？
// 一旦交换就没有效果  为什么
// 还有之前的state不是一个对象吗？里面可以有很多属性
// 这里怎么感觉不是对象的？


// redux如何和react一起使用
// 1、手动链接，老赵怎么管理独立团
// 把store.dispatch放大传递给组件，组建可以修改调用状态
// redux相关内容，移到单独的文件index.redux.js
//subscribe订阅render函数，每次修改重新渲染

import React from 'react'
import {createStore,applyMiddleware,compose} from 'redux'//applyMiddleware处理中间件的
//渲染页面用的
import ReactDom from 'react-dom'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'//专门链接用的


// import {counter,addGUN,removeGUN,addGUNAsync} from './index.redux.js'
import {counter} from './index.redux.js'
//这里并不是我们想要的  因为只有引入了 我们才能使用  组件没有封闭性   即app.js不能引入外部文件
import App from './App'



// const store = createStore(counter);
const store = createStore(counter,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
));

// function render(){

//     ReactDom.render(<App store={store} addGUN={addGUN} removeGUN={removeGUN} addGUNAsync={addGUNAsync}/>,document.getElementById('root'));
// }
// render();


// store.subscribe(render);
ReactDom.render(
    (<Provider store={store}>
        <App/>
    </Provider>)
    ,document.getElementById('root')
);





//更进一步
// 处理异步，调试工具，更优雅的与react结合。因为什么注册，登陆，不是同步进行的，所以需要异步
     //Redux处理异步，redux-thunk插件npm install redux-thunk --save
     //npm install redux-devtools-extension并且开启
     //使用reat-redux优雅连接react和redux
     //可能之前的会进入属性传递的陷阱
//redux只默认同步  异步任务需要react-thunk中间件
     //使用applyMiddlieware开启thunk中间件
     //Action可以返回函数，使用dispatch提交action



//chrome搜索redux安装
// 新建store的时候判断window.devToolExtension
// 使用compose结合thunk和window.devTolllsExsion
// 调试床的redux选项卡，实时看到state

//老赵能力用起来很麻烦，为了方便管理，使用魏和尚负责链接
//npm install react-redux --save
// 忘记subscribe记住reduer，action，dispatch
//React-redux提供Provider和connect两个接口链接

//使用react-redux
//使用装饰器优化connec代码
// Npm run eject弹出个性化配置