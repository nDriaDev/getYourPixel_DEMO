import React, {useState, useEffect} from 'react';
import axios from 'axios';
// import { FixedSizeList as List } from "react-window";
// import BlankSquare from './blankSquare';
// import RowBlankSquare from './rowBlankSquare';


const SquareImage = ({enableSpinner,disableSpinner}) =>{
  const [images,setImages] = useState(null);
  useEffect(()=>{
    enableSpinner();
    axios.post('/images',{}).then((resp) => {
      setImages(resp.data);
      disableSpinner();
    })
  },[disableSpinner])

  return(
    <>
    {
      images ? images.map((item, key) => {
        return(
          <div style={{display:'inline-block'}}>
            <img src={item} alt={"img+" +key} key={key} ></img>
          </div>
        )
      }) : null
    }
    </>
  )
}

export default SquareImage;
