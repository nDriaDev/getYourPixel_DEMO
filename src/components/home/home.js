import React from 'react';
import ListSquare from './../square/listSquare';

const Home = ({enableSpinner, disableSpinner}) => {
    return(
    <>
    <div className="display-grid-blank-60"></div>
    <div className="display-grid mx-auto" style={{height:'20%'}}>
      <ListSquare
        enableSpinner={enableSpinner}
        disableSpinner={disableSpinner}
      />
    </div>
    </>
  )
}

export default Home;
