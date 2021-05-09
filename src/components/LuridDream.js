import React, { useEffect } from "react";
import "./LuridDream.css";
import { renderLD } from "../fragments/luridDreamFrag";

export const LuridDream = () => {
  useEffect(() => {
    if (window.innerWidth > 410) {
      renderLD();
    }
  }, []);
  return (
    <div className="luridDream">
      <main>
        <header>
          <div style={{width: '50%', padding: '32px'}}>
            <h1>Sam Johnson</h1>
            <h2>Software Engineer</h2>
            {window.innerWidth > 410 ? <p>Click to cycle web shaders</p> : null}
          </div>
        </header>
        <footer>
          <a href="https://parsifyapp.herokuapp.com/">Parsify</a>
          <a href="https://github.com/samasastudio">Github</a>
          <a href="https://www.linkedin.com/in/sam-asa-johnson/">About</a>
        </footer>
      </main>
    </div>
  );
};
