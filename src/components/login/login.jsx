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
      props.enableSpinner();
      axios.post(Const.LOGIN, form)
      .then(res => {
        if (res.data.code === 200) {
          props.disableSpinner();
          props.history.push('/manage');
        } else {
          throw new Error(res.data.message);
        }
      })
      .catch(err => {
        props.disableSpinner();
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
    <>
      <div className="display-grid" align="center">
        <h1>Login</h1>
      </div>
      <div style={{textAlign: 'center', width: '20%', margin: '0% 40% 20% 40%'}}>
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

          <Form.Group controlId="formBasicPassword">
            <Form.Label></Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={e => handleInputChange(e)}
              required
              />
          </Form.Group>
          <Button variant="success" type="submit">
            {'Sign in'}
          </Button>
        </Form>
      </div>
    </>
  )
}

export default Login;
