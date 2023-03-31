import { useRef } from "react";

function ExpandedClickableArea(props) {


    const refExpandedArea = useRef();

  const handleClick = (e) => {

  }
  return <div ref={refExpandedArea} className={} tabIndex="0" onClick={handleClick}>{props.children}</div>;
}

export default ExpandedClickableArea;
