import React, {useState, useEffect} from 'react';
import {Form, Button} from 'react-bootstrap';
import { toast } from 'react-toastify';
import Const from './../../util/Costanti';
import axios from 'axios';

const ForgotPassword = (props) => {
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    email: '',
  })
  const {enableSpinner, disableSpinner} = props;

  useEffect(() => {
    disableSpinner();
  },[enableSpinner,disableSpinner]);

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
        console.log("RES", res);
        if(res.data.code === 200) {
          disableSpinner();
          toast.success(res.data.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            onClose:()=>{props.history.push('/login')}
          });
        } else {
          throw new Error(res.data.message);
        }
      }).catch(err => {
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
    <div className="mx-auto mb-5" style={{maxWidth:'370px',maxHeight:'240px',border:'2px solid #FFFFFF80', borderRadius:'5%'}}>
      <div className="display-grid mt-3 mb-3 ml-3 mr-3" align="center">
        <h1>Reset Password</h1>
      </div>
      <div className="mx-auto" style={{textAlign: 'center', width: '85%'}}>
        <Form noValidate validated={validated} onSubmit={onSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label></Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={form.email}
              onChange={e => handleInputChange(e)}
              required
              />
          </Form.Group>

          <Button variant="success" type="submit">
            {'Invia'}
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default ForgotPassword;
