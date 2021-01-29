import React, {Component} from 'react';
import Img from './../../images/logo.png';

class Logo extends Component{
  render(){
    return(
      <div className="display-logo">
        <img className="logo-size" alt="logo" src={Img}/>
        <h2 className="slogan-h2">Raggiungi l'irraggiungibile</h2>
      </div>
    )
  }
}

export default Logo;
