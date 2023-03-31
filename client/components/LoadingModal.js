import React from "react";
import loadingImg from "assets/Rocket.gif";

function LoadingModal() {
  return (
    <div className="relative w-full h-full">
      <img src={loadingImg} alt="loading" className="absolute m-auto" />;
    </div>
  );
}

export default LoadingModal;
