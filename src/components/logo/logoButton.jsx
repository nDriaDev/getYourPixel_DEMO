import React, { useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import {useHistory} from 'react-router-dom';
import Img from './../../images/logo.png';
import Const from './../../util/Costanti.js';
import TrackingGA from './../utils/Tracking';


const LogoButton = () => {
  const history = useHistory();
  const { t } = useTranslation();

  const [loc,setLoc] = useState(window.location.pathname);
  useEffect(() => {
    const unlisten = history.listen((location,action) => {
      if(location.pathname === Const.PATH_HOME) {
        setLoc(location.pathname)
      } else if(location.pathname !== Const.PATH_HOME) {
        setLoc(location.pathname);
      }
    })
    return () => unlisten();
  },[])

  const goToBuy = () => {
    TrackingGA.event("User", "pagina d'acquisto", "indirizzamento alla pagina di acquisto tramite pulsante buy in home page")
    history.push('/buy');
  }

  let widthLogo = {width: '45%'};
  if(Const.isMobileBrowser(navigator.userAgent)) {
    widthLogo.width = '100%';
  }

  return (
    <>
      {
        loc === Const.PATH_HOME ?
        <div className="row" style={{width:'98vw', marginLeft: '1%', marginRight: '1%'}}>
          <div className="col-sm-12" style={{textAlign:'center'}}>
            <img className="logo-size" style={widthLogo} alt="logo" src={Img}/>
              <h2 className="slogan-h2" style={{ fontSize: 'x-large' }}>{ t('logoButton.descrizioneLogo') }</h2>
            <button
              id="btn-buy"
              className="button-fixed"
              onClick={()=> goToBuy()}
            >
              <span style={{fontSize:'small', textAlign:'center'}}>
                {t('logoButton.testoButton')}
              </span>
            </button>
          </div>
        </div>
        :
        null
      }
    </>
  )
}
export default LogoButton;
