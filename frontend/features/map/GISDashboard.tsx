"use client";
import React, { useEffect, useState } from "react";
import { C, FONT_BODY } from "@/lib/theme";
import { riskColor } from "@/lib/utils";
import { useApp } from "@/lib/context";
import { MOCK_CASES, DiseaseCase } from "@/lib/mockData";
import { Card } from "@/components/ui/Card";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GISMap } from "@/components/GISMap";
import { getDiseaseCases } from "@/services/gisService";

// Blueprint module: "GIS Disease Map" (government/map) — filterable
// hotspot view. See blueprint section 15. Cases load from
// GET /api/gis/cases (falls back to lib/mockData.ts while loading / if the
// backend is unreachable).
export function GISDashboard() {
  const { t } = useApp();
  const [disease, setDisease] = useState("All");
  const [sev, setSev] = useState("All");
  const [cases, setCases] = useState<DiseaseCase[]>(MOCK_CASES);

  useEffect(() => {
    getDiseaseCases().then(setCases);
  }, []);

  const diseases = ["All", ...Array.from(new Set(cases.map((c) => c.disease)))];

  return (
    <div>
      <SectionLabel>{t.gisTitle}</SectionLabel>
      <div style={{ display: "flex", gap: 10, margin: "14px 0 18px" }}>
        <select value={disease} onChange={(e) => setDisease(e.target.value)} style={{ padding: "9px 12px", borderRadius: 8, border: `1px solid ${C.line}`, fontSize: 13, fontFamily: FONT_BODY }}>
          {diseases.map((d) => <option key={d}>{d}</option>)}
        </select>
        <select value={sev} onChange={(e) => setSev(e.target.value)} style={{ padding: "9px 12px", borderRadius: 8, border: `1px solid ${C.line}`, fontSize: 13, fontFamily: FONT_BODY }}>
          {["All", "HIGH", "MODERATE", "LOW"].map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      <Card>
        <GISMap diseaseFilter={disease} sevFilter={sev} cases={cases} />
      </Card>
      <div style={{ display: "flex", gap: 16, marginTop: 12, fontSize: 12.5, color: C.inkSoft }}>
        {["HIGH", "MODERATE", "LOW"].map((s) => (
          <div key={s} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 9, height: 9, borderRadius: 999, background: riskColor(s) }} /> {s}
          </div>
        ))}
      </div>
      <div style={{ fontSize: 11.5, color: C.inkSoft, marginTop: 10 }}>{t.hotspotNote}</div>
    </div>
  );
}
