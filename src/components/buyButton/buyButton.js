import React from 'react';
import {useHistory} from 'react-router-dom';

function BuyButton(){
  const history = useHistory();
  return(
    <button
      id="btn-buy"
      className="button-fixed"
      onClick={()=>history.push('/buy')}>
      Buy
    </button>
  )
}

export default BuyButton;
