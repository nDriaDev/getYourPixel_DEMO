import React from 'react';
import Row from './row';

const Square = (props) => {
  let row = Array.from({length: props.rows}, (_, index) => index + 1);

  let matrix = row.map((item,ind) => {
    return(
      <Row key={ind} index={ind} cols={props.cols}/>
    )
  })

  return(
    <>
      <div className="overflow-auto mx-auto div-container-square">
        <div className="span-rows-square">
          {matrix}
        </div>
      </div>
    </>
  )
}

export default Square;
