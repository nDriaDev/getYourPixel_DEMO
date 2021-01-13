import React, {useState} from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import { toast } from 'react-toastify';
import {PixelSpinner} from 'react-epic-spinners';
import Const from './../../util/Costanti';
import axios from 'axios';


const RemovePixel = ({spinnerCommand}) => {
  const [validated, setValidated] = useState(false);
  const [selectSpinner, setSelectSpinner] = useState({enabled:true});
  const [form, setForm] = useState({
    filtro:'',
    target: '',
    valuesList:[],
  })

  const handleInputChange = event => {
    debugger;
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
        axios.post(Const.GET_PIXELS_FILTERED, {'filtro':value})
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
    debugger;
    let formSet = event.currentTarget;
    setValidated(false);
    event.preventDefault();
    event.stopPropagation();
    if (formSet.checkValidity() === false) {
      setValidated(true);
    } else {
      spinnerCommand(true);
      axios.post(Const.REMOVE_PIXEL, {'target': form.target})
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
    <div className="mx-auto mb-5" style={{maxWidth:'512px',border:'2px solid #FFFFFF80', borderRadius:'5%'}}>
      <div className="mt-2" align="center">
        <h1>Remove Pixels</h1>
      </div>
      <div className="mx-auto" style={{textAlign: 'center', width: '85%'}}>
        <Form noValidate validated={validated} onSubmit={onSubmit}>
          <Row style={{marginBottom:'1rem'}}>
            <Col sm="5" style={{paddingLeft:'0'}}>
              <Row style={{
                padding: 'calc(.375rem + 1px) 15px'
              }}>
                <Col sm="12" style={{padding:'0',textAlign: 'left'}}>
                  <Form.Label style={{color:'white'}}>Filtra per</Form.Label>
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
                <option>Email cliente</option>
                <option>Pagina pubblicizzata</option>
                <option>Azienda cliente</option>
              </Form.Control>
            </Col>
            <Col sm="7" style={{padding:'0'}}>
              <Row style={{
                padding: 'calc(.375rem + 1px) 15px'
              }}>
                <Col sm="10" style={{padding:'0',textAlign: 'left'}}>
                  <Form.Label style={{color:'white'}}>
                  {'Seleziona ' + form.filtro}
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
                {form.valuesList.map((item, index) => {
                  return <option key={index}>{item}</option>
                })}
              </Form.Control>
            </Col>
          </Row>
          <Button variant="success" type="submit">
            {'Rimuovi'}
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default RemovePixel;
