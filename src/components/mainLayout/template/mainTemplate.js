import React from 'react';
import Header from './../header/header';
import Footer from './../footer/footer';
import Const from './../../../util/Costanti';

const MainTemplate = ({children, show, enableSpinner, disableSpinner}) => {
  let isShowed = show
  return(
    <div className="display-grid" style={{
        visibility: isShowed ? 'hidden' : 'visible',
        position: isShowed ? 'absolute' : '',
        zIndex: isShowed ? '1' : '2',
        height: window.location.pathname === Const.MANAGE ? '0px' : '100%'
      }}>
      <Header enableSpinner={enableSpinner} disableSpinner={disableSpinner} />
      {children}
      <Footer show={show}/>
    </div>
  )
}

export default MainTemplate;
