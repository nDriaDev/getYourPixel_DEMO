import React, {useState} from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import { toast } from 'react-toastify';
import Const from './../../util/Costanti';
import axios from 'axios';


const LoadSquare = ({spinnerCommand}) => {
  const [validated, setValidated] = useState(false);
  const [validFile, setValidFile] = useState ('label-border-none');
  const [form, setForm] = useState({
    email: '',
    company:'',
    file: '',
    row: '',
    col: '',
  })

  // useEffect(()=>{
  //   spinnerCommand(true);
  //   return axios.post(Const.GET_USER,{})
  //   .then(value => {
  //     if(value) {
  //       if(value.type === Const.USER_TYPE.BASIC) {
  //         spinnerCommand(false);
  //         history.push('/manage');
  //       } else {
  //         spinnerCommand(false);
  //       }
  //     } else {
  //       spinnerCommand(false);
  //       history.push('/manage');
  //     }
  //   }).catch(err => {
  //     spinnerCommand(false);
  //     history.push('/manage');
  //   })
  // },[])

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
      setForm({...form, [name]:value});
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
      axios.post(Const.SAVE_PIXELS, form)
      .then(res => {
        if (res.data.code === 200) {
          setForm({
            email: '',
            company: '',
            file: '',
            row: '',
            col: '',
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
    <div className="mx-auto mb-5" style={{maxWidth:'408px',border:'2px solid #FFFFFF80', borderRadius:'5%'}}>
      <div className="mt-2" align="center">
        <h1>Pixels</h1>
      </div>
      <div className="mx-auto" style={{textAlign: 'center', width: '85%'}}>
        <Form noValidate validated={validated} onSubmit={onSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label style={{float: 'left', color:'white'}}>Email cliente</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder=""
              value={form.email}
              onChange={e => handleInputChange(e)}
              required
              />
          </Form.Group>
          <Form.Group controlId="formBasicCompany">
            <Form.Label style={{float: 'left', color:'white'}}>Azienda cliente</Form.Label>
            <Form.Control
              type="text"
              name="company"
              placeholder=""
              value={form.company}
              onChange={e => handleInputChange(e)}
              />
          </Form.Group>
          <Row style={{marginBottom:'1rem'}}>
            <Form.Label column sm="12" style={{textAlign: 'left', color:'white'}}>Immagine</Form.Label>
            <Col sm="12">
              <Form.File id="formBasicFile" custom>
                <Form.File.Input
                  name="file"
                  onChange={e => handleInputChange(e)}
                  />
                <Form.File.Label className={"position-label " + validFile} data-browse="Carica immagine">{form.file.name}</Form.File.Label>
              </Form.File>
            </Col>
          </Row>
          <Row style={{marginBottom:'1rem'}}>
            <Col sm="6" style={{padding:'0'}}>
              <Form.Label column sm="12" style={{textAlign: 'left', color:'white'}}>{'Pixels in verticale'}</Form.Label>
              <Col sm="8">
                <Form.Control
                  type="number"
                  name="row"
                  min="0"
                  placeholder=""
                  value={form.row}
                  onChange={e => handleInputChange(e)}
                  required
                  />
              </Col>
            </Col>
            <Col sm="6" style={{padding:'0'}}>
              <Form.Label column sm="12" style={{textAlign: 'left', color:'white'}}>{'Pixels in orizzontale'}</Form.Label>
              <Col sm="8">
                <Form.Control
                  type="number"
                  name="col"
                  min="0"
                  placeholder=""
                  value={form.col}
                  onChange={e => handleInputChange(e)}
                  required
                  />
              </Col>
            </Col>
          </Row>
          <Button variant="success" type="submit">
            {'Invia'}
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default LoadSquare;
