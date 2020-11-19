import React, {Component} from 'react';
import Img from './../../images/logo.png';

class Logo extends Component{
  render(){
    return(
      <div className="display-grid background-fusion" align="center">
        <img src={Img} alt="Logo" className="logo-size"></img>
        <h2 className="slogan">Take your internet space.</h2>
      </div>
    )
  }
}

export default Logo;
