import React, { useState } from "react";
import "./tooltip.css";

const Tooltip = (props) => {
  let timeout;
  const [active, setActive] = useState(false);
  const {ComponentChildren} = props.children;
  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, props.delay || 400);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };
  const ComponentToRender = React.Children.map(props.children, child => {
    return React.cloneElement(child,{onMouseEnter:showTip,onMouseLeave:hideTip},null);
  })
  return (
    <div
      className="Tooltip-Wrapper"
      style={{display:'none'}}
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {props.children}
      {active && (
        <div className={`Tooltip-Tip ${props.direction || "top"}`}>
          {props.content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;

// <div className={`Tooltip-Tip ${props.direction || "top"}`}>
//   {props.content}
// </div>
