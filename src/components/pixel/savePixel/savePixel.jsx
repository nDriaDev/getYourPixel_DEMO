import React, {useState, useEffect} from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import { toast } from 'react-toastify';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/solid.min.css';import Const from './../../../util/Costanti';
import axios from 'axios';


const SavePixel = ({spinnerCommand}) => {
  const [validated, setValidated] = useState(false);
  const [validFile, setValidFile] = useState ('label-border-none');
  const [form, setForm] = useState({
    email: '',
    url:'',
    company:'',
    file: '',
    row: '',
    col: '',
    positionRow: '',
    positionCol: ''
  })
  const [pixelNumber,setPixelNumber] = useState(null);

  useEffect(() => {
    spinnerCommand(true);
    axios.get(Const.COUNT_PIXELS)
    .then(res => {
      if(!res.data.code) {
        setPixelNumber(res.data);
      }
    })
  },[])

  useEffect(() => {
    spinnerCommand(false);
  },[])

  const isFileEmptyOrInvalid = () => {
    if(form.file === '') {
      return true;
    } else if(!['jpg','jpeg','png'].includes(form.file.name.split('.')[1])) {
      return true;
    }
    return false;
  }

  const getBase64 = (file, cb) => {
    if(!file) {
      cb(null);
      setValidFile('label-border-none');
    } else {
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        let fileInfo = {
          name: file.name,
          type: file.type,
          size: Math.round(file.size / 1000) + ' kB',
          base64: reader.result,
        };
        if(['jpg','jpeg','png'].includes(fileInfo.name.split('.')[1])) {
          cb(fileInfo);
        } else {
          cb(null);
        }
      }
    }
  }

  const handleInputChange = event => {
    let {name, value} = event.target;
    if(name === 'file') {
      if(event.target.files.length>0){
        value = event.target.files[0];
      } else {
        value = null;
      }
      getBase64(value, (result) => {
        if(result){
          value = result;
          setValidFile('label-border-none');
          setForm({...form, [name]:{
            name: value.name,
            type: value.type,
            size: value.size,
            base64: value.base64.split('base64,')[1]
          }});
        } else {
          value = '';
          setValidFile('label-border-red');
          setForm({...form, [name]:value});
        }
      })
    } else {
      if(['col','row','positionRow','positionCol'].includes(name) && value !== '' && !value.match(new RegExp(/^[1-9]+$/g))) {
        event.target.value = '';
      } else {
        setForm({...form, [name]:value});
      }
    }
  }

  const onSubmit = (event) => {
    let formSet = event.currentTarget;
    setValidated(false);
    setValidFile('label-border-none');
    event.preventDefault();
    event.stopPropagation();
    if (formSet.checkValidity() === false) {
      if(isFileEmptyOrInvalid()) {
        setValidated(true);
        setValidFile('label-border-red');
      }
    } else if(isFileEmptyOrInvalid()) {
      setValidFile('label-border-red');
    } else {
      spinnerCommand(true);
      axios.post(Const.SAVE_PIXEL, form)
      .then(res => {
        if (res.data.code === 200) {
          formSet[3].value = null;
          setForm({
            email: '',
            url:'',
            company: '',
            file: '',
            row: '',
            col: '',
            positionRow: '',
            positionCol: ''
          });
          setValidFile('label-border-none');
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
        setValidFile('label-border-none');
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
    <>
      { pixelNumber &&
        <div className="mx-auto mb-5" style={{maxWidth:'520px',border:'2px solid #FFFFFF80', borderRadius:'5%'}}>
        <div className="mt-2" align="center">
          <h1 style={{color:'#28a745'}}>Save Client</h1>
        </div>
        <div className="mt-2" align="center">
          <h4 style={{color:'white'}}>Pixels disponibili</h4>
          <h2 style={{color:'white'}}>{pixelNumber}</h2>
        </div>
        <div className="mx-auto" style={{textAlign: 'center', width: '85%'}}>
          <Form noValidate validated={validated} onSubmit={onSubmit}>
            <Row>
              <Col sm="6">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label style={{float: 'left', color:'white'}}>Email Cliente *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder=""
                    value={form.email}
                    onChange={e => handleInputChange(e)}
                    required
                    />
                </Form.Group>
              </Col>
              <Col sm="6">
                <Form.Group controlId="formBasicCompany">
                  <Form.Label style={{float: 'left', color:'white'}}>Sito da Pubblicizzare *</Form.Label>
                  <Form.Control
                    type="text"
                    name="url"
                    placeholder=""
                    value={form.url}
                    onChange={e => handleInputChange(e)}
                    required
                    />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm="6">
                <Form.Group controlId="formBasicCompany">
                  <Form.Label style={{float: 'left', color:'white'}}>Azienda Cliente</Form.Label>
                  <Form.Control
                    type="text"
                    name="company"
                    placeholder=""
                    value={form.company}
                    onChange={e => handleInputChange(e)}
                    />
                </Form.Group>
              </Col>
              <Col sm="6" style={{padding:'0'}}>
                <Form.Label column sm="12" style={{textAlign: 'left', color:'white', paddingTop:'0'}}>Immagine *</Form.Label>
                <Col sm="12">
                  <Form.File id="formBasicFile" custom>
                    <Form.File.Input
                      name="file"
                      onChange={e => handleInputChange(e)}
                      />
                    <Form.File.Label className={"position-label " + validFile} data-browse="Carica">{form.file.name }</Form.File.Label>
                  </Form.File>
                </Col>
              </Col>
            </Row>
            <Row style={{marginBottom:'.8rem'}}>
              <Col sm="6" style={{padding:'0'}}>
                <Form.Label column sm="12" style={{textAlign: 'left', color:'white', paddingTop:'0'}}>{'Pixels in verticale *'}</Form.Label>
                <Col sm="8">
                  <Form.Control
                    type="text"
                    name="row"
                    placeholder=""
                    value={form.row}
                    onChange={e => handleInputChange(e)}
                    required
                    />
                </Col>
              </Col>
              <Col sm="6" style={{padding:'0'}}>
                <Form.Label column sm="12" style={{textAlign: 'left', color:'white', paddingTop:'0'}}>{'Pixels in orizzontale *'}</Form.Label>
                <Col sm="8">
                  <Form.Control
                    type="text"
                    name="col"
                    placeholder=""
                    value={form.col}
                    onChange={e => handleInputChange(e)}
                    required
                    />
                </Col>
              </Col>
            </Row>
            <Row style={{marginBottom:'.8rem'}}>
              <Col sm="6" style={{padding:'0'}}>
                <Form.Label column sm="12" style={{textAlign: 'left', color:'white', paddingTop:'0'}}>{'Posizione in griglia: Riga'}</Form.Label>
                <Col sm="8">
                  <Form.Control
                    type="text"
                    name="positionRow"
                    placeholder=""
                    value={form.positionRow}
                    onChange={e => handleInputChange(e)}
                    />
                </Col>
              </Col>
              <Col sm="6" style={{padding:'0'}}>
                <Form.Label column sm="12" style={{textAlign: 'left', color:'white', paddingTop:'0'}}>{'Posizione in griglia: Colonna'}</Form.Label>
                <Col sm="8">
                  <Form.Control
                    type="text"
                    name="positionCol"
                    placeholder=""
                    value={form.positionCol}
                    onChange={e => handleInputChange(e)}
                    />
                </Col>
              </Col>
            </Row>
            <Button variant="success" type="submit">
              <i className="fas fa-user-plus" style={{paddingRight:'4%'}}></i>
              {'Salva'}
            </Button>
          </Form>
        </div>
      </div>
      }
    </>
  )
}

export default SavePixel;
