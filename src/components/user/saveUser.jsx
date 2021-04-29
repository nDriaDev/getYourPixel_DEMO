import React, {useState, useEffect} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {Form, Button, Col, Row} from 'react-bootstrap';
import { toast } from 'react-toastify';
import Const from './../../util/Costanti';
import axios from 'axios';
import TrackingGA from './../utils/Tracking';


const SaveUser = (props) => {
  const history = useHistory();
  const location = useLocation();

  const [validated, setValidated] = useState(false);
  const [showPromo, setShowPromo] = useState(false);
  const [form, setForm] = useState({
    username:'',
    email: '',
    password: '',
    promoCode: '',
  })

  const {enableSpinner, disableSpinner} = props;

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    if (queryParams.has('ref')) {
      setForm({
        ...form,
        promoCode: queryParams.get('ref')
      })
      setShowPromo(true);
      queryParams.delete('ref')
      history.replace({
        search: queryParams.toString(),
      })
    }

    disableSpinner();
  },[])

  const setPromo = () => {
    setShowPromo(true);
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
      axios.post(Const.SAVE_USER, form)
      .then(res => {
        if (res.data.code === 200) {
          if (form.promoCode !== '') {
            TrackingGA.event("User", "registrazione", "registrazione REFERREAL riuscita")
          } else {
            TrackingGA.event("User", "registrazione", "registrazione riuscita")
          }

          setForm({
            username:'',
            email: '',
            password: '',
            promoCode: '',
          });

          history.push({
            pathname: Const.PATH_REGISTRATION_SUCCESS,
            state: { authorized: true }
          })
        } else {
          throw new Error(res.data.message);
        }
      })
      .catch(err => {
        TrackingGA.execption("registrazione non riuscita " + err.message);
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
    <div className="mx-auto mb-5" style={{maxWidth:'408px',maxHeight:'466px',border:'2px solid #FFFFFF80', borderRadius:'5%'}}>
      <div className="mt-2" align="center">
        <h1 style={{color:'#28a745'}}>Registrati</h1>
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
          <Form.Group controlId="formBasicForgotPassword" style={{ textAlign: 'left', marginBottom: '0px' }}>
            <Form.Label className="label-underline-link" onClick={setPromo}>Ho un codice referreal</Form.Label>
          </Form.Group>
          {
            showPromo &&
            <Row>
              <Col xs="6">
                <Form.Group controlId="formBasicPromoCode">
                  <Form.Control
                    name="promoCode"
                    type="text"
                    size="sm"
                    placeholder="Inserisci codice referreal"
                    value={form.promoCode}
                    onChange={e => handleInputChange(e)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          }
          <Button variant="success" type="submit">
            {'Invia'}
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default SaveUser;
