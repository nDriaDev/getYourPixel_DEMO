import React, {useState, useEffect} from 'react';
import {Form, Col} from 'react-bootstrap';
import Const from './../../util/Costanti';
import { toast } from 'react-toastify';
import axios from 'axios';

const Contact = (props) => {
  const [validated, setValidated] = useState(false);
  const [form,setForm] = useState({
    name: '',
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
    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{paddingBottom:'20%'}}>
      <div className="container-fluid container-v-bar">
          <div className="mx-auto" style={{marginBottom:'4rem!important',maxWidth:'512px',border:'2px solid #FFFFFF80', borderRadius:'5%'}}>
            <div className="mt-2" align="center">
              <h1 style={{color:'#FFFFFF', paddingBottom:'0.7rem'}}>Contattaci</h1>
            </div>
            <div className="mx-auto" style={{textAlign: 'center', width: '85%'}}>
              <Form noValidate validated={validated} onSubmit={onSubmit}>
              <Form.Row>
                <span className="form-title" style={{textAlign: 'center',fontSize: '0.95rem',lineHeight:'1.4',color:'white'}}>
                  Per qualsiasi dubbio, problema o informazione, non esitare a contattarci completando il form
                  sottostante. Riceverai una risposta da un membro del nostro team entro 24 ore direttamente
                  all'indirizzo email da te indicato. Ti invitiamo ad inserire anche il tuo numero di telefono
                  all'interno del messaggio, per poter essere d'aiuto in modo pi&ugrave; semplice e immediato.
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
      </div>
    )
}

export default Contact;
