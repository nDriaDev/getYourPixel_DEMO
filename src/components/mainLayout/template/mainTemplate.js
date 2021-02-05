import { React, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from './../header/header';
import Footer from './../footer/footer';
import Const from './../../../util/Costanti';
import axios from 'axios';

const MainTemplate = ({children, show, enableSpinner, disableSpinner, setAuth, isAuth, isAuthBasic}) => {
  let isShowed = show
  const history = useHistory();
  useEffect(() => {
    const unlisten = history.listen((location,path) => {
      axios.get(Const.CHECK_TOKEN)
      .then(result => {
        if(result.data.code !== 200) {
          setAuth(false,false);
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
        visibility: isShowed ? 'hidden' : 'visible',
        position: isShowed ? 'absolute' : '',
        zIndex: isShowed ? '1' : '2',
        height: window.location.pathname === Const.MANAGE ? '0px' : '100%'
      }}>
      <Header enableSpinner={enableSpinner} disableSpinner={disableSpinner} setAuth={setAuth} isAuth={isAuth} isAuthBasic={isAuthBasic}/>
      {children}
      <Footer show={show}/>
    </div>
  )
}

export default MainTemplate;
