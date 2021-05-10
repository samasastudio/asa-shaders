import GlslCanvas from "glslCanvas";
import image from "../assets/images/Dark Shift 05.jpg";
import { windowSizer } from "../utils/windowSizer";

const frag = `
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 spectrum;
uniform float strength;

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

mat2 rotation2d(float angle) {
    float s = sin(angle);
    float c = cos(angle);

    return mat2(
        c, -s,
        s, c
    );
}

float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

void main(void)
{
    vec2 uv = (gl_FragCoord.xy - 100.0) / (u_resolution.xy - 200.0);
    uv.y = 1.0 - uv.y;
    
    vec2 distortion = 2.0 * sin(-0.91041565 + u_time * 0.1) * 0.0025 * vec2(
      sin(u_time + uv.x * 8.0 + uv.y * 5.0),
      sin(u_time + uv.x * 6.0 + uv.y * 8.0)
    );
    
    distortion *= mix(0.9, 1.1, rand(uv));
    
    vec4 redChannel = sampleColor(uv + distortion * rotation2d(1.0));
    redChannel.g = 0.0;
    redChannel.b = 0.0;
    
    vec4 blueChannel = sampleColor(uv + distortion * rotation2d(3.0));
    blueChannel.r = 0.0;
    blueChannel.g = 0.0;
    
    vec4 greenChannel = sampleColor(uv + distortion * rotation2d(2.0));
    greenChannel.b = 0.0;
    greenChannel.r = 0.0;
    
    vec4 color = redChannel + greenChannel + blueChannel;
    
    gl_FragColor = color;
}`

export const renderLW = (className: string): void => {
  const canvas = document.createElement("canvas");
  const sandbox = new GlslCanvas(canvas);
  document.getElementsByClassName(className)[0].appendChild(canvas);

  // windowSizer(canvas);

  // window.addEventListener("resize", () => {
  //   windowSizer(canvas);
  // });

  // canvas.width = s + dpi;
  // canvas.height = s + dpi;

  canvas.style.width = `${window.innerWidth + (window.innerWidth * 0.1)}px`;
  canvas.style.height = `${window.innerHeight + (window.innerHeight * 0.1)}px`;

  sandbox.load(frag);
  sandbox.setUniform("u_image", image);
}