import React, { Component } from "react";
import GlslCanvas from "glslCanvas";
import "./SlowBreaths.css";

const frag = `#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;

varying vec2 v_texcoord;

void main(void)
{
    vec2 uv = -1. + 2. * v_texcoord;
    gl_FragColor = vec4(
        abs(sin(cos(u_time+3.*uv.y)*2.*uv.x+u_time)),
        abs(cos(sin(u_time+2.*uv.x)*3.*uv.y+u_time)),
        1.0,
        1.0);
}`;

export default class SlowBreaths extends Component {
  componentDidMount() {
    const canvas = document.querySelector("canvas");
    const sandbox = new GlslCanvas(canvas);
    sandbox.setUniform("u_texture", "displacement1.jpg")
    sandbox.load(frag);
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
