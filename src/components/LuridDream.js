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
        <header style={{display: 'flex'}}>
          <div style={{width: '50%', padding: '32px'}}>
            <h1>Sam Johnson</h1>
            <h2>Software Engineer</h2>
          </div>
          <div style={{width: '50%', textAlign: 'right',padding: '32px', backgroundColor: 'RGBA(255, 242, 234, 0.25)'}}>
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac ullamcorper sapien, nec ullamcorper risus. Mauris pretium ex lectus, quis mollis nulla lobortis sed. Donec pellentesque blandit lacus vel tristique.</span>
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
