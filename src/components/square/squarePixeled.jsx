import React, {useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import Const from './../../util/Costanti';
import {Button, Modal } from 'react-bootstrap';
import $ from 'jquery';
import axios from 'axios';

const SquarePixeled = ({enableSpinner,disableSpinner, setAuth, setCounter}) =>{
  const [matrix,setMatrix] = useState(null);
  const [show, setShow] = useState(false);
  const [url, setUrl] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const callRedirect = () => {
    handleClose();
    redirectUrl(url);
  }

  const verifyUser = (e,url) => {
    e.preventDefault();
    e.stopPropagation();
    if(!url) {
      return;
    }
    axios.get(Const.CHECK_TOKEN)
    .then(result => {
      if(result.data.code === 200) {
        handleClose();
        redirectUrl(url);
      } else {
        setUrl(url);
        handleShow(true);
      }
    })
    .catch(err => {
      toast.error(err.message != null ? err.message : "ERRORE", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    })
  }

  const redirectUrl = (url) => {
    if(url) {
      enableSpinner();
      axios.post(Const.SAVE_CLICK,{'url':url})
      .then(result => {
        // axios.get(Const.LOGOUT)
        // .then(result => {
        //   if (result.data.code === 200) {
        //     // sessionStorage.clear();
        //     setAuth(false, false);
            disableSpinner();
            window.location.assign(url.indexOf('http') === -1 ? 'http://' + url : url);
        //   } else {
        //     throw new Error(result.data.message);
        //   }
        // })
        // .catch(err => {
        //   // sessionStorage.clear();
        //   setAuth(false, false);
        //   disableSpinner();
        //   window.location.assign(url.indexOf('http') === -1 ? 'http://' + url : url);
        // })
      })
      .catch(err => {
        disableSpinner();
        window.location.assign(url.indexOf('http') === -1 ? 'http://' + url : url);
      })
    }
  }

  const showTip = (text, id) => {
    let elem = $('#'+id);
    elem.tooltip({title:text, placement:'bottom'})
  }

  useEffect(()=>{
    enableSpinner();
    axios.get(Const.GET_CLIENTS_PIXELS)
    .then(res => {
      setCounter(res.data.counter)
      let matr = res.data.array.map((row,index) => {
        return (
          <div id={'r-' + index} align='center' key={'r-'+index}>
            {row.map((col,index2) => {
              let style = {};
              let titleText = '';
              let param = null;
               if(col === 0) {
                 style = {
                   cursor:'default',
                   border: '.2px solid #000',
                   background: '#fff'
                 };
                 titleText = '(' + (index+1) +','+ (index2+1) +')';
               } else {
                style = {
                  ...col.style,
                  backgroundImage: 'url(' + res.data.images[col.image] + ')'
                }
                titleText = 'Vai al sito';
                param = col.url;
               }

              return (
                <div
                  id={'c-' + index + index2}
                  key={'c-' + index + index2}
                  className="image-pixeled"
                  style={style}
                  onClick={(e)=>verifyUser(e,param)}
                  onMouseEnter={()=>showTip(titleText,('c-'+index+index2))}
                  />
              )
            })}
          </div>
        )
      })
      axios.post(Const.GET_ADMIN,{})
      .then(res => {
        if(res.data && !res.data.code) {
          // sessionStorage.setItem('isAuth', true)
          setAuth(true,null);
          setMatrix(matr);
          disableSpinner();
        }
        else if(res.data.code === 200 && res.data.type === 'Client') {
          axios.post(Const.GET_USER,{})
          .then(res => {
            if(res.data && !res.data.code) {
              setAuth(null,true);
              setMatrix(matr);
              disableSpinner();
            } else {
              setMatrix(matr);
              disableSpinner();
            }
          })
        } else {
          setMatrix(matr);
          disableSpinner();
        }
      })
    })
    .catch(err => {
      disableSpinner();
      toast.error(err.message != null ? err.message : "ERRORE", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined
      });
    })
  },[])

/* Forza lo scroll a posizionarsi all'inizio di un elemento qualora
 * il client è un mobile browser. In questo caso si posiziona in
 * corrispondenza del logo

  useEffect(() => {
    if(matrix && Const.isMobileBrowser(navigator.userAgent)) {
      let griglia = document.getElementById('core');
      griglia.style["overflow-x"] = 'auto';
      let pos = $('.logo-size').position();
      griglia.scrollLeft += pos.left;
    }
  },[matrix])

  useEffect(() => {
    return () => {
      let griglia = document.getElementById('core');
      delete griglia.style["overflow-x"];
    }
  },[])
*/

  return(
    <>
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Attenzione</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {'Sembra che tu non sia loggato.\nSei sicuro di voler continuare?'}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Annulla
        </Button>
        <Button variant="primary" style={{backgroundColor:'#28a745', borderColor:'#28a745'}} onClick={callRedirect}>Continua</Button>
      </Modal.Footer>
    </Modal>
      {matrix}
    </>
  )
}

export default SquarePixeled;
