import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import {Row, Col, Table} from 'react-bootstrap';
import { toast } from 'react-toastify';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/solid.min.css';
import Const from './../../util/Costanti';
import axios from 'axios';
import { useTranslation } from 'react-i18next';


const CounterUsers = ({ spinnerCommand }) => {
  const { t } = useTranslation();

  const history = useHistory();
  const [data, setData]  = useState({
    number: null,
    list: null,
    username: "asc",
    email: "asc",
    punti: "asc"
  });

  useEffect(()=>{
    spinnerCommand(true);
    axios.post(Const.GET_ADMIN,{})
    .then(res => {
      if(res.data && !res.data.code) {
        if([Const.ADMIN_TYPE.BASIC,Const.ADMIN_TYPE.ADMIN, Const.ADMIN_TYPE.CLIENT].includes(res.data.type)) {
          spinnerCommand(false);
          history.push('/manage');
        }
        else {
          axios.get(Const.COUNT_USERS)
          .then(res => {
            if(res.data && !res.data.code) {
              setData(
                {
                  ...data,
                  "number": res.data.number,
                  "list": res.data.list
                }
              );
              spinnerCommand(false);
            } else {
              throw new Error(res.data.message ? res.data.message : 'Errore interno');
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
              onClose:()=>{history.push('/manage')}
            });
          })
        }
      } else {
        spinnerCommand(false);
        history.push('/manage');
      }
    }).catch(err => {
      spinnerCommand(false);
      history.push('/manage');
    })
  },[])

  const sort =(property) => {
    let list = data.list;
    list.sort((a,b) => {
      return a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    })
    if(data[property]) {
      if(data[property] === 'desc') {
        setData({
          ...data,
          "list":list,
          [property]: 'asc'
        })
      } else {
        list = list.reverse();
        setData({
          ...data,
          "list":list,
          [property]: 'desc'
        })
      }
    } else {
      setData({
        ...data,
        "list":list,
        [property]: 'asc'
      })
    }
  }


  return (
    data.number &&
      <div className="mx-auto mb-5" style={{maxWidth:'446px',border:'2px solid #FFFFFF80', borderRadius:'5%'}}>
        <div className="mt-2" align="center">
          <h1  style={{color:'#28a745'}}>{t('manage.counterUsers.title')}</h1>
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
            <th><i className="fas fa-user"/></th>
            <th onClick={()=>sort("username")} style={{cursor:'pointer'}}>Username</th>
            <th onClick={()=>sort("email")} style={{cursor:'pointer'}}>Email</th>
            <th onClick={()=>sort("punti")} style={{cursor:'pointer'}}>{t('manage.counterUsers.table.caption1')}</th>
            </tr>
            </thead>
            <tbody style={{color:'white'}}>
            {data.list && data.list.map((item,index) => (
              <tr key={'tr_'+index}>
              <td key={'td1_'+index}>{index+1}</td>
              <td key={'td2_'+index}>{item.username}</td>
              <td key={'td3_'+index}>{item.email}</td>
              <td key={'td3_'+index}>{item.punti}</td>
              </tr>
            ))}
            </tbody>
            </Table>
          </Row>
        </div>
      </div>
  )
}

export default CounterUsers;
