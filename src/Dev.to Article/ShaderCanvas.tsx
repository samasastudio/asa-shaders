import React, { FC, useEffect, useRef } from 'react';
import {windowSizer } from "../utils/windowSizer"
import GlslCanvas from 'glslCanvas';

interface CanvasProps {
  height?: number | string;
  width?: number | string;
  frag: string;
  setUniforms?: {[key: string]: string}
}

export const ShaderCanvas: FC<CanvasProps> = (props): JSX.Element => {

  const canvasRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    const node = canvasRef.current as any;
    const container = containerRef.current as any;
    const sandbox = new GlslCanvas(canvasRef.current);
    node.width = container.clientWidth + window.devicePixelRatio;
    node.height = container.clientHeight + window.devicePixelRatio;
    node.style.width = container.clientWidth + "px";
    node.style.height = container.clientHeight + "px";
    sandbox.load(props.frag);
    for (let k in props.setUniforms) {
      sandbox.setUniform(k, props.setUniforms[k]);
    }
  }, [])

  return (
    <div ref={containerRef} style={{width: "100%", height: "100%"}}>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}
