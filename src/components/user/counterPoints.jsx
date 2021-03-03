import React, {useState, useEffect} from 'react';
import {Row, Col, Table} from 'react-bootstrap';
import { toast } from 'react-toastify';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/solid.min.css';
import Const from './../../util/Costanti';
import axios from 'axios';
import TrackingGA from './../utils/Tracking';

const CounterPoints = ({spinnerCommand}) => {
  const [data, setData]  = useState({
    number: null,
    list: null,
  });

  useEffect(()=>{
    spinnerCommand(true);
    axios.post(Const.GET_USER,{})
    .then(res => {
      if(res.data && !res.data.code) {
        axios.get(Const.COUNT_POINTS)
        .then(res => {
          if(res.data && !res.data.code) {
            TrackingGA.event("User", "pagina punti", "utente loggato ha cliccato il menu per visualizzare i suoi punti")
            setData({
              "number": res.data.list.length,
              "list": res.data.list
            })
          }
        })
      } else {
        spinnerCommand(false);
        toast.error(res.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
    }).catch(err => {
      spinnerCommand(false);
      toast.error(err ? err.message ? err.message : err : 'ERRORE', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    })
  },[])

  return (
    data.number &&
      <div className="mx-auto mb-5" style={{maxWidth:'446px',border:'2px solid #FFFFFF80', borderRadius:'5%'}}>
        <div className="mt-2" align="center">
          <h1  style={{color:'#28a745'}}>Punti Totalizzati</h1>
        </div>
        <div className="mx-auto" style={{textAlign: 'center', width: '85%'}}>
          <Row>
            <Col sm="12" style={{padding:'0'}}>
              <h3 style={{textAlign: 'center', color:'white', paddingTop:'0', paddingBottom: '10px'}}>{data.number}</h3>
            </Col>
          </Row>
          <Row style={{overflowY:'scroll', height:'400px'}}>
            <Table responsive>
            <thead>
            <tr>
            <th><i className="fas fa-ad"/></th>
            <th>Pubblicit&agrave;</th>
            </tr>
            </thead>
            <tbody style={{color:'white'}}>
            {data.list && data.list.map((item,index) => (
              <tr key={'tr_'+index}>
              <td key={'td1_'+index}>{index+1}</td>
              <td key={'td2_'+index}>{item}</td>
              </tr>
            ))}
            </tbody>
            </Table>
          </Row>
        </div>
      </div>
  )
}

export default CounterPoints;
