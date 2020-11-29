import React, {Component} from 'react';
import Img from './../../images/navBar.png';
import Const from './../../util/Costanti.js';

class NavbarCustom extends Component{
  constructor(props){
    super(props);
    let pathname = window.location.pathname;
    pathname = pathname === Const.PATH_ERROR ? 'error' : (pathname === '/' ? '' : (pathname === Const.PATH_BUY ? 'buy' : (pathname === Const.PATH_CONTACT ? 'contact' : '')));
    this.state = {
      active: pathname === 'error' ? 0 : (pathname === '' ? 1 : (pathname === 'buy' ? 2 : 3))
    }
    this.changeActive = this.changeActive.bind(this);
  }

  changeActive(menu){
    this.setState({
      active: menu
    })
  }

  render(){
    return(
      <nav className="navbar navbar-expand-lg navbar-dark primary-color">
        <a className="navbar-brand" href="/" onClick={()=>this.changeActive(1)}>
          <img src={Img} alt="Logo" className="logo-size-header"></img>
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav"
          aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="basicExampleNav">
          <ul className="navbar-nav mr-auto">
            <li className={"nav-item " + this.state.active === 1 ? 'active' : ''}>
              <a
                className="nav-link"
                href="/"
                style={{float:'left'}}
                onClick={()=>this.changeActive(1)}>
                Home
              </a>
            </li>
            <li className={"nav-item " + this.state.active === 2 ? 'active' : ''}>
              <a
                className="nav-link"
                href="buy"
                style={{float:'left'}}
                onClick={()=>this.changeActive(2)}>
                Buy
              </a>
            </li>
            <li className={"nav-item " + this.state.active === 3 ? 'active' : ''}>
              <a
                className="nav-link"
                href="contact"
                style={{float:'left'}}
                onClick={()=>this.changeActive(3)}>
                Contact
              </a>
            </li>
            <li className={"nav-item " + this.state.active === 4 ? 'active' : ''}>
              <a
                className="nav-link"
                href="https://www.iubenda.com/privacy-policy/80858552"
                style={{float:'left'}}
                onClick={()=>this.changeActive(4)}>
                Privacy policy
              </a>
            </li>
            <li className={"nav-item " + this.state.active === 5 ? 'active' : ''}>
              <a
                className="nav-link"
                href="https://www.iubenda.com/privacy-policy/80858552/cookie-policy"
                style={{float:'left'}}
                onClick={()=>this.changeActive(5)}>
                Cookie policy
              </a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default NavbarCustom;
