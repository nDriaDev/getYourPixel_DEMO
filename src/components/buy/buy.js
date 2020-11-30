import React, {useState, useEffect} from 'react';
import { useHistory, useLocation } from 'react-router-dom'
import {loadStripe} from '@stripe/stripe-js';
import Img from './../../images/navBar.png';
import Const from './../../util/Costanti';
import {Form, Col} from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';

const stripePromise = loadStripe(process.env.REACT_APP_PUB_KEY_STRIPE);

const ProductDisplay = ({ product, quantity, handleQuantityChange, handleClick }) => {
  let styleContainer = {height:'80vh',paddingTop:'10%'};
  return (
    <div className="col-lg-4 col-md-12 mb-lg-0 mb-4 mx-auto" style={{styleContainer}}>
      <div className="card-container">
        <div className="card-body">
          <h1 className="mb-4">{product.name}</h1>
          <div className="d-flex justify-content-center mb-4">
            <div className="card-circle d-flex justify-content-center align-items-center">
              {product.images[0] ?
                <img
                  src={product.images[0]}
                  alt="The product"
                  />
                :
                null
               }
            </div>
          </div>
          <h2 className="font-weight-bold my-4">{Const.setDecimalCurrencyNumber(product.price.unit_amount, product.price.currency)}</h2>
          <h5 className="grey-text">{product.description}</h5>
          <div className="qt-plus-minut my-4">
            <button onClick={e=>handleQuantityChange(e)}><i name="minus" className="fa fa-minus" aria-hidden="true"></i></button>
            <input className="qt-input" min="1" name="quantity" value={quantity} type="number" readOnly/>
            <button onClick={e=>handleQuantityChange(e)} ><i name="plus" className="fa fa-plus" aria-hidden="true"></i></button>
          </div>
          <div className="col-xs-12">
            <button className="btn-checkout" onClick={handleClick}>Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const Buy = ({enableSpinner, disableSpinner}) => {
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
      console.log(err);
      disableSpinner();
    })
  },[enableSpinner,disableSpinner])

  const handleQuantityChange = (event) => {
    let qt = quantity;
    if(event.target.className === "fa fa-minus"){
      qt--;
    } else {
      qt++;
    }
    if(qt==0){
      return;
    }else{
      setQuantity(qt);
    }
  }

  const handleClick = async (event) => {
    try {
      enableSpinner();
      const stripe = await stripePromise;
      const response = await axios.post(Const.PAYMENT_CREATE_SESSION, {quantity});
      const result = await stripe.redirectToCheckout({
        sessionId: response.data.id,
      });
      if (result.error) {
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
      }
    } catch (e) {
      console.log(e);
    }
  };

  return(
    <ProductDisplay product={product} quantity={quantity} handleQuantityChange={handleQuantityChange} handleClick={handleClick} />
  )
}




export default Buy;
