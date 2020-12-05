import React, {useEffect} from 'react';
import BlankSquare from './blankSquare';

const RowBlankSquare = ({index, style}) =>{
  let col = Array.from({length: 152}, (_, index) => index + 1)
  return(<>{
    <div className="display-col-list mx-auto" style={style}>
    {
      col.map((item, index2) => {
        return(
          <BlankSquare key={"a"+index2} index1={index} index2={index2}></BlankSquare>
        )
      })
    }
    </div>
  }</>)
}

export default RowBlankSquare;
