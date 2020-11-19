import React , {Component} from 'react';
import Square from './../square/square';
import Logo from './../logo/logo';
import BuyButton from './../buyButton/buyButton';

class Home extends Component{
  render(){
    return(
      <>
        <Logo/>
        <Square/>
        <BuyButton/>
      </>
    )
  }
}

export default Home;
