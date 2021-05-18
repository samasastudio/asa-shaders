import { FC, useEffect, useRef } from "react";
import GlslCanvas from "glslCanvas";

interface CanvasProps {
  height?: number | string;
  width?: number | string;
  frag: string;
  setUniforms?: { [key: string]: string };
}

export const ShaderCanvas: FC<CanvasProps> = (props): JSX.Element => {
  
  const canvasRef = useRef<HTMLCanvasElement>();
  const containerRef = useRef<HTMLDivElement>();

  const resizer = (
    node: HTMLCanvasElement,
    container: HTMLDivElement
  ): void => {
    node.width = container.clientWidth + window.devicePixelRatio;
    node.height = container.clientHeight + window.devicePixelRatio;
    node.style.width = container.clientWidth + "px";
    node.style.height = container.clientHeight + "px";
  };

  useEffect(() => {
    const node = canvasRef.current;
    const container = containerRef.current;
    const sandbox = new GlslCanvas(canvasRef.current);
    for (let k in props.setUniforms) {
      sandbox.setUniform(k, props.setUniforms[k]);
    }

    resizer(node, container);
    sandbox.load(props.frag);

    const handler = () => {
      if (
        node.clientWidth !== container.clientWidth ||
        node.clientHeight !== container.clientHeight
      )
        resizer(canvasRef.current, containerRef.current);
    };

    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};
