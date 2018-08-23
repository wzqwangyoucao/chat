import React from 'react'
import { Grid, List } from 'antd-mobile';
import ListItem from 'antd-mobile/lib/list/ListItem';

class AvatarSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            
         };
    }
    render() {
        const avatarList = 'boy,bull,chick,crab,girl,hedgehog,hippopotamus,koala,koala,lemur,man,pig,whale,woman,zebra'
                            .split(',')
                            .map(v=>({
                                icon:require(`../img/${v}.png`),
                                text:v
                            }))
        const gridHeader = this.state.icon?(<div><span>已选择头像</span><img style={{width:20}} src={this.state.icon} alt=''/></div>):<div>请选择头像</div>;
        
        return (
            <div>
                <List renderHeader={()=>gridHeader}>
                    <Grid data={avatarList} columnNum={5} onClick={elm=>{this.setState(elm);this.props.SelectorAvatar(elm.text)}}/>
                </List>
            </div>
        );
    }
}

export default AvatarSelector;