import React, {useEffect} from 'react';
import Img from './../../images/dot.png';

const ErrorPage = ({enableSpinner, disableSpinner}) =>{
  useEffect(()=>{
    disableSpinner();
  },[disableSpinner])
  let styleContainer = {
    marginTop: '12%',
  }
  return(
    <div className="display-error" align="center">
      <div className="container-form" style={styleContainer}>
        <span className="error-page-font"> 404 Page not found <img className="blink-image" alt="404 page not found" src={Img}/></span>
      </div>
    </div>
  )
}

export default ErrorPage;
