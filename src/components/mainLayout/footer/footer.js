import React, {Component} from 'react';

class Footer extends Component{
  render(){
    let styleDiv ={
      height: '100%',
      fontSize: '11px',
      color:'#FFFFFF80',
      width: '100%'
    }
    let styleCol = {
      height: '100%'
    }
    let styleSpan = {
      verticalAlign: 'middle'
    }
    return(
      <div className="">
        <div className="container-fluid footer" style={styleDiv}>
          <div className="div-left" style={styleCol}>
            <span style={styleSpan}>Copyright &copy; 2020 Get your pixels. Tutti i diritti sono rivervati. Non sono responsabile del contenuto di siti esterni.</span>
          </div>
          <div className="div-right" style={styleCol}>
            <span style={styleSpan}>Web designed by <a id="designedBy" href={process.env.REACT_APP_BASE_URL + "/humans.txt"}>4ndr3w_c0</a></span>
          </div>
        </div>
      </div>
    )
  }
}

export default Footer;
