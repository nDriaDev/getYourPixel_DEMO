import React, {Component} from 'react';
import Logo from './../../../images/logo.png';
import Navbar from './../../navbar/navbar';

class Header extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <>
      <Navbar/>
      <div className="display-grid background-fusion" align="center">
        <img src={Logo} alt="Logo" className="logo-size"></img>
        <h2 className="slogan">Take your internet space</h2>
      </div>
    </>
    )
  }
}

export default Header;
