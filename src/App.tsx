import "./App.css";
import { Kaleidoscope } from "./components/Kaleidoscope";
import { SlowBreaths } from "./components/SlowBreaths";
import { FBM } from "./components/FBM";
import { ASA } from "./components/ASA";
import { FunctionComponent } from "react";

const App : FunctionComponent<{}> = (props) : JSX.Element => {
  return <ASA />;
}

export default App;
