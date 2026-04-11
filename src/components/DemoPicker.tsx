import { FC, ChangeEvent } from "react";
import type { DemoId } from "../demos/registry";
import { DEMOS } from "../demos/registry";

type Props = {
  value: DemoId;
  onChange: (id: DemoId) => void;
};

export const DemoPicker: FC<Props> = ({ value, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as DemoId);
  };

  return (
    <label
      style={{
        position: "fixed",
        top: 12,
        left: 12,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 10px",
        background: "rgba(0,0,0,0.65)",
        color: "#eee",
        fontFamily: "system-ui, sans-serif",
        fontSize: 14,
        borderRadius: 4,
        border: "1px solid rgba(255,255,255,0.25)",
      }}
    >
      <span>Demo</span>
      <select
        value={value}
        onChange={handleChange}
        aria-label="Choose shader demo"
        style={{
          maxWidth: "min(70vw, 220px)",
          padding: "4px 8px",
          background: "#111",
          color: "#eee",
          border: "1px solid #444",
          borderRadius: 2,
        }}
      >
        {DEMOS.map((d) => (
          <option key={d.id} value={d.id}>
            {d.label}
          </option>
        ))}
      </select>
    </label>
  );
};
