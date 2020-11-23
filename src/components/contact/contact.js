import React, {useState} from 'react';
import {Form, Col, Button} from 'react-bootstrap';

const Contact = (props) => {
  const [validated, setValidated] = useState(false);

  const onSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  }

  return(
    <>
      <div className="display-grid " align="center">
        <div className="">
          <div className="container-form">
            <Form noValidate validated={validated} onSubmit={onSubmit}>
              <Form.Row>
                <span className="form-title">
                  Contattaci
                </span>
                <span className="form-title" style={{textAlign: 'center',fontSize: '16px',lineHeight:'1.4'}}>
                  Per qualsiasi dubbio, problema o informazione, non esitare a contattarci completando il form
                  sottostante. Riceverai una risposta da un membro del nostro team entro 24 ore.
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
                      type="text"
                      placeholder=""
                      defaultValue=""
                      className="form-input2 border-input"
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
                      type="email"
                      placeholder=""
                      defaultValue=""
                      className="form-input2 border-input"
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
                      type="text"
                      placeholder=""
                      defaultValue=""
                      className="form-input2 border-input"
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
                      as="textarea"
                      rows="6"
                      placeholder=""
                      defaultValue=""
                      className="form-input2 border-input"
                      />
                    <Form.Control.Feedback type="invalid">Inserisci Messaggio</Form.Control.Feedback>
                  </div>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Col md="4" className="mx-auto">
                  <Button type="submit" className="btn-contact">
                    Invia
                    <i className="fa fa-long-arrow-right m-l-7" aria-hidden="true"></i>
                  </Button>
                </Col>
              </Form.Row>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact;
