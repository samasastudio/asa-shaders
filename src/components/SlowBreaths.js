import React, { Component } from "react";
import GlslCanvas from "glslCanvas";
import "./SlowBreaths.css";
import Displacement from "../assets/images/displacement1.jpg";

const frag = `#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;

uniform sampler2D displacement;

varying vec2 v_texcoord;

vec4 rgb(float r, float g, float b) {
    return vec4(r/255.0, g/255.0, b/255.0, 1);
}

void main(void)
{
    vec2 uv = v_texcoord;
    
    vec2 point = fract(uv * 0.1 + u_time * 0.05);
    
    vec4 dispColor = texture2D(displacement, point);
    
    vec4 tl = rgb(251.0, 41.0, 212.0);
    vec4 tr = rgb(0.0, 255.0, 224.0);
    vec4 bl = rgb(250.0, 255.0, 0.0);
    vec4 br = rgb(231.0, 244.0, 255.0);
    
    float dispX = mix(-0.5, 0.5, dispColor.r);
    float dispY = mix(-0.5, 0.5, dispColor.r);
    
    vec4 color = mix(
        mix(tl, tr, uv.x + dispX), 
        mix(bl, br, uv.x - dispX), 
        uv.y + dispY
    );
    
    gl_FragColor = color;
}`;

export default class SlowBreaths extends Component {
  componentDidMount() {
    const canvas = document.querySelector("canvas");
    const sandbox = new GlslCanvas(canvas);
    sandbox.load(frag);
    sandbox.setUniform("displacement", Displacement)
  }

  render() {
    return (
      <div className="slowBreath">
        <canvas width="1025" height="1024"></canvas>
        <section>
          <div className="inhale">Inhale Deeply</div>
          <div className="exhale">Exhale Softly</div>
        </section>
      </div>
    );
  }
}
