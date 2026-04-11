import "./App.css";
import { FC, useState } from "react";
import { DemoPicker } from "./components/DemoPicker";
import {
  DEFAULT_DEMO_ID,
  type DemoId,
  getDemoById,
} from "./demos/registry";

const App: FC = () => {
  const [demoId, setDemoId] = useState<DemoId>(DEFAULT_DEMO_ID);
  const entry = getDemoById(demoId);
  const Demo = entry?.Component;

  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "black" }}>
      <DemoPicker value={demoId} onChange={setDemoId} />
      {Demo ? (
        <div key={demoId} style={{ width: "100%", height: "100%" }}>
          <Demo />
        </div>
      ) : null}
    </div>
  );
};

export default App;
