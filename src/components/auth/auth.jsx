import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import Const from './../../util/Costanti';
import axios from 'axios';

const Auth = (props) => {
  const [redirect, setRedirect] = useState(false);
  const {ComponentToProtect, enableSpinner, disableSpinner} = props;
  useEffect(() => {
    enableSpinner(true);
    axios.get(Const.CHECK_TOKEN)
    .then(result => {
      if(result.data.code === 200) {
        setRedirect(false);
        disableSpinner(false);
      } else {
        sessionStorage.clear();
        throw new Error(result.data.message);
      }
    })
    .catch(err => {
      setRedirect(true);
      disableSpinner(false);
    })
  },[ComponentToProtect]);
  return (
    <>
    {
      redirect ?
      <Redirect to="/login" />
      :
      <ComponentToProtect
        {...props}
        enableSpinner={enableSpinner}
        disableSpinner={disableSpinner}/>
    }
    </>
  )
}

export default Auth;
