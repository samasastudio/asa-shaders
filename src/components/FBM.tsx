import React, { FunctionComponent, useEffect } from "react";
import "./FBM.css";
import { renderFBM } from "../fragments/fbmFrag"

export const FBM : FunctionComponent<{}> = (props) : JSX.Element => {
  useEffect(renderFBM, []);
  return (
    <div className="fbm">
      <main>
        <header>
          <h1>Sam Johnson</h1>
          <h2>Software Engineer</h2>
        </header>
        <footer>
          <a href="#">Projects</a>
          <a href="#">About</a>
          <a href="#">Github</a>
        </footer>
      </main>
    </div>
  );
};
