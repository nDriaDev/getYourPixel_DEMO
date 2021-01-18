import React from 'react';
import SquarePixeled from './../square/squarePixeled';

const Home = ({enableSpinner, disableSpinner}) => {
    return(
    <>
    <div className="display-grid-blank-60"></div>
    <div className="mx-auto" style={{height:'95%',maxHeight:'95%',overflowY:'auto'}}>
      <SquarePixeled
        enableSpinner={enableSpinner}
        disableSpinner={disableSpinner}
      />
    </div>
    </>
  )
}

export default Home;
