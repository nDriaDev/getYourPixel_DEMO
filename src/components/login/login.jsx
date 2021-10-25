import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import { toast } from 'react-toastify';
import Const from './../../util/Costanti';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/solid.min.css';
import axios from 'axios';
import TrackingGA from './../utils/Tracking';
import { useTranslation } from 'react-i18next';

const Login = React.memo(({ enableSpinner, disableSpinner, setAuth }) => {
  const { t, i18n } = useTranslation();

  const history = useHistory();
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    axios.get(Const.CHECK_TOKEN)
    .then(result => {
      if(result.data.code === 200) {
        history.push('/manage');
        disableSpinner();
      } else {
        disableSpinner();
      }
    })
    .catch(err => {
      disableSpinner();
    })
  },[]);

  const handleInputChange = useCallback(event => {
    let {name, value} = event.target;
    setForm({...form, [name]:value});
  },[form])

  const forgotPasswordRedirect = useCallback(() => {
    history.push("/forgotPassword");
  },[history])

  const onSubmit = (event) => {
    let formSet = event.currentTarget;
    setValidated(false);
    event.preventDefault();
    event.stopPropagation();
    if (formSet.checkValidity() === false) {
      setValidated(true);
    } else {
      enableSpinner();
      axios.post(Const.LOGIN, form)
      .then(res => {
        if (res.data.code === 200) {
          // sessionStorage.setItem('isAuth', true)
          TrackingGA.event("Admin","login","login riuscita")
          setAuth(true, false);
          disableSpinner();
          history.push('/manage');
        } else {
          throw new Error(res.data.message);
        }
      })
      .catch(err => {
        axios.post(Const.LOGIN_USER, form)
        .then(res => {
          if (res.data.code === 200) {
            // sessionStorage.setItem('isAuthBasic', true)
            TrackingGA.event("User","login","login riuscita")
            setAuth(false, true);
            disableSpinner();
            history.push('/');
          } else {
            throw new Error(res.data.message);
          }
        })
        .catch(err => {
          TrackingGA.execption("login non riuscita: " + err.message)
          disableSpinner();
          toast.error(err.message != null ? i18n.language === 'it' ? err.message.split(';')[0]: err.message.split(';')[1] : "ERRORE", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        })
      });
    }
  }

  return (
    <div className="mx-auto mb-5" style={{maxWidth:'408px',maxHeight:'334px',border:'2px solid #FFFFFF80', borderRadius:'5%'}}>
      <div className="display-grid mt-2 mb-3" align="center">
        <h1 style={{color:'#28a745'}}>Login</h1>
      </div>
      <div className="mx-auto" style={{textAlign: 'center', width: '85%'}}>
        <Form noValidate validated={validated} onSubmit={onSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label style={{float: 'left', color:'white'}}>Email/Username</Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder=""
              value={form.email}
              onChange={handleInputChange}
              required
              />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label style={{float: 'left', color:'white'}}>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder=""
              value={form.password}
              onChange={handleInputChange}
              required
              />
          </Form.Group>
          <Form.Group controlId="formBasicForgotPassword" style={{textAlign:'left'}}>
            <Form.Label className="label-underline-link" onClick={forgotPasswordRedirect}>{t('login.forgotPassword')}</Form.Label>
          </Form.Group>
          <Button variant="success" type="submit">
            <i className="fas fa-sign-in-alt" style={{paddingRight: '4%'}}></i>
            {'Login'}
          </Button>
        </Form>
      </div>
    </div>
  )
})

export default Login;
