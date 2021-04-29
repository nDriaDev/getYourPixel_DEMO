import React, {useEffect, useState} from 'react';
import {Form} from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/solid.min.css';
import Const from './../../util/Costanti';
import { toast } from 'react-toastify';
import axios from 'axios';


const ChangePasswordModal = ({ setData, showModal}) => {

  const [validated,setValidated] = useState({
    oldPassword: true,
    password: true,
    confirmPassword: true,
  });
  const [form,setForm] = useState({
    oldPassword: '',
    password: '',
    confirmPassword: '',
  })

  useEffect(() => {
    setForm({
      oldPassword: '',
      password: '',
      confirmPassword: '',
    })
  }, [showModal])

  const handleInputChange = event => {
    let {name, value} = event.target;
    setForm({...form, [name]: value});
    setValidated({
      oldPassword: true,
      password: true,
      confirmPassword: true,
    });
  }

  const onSubmit = (event) => {
    let modal = document.getElementsByClassName("modal-main")[0];
    setValidated({
      oldPassword: true,
      password: true,
      confirmPassword: true,
    });
    event.preventDefault();
    event.stopPropagation();
    if (form.oldPassword === '') {
      modal.scrollTop = 0;
      setValidated({
        oldPassword: false,
        password: true,
        confirmPassword: true,
      });
    } else {
      axios.post(Const.VERIFY_PASSWORD, { password: form.oldPassword })
        .then(res => {
          if (res.data.code === 404) {
            modal.scrollTop = 0;
            setValidated({
              oldPassword: false,
              password: false,
              confirmPassword: true,
            });
          }
          else if (res.data.code === 401) {
            throw new Error(res.data.message)
          } else {
            if (form.password !== form.confirmPassword) {
              modal.scrollTop = 0;
              setValidated({
                oldPassword: true,
                password: true,
                confirmPassword: false,
              });
            } else {
              setValidated({
                oldPassword: true,
                password: true,
                confirmPassword: true,
              });
              setData('password', form.password);
            } 
          }
        })
        .catch(err => {
          modal.scrollTop = 0;
          toast.error(err ? err : 'ERRORE', {
            position: "top-center",
            autoClose: 5000,
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
    <div className="" style={{
      }}>
      <div className="mt-2" align="center">
        <h1 style={{color:'#28a745', fontSize:'2em'}}>Cambia Password</h1>
      </div>
      <div className="mx-auto" style={{textAlign: 'center', width: '85%'}}>
        <Form noValidate className="mx-auto mt-3" onSubmit={onSubmit}>
          <Form.Group controlId="formBasicOldPassword">
            <Form.Label style={{float: 'left', color:'white'}}>Password attuale</Form.Label>
            <Form.Control
              type="password"
              name="oldPassword"
              placeholder=""
              value={form.oldPassword}
              onChange={e => handleInputChange(e)}
              isInvalid={!validated.oldPassword}
              required
            />
            <Form.Control.Feedback type="invalid">
              {"La password corrente non e' corretta"}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label style={{float: 'left', color:'white'}}>Nuova password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder=""
              value={form.password}
              onChange={e => handleInputChange(e)}
              isInvalid={!validated.password}
              required
              />
          </Form.Group>
          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label style={{float: 'left', color:'white'}}>Conferma password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder=""
              value={form.confirmPassword}
              onChange={e => handleInputChange(e)}
              isInvalid={!validated.confirmPassword}
              required
              />
              <Form.Control.Feedback type="invalid">
                {'Le password non coincidono'}
              </Form.Control.Feedback>
          </Form.Group>
          <button className="btn btn-success" type="submit" style={{width: 'fit-content'}}>
            <i className="fas fa-lock" style={{paddingRight:'4%'}}></i>
            {'Aggiorna'}
          </button>
        </Form>
      </div>
    </div>
  )
}

export default ChangePasswordModal;
