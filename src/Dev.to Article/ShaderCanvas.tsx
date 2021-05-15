import React, {FC, useEffect} from 'react';
import GlslCanvas from 'glslCanvas';

interface CanvasProps {
  height: number;
  width: number;
  frag: string | string[];
}

export const ShaderCanvas: FC<CanvasProps> = (props) : JSX.Element => {

  useEffect(() => {
    const canvas = document.querySelector("canvas");
  const sandbox = new GlslCanvas(canvas);

  canvas.width = props.width;
  canvas.height = props.height;

  sandbox.load(props.frag);
  })

  return (
    <canvas></canvas>
  )
}
