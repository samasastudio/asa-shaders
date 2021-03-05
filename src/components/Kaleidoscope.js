import React, { Component } from "react";
import GlslCanvas from "glslCanvas";
import "./Kaleidoscope.css";
import Image1 from "../assets/images/trails.jpg";
import Image2 from "../assets/images/flowers.jpg";
import Image3 from "../assets/images/light.jpg";

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

    vec2 mouse = u_mouse / u_resolution;
    
    //angle and radius
    float radius = length(uv) * mix(1.0, 2.0, mouse.x);
    float angle = atan(uv.y, uv.x);
    
    angle /= PI * 2.0;
    angle *= SEGMENTS;
    
    if (mod(angle, 2.0) >= 1.0) {
        angle = fract(angle);
    } else {
        angle = 1.0 - fract(angle);
    }
    
    angle += u_time * 0.1;
    angle += mouse.y;
    angle /= SEGMENTS;
    angle *= PI * 2.0;
    
    vec2 point = vec2(radius * cos(angle), radius * sin(angle));
    point *= vec2(1.0, 1000.0 / 1500.0);
    point = fract(point);
    
    vec4 color = texture2D(image, point);
    
    gl_FragColor = color;
}`;

export default class Kaleidoscope extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [Image1, Image2, Image3],
      sandbox: null,
    };

    this.nextImage = this.nextImage.bind(this);
  }

  componentDidMount() {
    const canvas = document.querySelector("canvas");
    const sandbox = new GlslCanvas(canvas);

    this.setState({ sandbox }, () => {
      const calcSize = () => {
        let ww = window.innerWidth;
        let wh = window.innerHeight;
        let dpi = window.devicePixelRatio;

        //can add 500 offset here for side nav
        let s = Math.max(wh, ww + 100);

        canvas.width = s + dpi;
        canvas.height = s + dpi;

        canvas.style.width = s + "px";
        canvas.style.height = s + "px";
      };

      calcSize();

      window.addEventListener("resize", () => {
        calcSize();
      });

      sandbox.load(frag);
      this.nextImage();
    });
  }

  nextImage() {
    const { images, sandbox } = this.state;

    const next = images.shift();
    sandbox.setUniform("image", next);
    images.push(next);
  }

  render() {
    return (
      <div className="kaleidoscope">
        <div className="canvas-holder">
          <canvas onClick={this.nextImage}></canvas>
        </div>
        {/* <div className="info">
          <header>
            <h1>Sam Asa Johnson</h1>
            <p>Software Engineer // Sound Designer</p>
          </header>
          <nav>
            <a href="#">Instagram</a>
            <a href="#">Unsplash</a>
            <a href="#">500px</a>
          </nav>
        </div> */}
      </div>
    );
  }
}
