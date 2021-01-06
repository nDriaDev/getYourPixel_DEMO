import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import { toast } from 'react-toastify';
import Const from './../../util/Costanti';
import axios from 'axios';


const RemoveUser = ({spinnerCommand}) => {
  const history = useHistory();
  const [form, setForm] = useState({
    email: '',
    usersList: [],
  })

  useEffect(()=>{
    spinnerCommand(true);
    return axios.post(Const.GET_USER,{})
    .then(res => {
      if(res.data) {
        if(res.data.type === Const.USER_TYPE.BASIC) {
          spinnerCommand(false);
          history.push('/manage');
        } else {
          axios.post(Const.GET_USERS, {"type":res.data.type})
          .then(res => {
            setForm({...form,["usersList"]: res.data});
            spinnerCommand(false);
          })
          .catch(err => {
            toast.error(err.message != null ? err.message : "ERRORE", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              onClose:()=>{history.push('/manage')}
            });
          })
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
    event.preventDefault();
    event.stopPropagation();
    spinnerCommand(true);
    axios.post(Const.DELETE_USER, {"email": form.email})
    .then(res => {
      if (res.data.code === 200) {
        setForm({...form,
          ["email"]: ''
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

  return (
    <div className="mx-auto mb-5" style={{maxWidth:'408px',maxHeight:'356px',border:'2px solid #FFFFFF80', borderRadius:'5%'}}>
      <div className="mt-2" align="center">
        <h1>Delete User</h1>
      </div>
      <div className="mx-auto" style={{textAlign: 'center', width: '85%'}}>
        <Form noValidate onSubmit={onSubmit}>
          <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label style={{float: 'left', color:'white'}}>Email</Form.Label>
            <Form.Control
              as="select"
              custom
              name="email"
              value={form.email}
              onChange={e => handleInputChange(e)}
              required>
              <option></option>
              {form.usersList.map((item, index) => {
                return <option key={index}>{item.email + " - " + item.type}</option>
              })}
            </Form.Control>
          </Form.Group>
          <Button variant="success" type="submit">
            {'Rimuovi'}
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default RemoveUser;
