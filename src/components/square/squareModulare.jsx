import React, {useEffect} from 'react';
import { FixedSizeList as List } from "react-window";
import BlankSquare from './blankSquare';
import RowBlankSquare from './rowBlankSquare';


const SquareModulare = ({enableSpinner,disableSpinner}) =>{
  useEffect(()=>{
    disableSpinner();
  },[disableSpinner])

  const Item=({index, style}) => {
    return(
      <RowBlankSquare index={index} style={style}></RowBlankSquare>
    )
  }

  return(

    <List
      className="List"
      height={670}
      itemCount={264}
      itemSize={10}
      width={1550}
    >
      {Item}
    </List>

  )
}

export default SquareModulare;
