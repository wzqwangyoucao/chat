import React from 'react'
import { NavBar } from 'antd-mobile';
import PropTypes from 'prop-types'
//上下文

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div>
                <p>侧边栏</p>
                <NavBar></NavBar>
            </div>
        );
    }
}
export default Sidebar;

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    static contextTypes = {
        user:PropTypes.string
    }
    render() {
        return (
            // 定义了con
            <div>导航栏{this.context.user}</div>
        );
    }
}

export default Navbar;


class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = { user:'蜗牛' };
    }
    static ChildContextTypes = {
        user:props.string
    }
    getChildContext(){//设置context数据   子元素想获取context时 就会从这个地方获取它
        return this.state
    }
    render() {
        return (
            <div>
                <p>我是{this.state.user}</p>
                <Sidebar></Sidebar>
            </div>
        );
    }
}

export default Page;