import React from 'react';
import {useHistory} from 'react-router-dom';

function BuyButton(){
  const history = useHistory();
  return(
    <div className="display-button">
      <button
        id="btn-buy"
        className="button-fixed"
        onClick={()=>history.push('/buy')}>
        ACQUISTA
      </button>
    </div>
  )
}

export default BuyButton;
