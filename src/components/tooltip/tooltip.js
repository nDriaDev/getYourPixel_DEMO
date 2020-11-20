import React, {useState} from 'react';

const Tooltip = (props) => {

  return (
    <span
      className={"tooltiptext " + props.direction}
    >
      {props.content}
    </span>
  )
}

export default Tooltip;
