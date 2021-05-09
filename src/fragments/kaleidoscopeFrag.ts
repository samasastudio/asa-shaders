import GlslCanvas from "glslCanvas";
import Image1 from "../assets/images/trails.jpg";
import Image2 from "../assets/images/flowers.jpg";
import Image3 from "../assets/images/light.jpg";
import { windowSizer } from "../utils/windowSizer"

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

const imgList = [Image1, Image2, Image3];

export const nextImage = (images : string[], sandbox: typeof GlslCanvas) : void => {
  const next = images.shift();
  sandbox.setUniform("image", next);
  images.push(next);
};

export const renderKS = () : void => {
  const canvas = document.querySelector("canvas");
  const fragSandbox = new GlslCanvas(canvas);

  windowSizer(canvas, 100);

  window.addEventListener("resize", () => {
    windowSizer(canvas, 100);
  });

  fragSandbox.load(frag);
  nextImage(imgList, fragSandbox);
};
