import React from 'react';
import SquarePixeled from './../square/squarePixeled';

const Home = ({enableSpinner, disableSpinner, setAuth}) => {
    return(
    <>
    <div className="display-grid-blank-60"></div>
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
          enableSpinner={enableSpinner}
          disableSpinner={disableSpinner}
          />
      </div>
    </div>

    </>
  )
}

export default Home;
