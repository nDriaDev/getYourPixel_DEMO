import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import Img from './../../images/navBar.png';
import Const from './../../util/Costanti.js';
import axios from 'axios';

class NavbarCustom extends Component{
  constructor(props){
    super(props);
    let pathname = window.location.pathname;
    pathname = pathname === Const.PATH_ERROR ? 'error' : (pathname === '/' ? '' : (pathname === Const.PATH_BUY ? 'buy' : (pathname === Const.PATH_CONTACT ? 'contact' : (pathname === Const.PATH_HOW_WORK ? 'howWork':''))));
    this.state = {
      origin: window.location.origin,
      active: pathname === 'error' ? 0 : (pathname === '' ? 1 : (pathname === 'buy' ? 2 : (pathname === 'contact' ? 3 : 4 ))),
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
      this.props.history.push('/login');
    })
  }

  admin(event){
    event.preventDefault();
    event.stopPropagation();
    this.props.history.push('/manage');
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
        <a className="navbar-brand" href="" onClick={(e)=>this.changeActiveAndHistoryPush(e,1, '/')}>
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
                href=""
                style={{float:'left'}}
                onClick={(e)=>this.changeActiveAndHistoryPush(e,1,'/')}>
                Home
              </a>
            </li>
            <li className={"nav-item " + this.state.active === 2 ? 'active' : ''}>
              <a
                className="nav-link"
                href=""
                style={{float:'left'}}
                onClick={(e)=>this.changeActiveAndHistoryPush(e,2,'/buy')}>
                Buy
              </a>
            </li>
            <li className={"nav-item " + this.state.active === 3 ? 'active' : ''}>
              <a
                className="nav-link"
                href=""
                style={{float:'left'}}
                onClick={(e)=>this.changeActiveAndHistoryPush(e,3,'/contact')}>
                Contact
              </a>
            </li>
            <li className={"nav-item " + this.state.active === 4 ? 'active' : ''}>
              <a
                className="nav-link"
                href=""
                style={{float:'left'}}
                onClick={(e)=>this.changeActiveAndHistoryPush(e,4,'/howWork')}>
                How Work
              </a>
            </li>
          </ul>
          {sessionStorage.getItem('isAuth') ?
            <ul className="navbar-nav ">
              <li className="">
                <a
                  className="nav-link"
                  href=""
                  style={{float:'left'}}
                  onClick={(e)=>this.admin(e)}>
                  Admin
                </a>
              </li>
            </ul>
            :
            null
          }
          {sessionStorage.getItem('isAuth') ?
            <ul className="navbar-nav ">
              <li className="">
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
