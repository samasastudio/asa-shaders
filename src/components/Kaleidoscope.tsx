import React, { useEffect } from "react";
import "./Kaleidoscope.css";
import { renderKS } from "../fragments/kaleidoscopeFrag";

export const Kaleidoscope = () => {
  useEffect(renderKS, []);
  return (
    <div className="kaleidoscope" onClick={() => renderKS()}>
      <div className="canvas-holder">
        <canvas></canvas>
      </div>
      {/* <div className="info">
          <header>
            <h1>Sam Asa Johnson</h1>
            <p>Software Engineer // Sound Designer</p>
          </header>
          <nav>
            <a href="#">Instagram</a>
            <a href="#">Unsplash</a>
            <a href="#">500px</a>
          </nav>
        </div> */}
    </div>
  );
};
