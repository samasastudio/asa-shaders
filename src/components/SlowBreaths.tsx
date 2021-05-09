import React, { FunctionComponent, useEffect } from "react";
import "./SlowBreaths.css";
import { renderSlowBreaths } from "../fragments/slowBreathsFrag";

export const SlowBreaths : FunctionComponent<{}> = (props) : JSX.Element => {
  useEffect(renderSlowBreaths, []);
  return (
    <div className="slowBreath">
      <canvas width="1025" height="1024"></canvas>
      <section>
        <div className="inhale">Inhale Deeply</div>
        <div className="exhale">Exhale Softly</div>
      </section>
    </div>
  );
};
