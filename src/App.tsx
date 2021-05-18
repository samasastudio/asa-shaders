import "./App.css";
import { Kaleidoscope } from "./components/Kaleidoscope";
import { SlowBreaths } from "./components/SlowBreaths";
import { FBM } from "./components/FBM";
import { ASA } from "./components/ASA";
import { FunctionComponent } from "react";
import { ShaderCanvas } from "./Dev.to Article/ShaderCanvas"
import { frag } from './fragments/fbmFrag'
import image from "./assets/images/Bang-3.jpg";

const App: FunctionComponent<{}> = (props): JSX.Element => {
  return (
    <div style={{ width: "1000px", height: "1000px", backgroundColor: "black" }}>
      <ShaderCanvas frag={frag} setUniforms={{u_image: image}}/>
      {/* <FBM/> */}
    </div>
  );
};

export default App;
