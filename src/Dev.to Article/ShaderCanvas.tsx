import React, { FC, useEffect } from 'react';
import GlslCanvas from 'glslCanvas';

interface CanvasProps {
  height: number | string;
  width: number | string;
  frag: string;
}

export const ShaderCanvas: FC<CanvasProps> = (props): JSX.Element => {

  useEffect(() => {
    const canvas = document.querySelector("canvas");
    const sandbox = new GlslCanvas(canvas);
    sandbox.load(props.frag);
  }, [])

  return (
    <canvas style={{width: props.width, height: props.height}}></canvas>
  )
}
