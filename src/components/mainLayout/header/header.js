import React, {Component} from 'react';
import NavbarCustom from './../../navbar/navbar';
import Logo from './../../logo/logo';
import BuyButton from './../../buyButton/buyButton';
import Const from './../../../util/Costanti.js';

class Header extends Component{
  render(){
    let url = window.location.pathname;
    return(
      <div className="sticky-top background-fusion">
        <NavbarCustom logged={this.props.logged} isLogged={this.props.isLogged} enableSpinner={this.props.enableSpinner} disableSpinner={this.props.disableSpinner}/>
          {
            url === Const.PATH_HOME ?
              <div className="display-title">
                <Logo/>
                <BuyButton/>
              </div>
            :
              null
          }
      </div>
    )
  }
}

export default Header;
