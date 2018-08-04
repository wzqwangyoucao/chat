import React from 'react' //imrc   引入react库的文件
import {Button,List} from 'antd-mobile'

// import 'antd-mobile/dist/antd-mobile.css'
//我们的组件都用class语法    React.Component类变为组件
class App extends React.Component {
  render() { //返回的函数 渲染函数
    const boss = "李云龙";

    // return <h2> 独立团,团长BOSS{boss} </h2>//渲染变量，{}作为变量
    return(
      <div>
        <h2> 独立团,团长BOSS{boss} </h2>
        <一营 老大="张大喵"></一营>
        <骑兵营 老大="孙德胜"></骑兵营>
      </div>
    )
    //这是JSX  实际是js代码
  };
}
class 一营 extends React.Component {
  constructor(props){//构造函数
    super(props)//这个在面向对象机制里特别常见，就是你继承父类，自己初始化的时候需要把父类做初始化
    this.state={
      solders:['胡泽','柱子']
    }
    //this.addSolder= this.addSolder.bind(this);//强制把addSolder绑定在当前的class实例之上
  }
  componentWillMount(){
    console.log("组件马上加载");
  }
    addSolder(){
    // addSolder = ()=> {
    console.log('增加士兵');
    this.setState({
      solders:[...this.state.solders,'新兵'+Math.random()]
      //onClick执行 里面是找不到this的 this指向window  解决办法
      //在constructor this.addSolder= this.addSolder.bind(this);
      //onClick使用箭头函数
      //addSolder使用箭头函数
      // 1.  在constructor里面可以绑定，例如：
      // constructor(){
      //   this.xxx = this.xxx.bind(this);
      //  }
      // 2. 在调用的时候可以绑定，例如：
      // onClick= {this.xxx.bind(this)}
      // 3. 在调用的时候，换一种写法， 例如：
      // onClick = { () => this.xxx()}
      })
  }
  render() { //返回的函数 渲染函数
    const boss = "张大喵";
    console.log('我正在加载');
    return (
      <div>
        <h2>  一营,团长BOSS,{this.props.老大} </h2>
        {/* 箭头函数不存在this的引用问题，采用外层的this */}
        {/* <button onClick={()=>this.addSolder()}>新兵入伍</button> */}
        <Button type="primary" onClick={()=>this.addSolder()}>新兵入伍</Button>
        <List renderHeader={() => '士兵列表'}>
          {this.state.solders.map(v=>{//数组做映射
            return <List.Item key={v}>{v}</List.Item>
          })}
        </List>
        {/* <ul>
          {this.state.solders.map(v=>{//数组做映射
            return <li key={v}>{v}</li>//注意 渲染列表 要有KEY 并且不重复
          })}
        </ul> */}
      </div>
    )//渲染变量，{}作为变量
    //这是JSX  实际是js代码
  };
  componentDidMount(){
    console.log('我加载完成了');
  }
  componentWillReceiveProps(nextProps){
    console.log('我快收到父组件的信息了');
  }
  shouldComponentUpdate(){
    console.log('我父亲告诉我的我要不要改啊？');
    return true;
  }
  componentWillUpdate(){
    console.log('我马上要更新了');
  }
  componentDidUpdate(){
    console.log('我已经更新了');
  }
  componentWillUnmount(){
    console.log('我快卸载了');
  }
}

//map语法补充
//js的对象，是键值对，但是只能用字符串用作键，有极大限制
// const data = {};
// const element = document.getElementById('mydiv');
// data[element] = 'metadata';
// console.log(data);//[object HTMLDivElement]: "metadata"
// console.log(data['[object HTMLDivElement]']);


function 骑兵营(props){
  return <h2>骑兵连连长{props.老大}，冲啊</h2>
}
export default App;



// 组件之间传递数据
//使用<组件 数据="值">的形式传递
//props就是属性  组件里用this.props获取值
//如果组建只有render函数,还可以用函数形式写组件

//组件内部state
//JSX本质就是js，所以直接用数组.map渲染列表
//Constuctor设置初始状态，记得执行super(props)
//如State就是一个不可变对象，使用this.state获取


//修改组件状态
//组件事件
//eg:onclick事件
//JSX里面，onClick={this.函数名}来绑定事件
//this引用问题，需要在构造函数里面bind绑定this
//this.setState修改state，记得返回新的state，而不是修改



// Raeact生命周期
//react组件里面有钩子函数，在组件的不同状态执行
// 初始化周期 constructor componentWillMount render componentDidMount componentWillMount
// componentWillReceiveProps() shouldComponentUpdate() componentWillUpdate render componentDidUpdate()
// 组件重新渲染生命周期
// 组件卸载生命周期

//Antd-mobile组件库
//蚂蚁的UI组件库  react  PC  移动的
//npm install antd-mobile@next --save  安装库文件
//引入模块
// import {Button} from 'antd-mobile'
//引入css
// import 'antd-mobile/dist/antd-mobile.css'
//如果我们想要改写样式 npm install babel-plugin-import --save
//在package.json中的babel中
// 进行"plugins":["import", { "libraryName": "antd-mobile", "style": "css" }]粘贴
//删去原本的css引入

//蚂蚁金服出品的UI组件库
//使用最新版本
//使用命令安装
//兼容Web和ReactNative

//经常使用的组件
//Layout布局组件
//表单组建，数据展示组建，选择器等
//操作组件

//使用antd-mobile美化例子
//import {组件} from 'antd-mobile' 然后import css文件
//组件直接使用
//2.0不需要1.0那些高清和SVG的配置，开箱即用