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
