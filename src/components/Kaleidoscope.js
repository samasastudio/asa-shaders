import React, { Component } from "react";
import GlslCanvas from "glslCanvas";
import "./Kaleidoscope.css";
import Image from "../assets/images/trails.jpg";

const frag = `
#ifdef GL_ES
precision highp float;
#endif

#define SEGMENTS 32.0
#define PI 3.141592653589

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

uniform sampler2D image;

varying vec2 v_texcoord;

void main(void)
{
    vec2 uv = v_texcoord;
    uv *= 2.0;
    uv -= 1.0;
    
    //angle and radius
    float radius = length(uv);
    float angle = atan(uv.y, uv.x);
    
    angle /= PI * 2.0;
    angle *= SEGMENTS;
    
    if (mod(angle, 2.0) >= 1.0) {
        angle = fract(angle);
    } else {
        angle = 1.0 - fract(angle);
    }
    
    angle += u_time;
    angle /= SEGMENTS;
    angle *= PI * 2.0;
    
    vec2 point = vec2(radius * cos(angle), radius * sin(angle));
    point = fract(point);
    
    vec4 color = texture2D(image, point);
    
    gl_FragColor = color;
}`;

export default class Kaleidoscope extends Component {
  componentDidMount() {
    const canvas = document.querySelector("canvas");
    const sandbox = new GlslCanvas(canvas);

    const getSize = () => {
      let ww = window.innerWidth;
      let wh = window.innerHeight;
      let dpi = window.devicePixelRatio;
    
      let s = Math.max(wh, ww);
    
      canvas.width = s;
      canvas.height = s;

      canvas.style.width = s + "px";
      canvas.style.height = s + "px";
    }

    getSize();
    sandbox.load(frag);
    sandbox.setUniform("image", Image);
  }

  render() {
    return (
      <div className="kaleidoscope">
        <div className="canvas-holder">
          <canvas></canvas>
        </div>
        <div className="info">
        <header>
          <h1>Sam Asa Johnson</h1>
          <p>Software Engineer // Sound Designer</p>
        </header>
        <nav>
          <a href="#">Instagram</a>
          <a href="#">Unsplash</a>
          <a href="#">500px</a>
        </nav>
      </div>
      </div>
    );
  }
}
