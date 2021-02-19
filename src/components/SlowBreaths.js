import React, { Component } from "react";
import GlslCanvas from "glslCanvas";
import "./SlowBreaths.css";

export default class SlowBreaths extends Component {

  componentDidMount() {
    const canvas = document.querySelector("canvas");
    const sandbox = new GlslCanvas(canvas);
    sandbox.load("void main() { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }")
  }

  render() {
    return (
      <div>
        <canvas></canvas>
        <section>
          <div className="inhale">Inhale Deeply</div>
          <div className="exhale">Exhale Softly</div>
        </section>
      </div>
    );
  }
}
