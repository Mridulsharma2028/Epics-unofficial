"use client";
import React, { useEffect, useState } from "react";
import { C } from "@/lib/theme";
import { useApp } from "@/lib/context";
import { MOCK_CASES, DiseaseCase } from "@/lib/mockData";
import { Card } from "@/components/ui/Card";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getDiseaseCases } from "@/services/gisService";

// Blueprint: government/diseases — reported disease cases table, loaded
// from GET /api/gis/cases (falls back to lib/mockData.ts while loading /
// if the backend is unreachable).
export function CasesTable() {
  const { t } = useApp();
  const [cases, setCases] = useState<DiseaseCase[]>(MOCK_CASES);

  useEffect(() => {
    getDiseaseCases().then(setCases);
  }, []);

  return (
    <div>
      <SectionLabel>{t.reportedCases}</SectionLabel>
      <Card style={{ marginTop: 18, padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
          <thead><tr style={{ background: C.bg, textAlign: "left" }}>
            {[t.colDistrict, t.colDisease, t.colSeverity, t.colReported].map((h) => <th key={h} style={{ padding: "10px 16px", fontSize: 12, color: C.inkSoft, fontWeight: 600 }}>{h}</th>)}
          </tr></thead>
          <tbody>
            {cases.map((c) => (
              <tr key={c.id} style={{ borderTop: `1px solid ${C.line}` }}>
                <td style={{ padding: "10px 16px" }}>{c.district}</td>
                <td style={{ padding: "10px 16px" }}>{c.disease}</td>
                <td style={{ padding: "10px 16px" }}><RiskBadge risk={c.severity} /></td>
                <td style={{ padding: "10px 16px", color: C.inkSoft }}>{t.todayLabel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
