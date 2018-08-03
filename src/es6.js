// {var name='mike'}
// {let myname='mike'}
// {const a='mike'}
// console.log(name);

// let name='imook';
// let couse='react';
// console.log(
//     `hello ${name} 

//     welcome to ${couse}`);

// var Hello = (name='imook')=>{
//     console.log(`hello ${name}`);
// }
// Hello();

// var myadd = (x=0)=>x*x;

// function sayhello(name1,name2){
//     console.log('Hello,'+name1,name2);
// }
// let namearr=['x','w'];
// sayhello.apply(null,namearr);//aplly方法
// sayhello(...namearr);//展开符

// let obj={name:'1',couse:'2'};
// console.log(object.keys(obj));
// console.log(object.values(obj));
// console.log(object.entyies(obj));

// let name='imooc';
// const obj={};
// obj[name]='4 hours';
// console.log(obj);//这里是想用name作为变量的，
// //因此不能
// const obj={name:'4 hours'};
// //这样是不能获取name里面的imooc的值的

// let name='mook';
// let obj={name,[name]:'4'};//{name: "mook", mook: "4"}
// let obj={name:name,[name]:'4'};//{name: "mook", mook: "4"}

// let obj={
//     name:name,
//     [name]:'4',
//     hello:function{
//         console.log('hello');
//     },
//     hello1(){
//         console.log('hello word');
//     }
// };

// let obj={name:'1',course:'2'};
// let obj1={name:'3',type:'4'};
// console.log({...obj,...obj1,data:'2017'});//name: "3", course: "2", type: "4", data: "2017"

// const arr=['hello','word'];
// //以前
// let arg1=arr[0];
// let arg2=arr[1];
// //现在
// let [arg1,arg2]=arr;
// console.log(arg1,arg2);//hello word

// let obj={name:'1',course:'2'};
// const {name,course}=obj;
// console.log(name,course);//1 2

//类的语法
// class MyApp{
//     constructor(name){
//         this.name=name;
//     }
//     sayHello(){
//         console.log(`hello${this.name}`);
//     }
// }
// let app = new MyApp('华为');
// app.sayHello();//hello华为

// Set,元素不可重合
// Map
// Symbol

//模块化
//module1
//module2


//使用以下这些需要安装插件
//对象扩展符，函数绑定
//装饰器
//Async await

//ES6的其他特性
//Promise
//迭代器和生成器
//代理Proxy


// //怎么遍历一个数组
// // ES5
// //遍历数组
// [1,2,3].forEach(function(value,key){
//     console.log(value);
// });
// //遍历数组
// [1,2,3].map(function(v){
//     console.log(v*2);
// });
// //映射新数组
// arr=[1,2,3].map(a=>v*2);
// //所有元素是否通过测试
// [1,2,3,4,5].every(a=>v*2);
// //是否有元素通过测试
// [1,2,3,4,5].some(a=>v*3);
// //过滤数组
// [1,2,3,4,5].filter(a=>v*2);
// //查找符合条件的元素
// arr=[{name:'dasheng',age:'12'},{name:'rmos',age:'14'}];
// //查找索引
// [1,2,3].indexOf(2);
// //连接数组
// arr1=[1,2,3];
// arr2=[4,5,6];
// [...arr1,...arr2];
// //数组去重
// arr=[1,2,3,2,3,4,5];
// [...new Set(arr)];