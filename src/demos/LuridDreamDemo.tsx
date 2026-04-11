import { FC } from "react";
import { ShaderCanvas } from "../Dev.to Article/ShaderCanvas";
import { frag } from "../fragments/luridDreamFrag";
import image from "../assets/images/Bang-3.jpg";

/** Full-viewport lurid-dream shader (glslCanvas + image uniform). */
export const LuridDreamDemo: FC = () => (
  <ShaderCanvas frag={frag} setUniforms={{ u_image: image }} />
);
