import React from 'react';
import NavbarCustom from './../../navbar/navbar';


const Header = React.memo((props) => {

  return(
    <>
      <div className="sticky-top background-fusion">
        <NavbarCustom enableSpinner={props.enableSpinner} disableSpinner={props.disableSpinner} setAuth={props.setAuth} isAuth={props.isAuth} isAuthBasic={props.isAuthBasic}/>
      </div>
    </>
  )
})

export default Header;
