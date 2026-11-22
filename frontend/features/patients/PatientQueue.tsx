"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, User } from "lucide-react";
import { C } from "@/lib/theme";
import { riskColor, riskBg } from "@/lib/utils";
import { useApp } from "@/lib/context";
import { MOCK_PATIENTS } from "@/lib/mockData";
import { Card } from "@/components/ui/Card";
import { IconTile } from "@/components/ui/IconTile";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { SectionLabel } from "@/components/ui/SectionLabel";

// Blueprint module: "Doctor Dashboard" — patient queue with risk alerts
// (doctor/dashboard and doctor/patients both render this). Clicking a
// patient navigates to the dynamic detail route doctor/patients/[id].
export function PatientQueue() {
  const { t, name } = useApp();
  const router = useRouter();
  const sorted = [...MOCK_PATIENTS].sort((a, b) => Number(b.risk === "HIGH") - Number(a.risk === "HIGH"));

  return (
    <div>
      <SectionLabel>{t.patientQueue}</SectionLabel>
      <div style={{ color: C.inkSoft, fontSize: 14, marginBottom: 18 }}>{name} · {MOCK_PATIENTS.length} {t.patientsToday}</div>
      <div style={{ display: "grid", gap: 10 }}>
        {sorted.map((p) => (
          <Card key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", borderColor: p.risk === "HIGH" ? C.brick : C.line }} className="arn-rise">
            <div onClick={() => router.push(`/doctor/patients/${p.id}`)} style={{ display: "flex", gap: 14, alignItems: "center", flex: 1 }}>
              <IconTile icon={User} bg={riskBg(p.risk)} color={riskColor(p.risk)} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 14.5 }}>{p.name} <span style={{ fontWeight: 400, color: C.inkSoft, fontSize: 12.5 }}>· {p.age} {t.ageLabel} · {p.village}</span></div>
                <div style={{ fontSize: 12.5, color: C.inkSoft }}>{p.condition}</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ fontSize: 12, color: C.inkSoft, textAlign: "right" }}>{t.spo2Label} {p.spo2}% · {p.hr} bpm</div>
              <RiskBadge risk={p.risk} />
              <ChevronRight size={16} color={C.inkSoft} onClick={() => router.push(`/doctor/patients/${p.id}`)} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
