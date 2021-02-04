import React, {Component} from 'react';
import $ from 'jquery';
import { useHistory } from 'react-router-dom';

const Footer = (props) => {
  const history = useHistory();

  const goToLegal = () => {
    let idUls = ['ulNavSx','ulNavDx1','ulNavDx2','ulNavDx3','ulNavDx4',];
    let trovato = false;
    for(let i in idUls) {
      let children = document.getElementById(idUls[i]).childNodes;
      let array = Array.from(children);
      for(let j in array) {
        if(array[j].classList.contains('active-nav-bar')) {
          array[j].classList.remove('active-nav-bar');
          trovato = true;
          break;
        }
      }
      if(trovato) {
        break;
      }
    }
    history.push('/legal');
  }

  let styleDiv ={
    height: '100%',
    fontSize: '0.65em',
    color:'#FFFFFF80',
    width: '100%'
  }
  let styleCol = {
    height: '100%',
    width: '50%'
  }
  let styleSpan = {
    verticalAlign: 'top'
  }
    return(
      props.show ? null :
      <div className="display-grid">
        <div className="bottom-footer">
          <div className="container-fluid footer" style={styleDiv}>
            <div className="div-left" style={styleCol}>
              <span style={styleSpan}>
                Copyright &copy; 2020 Get your pixels. Tutti i diritti sono riservati. Non sono responsabile del contenuto di siti esterni.
                <span style={{color:'#FFFFFF',cursor:'pointer'}} onClick={()=>goToLegal()}>{' LEGAL'}</span>
              </span>
            </div>
            <div className="div-right" style={styleCol} align="right">
              <span id="designedBy" style={styleSpan}>Web designed by <a href={process.env.REACT_APP_BASE_URL + "/humans.txt"}>4ndr3w_c0</a></span>
            </div>
          </div>
        </div>
      </div>

    )
}

export default Footer;
