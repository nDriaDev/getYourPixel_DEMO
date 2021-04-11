import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from './../header/header';
import LogoButton from './../../logo/logoButton';
import Footer from './../footer/footer';
import Const from './../../../util/Costanti';
import axios from 'axios';
import TrackingGA from './../../utils/Tracking';

const MainTemplate = React.memo(({children, enableSpinner, disableSpinner, setAuth, isAuth, isAuthBasic}) => {
  const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen((location,action) => {
      TrackingGA.pageView(location.pathname);
      axios.get(Const.CHECK_TOKEN)
      .then(result => {
        if(result.data.code !== 200) {
          setAuth(false,false);
        } else {
          if (result.data.type === 'Client') {
            setAuth(false, true);
          } else {
            setAuth(true, false);
          }
        }
      })
      .catch(err => {
        setAuth(false,false)
      })
    })

    return () => unlisten();
  },[])

  return(
    <div id="core" className="display-grid" style={{
        // visibility: show ? 'hidden' : 'visible',
        // position: show ? 'absolute' : '',
        // zIndex: show ? '1' : '2',
        height: window.location.pathname === Const.MANAGE ? '0px' : '100%'
      }}>
      <Header enableSpinner={enableSpinner} disableSpinner={disableSpinner} setAuth={setAuth} isAuth={isAuth} isAuthBasic={isAuthBasic} pathname={window.location.pathname}/>
        <LogoButton/>
        {children}
      <Footer/>
    </div>
  )
})

export default MainTemplate;
