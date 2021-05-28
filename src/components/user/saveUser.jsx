import React, {useState, useEffect, useCallback} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {Form, Button, Col, Row} from 'react-bootstrap';
import { toast } from 'react-toastify';
import Const from './../../util/Costanti';
import axios from 'axios';
import TrackingGA from './../utils/Tracking';
import { useTranslation } from 'react-i18next';


const SaveUser = (props) => {
  const { t, i18n } = useTranslation();

  const history = useHistory();
  const location = useLocation();

  const [validated, setValidated] = useState(false);
  const [showPromo, setShowPromo] = useState(false);
  const [form, setForm] = useState({
    username:'',
    email: '',
    password: '',
    promoCode: '',
    checkbox: true,
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

  const goToPrivacyPolicy = useCallback(() => {
    history.push("/legal")
  }, [history]);

  const goToTermAndConditions = useCallback(() => {
    history.push("/legal/termsAndConditions")
  }, [history])


  const setPromo = () => {
    setShowPromo(true);
  }

  const handleInputChange = event => {
    let { name, value } = event.target;
    if (name === "checkbox") {
      setForm({ ...form, [name]: event.target.checked });
    } else {
      setForm({...form, [name]:value});
    }
  }

  const onSubmit = (event) => {
    let formSet = event.currentTarget;
    setValidated(false);
    event.preventDefault();
    event.stopPropagation();
    if (formSet.checkValidity() === false) {
      setForm({ ...form, checkbox: false });
      setValidated(true);
    } else {
      enableSpinner();
      const body = JSON.parse(JSON.stringify(form));
      body.lang = i18n.language;
      axios.post(Const.SAVE_USER, body)
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
            checkbox: true
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
        <h1 style={{ color: '#28a745' }}>{t('register.title')}</h1>
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
            <Form.Label className="label-underline-link" onClick={setPromo}>{t('register.promo')}</Form.Label>
          </Form.Group>
          {
            showPromo &&
            <Row>
              <Col xs="8">
                <Form.Group controlId="formBasicPromoCode">
                  <Form.Control
                    name="promoCode"
                    type="text"
                    size="sm"
                    placeholder={t('register.promoPlaceholder')}
                    value={form.promoCode}
                    onChange={e => handleInputChange(e)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          }
          <Row>
            <Col xs="12">
              <Form.Check type="checkbox" id="formBasicCheckBox" style={{textAlign:"left"}}>
                <Form.Check.Input
                  type="checkbox"
                  name="checkbox"
                  onChange={e => handleInputChange(e)}
                  required
                  style={{
                    display: 'block',
                    outline: validated && !form.checkbox ? '1px solid #dc3545' : 'none'
                  }}
                />
                <Form.Check.Label 
                  style={{ display: 'unset', fontSize: '0.7rem', textAlign: 'justify', color: validated && !form.checkbox ? '#dc3545' : 'white' }}
                >
                    {t('accettazionePrivacyCookieTerms1')}
                </Form.Check.Label>
                <Form.Check.Label 
                  style={{ display: 'unset', fontSize: '0.7rem', textAlign: 'justify', color: validated && !form.checkbox ? '#dc3545' : 'white' }}
                  className="label-underline-link" 
                  onClick={goToPrivacyPolicy}
                >
                  {`Privacy Policy`}
                </Form.Check.Label>
                <Form.Check.Label 
                  style={{ display: 'unset', fontSize: '0.7rem', textAlign: 'justify', color: validated && !form.checkbox ? '#dc3545' : 'white' }}
                >
                  {t('accettazionePrivacyCookieTerms2')}
                </Form.Check.Label>
                <Form.Check.Label 
                  style={{ display: 'unset', fontSize: '0.7rem', textAlign: 'justify', color: validated && !form.checkbox ? '#dc3545' : 'white' }}
                  className="label-underline-link" 
                  onClick={goToTermAndConditions}
                >
                  {t('accettazionePrivacyCookieTerms3') + '.'}
                </Form.Check.Label>
              </Form.Check>
            </Col>
          </Row>
          <Button variant="success" type="submit">
            {t('register.send')}
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default SaveUser;
