import React from 'react'
import logoImg from './job.png'
import './logo.css'
class Logo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div className="logo-container">
                <img src={logoImg} alt=""/>
            </div>
        );
    }
}

export default Logo;