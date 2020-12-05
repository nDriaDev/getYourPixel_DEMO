import React from 'react';
// import ListSquare from './../square/listSquare';
// import SquareModulare from './../square/squareModulare';
import SquareImage from './../square/squareImage';

const Home = ({enableSpinner, disableSpinner}) => {
    return(
    <>
    <div className="display-grid-blank-60"></div>
    <div className="display-grid mx-auto" style={{height:'20%'}}>
      <SquareImage
        enableSpinner={enableSpinner}
        disableSpinner={disableSpinner}
      />
    </div>
    </>
  )
}

export default Home;
