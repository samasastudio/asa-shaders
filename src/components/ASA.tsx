import React, { FunctionComponent, useEffect, useState } from "react";
import "./ASA.css";
import { renderLD } from "../fragments/luridDreamFrag";
import { renderBS } from "../fragments/blackSnow";
import { renderLW } from "../fragments/lunarWaves";
import { renderSB } from "../fragments/slowBreathsAsa";
import { renderWS } from "../fragments/writeStream";

export const ASA: FunctionComponent<{}> = (props): JSX.Element => {
  const [shaders, setShaders] = useState([
    renderLD,
    renderWS,
    renderLW,
    renderSB,
    renderBS,
  ]);

  useEffect(() => {
    if (window.innerWidth > 410) {
      cycleShaders(shaders, "asa");
    }
  }, []);

  const cycleShaders = (list, className) => {
    const shader = list.shift();
    list.push(shader);
    const node = document.querySelector("canvas");
    if (node) {
      node.remove();
    }
    shader(className);
    setShaders(list);
  };

  const isDesktop = window.innerWidth > 410;

  return (
    <div className="asa" style={{ color: "white" }}>
      <main style={{ border: "1px solid white" }}>
        <header onClick={() => cycleShaders(shaders, "asa")}>
          <div style={{ width: "100%", height: "100%", display: "flex" }}>
            <div style={{ width: "65%", padding: "32px" }}>
              <h1>Sam Johnson</h1>
              <h2>Software Engineer</h2>
              {isDesktop ? <p>Click to cycle web shaders</p> : null}
            </div>
            {!isDesktop ? null : (
              <div
                style={{
                  width: "35%",
                  height: "100%",
                  display: "flex",
                  fontSize: "18px",
                  textAlign: "right",
                  backgroundColor: "RGBA(255, 242, 234, 0.25)",
                }}
              >
                <article style={{padding: "30px"}}>
                  From Nashville to Los Angeles to Austin, I have dedicated my
                  career to building user experiences that help both artists and
                  students explore new ideas through production, software and
                  art. When I am not collaborating on testing, designing and
                  developing music education applications, I spend my time
                  finding ways to support the music and film community here or
                  simply jamming, hiking and rock climbing. ☁️
                </article>
              </div>
            )}
          </div>
        </header>
        <footer style={{ borderTop: "1px solid white" }}>
          <a
            href="https://parsifyapp.herokuapp.com/"
            style={{ color: "inherit" }}
          >
            Parsify
          </a>
          <a
            href="https://www.middy.com/"
            style={{ color: "inherit" }}
          >
            Middy
          </a>
          <a
            href="https://github.com/samasastudio"
            style={{ color: "inherit" }}
          >
            Github
          </a>
        </footer>
      </main>
    </div>
  );
};

//TODO:
// 6. create array of rendering functions for shaders
// 7. create handleClick function for component
