import React, {useState} from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import { toast } from 'react-toastify';
import {PixelSpinner} from 'react-epic-spinners';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/solid.min.css';
import Const from './../../../util/Costanti';
import axios from 'axios';
import { useTranslation } from 'react-i18next';


const RemoveClient = ({spinnerCommand}) => {
  const { t } = useTranslation();

  const [validated, setValidated] = useState(false);
  const [selectSpinner, setSelectSpinner] = useState({enabled:true});
  const [form, setForm] = useState({
    filtro:'',
    target: '',
    valuesList:[],
  })

  const handleInputChange = event => {
    let {name, value} = event.target;
    if(name === 'filtro') {
      if(value === '') {
          setForm({
            filtro: value,
            target: '',
            valuesList: [],
          })
      } else {
        setSelectSpinner({disabled:true});
        axios.post(Const.GET_CLIENTS_FILTERED, {'filtro':value})
        .then(res => {
          setForm({
            filtro:value,
            target: '',
            valuesList:res.data.valuesList,
          });
          setSelectSpinner({enabled:true});
        })
        .catch(err => {
          setForm({
            filtro:value,
            target: '',
            valuesList:[],
          });
          setSelectSpinner({enabled:true});
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
      setValidated(true);
    } else {
      spinnerCommand(true);
      axios.post(Const.DELETE_CLIENT, {'target': form.target})
      .then(res => {
        if (res.data.code === 200) {
          setForm({
            filtro:'',
            target: '',
            valuesList:[],
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
    <div className="mx-auto mb-5" style={{maxWidth:'640px',border:'2px solid #FFFFFF80', borderRadius:'5%'}}>
      <div className="mt-2" align="center">
        <h1 style={{ color: '#28a745' }}>{t('manage.removeClient.title')}</h1>
      </div>
      <div className="mx-auto" style={{textAlign: 'center', width: '85%'}}>
        <Form noValidate validated={validated} onSubmit={onSubmit}>
          <Row style={{marginBottom:'1rem'}}>
            <Col sm="7" md="4" style={{padding:'0'}}>
              <Row style={{
                padding: 'calc(.375rem + 1px) 15px'
              }}>
                <Col sm="12" style={{padding:'0',textAlign: 'left'}}>
                  <Form.Label style={{ color: 'white' }}>{t('manage.removeClient.filters.filterBy')}</Form.Label>
                </Col>
              </Row>
              <Form.Control
                as="select"
                custom
                name="filtro"
                value={form.filtro}
                onChange={e => handleInputChange(e)}
                required>
                <option></option>
                <option>{t('manage.removeClient.filters.filterEmail')}</option>
                <option>{t('manage.removeClient.filters.filterPage')}</option>
                <option>{t('manage.removeClient.filters.filterCompany')}</option>
              </Form.Control>
            </Col>
            <Col sm="7" md={{span:7,offset:1}} style={{padding:'0'}}>
              <Row style={{
                padding: 'calc(.375rem + 1px) 15px'
              }}>
                <Col sm="10" style={{padding:'0',textAlign: 'left'}}>
                  <Form.Label style={{color:'white'}}>
                    {t('manage.removeClient.filters.select') + ' ' + t(form.filtro)}
                  </Form.Label>
                </Col>
                <Col sm="2">
                  <PixelSpinner
                  size={20}
                  color="#24e959"
                  style={{
                    width:'100%',
                    visibility: selectSpinner.disabled ? 'visible' : 'hidden',
                    zIndex: '3'
                  }}
                  />
                </Col>
              </Row>
              <Form.Control
                as="select"
                custom
                name="target"
                value={form.target}
                onChange={e => handleInputChange(e)}
                {...selectSpinner}
                required>
                <option></option>
                {form && form.valuesList && form.valuesList.map((item, index) => {
                  return <option key={index}>{item}</option>
                })}
              </Form.Control>
            </Col>
          </Row>
          <Button variant="success" type="submit">
            <i className="fas fa-user-times" style={{paddingRight:'4%'}}></i>
            {t('manage.removeClient.button')}
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default RemoveClient;
