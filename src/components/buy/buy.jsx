import React, {useState, useEffect} from 'react';
import { useHistory, useLocation } from 'react-router-dom'
import {loadStripe} from '@stripe/stripe-js';
import Const from './../../util/Costanti';
import { toast } from 'react-toastify';
import axios from 'axios';
import TrackingGA from './../utils/Tracking';


const stripePromise = loadStripe(process.env.REACT_APP_PUB_KEY_STRIPE);

const ProductDisplay = React.memo(({ product, quantity, handleQuantityChange, handleClick }) => {
  return (
    <div style={{
        width: '92vw',
        marginLeft: '4%',
        marginRight: '4%',
      }} align="center">
      <div id="griglia" style={{
          maxHeight:'100%',
          maxWidth:'480px',
          border:'2px solid #FFFFFF',
          borderRadius:'5%',
          overflowY:'auto'}}>
        <div className="mx-auto" style={{backgroundColor: 'white'}}>
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
            <input className="qt-input" style={{fontSize: '1.8rem'}} min="1" name="quantity" value={quantity} type="number" readOnly/>
            <button onClick={e=>handleQuantityChange(e)} ><i name="plus" className="fa fa-plus" aria-hidden="true" style={{fontSize: '1.0rem'}}></i></button>
          </div>
          <div className="col-xs-12">
            <button className="btn-success btn-checkout" onClick={handleClick}>Acquista</button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
})

const Buy = React.memo(({enableSpinner, disableSpinner}) => {
  const [quantity, setQuantity] = useState(1);
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
    if(qt===0){
      return;
    }else{
      setQuantity(qt);
    }
  }

  const handleClick = async (event) => {
    try {
      enableSpinner();
      TrackingGA.event("Client", "reindirizzamento alla pagina di checkout", "click sul pulsante checkout all'interno della pagina di acquisto")
      const stripe = await stripePromise;
      const response = await axios.post(Const.PAYMENT_CREATE_SESSION, {quantity});
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
        toast.success("Grazie per il tuo acquisto!", {
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

  return(
    product.description !== '' && <ProductDisplay product={product} quantity={quantity} handleQuantityChange={handleQuantityChange} handleClick={handleClick} />
  )
})




export default Buy;
