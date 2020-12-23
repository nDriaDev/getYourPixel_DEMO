import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import Const from './../../util/Costanti';
import axios from 'axios';

const withAuth = ({enableSpinner, disableSpinner, ComponentToProtect}) => {
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    enableSpinner();
    axios.get(Const.CHECK_TOKEN)
    .then(result => {
      if(result.status === 200) {
        disableSpinner();
      } else {
        throw new Error(result.message);
      }
    })
    .catch(err => {
      disableSpinner();
      setRedirect(true);
    })
  },[enableSpinner,disableSpinner]);
  return (
    <>
    {
      redirect ?
      <Redirect to="/login" />;
      :
      <ComponentToProtect {...props} />;
    }
    </>
  )
}

export default Auth;
