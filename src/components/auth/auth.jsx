import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import Const from './../../util/Costanti';
import axios from 'axios';

const Auth = (props) => {
  const [redirect, setRedirect] = useState(false);
  const {ComponentToProtect, enableSpinner, disableSpinner} = props;
  useEffect(() => {
    enableSpinner();
    axios.get(Const.CHECK_TOKEN)
    .then(result => {
      if(result.data.code === 200) {
        setRedirect(false);
        disableSpinner();
      } else {
        throw new Error(result.data.message);
      }
    })
    .catch(err => {
      console.log("Error", err);
      disableSpinner();
      setRedirect(true);
    })
  },[]);
  return (
    <>
    {
      redirect ?
      <Redirect to="/login" />
      :
      <ComponentToProtect
        enableSpinner={enableSpinner}
        disableSpinner={disableSpinner}/>
    }
    </>
  )
}

export default Auth;
