import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useHistory, useLocation } from 'react-router-dom'
import {loadStripe} from '@stripe/stripe-js';
import Const from './../../util/Costanti';
import { toast } from 'react-toastify';
import axios from 'axios';
import TrackingGA from './../utils/Tracking';

const stripePromise = loadStripe(process.env.REACT_APP_PUB_KEY_STRIPE);

const ProductDisplay = React.memo(({ buttonDisabled, product, quantity, handleQuantityChange, handleManualQuantityChange, handleClick, PayPalButton, createOrder, onApprove, onError, onCancel }) => {
  return (
    <div style={{
        width: '92vw',
        marginLeft: '4%',
        marginRight: '4%',
      }} align="center">
      <div id="griglia" style={{
        backgroundColor: 'white',
        height:'75vh',
        maxWidth:'480px',
        border:'2px solid #FFFFFF',
        borderRadius:'5%',
        overflowY:'auto'}}>
        <div className="mx-auto">
        <div className="card-body">
          <h1 className="mb-2" style={{fontSize:'2.7rem'}}>{product.name}</h1>
          <div className="d-flex justify-content-center mb-2">
            <div className="card-circle d-flex justify-content-center align-items-center">
              {product.images[0] ?
                <img
                  src={product.images[0]}
                  alt="The product"
                  style={{width: '60%'}}
                  />
                :
                null
              }
            </div>
          </div>
          <h2 className="font-weight-bold my-2">{Const.setDecimalCurrencyNumber(product.price.unit_amount * quantity, product.price.currency)}</h2>
          <h5 className="grey-text" style={{fontSize: '.95rem'}}>{product.description}</h5>
          <div className="qt-plus-minut my-2">
            <button onClick={e=>handleQuantityChange(e)}><i name="minus" className="fa fa-minus" aria-hidden="true" style={{fontSize: '0.9rem'}}></i></button>
              <input className="qt-input" style={{ fontSize: '1.8rem' }} name="quantity" value={quantity} type="text" onChange={handleManualQuantityChange}/>
            <button onClick={e=>handleQuantityChange(e)} ><i name="plus" className="fa fa-plus" aria-hidden="true" style={{fontSize: '1.0rem'}}></i></button>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <button 
                  className="btn-success btn-checkout"
                  onClick={handleClick}
                  disabled={buttonDisabled}
                  style={{opacity: buttonDisabled ? '0.33' : '1', pointerEvents: buttonDisabled ? 'none' : 'auto' }}
                >Carta/Bonifico</button>
              </div>
            <div className="col-sm-6" style={{ opacity: buttonDisabled ? '0.33' : '1', pointerEvents: buttonDisabled ? 'none' : 'auto'  }}>
                <PayPalButton
                  style={{ layout: "horizontal", height: 50, tagline:'false' }}
                  createOrder={(data, actions) => createOrder(data, actions)}
                  onApprove={(data, actions) => onApprove(data, actions)}
                  onError={err => onError(err)}
                  onCancel={(data, actions) => onCancel(data, actions)}
                ></PayPalButton>
              </div>
            </div>
        </div>
      </div>
      </div>
    </div>
  );
})

const Buy = React.memo(({enableSpinner, disableSpinner}) => {

  const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
  const [quantity, setQuantity] = useState(1);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [product, setProduct] = useState({
    images:[],
    name:'',
    description:'',
    price:{
      unit_amount:'',
      currency:'',
    }
  });
  const location = useLocation();
  const history = useHistory();

  const getProduct = ()=>{
    return new Promise((resolve,reject) =>{
      axios.post(Const.GET_PRODUCT).then(resp=>{
        resolve(resp.data);
      }).catch(err => {
        reject(err.message);
      })
    })
  }
  useEffect(()=>{
    enableSpinner();
    let query = new URLSearchParams(location.search);
    if (query.get("success")) {
      query.delete("success");
      history.replace({
        search: query.toString(),
      })
      disableSpinner();
      toast.success(Const.PAYMENT_SUCCESS, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
    else if (query.get("canceled")) {
      query.delete("canceled");
      history.replace({
        search: query.toString(),
      })
      disableSpinner();
      toast.error(Const.PAYMENT_FAILED, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
    getProduct().then(result => {
      setProduct(result);
      disableSpinner();
    }).catch(err => {
      disableSpinner();
    })
  },[])

  const handleQuantityChange = (event) => {
    let qt = quantity;
    if(event.target.className === "fa fa-minus"){
      qt--;
    } else {
      qt++;
    }
    if(qt===0 || qt < 0){
      return;
    }else{
      setQuantity(qt);
      setButtonDisabled(false);
    }
  }

  const handleManualQuantityChange = event => {
    if (event.target.value !== '-' && !isNaN(event.target.value)) {
      setQuantity(event.target.value);
    }
    if (event.target.value === "" || event.target.value === "0") {
      setButtonDisabled(true);
    } else {
      if (buttonDisabled) {
        setButtonDisabled(false);
      }
    }
  }

  const handleClick = async (event) => {
    try {
      enableSpinner();
      TrackingGA.event("Client", "reindirizzamento alla pagina di checkout", "click sul pulsante checkout all'interno della pagina di acquisto")
      const stripe = await stripePromise;
      const response = await axios.post('http:localhost:3000'+Const.PAYMENT_CREATE_SESSION, {quantity});
      const result = await stripe.redirectToCheckout({
        sessionId: response.data.id,
      });
      if (result.error) {
        TrackingGA.execption("Acquisto non concluso: " + result.error.message)
        disableSpinner();
        toast.error(result.error.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      } else {
        TrackingGA.event("Client", "pagina di checkout", "acquisto concluso")
        toast.success("Pagamento Completato. Grazie per il tuo acquisto!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (e) {
      TrackingGA.execption("Acquisto non concluso: " + e.message)
      toast.error(e.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };


  const createOrder = (data, actions) => {
    try {
      enableSpinner();
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: Const.setDecimalNumber(product.price.unit_amount * quantity),
            },
            currency_code: 'EUR'
          },
        ],
      });
    } catch (e) {
      console.log(e);
    }

  }

  const onApprove = async (data, actions) => {
    const order = await actions.order.capture();
    TrackingGA.event("Client", "pagina di checkout", "acquisto paypal concluso")
    disableSpinner();
    toast.success("Pagamento Completato. Grazie per il tuo acquisto!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

  };

  const onError = (err) => {
    TrackingGA.execption("Acquisto con Paypal non concluso: " + err.message)
    disableSpinner();
    toast.error(err.message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  }
  
  const onCancel = (data, actions) => {
    TrackingGA.execption("Acquisto con Paypal cancellato")
    disableSpinner();
    toast.success("Ordine cancellato", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  }

  return(
    product.description !== '' && <ProductDisplay buttonDisabled={buttonDisabled} product={product} quantity={quantity} handleQuantityChange={handleQuantityChange} handleManualQuantityChange={handleManualQuantityChange} handleClick={handleClick} PayPalButton={PayPalButton} createOrder={createOrder} onApprove={onApprove} onError={onError} onCancel={onCancel}/>
  )
})




export default Buy;
