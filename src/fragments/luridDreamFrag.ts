import GlslCanvas from "glslCanvas";
import image from "../assets/images/Bang-3.jpg";
import { windowSizer } from "../utils/windowSizer";


const frag = `
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 u_spectrum;

uniform sampler2D u_image;

varying vec3 v_normal;
varying vec2 v_texcoord;

vec4 sampleColor(vec2 uv) {

    vec4 color = texture2D(u_image, uv);
    
    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
    color = vec4(0.0);
    }
    
    return color;
}

void main(void)
{
    vec2 uv = v_texcoord;
    uv.y = 1.0 - uv.y;
    
    float loopOffset = 0.756;
    
    vec2 distortion = vec2(
      sin(u_time * loopOffset + uv.x * 8.0 + uv.y * 5.0),
      sin(u_time * loopOffset + uv.x * 6.0 + uv.y * 8.0)
    );
    
    vec4 redChannel = texture2D(u_image, uv + distortion);
    redChannel.g = 0.0;
    redChannel.b = 0.0;
    
    vec4 blueChannel = texture2D(u_image, uv);
    blueChannel.r = 0.0;
    blueChannel.g = 0.0;
    
    vec4 greenChannel = texture2D(u_image, uv - distortion);
    greenChannel.b = 0.0;
    greenChannel.r = 0.0;
    
    vec4 color = redChannel + greenChannel + blueChannel;
    gl_FragColor = color;
}`

export const renderLD = (className: string): void => {
  const canvas = document.createElement("canvas");
  const sandbox = new GlslCanvas(canvas);
  document.getElementsByClassName(className)[0].appendChild(canvas);

  windowSizer(canvas);

  window.addEventListener("resize", () => {
    windowSizer(canvas);
  });

  sandbox.load(frag);
  sandbox.setUniform("u_image", image);
}