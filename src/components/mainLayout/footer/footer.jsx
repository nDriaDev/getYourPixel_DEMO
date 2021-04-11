import React, { useState, useEffect, useCallback } from 'react';
import Const from './../../../util/Costanti.js';
import {useHistory} from 'react-router-dom';

const Footer = React.memo(() => {
  const history = useHistory();

  const [path,setPath] = useState(window.location.pathname);

  useEffect(() => {
    const unlisten = history.listen((location, action) => {
      setPath(location.pathname)
    })
    return () => unlisten();
  },[])

  const goToLegal = useCallback(() => {
    if (!Const.isMobileBrowser(navigator.userAgent)) {
      let idUls = ['ulNavSx', 'ulNavDx1', 'ulNavDx2', 'ulNavDx3', 'ulNavDx4'];
      let trovato = false;
      for (let i in idUls) {
        let children = document.getElementById(idUls[i]).childNodes;
        let array = Array.from(children);
        for (let j in array) {
          if (array[j].classList.contains('active-nav-bar')) {
            array[j].classList.remove('active-nav-bar');
            trovato = true;
            break;
          }
        }
        if (trovato) {
          break;
        }
      }      
    }
    history.push('/legal');
  },[])

  let styleDiv = {
    height: '100%',
    fontSize: '0.65em',
    color: '#FFFFFF80',
    width: '100%'
  }
  let styleCol = {
    height: '100%',
    width: '50%'
  }
  let styleSpan = {
    verticalAlign: 'top'
  }

  const getPositionFooter = useCallback(() => {
    let prv = path.split('/')
    prv[1] = prv[0] === '' && prv[1] !== '' ? '/'+prv[1] : '/';
    if(Const.isMobileBrowser(navigator.userAgent) && (
      ![Const.PATH_HOME, Const.PATH_BUY, Const.PATH_LOGIN, Const.PATH_MANAGE, Const.PATH_REGISTER, Const.PATH_LEGAL + Const.PATH_TERM_AND_CONDITIONS].includes(prv[1]))) {
      return 'unset';
    } else {
      return 'fixed';
    }
  },[path])

  let styleFooter = {
    position: getPositionFooter()
  };

  return (
    <div className="display-grid" style={{minHeight:'20px'}}>
      <div className="bottom-footer" style={styleFooter}>
        <div className="container-fluid footer" style={styleDiv}>
          <div className="div-left" style={styleCol}>
            <span style={styleSpan}>
              Copyright &copy; 2021 Get your pixels. Tutti i diritti sono riservati. Non sono responsabile del contenuto di siti esterni.
              <span style={{color:'#FFFFFF',cursor:'pointer'}} onClick={()=>goToLegal()}>{' LEGAL'}</span>
            </span>
          </div>
          <div className="div-right" style={styleCol} align="right">
            <span id="designedBy" style={styleSpan}>Web designed by <a href={process.env.REACT_APP_BASE_URL + "humans.txt"}>4ndr3w_c0</a></span>
          </div>
        </div>
      </div>
    </div>
  )
})

export default Footer;
