"use client";
import React from "react";
import Link from "next/link";
import { Activity, Bot, CalendarDays, ChevronRight, FileText, HeartPulse, QrCode, RadioTower, Siren } from "lucide-react";
import { C, FONT_HEAD } from "@/lib/theme";
import { useApp } from "@/lib/context";
import { Card } from "@/components/ui/Card";
import { IconTile } from "@/components/ui/IconTile";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SectionLabel } from "@/components/ui/SectionLabel";

// Blueprint module: "Patient Dashboard" — health score, vitals, risk,
// records, appointments, AI and emergency (all one page's quick links).
export default function PatientDashboardPage() {
  const { t, name } = useApp();
  const quickActions: [string, string, typeof Bot][] = [
    ["/patient/assistant", t.qaAssistant, Bot],
    ["/patient/vitals", t.qaVitals, HeartPulse],
    ["/patient/records", t.qaRecords, FileText],
    ["/patient/emergency", t.qaEmergency, Siren],
  ];

  return (
    <div>
      <SectionLabel>{t.welcomeBack} {name.split(" ")[0]}</SectionLabel>
      <div style={{ color: C.inkSoft, fontSize: 14, marginBottom: 22 }}>{t.todayStatus}</div>
      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 18 }}>
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 12.5, color: C.inkSoft, fontWeight: 600 }}>{t.healthScoreLabel}</div>
              <div style={{ fontFamily: FONT_HEAD, fontSize: 40, color: C.teal, fontWeight: 600 }}>82<span style={{ fontSize: 18, color: C.inkSoft }}>/100</span></div>
            </div>
            <RiskBadge risk="LOW" />
          </div>
          <ProgressBar value={82} max={100} color={C.teal} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginTop: 20 }}>
            {[[t.tempLabel, "98.4°F", HeartPulse], [t.hrLabel, "76 bpm", Activity], [t.spo2Label, "98%", RadioTower]].map(([l, v, Icon]: any) => (
              <div key={l} style={{ background: C.bg, borderRadius: 10, padding: 12 }}>
                <Icon size={15} color={C.teal} />
                <div style={{ fontSize: 17, fontWeight: 600, marginTop: 6 }}>{v}</div>
                <div style={{ fontSize: 11.5, color: C.inkSoft }}>{l}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div style={{ fontSize: 12.5, color: C.inkSoft, fontWeight: 600, marginBottom: 10 }}>{t.quickActions}</div>
          {quickActions.map(([href, label, Icon]) => (
            <Link key={href} href={href} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 8px", borderRadius: 8, textDecoration: "none", color: C.ink }}>
              <IconTile icon={Icon} size={30} />
              <div style={{ fontSize: 13.5, fontWeight: 500 }}>{label}</div>
              <ChevronRight size={14} color={C.inkSoft} style={{ marginLeft: "auto" }} />
            </Link>
          ))}
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginTop: 18 }}>
        <Card>
          <div style={{ fontSize: 12.5, color: C.inkSoft, fontWeight: 600, marginBottom: 10 }}>{t.upcomingAppt}</div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <IconTile icon={CalendarDays} bg={C.marigoldPale} color={C.marigoldDeep} />
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{t.apptDoctorLine}</div>
              <div style={{ fontSize: 12.5, color: C.inkSoft }}>{t.apptWhen}</div>
            </div>
          </div>
        </Card>
        <Card>
          <div style={{ fontSize: 12.5, color: C.inkSoft, fontWeight: 600, marginBottom: 10 }}>{t.digitalHealthIdLabel}</div>
          <Link href="/patient/records" style={{ display: "flex", gap: 12, alignItems: "center", textDecoration: "none", color: C.ink }}>
            <IconTile icon={QrCode} bg={C.tealPale} />
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>ARN-IND-2026-001284</div>
              <div style={{ fontSize: 12.5, color: C.inkSoft }}>{t.tapRecords}</div>
            </div>
          </Link>
        </Card>
      </div>
    </div>
  );
}
