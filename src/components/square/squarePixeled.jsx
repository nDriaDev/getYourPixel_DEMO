import React, {useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import Const from './../../util/Costanti';
import $ from 'jquery';
import axios from 'axios';

const SquarePixeled = ({enableSpinner,disableSpinner}) =>{
  const [matrix,setMatrix] = useState(null);

  const redirectUrl = (e,url) => {
      e.preventDefault();
      e.stopPropagation();
      if(url) {
        axios.post(Const.SAVE_CLICK,{'url':url})
        .then(result => {
          if(url) {
            window.location = url.indexOf('http') === -1 ? 'https://' + url : url;
          }
        })
        .catch(err => {
          if(url) {
            window.location = url.indexOf('http') === -1 ? 'https://' + url : url;
          }
        })
      }
  }

  const showTip = (text, id) => {
    let elem = $('#'+id);
    elem.tooltip({title:text, placement:'bottom'})
  }

  useEffect(()=>{
    enableSpinner();
    axios.get(Const.GET_PIXELS)
    .then(res => {
        let matr = res.data.array.map((row,index) => {
          return (
            <div id={'r-' + index} key={'r-'+index}>
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
                    onClick={(e)=>redirectUrl(e,param)}
                    onMouseEnter={()=>showTip(titleText,('c-'+index+index2))}
                    />
                )
              })}
            </div>
          )
        })
        setMatrix(matr);
        disableSpinner();
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

  return(
    <>
      {matrix}
    </>
  )
}

export default SquarePixeled;
