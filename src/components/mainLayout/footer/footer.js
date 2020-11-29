import React, {Component} from 'react';

class Footer extends Component{
  render(){
    let styleDiv ={
      height: '100%',
      fontSize: '14px',
      color:'#FFFFFF80'
    }
    let styleCol = {
      height: '100%'
    }
    let styleSpan = {
      verticalAlign: 'middle'
    }
    return(
      <div className="display-grid-blank-20">
        <div className = "container-fluid footer" style={styleDiv}>
          <div className = "col mr-auto" style={styleCol}>
            <span style={styleSpan}>Copyright &copy; 2020 Get your pixels. Tutti i diritti sono rivervati. Non sono responsabile del contenuto di siti esterni.</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Footer;
