import React, {useState, useEffect} from 'react';
import {Row, Col, Table} from 'react-bootstrap';
import { toast } from 'react-toastify';
import Const from './../../util/Costanti';
import axios from 'axios';
import TrackingGA from './../utils/Tracking';
import { useTranslation } from 'react-i18next';

const CounterPoints = ({ spinnerCommand }) => {
  const { t, i18n } = useTranslation();
  
  const [data, setData]  = useState({
    number: null,
    list: null,
  });

  useEffect(()=>{
    spinnerCommand(true);
    axios.post(Const.GET_USER,{})
      .then(res => {
      if(res.data && !res.data.code) {
        axios.get(Const.COUNT_POINTS_AND_BONUS)
        .then(res => {
          if(res.data && !res.data.code) {
            TrackingGA.event("User", "pagina punti", "utente loggato ha cliccato il menu per visualizzare i suoi punti")
            setData({
              number: res.data.points,
              list: res.data.list
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
    data.number != null &&
      <div className="mx-auto mb-5" style={{maxWidth:'570px',border:'2px solid #FFFFFF80', borderRadius:'5%'}}>
        <div className="mt-2" align="center">
          <h1  style={{color:'#28a745'}}>{t('manage.points.title')}</h1>
        </div>
        <div className="mx-auto mt-1 mb-1" style={{textAlign: 'center', width: '85%'}}>
          <Row>
            <Col sm="12" style={{padding:'0'}}>
              <h3 style={{textAlign: 'center', color:'white', paddingTop:'0', paddingBottom: '10px'}}>{data.number}</h3>
            </Col>
          </Row>
          <Row style={{overflowY:'scroll'}}>
            <Table responsive>
              <thead>
                <tr>
                <th><i className="fas fa-ad"/></th>
                  <th>{t('manage.points.table.caption1')}</th>
                  <th>{t('manage.points.table.caption2')}</th>
                  <th>{t('manage.points.table.caption3')}</th>
                </tr>
              </thead>
              <tbody style={{color:'white'}}>
              {
                data?.list?.length > 0 ?
                  data.list.map((item, index) => (
                    <tr key={'tr_'+index}>
                    <td key={'td1_'+index}>{index+1}</td>
                      <td key={'td2_' + index}>{i18n.language === 'it' ? item.tipologia.split(';')[0] : item.tipologia.split(';')[1]}</td>
                      <td key={'td2_' + index}>{item.dettaglio}</td>
                      <td key={'td2_' + index}>{item.punti}</td>
                    </tr>
                  ))
                  :
                  null
              }
              </tbody>
            </Table>
            {
              data?.referred?.length === 0 ?
                <div className="mb-3">
                  <span>
                  {t('manage.invite.table.noData')}
                  </span>
                </div>
                :
                null
            }
          </Row>
        </div>
      </div>
  )
}

export default CounterPoints;
