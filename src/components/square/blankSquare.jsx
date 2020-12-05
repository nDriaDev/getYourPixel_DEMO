import React, {useState} from 'react';

const BlankSquare =({index1, index2}) =>{
  const [hover,setHover] = useState({square:'',tooltip:''});

  let pos = 'right';
  if([0,1,2,3,4].includes(index1)) {
    if([147,148,149,150,151].includes(index2)) {
      pos = 'bottom-left';
    } else {
      pos = 'bottom-right'
    }
  } else{ if([159,260,261,262,263].includes(index1)){
    if([147,148,149,150,151].includes(index2)) {
      pos = 'left';
    } else {
      pos = 'right'
    }
  }
}
  const showOver= ()=>{
    if(hover.square == 'click'){
      setHover({
        square:'',
        tooltip:''
      });
    } else {
      setHover({
        square:'click',
        tooltip:'click'
      });
    }
  }

  const hideOver=()=>{
    if(hover.square == 'click'){
      setHover({
        square:'',
        tooltip:''
      })
    }
  }
  return(
    <div className={"square " + hover.square + " my-tooltip"} onClick={e=>showOver()} onMouseLeave={e=>hideOver()}>
      <span className={"tooltiptext " + hover.tooltip + " " + pos}>
        {'(' + (index1+1) + ',' + (index2+1) +')'}
      </span>
    </div>
  )
}



export default BlankSquare;
