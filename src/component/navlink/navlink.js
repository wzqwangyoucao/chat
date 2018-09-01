import React from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

@withRouter
@connect(
    state=>state.chat
)
class NavLinkBar extends React.Component {
    static propTypes = {
        data: PropTypes.array.isRequired
    }
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        const navList = this.props.data.filter(v=>!v.hide)//???????//filter
        console.log(navList)
        const {pathname} = this.props.location
        return (
            <TabBar>
                {navList.map(v=>(
                    <TabBar.Item
                        badge={v.path=='/msg'?this.props.unread:null}
                        key={v.path}
                        title={v.text}
                        icon={{uri:require(`./img/${v.icon}.png`)}}
                        selectedIcon={{uri:require(`./img/${v.icon}-active.png`)}}
                        selected={pathname===v.path}
                        // 当前路径和导航路径是一致的
                        onPress = {()=>{
                            this.props.history.push(v.path)
                        }}
                    >
                    
                    </TabBar.Item>
                ))}
            </TabBar>
        );
    }
}

export default NavLinkBar;