import { React, useState } from 'react';
import SquarePixeled from './../square/squarePixeled';
import Const from './../../util/Costanti';

const Home = ({enableSpinner, disableSpinner, setAuth}) => {

  const [counter,setCounter] = useState({
      venduti: '',
      disponibili: ''
  });

  return(
    <>
    <div className="display-grid-blank-100">
      <div className="my-auto box-report" align="left">
        <h5 style={{marginTop:'4px',marginLeft:'2px'}}>Venduti:&nbsp; <strong>{counter.venduti}</strong></h5>
        <h5 style={{marginTop:'2px',marginLeft:'2px'}}>Disponibili:&nbsp; <strong>{counter.disponibili}</strong></h5>
      </div>
    </div>
    <div style={{
        width: '92vw',
        overflowX: 'scroll',
        marginLeft: '4%',
        marginRight: '4%',
      }} align="center">
      <div id="griglia" style={{
          maxHeight:'100%',
          width:'1540px',
          overflowY:'auto'}}>
        <SquarePixeled
          setAuth={setAuth}
          setCounter={setCounter}
          enableSpinner={enableSpinner}
          disableSpinner={disableSpinner}
          />
      </div>
    </div>

    </>
  )
}

export default Home;
