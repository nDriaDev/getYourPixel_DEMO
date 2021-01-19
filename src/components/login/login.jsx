import React, {useState, useEffect} from 'react';
import {Form, Button} from 'react-bootstrap';
import { toast } from 'react-toastify';
import Const from './../../util/Costanti';
import axios from 'axios';

const Login = (props) => {
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const {enableSpinner, disableSpinner} = props;

  useEffect(() => {
    axios.get(Const.CHECK_TOKEN)
    .then(result => {
      if(result.data.code === 200) {
        props.history.push('/manage');
        disableSpinner();
      } else {
        disableSpinner();
      }
    })
    .catch(err => {
      disableSpinner();
    })
  },[]);

  const handleInputChange = event => {
    let {name, value} = event.target;
    setForm({...form, [name]:value});
  }

  const goTo = (path) => {
    props.history.push(path);
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
      axios.post(Const.LOGIN, form)
      .then(res => {
        if (res.data.code === 200) {
          sessionStorage.setItem('isAuth', true)
          disableSpinner();
          props.history.push('/manage');
        } else {
          throw new Error(res.data.message);
        }
      })
      .catch(err => {
        disableSpinner();
        toast.error(err.message != null ? err.message : "ERRORE", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      });
    }
  }

  return (
    <div className="mx-auto mb-5" style={{maxWidth:'408px',maxHeight:'334px',border:'2px solid #FFFFFF80', borderRadius:'5%'}}>
      <div className="display-grid mt-2 mb-3" align="center">
        <h1>Login</h1>
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

          <Form.Group controlId="formBasicPassword">
            <Form.Label style={{float: 'left', color:'white'}}>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder=""
              value={form.password}
              onChange={e => handleInputChange(e)}
              required
              />
          </Form.Group>
          <Form.Group controlId="formBasicForgotPassword" style={{textAlign:'left'}}>
            <Form.Label className="label-underline-link" onClick={()=> goTo("/forgotPassword")}>Password dimenticata</Form.Label>
          </Form.Group>
          <Button variant="success" type="submit">
            {'Sign in'}
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default Login;
