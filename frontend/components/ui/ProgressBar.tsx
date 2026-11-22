import React from "react";
import { C } from "@/lib/theme";

export function ProgressBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div style={{ background: C.bgAlt, borderRadius: 6, height: 8, overflow: "hidden" }}>
      <div style={{ width: `${pct}%`, background: color, height: "100%", borderRadius: 6, transition: "width .4s" }} />
    </div>
  );
}
