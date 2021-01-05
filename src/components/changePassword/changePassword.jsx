import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import { toast } from 'react-toastify';
import Const from './../../util/Costanti';
import axios from 'axios';


const ChangePassword = ({spinnerCommand}) => {
  const history = useHistory();

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
    setValidated({
      oldPassword: false,
      password: false,
      confirmPassword: false,
    });
    spinnerCommand(true);
    event.preventDefault();
    event.stopPropagation();

    let formSet = event.currentTarget;
    if(form.oldPassword === '') {
      setValidated({
        oldPassword: false,
        password: true,
        confirmPassword: true,
      });
      spinnerCommand(false);
    } else {
      axios.post(Const.VERIFY_PASSWORD, {password:form.oldPassword})
      .then(res => {
        if(res.data.code === 404) {
          spinnerCommand(false);
          toast.error(res.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        } else {
          if(form.password !== form.confirmPassword) {
            setValidated({
              oldPassword: true,
              password: true,
              confirmPassword: false,
            });
            spinnerCommand(false);
          } else {
            axios.post(Const.CHANGE_PASSWORD, form)
            .then(result => {
              if(result.data.code === 200) {
                setValidated({
                  oldPassword: true,
                  password: true,
                  confirmPassword: true,
                });
                spinnerCommand(false);
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
              }
            })
          }
        }
      }).catch(err => {
        setValidated({
          oldPassword: false,
          password: false,
          confirmPassword: false,
        });
        spinnerCommand(false);
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
    <div className="row mx-auto">
      <Form noValidate className="mx-auto mt-5" onSubmit={onSubmit}>
        <Form.Group controlId="formBasicOldPassword">
          <Form.Label>Current Password</Form.Label>
          <Form.Control
            type="password"
            name="oldPassword"
            placeholder=""
            value={form.oldPassword}
            onChange={e => handleInputChange(e)}
            isInvalid={!validated.oldPassword}
            required
            />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>New password</Form.Label>
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
          <Form.Label>Confirm password</Form.Label>
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
        <Button variant="success" type="submit">
          {'Invia'}
        </Button>
      </Form>
    </div>
  )
}

export default ChangePassword;
