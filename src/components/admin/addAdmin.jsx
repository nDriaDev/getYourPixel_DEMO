import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import { toast } from 'react-toastify';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/solid.min.css';
import Const from './../../util/Costanti';
import axios from 'axios';


const AddAdmin = ({spinnerCommand}) => {
  const history = useHistory();
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
    type:'',
  })

  useEffect(()=>{
    spinnerCommand(true);
    return axios.post(Const.GET_ADMIN,{})
    .then(value => {
      if(value) {
        if(value.type === Const.ADMIN_TYPE.BASIC) {
          spinnerCommand(false);
          history.push('/manage');
        } else {
          spinnerCommand(false);
        }
      } else {
        spinnerCommand(false);
        history.push('/manage');
      }
    }).catch(err => {
      spinnerCommand(false);
      history.push('/manage');
    })
  },[])

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
      spinnerCommand(true);
      axios.post(Const.ADD_ADMIN, form)
      .then(res => {
        if (res.data.code === 200) {
          setForm({
            email: '',
            password: '',
            type:'',
          });
          spinnerCommand(false);
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
      });
    }
  }

  return (
    <div className="mx-auto mb-5" style={{maxWidth:'408px',border:'2px solid #FFFFFF80', borderRadius:'5%'}}>
      <div className="mt-2" align="center">
        <h1 style={{color:'#28a745'}}>Aggiungi Admin</h1>
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
          <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label style={{float: 'left', color:'white'}}>Ruolo</Form.Label>
            <Form.Control
              as="select"
              custom
              name="type"
              value={form.type}
              onChange={e => handleInputChange(e)}
              required>
              <option></option>
              <option>Admin</option>
              <option>Basic</option>
            </Form.Control>
          </Form.Group>
          <Button variant="success" type="submit">
            <i className="fas fa-hands-helping" style={{paddingRight:'4%'}}></i>
            {'Aggiungi'}
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default AddAdmin;
