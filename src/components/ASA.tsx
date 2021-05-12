import React, { FunctionComponent, useEffect } from "react";
import "./ASA.css";
import { renderLD } from "../fragments/luridDreamFrag";
import { renderBS } from "../fragments/blackSnow";
import { renderLW } from "../fragments/lunarWaves"
import { renderSB } from "../fragments/slowBreathsAsa";
import { renderWS } from "../fragments/writeStream";

const shaderList = [renderLD, renderBS, renderWS, renderSB, renderLW];

const cycleShaders = (list, className) => {
  const shader = list.shift();
  shader(className);
  list.push(shader);
}

export const ASA : FunctionComponent<{}> = (props) : JSX.Element => {
  useEffect(() => {
    if (window.innerWidth > 410) {
      renderLD("asa");
    }
  }, []);
  return (
    <div className="asa" style={{color: "white"}}>
      <main style={{border: "1px solid white"}}>
        <header onClick={() => cycleShaders(shaderList, "asa")}>
          <div style={{width: '50%', padding: '32px'}}>
            <h1>Sam Johnson</h1>
            <h2>Software Engineer</h2>
            {window.innerWidth > 410 ? <p>Click to cycle web shaders</p> : null}
          </div>
        </header>
        <footer style={{borderTop: "1px solid white"}}>
          <a href="https://parsifyapp.herokuapp.com/" style={{color: "inherit"}}>Parsify</a>
          <a href="https://github.com/samasastudio" style={{color: "inherit"}}>Github</a>
          <a href="https://www.linkedin.com/in/sam-asa-johnson/" style={{color: "inherit"}}>About</a>
        </footer>
      </main>
    </div>
  );
};

//TODO:
// 6. create array of rendering functions for shaders
// 7. create handleClick function for component