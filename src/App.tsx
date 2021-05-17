import "./App.css";
import { Kaleidoscope } from "./components/Kaleidoscope";
import { SlowBreaths } from "./components/SlowBreaths";
import { FBM } from "./components/FBM";
import { ASA } from "./components/ASA";
import { FunctionComponent } from "react";
import { ShaderCanvas } from "./Dev.to Article/ShaderCanvas"
import { frag } from './fragments/fbmFrag'

const App: FunctionComponent<{}> = (props): JSX.Element => {
  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "black" }}>
      <ShaderCanvas width={"100%"} height={"100%"} frag={frag}/>
    </div>
  );
};

export default App;
