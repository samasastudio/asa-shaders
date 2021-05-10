import GlslCanvas from "glslCanvas";
import image from "../assets/images/Blue.jpg";
import { windowSizer } from "../utils/windowSizer";


const frag = `
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

uniform sampler2D texture0;
uniform sampler2D texture1;
uniform sampler2D texture2;
uniform sampler2D texture3;
uniform sampler2D prevFrame;
uniform sampler2D prevPass;
uniform sampler2D cat;
uniform sampler2D image;

varying vec3 v_normal;
varying vec2 v_texcoord;

vec2 aspect(vec2 uv, float texture_ratio, float canvas_ratio) {
    
    //if canvas is too portrait for texture, streatch across
    //else if landscape then stretch down
    if (texture_ratio > canvas_ratio) {
        float diff = canvas_ratio / texture_ratio;
        uv.x *= diff;
        uv.x += (1.0 - diff) / 2.0;
    } else {
        float diff = texture_ratio / canvas_ratio;
        uv.y *= diff;
        uv.y += (1.0 - diff) / 2.0;
    };
    
    return uv;
}

void main(void)
{
    vec2 uv = v_texcoord;
    uv.y = 1.0 - uv.y;
    
    //find out the aspect ratios
    float texture_ratio = 1200.0 / 1800.0;
    float canvas_ratio = u_resolution.x / u_resolution.y;
    
    vec2 coords = aspect(uv, texture_ratio, canvas_ratio);
    
    //safe area
    coords = mix(vec2(0.1, 0.1), vec2(0.9, 0.9), coords);
    
    float blocks = 12.0;
    float x = floor(uv.x * 64.0);
    float y = floor(uv.y * 64.0);
    
    vec2 distortion = 0.02 * vec2(
    sin(u_time * 0.5 + x * 1.0 + y * 1.5), 
    cos(u_time * 0.2 + x * 1.1 + y * 2.0)
    );

    
    vec4 color = texture2D(image, coords + distortion);
    gl_FragColor = color;
}`

export const renderWS = (className: string): void => {
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