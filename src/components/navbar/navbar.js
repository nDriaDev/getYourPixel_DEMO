import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import Img from './../../images/navBar.png';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/solid.min.css';
import Const from './../../util/Costanti.js';
import axios from 'axios';

class NavbarCustom extends Component{
  constructor(props){
    super(props);
    let pathname = window.location.pathname;
    pathname = pathname === Const.PATH_ERROR ? 'error' : (pathname === '/' ? '' : (pathname === Const.PATH_BUY ? 'buy' : (pathname === Const.PATH_CONTACT ? 'contact' : (pathname === Const.PATH_HOW_WORK ? 'howWork':(pathname === '/login' ? 'login':(pathname === '/register' ? 'register':(pathname === '/win'? 'win': 'error')))))));
    this.state = {
      origin: window.location.origin,
      active: pathname === 'error' ? 0 : (pathname === '' ? 1 : (pathname === 'buy' ? 2 : (pathname === 'contact' ? 3 : (pathname === 'howWork' ? 4 : (pathname === 'win' ? 5 : (pathname === 'login' ? 6 : 7)))))),
    }
    this.changeActive = this.changeActive.bind(this);
    this.logout = this.logout.bind(this);
    this.changeActiveAndHistoryPush = this.changeActiveAndHistoryPush.bind(this);
  }

  logout(event){
    event.preventDefault();
    event.stopPropagation();
    this.props.enableSpinner();
    axios.get(Const.LOGOUT)
    .then(result => {
      if (result.data.code === 200) {
        // sessionStorage.clear();
        this.props.setAuth(false,false);
        this.props.disableSpinner();
        this.changeActive(6)
        this.props.history.push('/login');
      } else {
        throw new Error(result.data.message);
      }
    })
    .catch(err => {
      // sessionStorage.clear();
      this.props.setAuth(false,false)
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
      this.changeActive(6)
      this.props.history.push('/login');
    })
  }

  admin(event){
    event.preventDefault();
    event.stopPropagation();
    this.changeActive(0)
    this.props.history.push('/manage');
  }

  registrati(event){
    event.preventDefault();
    event.stopPropagation();
    this.changeActive(7)
    this.props.history.push('/register');
  }

  login(event){
    event.preventDefault();
    event.stopPropagation();
    this.changeActive(6)
    this.props.history.push('/login');
  }


  changeActive(menu){
    this.setState({
      active: menu
    })
  }

  changeActiveAndHistoryPush(event ,menu, path) {
    event.preventDefault();
    event.stopPropagation();
    this.changeActive(menu);
    this.props.history.push(path);
  }

  render(){
    return(
      <nav className="navbar navbar-expand-lg navbar-dark primary-color">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav"
          aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <span className="navbar-toggler" type="button" data-toggle="collapse" data-target=""
          aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle Win"
          onClick={(e)=>this.changeActiveAndHistoryPush(e,5,'/win')} style={{border:'none',paddingLeft:'0',paddingRight:'0'}}>
          <menu>
            <a
              className="nav-link nav-bar-link"
              href=""
              onClick={(e)=>this.changeActiveAndHistoryPush(e,5,'/win')}>
              <i className="fas fa-money-bill-alt" style={{paddingTop: '3%'}}></i>
              &nbsp;Vinci 500'000€
            </a>
          </menu>
        </span>
        <a className="navbar-brand" style={{marginRight:'0'}} href="" onClick={(e)=>this.changeActiveAndHistoryPush(e,1, '/')}>
          <img src={Img} alt="Logo" className="logo-size-header"></img>
        </a>
        <div className="collapse navbar-collapse" id="basicExampleNav">
          <ul id="ulNavSx" className="navbar-nav mr-auto">
            <li className={"nav-item " + (this.state.active === 1 ? 'active-nav-bar' : '')}>
              <a
                className="nav-link nav-bar-link"
                href=""
                onClick={(e)=>this.changeActiveAndHistoryPush(e,1,'/')}>
                <i className="fas fa-home" style={{paddingTop: '5%'}}></i>
                &nbsp;Home
              </a>
            </li>
            <li className={"nav-item " + (this.state.active === 2 ? 'active-nav-bar' : '')}>
              <a
                className="nav-link nav-bar-link"
                href=""
                onClick={(e)=>this.changeActiveAndHistoryPush(e,2,'/buy')}>
                <i className="fas fa-shopping-bag" style={{paddingTop: '5%'}}></i>
                &nbsp;Acquista
              </a>
            </li>
            <li className={"nav-item " + (this.state.active === 3 ? 'active-nav-bar' : '')}>
              <a
                className="nav-link nav-bar-link"
                href=""
                onClick={(e)=>this.changeActiveAndHistoryPush(e,3,'/contact')}>
                <i className="fas fa-address-card" style={{paddingTop: '5%'}}></i>
                &nbsp;Contattaci
              </a>
            </li>
            <li className={"nav-item " + (this.state.active === 4 ? 'active-nav-bar' : '')}>
              <a
                className="nav-link nav-bar-link"
                href=""
                onClick={(e)=>this.changeActiveAndHistoryPush(e,4,'/howWork')}>
                <i className="fas fa-cog" style={{paddingTop: '5%'}}></i>
                &nbsp;Come funziona
              </a>
            </li>
            {Const.isMobileBrowser(navigator.userAgent) ?
              null
              :
              <li className={"nav-item " + (this.state.active === 5 ? 'active-nav-bar' : '')}>
                <a
                  className="nav-link nav-bar-link"
                  href=""
                  onClick={(e)=>this.changeActiveAndHistoryPush(e,5,'/win')}>
                  <i className="fas fa-money-bill-alt" style={{paddingTop: '3%'}}></i>
                  &nbsp;Vinci 500'000€
                </a>
              </li>
            }
          </ul>
          {this.props.isAuth ?
            <ul id="ulNavDx1" className="navbar-nav ">
              <li className="">
                <a
                  className="nav-link nav-bar-link"
                  href=""
                  onClick={(e)=>this.admin(e)}>
                  <i className="fas fa-user-cog" style={{paddingTop: '5%'}}></i>
                  &nbsp;Admin
                </a>
              </li>
            </ul>
            :
            null
          }
          {!this.props.isAuthBasic && !this.props.isAuth ?
            <ul id="ulNavDx2" className="navbar-nav ">
              <li className={"nav-item " + (this.state.active === 7 ? 'active-nav-bar' : '')}>
                <a
                  className="nav-link nav-bar-link"
                  href=""
                  onClick={(e)=>this.registrati(e)}>
                  <i className="fas fa-plus-square" style={{paddingTop: '5%'}}></i>
                  &nbsp;Registrati
                </a>
              </li>
            </ul>
            :
            null
          }
          {!this.props.isAuthBasic && !this.props.isAuth ?
            <ul id="ulNavDx3" className="navbar-nav ">
              <li className={"nav-item " + (this.state.active === 6 ? 'active-nav-bar' : '')}>
                <a
                  className="nav-link nav-bar-link"
                  href=""
                  onClick={(e)=>this.login(e)}>
                  <i className="fas fa-sign-in-alt" style={{paddingTop: '7%'}}></i>
                  &nbsp;Login
                </a>
              </li>
            </ul>
            :
            null
          }
          {this.props.isAuthBasic || this.props.isAuth ?
            <ul id="ulNavDx4" className="navbar-nav ">
              <li className="">
                <a
                  className="nav-link nav-bar-link"
                  href=""
                  onClick={(e)=>this.logout(e)}>
                  <i className="fas fa-sign-out-alt" style={{paddingTop: '7%'}}></i>
                  &nbsp;Logout
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
