"use client";
import React, { useState } from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { C, FONT_BODY } from "@/lib/theme";
import { useApp } from "@/lib/context";
import { MEDICINES, INTERACTIONS } from "@/lib/mockData";
import { Card } from "@/components/ui/Card";
import { SectionLabel } from "@/components/ui/SectionLabel";

// Blueprint module: "Medicine Safety" (patient/medicines) — Demo priority,
// interaction/dosage alert workflow, explicitly not autonomous prescribing.
export function MedicineSafety() {
  const { t } = useApp();
  const [a, setA] = useState("Ibuprofen");
  const [b, setB] = useState("Warfarin");
  const key = `${a}+${b}`, key2 = `${b}+${a}`;
  const warning = INTERACTIONS[key] || INTERACTIONS[key2];

  return (
    <div>
      <SectionLabel>{t.medSafetyTitle}</SectionLabel>
      <div style={{ color: C.inkSoft, fontSize: 13, marginBottom: 16 }}>{t.medSafetySub}</div>
      <Card style={{ maxWidth: 480 }}>
        {[[t.medicineA, a, setA], [t.medicineB, b, setB]].map(([label, val, set]: any) => (
          <div key={label} style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: C.inkSoft, marginBottom: 6 }}>{label}</div>
            <select value={val} onChange={(e) => set(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 9, border: `1px solid ${C.line}`, fontSize: 13.5, fontFamily: FONT_BODY }}>
              {MEDICINES.map((m) => <option key={m}>{m}</option>)}
            </select>
          </div>
        ))}
        {warning ? (
          <div style={{ background: C.brickPale, color: C.brick, padding: "12px 14px", borderRadius: 9, fontSize: 13, display: "flex", gap: 8 }}>
            <AlertTriangle size={16} style={{ flexShrink: 0 }} /> {warning}
          </div>
        ) : (
          <div style={{ background: C.tealPale, color: C.teal, padding: "12px 14px", borderRadius: 9, fontSize: 13, display: "flex", gap: 8 }}>
            <CheckCircle2 size={16} style={{ flexShrink: 0 }} /> {t.noInteraction}
          </div>
        )}
      </Card>
    </div>
  );
}
