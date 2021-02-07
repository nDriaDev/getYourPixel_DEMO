import React from 'react';
import {useHistory} from 'react-router-dom';
import NavbarCustom from './../../navbar/navbar';
import Img from './../../../images/logo.png';
import Const from './../../../util/Costanti.js';

const Header = (props) => {
  const url = window.location.pathname;
  const history = useHistory();

  let widthLogo = '45%';
  if(Const.isMobileBrowser(navigator.userAgent)) {
    widthLogo = '100%';
  }

  return(
    <div className="sticky-top background-fusion">
      <NavbarCustom enableSpinner={props.enableSpinner} disableSpinner={props.disableSpinner} setAuth={props.setAuth} isAuth={props.isAuth} isAuthBasic={props.isAuthBasic}/>
      {
        url === Const.PATH_HOME ?
        <div className="row" style={{width:'98vw', marginLeft: '1%', marginRight: '1%'}}>
          <div className="col-sm-12" style={{textAlign:'center'}}>
            <img className="logo-size" style={{
                width: widthLogo
              }}
              alt="logo" src={Img}
            />
            <h2 className="slogan-h2" style={{fontSize:'x-large'}}>Raggiungi l'irraggiungibile</h2>
            <button
              id="btn-buy"
              className="button-fixed"
              onClick={()=>history.push('/buy')}>
              <span style={{fontSize:'small', textAlign:'center'}}>
                ACQUISTA
              </span>
            </button>
          </div>
        </div>
        :
        null
      }
    </div>
  )
}

export default Header;
