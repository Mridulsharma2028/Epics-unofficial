import React from "react";
import { C, FONT_BODY } from "@/lib/theme";

export function SystemDiagram() {
  const nodes = [
    { label: "Patient", x: 40, y: 40 }, { label: "AI Triage", x: 190, y: 20 },
    { label: "Doctor", x: 340, y: 40 }, { label: "IoT Vitals", x: 40, y: 150 },
    { label: "Emergency", x: 190, y: 170 }, { label: "GIS / Gov", x: 340, y: 150 },
  ];
  const edges: [number, number][] = [[0, 1], [1, 2], [0, 3], [3, 4], [4, 5], [1, 4], [2, 4]];
  return (
    <svg viewBox="0 0 400 210" style={{ width: "100%", height: "auto" }}>
      {edges.map(([a, b], i) => (
        <line key={i} x1={nodes[a].x + 46} y1={nodes[a].y + 16} x2={nodes[b].x + 46} y2={nodes[b].y + 16} stroke={C.line} strokeWidth="2" />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <rect x={n.x} y={n.y} width="92" height="34" rx="9" fill={i === 4 ? C.marigold : C.tealPale} stroke={i === 4 ? C.marigoldDeep : C.teal} strokeWidth="1.2" />
          <text x={n.x + 46} y={n.y + 21} textAnchor="middle" fontSize="10.5" fontFamily={FONT_BODY} fontWeight="600" fill={C.tealDeep}>{n.label}</text>
        </g>
      ))}
    </svg>
  );
}
