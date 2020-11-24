import React from 'react';
import Header from './../header/header';
import Footer from './../footer/footer';

const MainTemplate = (props) => {
  let isShowed = props.isHome && props.show;
  return(
    <div className="display-grid" style={{
        visibility: isShowed ? 'hidden' : 'visible',
        position: isShowed ? 'absolute' : '',
        zIndex: isShowed ? '1' : '2'
      }}>
      <Header/>
      {props.children}
      <Footer/>
    </div>
  )
}

export default MainTemplate;
