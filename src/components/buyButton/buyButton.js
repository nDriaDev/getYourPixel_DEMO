import React from 'react';
import {useHistory} from 'react-router-dom';
import TrackingGA from './../utils/Tracking';

function BuyButton(){
  const history = useHistory();
  const goToBuy = () => {
    TrackingGA.event("User", "pagina d'acquisto", "indirizzamento alla pagina di acquisto tramite pulsante buy in home page")
    history.push('/buy');
  }
  return(
    <div className="display-button">
      <button
        id="btn-buy"
        className="button-fixed"
        onClick={()=> goToBuy()}>
        ACQUISTA
      </button>
    </div>
  )
}

export default BuyButton;
