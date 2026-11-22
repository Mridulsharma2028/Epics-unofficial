import React from "react";
import { C, FONT_BODY } from "@/lib/theme";
import { riskColor } from "@/lib/utils";
import { MOCK_CASES, MOCK_HOSPITALS, DiseaseCase, Hospital } from "@/lib/mockData";

// Schematic SVG stand-in for a real Leaflet/MapLibre layer (blueprint
// section 15 "GIS Disease Surveillance"). Good enough to demo hotspot
// filtering; swap for real map tiles + GeoJSON for production.
//
// `cases`/`hospitals` are optional so existing callers keep working
// unchanged; features/map/GISDashboard.tsx and the government dashboard
// page pass in data fetched from GET /api/gis/cases and
// GET /api/gis/hospitals via services/gisService.ts.
export function GISMap({
  diseaseFilter, sevFilter, cases = MOCK_CASES, hospitals = MOCK_HOSPITALS,
}: {
  diseaseFilter: string; sevFilter: string; cases?: DiseaseCase[]; hospitals?: Hospital[];
}) {
  const filtered = cases.filter(
    (c) => (diseaseFilter === "All" || c.disease === diseaseFilter) && (sevFilter === "All" || c.severity === sevFilter)
  );
  return (
    <svg viewBox="0 0 360 240" style={{ width: "100%", height: 300, background: C.bg, borderRadius: 10 }}>
      <rect x="14" y="14" width="332" height="212" rx="16" fill={C.tealPale} stroke={C.teal} strokeWidth="1" strokeDasharray="4 3" />
      {hospitals.slice(0, 2).map((h, i) => (
        <g key={h.name}>
          <rect x={30 + i * 200} y={190} width="16" height="16" fill={C.tealDeep} rx="3" />
          <text x={50 + i * 200} y={202} fontSize="9" fill={C.tealDeep} fontFamily={FONT_BODY}>{h.name.split(" ")[0]}</text>
        </g>
      ))}
      {filtered.map((c) => (
        <g key={c.id}>
          <circle cx={c.x} cy={c.y} r={c.severity === "HIGH" ? 13 : c.severity === "MODERATE" ? 10 : 7} fill={riskColor(c.severity)} opacity="0.22" />
          <circle cx={c.x} cy={c.y} r={c.severity === "HIGH" ? 6 : c.severity === "MODERATE" ? 5 : 4} fill={riskColor(c.severity)} />
          <text x={c.x} y={c.y - (c.severity === "HIGH" ? 18 : 14)} fontSize="8.5" textAnchor="middle" fill={C.inkSoft} fontFamily={FONT_BODY}>{c.district}</text>
        </g>
      ))}
    </svg>
  );
}
