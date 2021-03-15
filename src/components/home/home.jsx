import React, { useState, useCallback, useEffect } from 'react';
import ImageMapperPixels from './../square/imageMapperPixels';
import { toast } from 'react-toastify';
import Const from './../../util/Costanti';
import axios from 'axios';

const Home = React.memo(({setAuth,enableSpinner, disableSpinner}) => {
  const [data,setData] = useState({
      venduti: '',
      disponibili: '',
      canvas: ''
  });

  const style1 = {
      width: '100vw',
      overflowX: 'auto',
  }

  const style2 = {
      maxHeight:'99%',
      width:'1677px',
      overflowY: 'auto',
  }

  const h5_1 = {
    marginTop:'4px',
    marginLeft:'2px'
  }

  const h5_2 = {
    marginTop:'2px',
    marginLeft:'2px'
  }

  const getData = useCallback(() => {
    enableSpinner();
    axios.get(Const.GET_CLIENTS_PIXELS)
    .then(res => {
      // setCounter(res.data.counter)
      if(res.data.type === 'Admin') {
        setAuth(true,false);
      } else if(res.data.type === 'Client') {
        setAuth(false,true);
      } else {
        setAuth(false,false);
      }
      setData({
        venduti: res.data.counter.venduti,
        disponibili: res.data.counter.disponibili,
        canvas: res.data.canvas
      });
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
  }, [])

  useEffect(() => {
    getData();
  },[getData])

  return(
    data.venduti !== '' &&
    <>
      <div className="display-grid-blank-100">
        <div className="my-auto box-report" align="left">
          <h5 style={h5_1}>Venduti:&nbsp; <strong>{data.venduti}</strong></h5>
          <h5 style={h5_2}>Disponibili:&nbsp; <strong>{data.disponibili}</strong></h5>
        </div>
      </div>
      <div style={style1} align="center">
        <div id="griglia" style={style2}
            className="mx-auto">
            <ImageMapperPixels
              canvas={data.canvas}
              enableSpinner={enableSpinner}
              disableSpinner={disableSpinner}
            />
        </div>
      </div>
    </>
  )
})

export default Home;
