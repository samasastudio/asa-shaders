import "./App.css";
import { Kaleidoscope } from "./components/Kaleidoscope";
import { SlowBreaths } from "./components/SlowBreaths";
import { FBM } from "./components/FBM";
import { LuridDream } from "./components/LuridDream";
import { FunctionComponent } from "react";

const App : FunctionComponent<{}> = (props) : JSX.Element => {
  return <LuridDream />;
}

export default App;
