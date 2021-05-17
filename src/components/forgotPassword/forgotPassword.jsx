import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import { toast } from 'react-toastify';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/solid.min.css';
import Const from './../../util/Costanti';
import axios from 'axios';
import TrackingGA from './../utils/Tracking';
import { useTranslation } from 'react-i18next';

const ForgotPassword = (props) => {
  const { t } = useTranslation();
  
  const [validated, setValidated] = useState(false);
  const history = useHistory();
  const [form, setForm] = useState({
    email: '',
  })
  const {enableSpinner, disableSpinner} = props;

  useEffect(() => {
    disableSpinner();
  },[enableSpinner,disableSpinner]);

  const goTo = (path) => {
    history.push(path);
  }

  const handleInputChange = event => {
    let {name, value} = event.target;
    setForm({...form, [name]:value});
  }

  const onSubmit = (event) => {
    let formSet = event.currentTarget;
    setValidated(false);
    event.preventDefault();
    event.stopPropagation();
    if (formSet.checkValidity() === false) {
      setValidated(true);
    } else {
      enableSpinner();
      axios.post(Const.RESET_PASSWORD, form)
      .then(res => {
        if(res.data.code === 200) {
          TrackingGA.event("User/Admin","password dimenticata", "reset password riuscito")
          disableSpinner();
          toast.success(res.data.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            onClose:()=>{history.push('/login')}
          });
        } else {
          throw new Error(res.data.message);
        }
      }).catch(err => {
        TrackingGA.execption("reset password non riuscito: " + err.message); 
        disableSpinner();
        toast.error(err.message != null ? err.message : "ERRORE", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      })
    }
  }

  return (
    <div className="mx-auto mb-5" style={{maxWidth:'370px',maxHeight:'260px',border:'2px solid #FFFFFF80', borderRadius:'5%'}}>
      <div className="display-grid mt-3 mb-3 ml-3 mr-3" align="center">
        <h1  style={{color:'#28a745'}}>Reset Password</h1>
      </div>
      <div className="mx-auto" style={{textAlign: 'center', width: '85%'}}>
        <Form noValidate validated={validated} onSubmit={onSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label style={{float: 'left', color:'white'}}>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder=""
              value={form.email}
              onChange={e => handleInputChange(e)}
              required
              />
          </Form.Group>

          <Button variant="success" type="submit">
            <i className="fas fa-sync-alt" style={{paddingRight: '4%'}}></i>
            {'Reset'}
          </Button>
          <Form.Group controlId="formBasicForgotPassword" style={{textAlign:'left'}}>
            <Form.Label className="label-underline-link" onClick={() => goTo("/login")}>{t('forgotPass.goToLogin')}</Form.Label>
          </Form.Group>
        </Form>
      </div>
    </div>
  )
}

export default ForgotPassword;
