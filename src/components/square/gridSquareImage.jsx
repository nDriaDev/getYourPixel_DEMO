import React, {useRef, useEffect, useCallback} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Const from './../../util/Costanti';
import MapAreasSquare from './mapAreasSquare';

const GridSquareImage = React.memo(({enableSpinner,disableSpinner, canvas}) => {

  // const imageRef = useRef(null);
  // const drawImage = useCallback((img,data) => {
  //   img.setAttribute("src", data.dataURL);
  // },[])

  // const draw = useCallback(img => {
  //   enableSpinner();
  //   axios.get('http://localhost:3001'+Const.GET_CLIENTS_PIXELS)
  //   .then(result => {
  //     canvas(result.data.counter)
  //     axios.post('http://localhost:3001'+Const.GET_ADMIN,{})
  //     .then(res => {
  //       if(res.data && !res.data.code) {
  //         drawImage(img, result.data.canvas);
  //         disableSpinner();
  //       }
  //       else if(res.data.code === 200 && res.data.type === 'Client') {
  //         axios.post('http://localhost:3001'+Const.GET_USER,{})
  //         .then(res => {
  //           if(res.data && !res.data.code) {
  //             drawImage(img, result.data.canvas);
  //             disableSpinner();
  //           } else {
  //             drawImage(img, result.data.canvas);
  //             disableSpinner();
  //           }
  //         })
  //       } else {
  //         drawImage(img, result.data.canvas);
  //         disableSpinner();
  //       }
  //     })
  //   })
  //   .catch(err => {
  //     disableSpinner();
  //     toast.error(err.message != null ? err.message : "ERRORE", {
  //       position: "top-center",
  //       autoClose: 3000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: false,
  //       draggable: true,
  //       progress: undefined
  //     });
  //   })
  // }, [])

  useEffect(() => {
    // let img = imageRef.current;
  //   draw(img);
  // },[draw])
    // drawImage(img,canvas);
    disableSpinner()
  },[])

  return (
    <>
      <img alt="" useMap="#Map-grid" src={canvas.dataURL}></img>
      <MapAreasSquare refer={canvas.refer}/>
    </>
  )
})

export default GridSquareImage;
