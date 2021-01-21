import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import { toast } from 'react-toastify';
import Const from './../../util/Costanti';
import axios from 'axios';


const RegisterClient = (props) => {
  const history = useHistory();
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    username:'',
    email: '',
    password: '',
  })

  const {enableSpinner, disableSpinner} = props;


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
      axios.post(Const.REGISTRY_CLIENT, form)
      .then(res => {
        if (res.data.code === 200) {
          setForm({
            username:'',
            email: '',
            password: '',
          });
          disableSpinner();
          toast.success(res.data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        } else {
          throw new Error(res.data.message);
        }
      })
      .catch(err => {
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
      });
    }
  }

  return (
    <div className="mx-auto mb-5" style={{maxWidth:'408px',border:'2px solid #FFFFFF80', borderRadius:'5%'}}>
      <div className="mt-2" align="center">
        <h1 style={{color:'#333'}}>Registrati</h1>
      </div>
      <div className="mx-auto" style={{textAlign: 'center', width: '85%'}}>
        <Form noValidate validated={validated} onSubmit={onSubmit}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label style={{float: 'left', color:'white'}}>Username *</Form.Label>
            <Form.Control
              name="username"
              type="text"
              placeholder=""
              value={form.username}
              onChange={e => handleInputChange(e)}
              required
              />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label style={{float: 'left', color:'white'}}>Email *</Form.Label>
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
            <Form.Label style={{float: 'left', color:'white'}}>Password *</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder=""
              value={form.password}
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

export default RegisterClient;
