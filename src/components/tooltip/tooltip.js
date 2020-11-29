import React from 'react';

const Tooltip = ({direction, content}) => {

  return (
    <span
      className={"tooltiptext " + direction}
    >
      {content}
    </span>
  )
}

export default Tooltip;
