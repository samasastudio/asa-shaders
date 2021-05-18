import React, { FC, useEffect, useRef } from 'react';
import {windowSizer } from "../utils/windowSizer"
import GlslCanvas from 'glslCanvas';

interface CanvasProps {
  height?: number | string;
  width?: number | string;
  frag: string;
}

export const ShaderCanvas: FC<CanvasProps> = (props): JSX.Element => {

  const canvasRef = useRef();

  useEffect(() => {

    const node = canvasRef.current as any;
    node.width = 500 + window.devicePixelRatio;
    node.height = 500 + window.devicePixelRatio;
    node.style.width = "500px";
    node.style.height = "500px";
    const sandbox = new GlslCanvas(canvasRef.current);
    sandbox.load(props.frag);
  }, [])

  return (
    <canvas ref={canvasRef}></canvas>
  )
}
