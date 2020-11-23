import React from 'react';
import Img from './../../images/dot.png';

const ErrorPage = (props) =>{
  return(
    <div className="display-error " align="center">
      <div className="container-form">
        <span className="error-page-font"> 404 Page not found <img class="blink-image" src={Img}/></span>
      </div>
    </div>
  )
}

export default ErrorPage;
