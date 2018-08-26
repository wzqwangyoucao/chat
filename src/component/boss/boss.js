import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import {getUserList} from '../../redux/chatuser.redux'

@connect(
    state=>state.chatuser,
    //传入需要的字段,并且塞入别的属性内
    //第一个参数:你要state里面的什么属性,放到props里面
    //第二个参数,你要什么函数放到props里?会自动dispatch
    {getUserList}
)

class Boss extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            data:[]
         };
    }
    componentDidMount(){
        // axios.get('/user/list?type=genius')
        //     .then(res=>{
        //         if(res.data.code===0){
        //             this.setState({data:res.data.data})                    
        //         }
        //     })
        this.props.getUserList('genius');
    }
    render() {
        const Header = Card.Header;
        const Body = Card.Body;
        return (
            <WingBlank>
                <WhiteSpace></WhiteSpace>
                {this.props.userlist.map(v=>(console.log(v),
                    v.avatar?(<Card key={v._id}>
                        <Header
                        title={v.user}
                        thumb={require(`../img/${v.avatar}.png`)}
                        extra={<span>{v.title}</span>}
                        >
                        </Header>
                        <Body>
                            {v.desc.split('\n').map(v=>{console.log(v),//为什么这里不行啊？？？？？？？？？？？？？？？？？？？？
                                <div key={v}>
                                    {v}
                                </div>
                            })}
                        </Body>
                    </Card>):null
                ))}
            </WingBlank>
        );
    }
}

export default Boss;