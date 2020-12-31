import React, {Component} from 'react';
import { Route , withRouter} from 'react-router-dom';
import { toast } from 'react-toastify';
import Img from './../../images/navBar.png';
import Const from './../../util/Costanti.js';
import axios from 'axios';

class NavbarCustom extends Component{
  constructor(props){
    super(props);
    let pathname = window.location.pathname;
    pathname = pathname === Const.PATH_ERROR ? 'error' : (pathname === '/' ? '' : (pathname === Const.PATH_BUY ? 'buy' : (pathname === Const.PATH_CONTACT ? 'contact' : '')));
    this.state = {
      active: pathname === 'error' ? 0 : (pathname === '' ? 1 : (pathname === 'buy' ? 2 : 3)),
    }
    this.changeActive = this.changeActive.bind(this);
    this.logout = this.logout.bind(this);
  }
  logout(event){
    event.preventDefault();
    event.stopPropagation();
    this.props.enableSpinner();
    axios.get(Const.LOGOUT)
    .then(result => {
      if (result.data.code === 200) {
        sessionStorage.removeItem('isAuth')
        this.props.disableSpinner();
        this.props.history.push('/login');
      } else {
        throw new Error(result.data.message);
      }
    })
    .catch(err => {
      console.log(err);
      sessionStorage.removeItem('isAuth')
      this.props.disableSpinner();
      toast.error(err.message != null ? err.message : "ERRORE", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    })
  }

  changeActive(menu){
    this.setState({
      active: menu
    })
  }

  render(){
    console.log("LOGGED_STATE", this.state.logged);
    console.log("SESSION_STORAGE", sessionStorage.getItem('isAuth'));
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
                href={Const.PRIVACY_POLICY_LINK}
                style={{float:'left'}}
                onClick={()=>this.changeActive(4)}>
                Privacy
              </a>
            </li>
            <li className={"nav-item " + this.state.active === 5 ? 'active' : ''}>
              <a
                className="nav-link"
                href ={Const.COOKIE_POLICY_LINK}
                style={{float:'left'}}
                onClick={()=>this.changeActive(5)}>
                Cookie
              </a>
            </li>
          </ul>
          {sessionStorage.getItem('isAuth') ?
            <ul className="navbar-nav ">
              <li class="">
                <a
                  className="nav-link"
                  href=""
                  style={{float:'left'}}
                  onClick={(e)=>this.logout(e)}>
                  Logout
                </a>
              </li>
            </ul>
            :
            null
          }
        </div>
      </nav>
    )
  }
}

export default withRouter(NavbarCustom);
