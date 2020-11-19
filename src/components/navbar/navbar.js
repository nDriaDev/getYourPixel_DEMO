import React, {Component} from 'react';
import Img from './../../images/logo-header.png';

class Navbar extends Component{
  constructor(props){
    super(props);
    let pathname = window.location.pathname;
    pathname = pathname === '/' ? '' : (pathname === '/buy' ? 'buy' : (pathname === '/contact' ? 'contact' : ''));
    this.state = {
      active: pathname === '' ? 1 : (pathname === 'buy' ? 2 : 3)
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
      <ul id="navbar">
        <li>
          <a
            className={this.state.active === 1 ? 'active' : ''}
            href="/" onClick={()=>this.changeActive(1)}>
            <img src={Img} alt="Logo" className="logo-size-header"></img>
          </a>
        </li>
        <li>
          <a
            className={this.state.active === 2 ? 'active' : ''}
            href="buy"
            onClick={()=>this.changeActive(2)}>
              Buy
          </a>
        </li>
        <li>
          <a
            className={this.state.active === 3 ? 'active' : ''}
            href="contact"
            onClick={()=>this.changeActive(3)}>
              Contact
          </a>
        </li>
      </ul>
    )
  }
}

export default Navbar;
