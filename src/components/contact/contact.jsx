import React, {useState, useEffect} from 'react';
import {Form, Col} from 'react-bootstrap';
import Const from './../../util/Costanti';
import { toast } from 'react-toastify';
import axios from 'axios';
import TrackingGA from './../utils/Tracking';

const Contact = React.memo((props) => {
  const [validated, setValidated] = useState(false);
  const [form,setForm] = useState({
    name: '',
    phoneNumber:'',
    email: '',
    subject: '',
    message: '',
  })

  useEffect(()=>{
    props.disableSpinner();
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
      props.enableSpinner();
      axios.post(Const.SEND_MAIL_PATH, form).then((resp) => {
        TrackingGA.event("User", "pagina di contatto", "eseguito invio email di informazioni ")
        props.disableSpinner();
        toast.success(Const.MAIL_SUCCESS, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }).catch(err => {
        TrackingGA.execption("Invio email di informazioni non eseguito: " + err.message)
        props.disableSpinner();
        toast.error(Const.MAIL_FAILED, {
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

  return(
    <div style={{
        width: '92vw',
        marginLeft: '4%',
        marginRight: '4%',
      }} align="center">
      <div id="griglia" style={{
          maxHeight:'100%',
          maxWidth:'480px',
          border:'2px solid #FFFFFF80',
          borderRadius:'5%',
          overflowY:'auto'}}>
        <div className="mt-2" align="center">
          <h2 style={{fontSize:'2.5rem',color:'#FFFFFF', paddingBottom:'0.7rem'}}>Contattaci</h2>
        </div>
        <div className="mx-auto" style={{textAlign: 'center', width: '85%'}}>
          <Form noValidate validated={validated} onSubmit={onSubmit}>
            <Form.Row>
              <span className="form-title" style={{textAlign: 'center',fontSize: '0.95rem',lineHeight:'1.4',color:'white'}}>
                Per qualsiasi dubbio, problema o informazione, non esitare a contattarci completando il form
                sottostante. Riceverai una risposta da un membro del nostro team entro 24 ore direttamente
                all'indirizzo email da te indicato.
              </span>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <div className="form-input" >
                  <Form.Label style={{float:'left', fontSize:'14px', marginBottom:'0px'}}>
                    Nome *
                  </Form.Label>
                  <Form.Control
                    required
                    name="name"
                    type="text"
                    placeholder=""
                    defaultValue=""
                    className="form-input2 border-input"
                    onChange  ={e => handleInputChange(e)}
                    />
                  <Form.Control.Feedback type="invalid">Inserisci nome</Form.Control.Feedback>
                </div>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom02">
                <div className="form-input" >
                  <Form.Label style={{float:'left', fontSize:'14px', marginBottom:'0px'}}>
                    Email *
                  </Form.Label>
                  <Form.Control
                    required
                    name="email"
                    type="email"
                    placeholder=""
                    defaultValue=""
                    className="form-input2 border-input"
                    onChange  ={e => handleInputChange(e)}
                    />
                  <Form.Control.Feedback type="invalid">Inserisci email</Form.Control.Feedback>
                </div>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <div className="form-input" >
                  <Form.Label style={{ float: 'left', fontSize: '14px', marginBottom: '0px' }}>
                    Numero di telefono *
                  </Form.Label>
                  <Form.Control
                    required
                    name="phoneNumber"
                    type="text"
                    placeholder=""
                    defaultValue=""
                    className="form-input2 border-input"
                    onChange={e => handleInputChange(e)}
                  />
                  <Form.Control.Feedback type="invalid">Inserisci numero di telefono</Form.Control.Feedback>
                </div>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="12" controlId="validationCustom03">
                <div className="form-input" >
                  <Form.Label style={{float:'left', fontSize:'14px', marginBottom:'0px'}}>
                    Oggetto *
                  </Form.Label>
                  <Form.Control
                    required
                    name="subject"
                    type="text"
                    placeholder=""
                    defaultValue=""
                    className="form-input2 border-input"
                    onChange  ={e => handleInputChange(e)}
                    />
                  <Form.Control.Feedback type="invalid">Inserisci Oggetto</Form.Control.Feedback>
                </div>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="12" controlId="validationCustom04">
                <div className="form-input">
                  <Form.Label style={{float:'left', fontSize:'14px', marginBottom:'0px'}}>
                    Messaggio *
                  </Form.Label>
                  <Form.Control
                    required
                    name="message"
                    as="textarea"
                    rows="6"
                    placeholder=""
                    defaultValue=""
                    className="form-input2 border-input"
                    onChange  ={e => handleInputChange(e)}
                    />
                  <Form.Control.Feedback type="invalid">Inserisci Messaggio</Form.Control.Feedback>
                </div>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Col md="4" className="mx-auto">
                <button type="submit" className="btn-contact btn-success">
                  Invia
                  <i className="fa fa-long-arrow-right m-l-7" aria-hidden="false"></i>
                </button>
              </Col>
            </Form.Row>
          </Form>
        </div>
      </div>
    </div>
    )
})

export default Contact;
