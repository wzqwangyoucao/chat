import React from 'react'
import PropTypes from 'prop-types'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';


class UserCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    static propTypes = {
        userlist: PropTypes.array.isRequired
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
                            {v.desc.split('\n').map(v=>{console.log(v),//
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

export default UserCard;