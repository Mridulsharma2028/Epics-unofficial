import React from "react";
import { riskColor, riskBg } from "@/lib/utils";

export function RiskBadge({ risk }: { risk: string }) {
  return (
    <span style={{
      background: riskBg(risk), color: riskColor(risk), fontWeight: 600, fontSize: 12,
      padding: "3px 10px", borderRadius: 999, letterSpacing: 0.2,
    }}>{risk}</span>
  );
}
