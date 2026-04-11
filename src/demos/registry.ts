import type { ComponentType, FC } from "react";
import { ASA } from "../components/ASA";
import { FBM } from "../components/FBM";
import { Kaleidoscope } from "../components/Kaleidoscope";
import { SlowBreaths } from "../components/SlowBreaths";
import { LuridDreamDemo } from "./LuridDreamDemo";

/** Stable URL-friendly ids; do not rename once shipped (deep links / prefs). */
export const DEMO_IDS = {
  luridDream: "lurid-dream",
  slowBreaths: "slow-breaths",
  kaleidoscope: "kaleidoscope",
  fbm: "fbm",
  asa: "asa",
} as const;

export type DemoId = (typeof DEMO_IDS)[keyof typeof DEMO_IDS];

export type DemoDefinition = {
  id: DemoId;
  /** Short label for the picker */
  label: string;
  Component: ComponentType | FC;
};

export const DEMOS: readonly DemoDefinition[] = [
  { id: DEMO_IDS.luridDream, label: "Lurid Dream", Component: LuridDreamDemo },
  { id: DEMO_IDS.slowBreaths, label: "Slow Breaths", Component: SlowBreaths },
  { id: DEMO_IDS.kaleidoscope, label: "Kaleidoscope", Component: Kaleidoscope },
  { id: DEMO_IDS.fbm, label: "FBM", Component: FBM },
  { id: DEMO_IDS.asa, label: "ASA", Component: ASA },
] as const;

export function getDemoById(id: DemoId): DemoDefinition | undefined {
  return DEMOS.find((d) => d.id === id);
}

export const DEFAULT_DEMO_ID: DemoId = DEMO_IDS.luridDream;
