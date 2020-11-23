import React from 'react';
import Col from './col';

const Row = (props) => {
  let col = Array.from({length: props.cols}, (_, index) => index + 1);

  const cols = col.map((item, ind) => {
    return(
      <Col key={ind} index={props.index} index2={ind}/>
    )
  })

  return (
    <span className="span-cols-square">
      {cols}
    </span>
  )
}

export default Row;
