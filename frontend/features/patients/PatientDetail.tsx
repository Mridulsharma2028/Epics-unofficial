"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, Pill, TrendingUp } from "lucide-react";
import { C, FONT_BODY, FONT_HEAD } from "@/lib/theme";
import { riskColor } from "@/lib/utils";
import { useApp } from "@/lib/context";
import { MOCK_PATIENTS } from "@/lib/mockData";
import { Card } from "@/components/ui/Card";
import { Btn } from "@/components/ui/Button";
import { RiskBadge } from "@/components/ui/RiskBadge";

// Blueprint: doctor/patients/[id] — live vitals, AI risk prediction and
// consultation notes for a single patient (blueprint section 3, "Doctor
// Dashboard" scope).
export function PatientDetail({ patientId }: { patientId: string }) {
  const { t } = useApp();
  const router = useRouter();
  const [note, setNote] = useState("");
  const p = MOCK_PATIENTS.find((x) => x.id === patientId);

  if (!p) {
    return (
      <div>
        <div onClick={() => router.push("/doctor/dashboard")} style={{ fontSize: 12.5, color: C.inkSoft, cursor: "pointer" }}>{t.backToQueue}</div>
        <div style={{ marginTop: 20, fontSize: 14 }}>Patient not found in demo dataset.</div>
      </div>
    );
  }

  return (
    <div>
      <div onClick={() => router.push("/doctor/dashboard")} style={{ fontSize: 12.5, color: C.inkSoft, cursor: "pointer", marginBottom: 14 }}>{t.backToQueue}</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <div style={{ fontFamily: FONT_HEAD, fontSize: 22, fontWeight: 600 }}>{p.name}</div>
          <div style={{ fontSize: 13, color: C.inkSoft }}>{p.id} · {t.ageWord} {p.age} · {p.village}</div>
        </div>
        <RiskBadge risk={p.risk} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <Card>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: C.inkSoft, marginBottom: 10 }}>{t.liveVitals}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
            {[[t.tempLabel, p.temp + "°F"], [t.hrLabel, p.hr + " bpm"], [t.spo2Label, p.spo2 + "%"]].map(([l, v]) => (
              <div key={l} style={{ background: C.bg, borderRadius: 10, padding: 12 }}>
                <div style={{ fontSize: 17, fontWeight: 600 }}>{v}</div>
                <div style={{ fontSize: 11.5, color: C.inkSoft }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: C.inkSoft, marginBottom: 6 }}>{t.presentingComplaint}</div>
            <div style={{ fontSize: 13.5 }}>{p.condition}</div>
          </div>
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: C.inkSoft, marginBottom: 6 }}>{t.aiRiskPrediction}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <TrendingUp size={15} color={riskColor(p.risk)} />
              <span style={{ fontSize: 13.5 }}>{t.modelFlags} <b>{p.risk}</b> {t.riskBasedOn}</span>
            </div>
          </div>
        </Card>
        <Card>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: C.inkSoft, marginBottom: 10 }}>{t.consultationNotes}</div>
          <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder={t.notesPlaceholder}
            style={{ width: "100%", minHeight: 130, borderRadius: 9, border: `1px solid ${C.line}`, padding: 12, fontSize: 13.5, fontFamily: FONT_BODY, resize: "vertical" }} />
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <Btn size="sm" icon={FileText}>{t.saveToRecord}</Btn>
            <Btn size="sm" kind="subtle" icon={Pill}>{t.addPrescription}</Btn>
          </div>
        </Card>
      </div>
    </div>
  );
}
