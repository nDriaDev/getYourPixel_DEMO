import React, {useState, useEffect} from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import { toast } from 'react-toastify';
import {PixelSpinner} from 'react-epic-spinners';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/solid.min.css';
import Const from './../../../util/Costanti';
import axios from 'axios';


const EditClient = ({spinnerCommand}) => {
  const [validated, setValidated] = useState(false);
  const [selectSpinner, setSelectSpinner] = useState([{enabled:true},{enabled:true}]);
  const [form, setForm] = useState({
    filtro:'',
    target: '',
    valuesList:[],
    showForm: false,
    id:'',
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
  const [validFile, setValidFile] = useState ('label-border-none');

  useEffect(() => {
    // spinnerCommand(true);
    axios.get(Const.COUNT_PIXELS)
    .then(res => {
      if(!res.data.code) {
        setPixelNumber(res.data);
      }
    })
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
    if(name === 'filtro') {
      if(value === '') {
          setForm({
            filtro: value,
            target: '',
            valuesList: [],
            showForm: false,
            id:'',
            email: '',
            url:'',
            company:'',
            file: '',
            row: '',
            col: '',
            positionRow: '',
            positionCol: ''
          })
      } else {
        setSelectSpinner({...selectSpinner,[0]:{disabled:true}});
        axios.post(Const.GET_CLIENTS_FILTERED, {'filtro':value})
        .then(res => {
          setForm({
            filtro:value,
            target: '',
            valuesList:res.data.valuesList,
            showForm: false,
            id:'',
            email: '',
            url:'',
            company:'',
            file: '',
            row: '',
            col: '',
          });
          setSelectSpinner({...selectSpinner,[0]:{enabled:true}});
        })
        .catch(err => {
          setForm({
            filtro:value,
            target: '',
            valuesList:[],
            showForm: false,
            id:'',
            email: '',
            url:'',
            company:'',
            file: '',
            row: '',
            col: '',
            positionRow: '',
            positionCol: ''
          });
          setSelectSpinner({...selectSpinner,[0]:{enabled:true}});
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
    } else if(name === 'target') {
      if(value === '') {
          setForm({
            filtro: form.filtro,
            target: value,
            valuesList: form.valuesList,
            showForm: false,
            id:'',
            email: '',
            url:'',
            company:'',
            file: '',
            row: '',
            col: '',
            positionRow: '',
            positionCol: ''
          })
      } else {
        setSelectSpinner({...selectSpinner,[1]:{disabled:true}});
        axios.post(Const.GET_CLIENT, {'filtro': form.filtro, 'target': value})
        .then(res => {
          if(res.data.code === 200) {
            setForm({
              filtro: form.filtro,
              target: value,
              valuesList: form.valuesList,
              showForm:true,
              id:JSON.parse(res.data.item._id),
              email: res.data.item.email,
              url: res.data.item.url,
              company: res.data.item.company,
              file: res.data.item.file,
              row: res.data.item.row,
              col: res.data.item.col,
              positionRow: res.data.item.positionRow,
              positionCol: res.data.item.positionCol
            })
            setSelectSpinner({...selectSpinner,[1]:{enabled:true}});
          } else {
            setSelectSpinner({...selectSpinner,[1]:{enabled:true}});
            toast.error(res.data.message != null ? res.data.message : "ERRORE", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
          }
        })
        .catch(err=> {
          setForm({
            filtro:'',
            target: '',
            valuesList:[],
            showForm: false,
            id:'',
            email: '',
            url:'',
            company:'',
            file: '',
            row: '',
            col: '',
            positionRow: '',
            positionCol: ''
          });
          setSelectSpinner({...selectSpinner,[1]:{enabled:true}});
          toast.error(err.message != null ? err.message : "ERRORE", {
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
    } else {
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
        if(['col','row','positionRow','positionCol'].includes(name) && value !== '' && !value.match(new RegExp(/^[1-9]+[0-9]*$/g))) {
          event.target.value = '';
        } else {
          setForm({...form, [name]:value});
        }
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
      let obj = {
        'id': form.id,
        'email': form.email,
        'url': form.url,
        'company': form.company,
        'file': form.file,
        'row': form.row,
        'col': form.col,
        'positionRow': form.positionRow,
        'positionCol': form.positionCol
      }
      if(obj.company === '') {
        delete obj.company;
      }
      axios.post(Const.EDIT_CLIENT, obj)
      .then(res => {
        if (res.data.code === 200) {
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
    <div className="mx-auto mb-5" style={{maxWidth:'520px',border:'2px solid #FFFFFF80', borderRadius:'5%'}}>
      <div className="mt-2" align="center">
        <h1 style={{color:'#28a745'}}>Modifica Cliente</h1>
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
                    visibility: selectSpinner[0].disabled ? 'visible' : 'hidden',
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
                {...selectSpinner[0]}
                required>
                <option></option>
                {form && form.valuesList && form.valuesList.map((item, index) => {
                  return <option key={index}>{item}</option>
                })}
              </Form.Control>
            </Col>
          </Row>
          { selectSpinner[1].enabled && form.id === '' ?
            null
            :
            selectSpinner[1].disabled && form.id === '' ?
            <PixelSpinner
              size={100}
              color="#24e959"
              style={{
                width:'100%',
                visibility: selectSpinner[1].disabled ? 'visible' : 'hidden',
                zIndex: '3'
              }}
              />
            :
            <>
              <div className="mt-2" align="center">
                <h4 style={{color:'white'}}>Pixels disponibili</h4>
                <h2 style={{color:'white'}}>{pixelNumber}</h2>
              </div>
              <div className="mx-auto" style={{textAlign: 'center', width: '85%'}}>
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
              </div>
            </>
          }
        </Form>
      </div>
    </div>
  )
}

export default EditClient;
