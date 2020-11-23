import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const Col = (props) => {
  return(
    <OverlayTrigger
      key={props.index+props.index2}
      placement={[0,1,2,3].includes(props.index2) ? 'right' : [148,149,150,151].includes(props.index2) ? 'left' : 'top'}
      overlay={
        <Tooltip id={"tooltip-" + props.index + props.index2}>
          {"("+(props.index+1)+","+(props.index2+1)+")"}
        </Tooltip>
      }
    >
      <span
        key={props.index+props.index2}
        className="span-square"
        style={{marginLeft: props.index2=== 0 ? 'auto' : 'auto'}}></span>
    </OverlayTrigger>
  )
}

export default Col;
