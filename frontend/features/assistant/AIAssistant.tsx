"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Bot, Send, Siren } from "lucide-react";
import { C, FONT_HEAD } from "@/lib/theme";
import { riskColor, riskBg } from "@/lib/utils";
import { useApp } from "@/lib/context";
import { Card } from "@/components/ui/Card";
import { Btn } from "@/components/ui/Button";
import { IconTile } from "@/components/ui/IconTile";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { assessSymptoms, RiskAssessment } from "@/services/aiService";

// Blueprint module: "AI Medical Assistant" (patient/assistant).
// Symptom intake -> preliminary risk via services/aiService.ts. The output
// is explicitly framed as a non-diagnostic, AI-assisted assessment.
export function AIAssistant() {
  const { t } = useApp();
  const router = useRouter();
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [duration, setDuration] = useState(t.dur2);
  const [result, setResult] = useState<RiskAssessment | null>(null);
  const all = [t.symFever, t.symCough, t.symBodyPain, t.symBreathlessness, t.symFatigue, t.symDiarrhoea];
  const toggle = (s: string) => setSymptoms((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  async function assess() {
    const durationWeight = duration === t.dur4 ? 20 : duration === t.dur3 ? 10 : 0;
    const res = await assessSymptoms(symptoms, durationWeight, symptoms.includes(t.symBreathlessness), symptoms.includes(t.symFever) && symptoms.includes(t.symCough));
    setResult(res);
  }

  return (
    <div>
      <SectionLabel>{t.assistant}</SectionLabel>
      <div style={{ color: C.inkSoft, fontSize: 14, marginBottom: 18 }}>{t.greeting}</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <Card>
          <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
            <IconTile icon={Bot} />
            <div style={{ background: C.bg, borderRadius: "4px 12px 12px 12px", padding: "10px 14px", fontSize: 13.5, maxWidth: 300 }}>
              {t.assistantPrompt}
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
            {all.map((s) => (
              <div key={s} onClick={() => toggle(s)} style={{
                padding: "8px 13px", borderRadius: 999, fontSize: 13, cursor: "pointer",
                border: `1.5px solid ${symptoms.includes(s) ? C.teal : C.line}`,
                background: symptoms.includes(s) ? C.tealPale : "transparent",
                color: symptoms.includes(s) ? C.tealDeep : C.inkSoft, fontWeight: 500,
              }}>{s}</div>
            ))}
          </div>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: C.inkSoft, marginBottom: 6 }}>{t.durationLabel}</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
            {[t.dur1, t.dur2, t.dur3, t.dur4].map((d) => (
              <div key={d} onClick={() => setDuration(d)} style={{
                padding: "7px 11px", borderRadius: 8, fontSize: 12.5, cursor: "pointer",
                border: `1px solid ${duration === d ? C.teal : C.line}`,
                background: duration === d ? C.tealPale : "transparent",
              }}>{d}</div>
            ))}
          </div>
          <Btn full icon={Send} onClick={assess} disabled={symptoms.length === 0}>{t.runAssessment}</Btn>
        </Card>

        <Card style={{ background: result ? riskBg(result.risk) : C.panel }}>
          {!result ? (
            <div style={{ color: C.inkSoft, fontSize: 13.5, textAlign: "center", padding: "40px 10px" }}>
              {t.resultPlaceholder}
            </div>
          ) : (
            <div className="arn-rise">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: C.inkSoft }}>{t.preliminaryRisk}</div>
                <RiskBadge risk={result.risk} />
              </div>
              <div style={{ fontFamily: FONT_HEAD, fontSize: 38, fontWeight: 600, color: riskColor(result.risk) }}>{result.score}<span style={{ fontSize: 16 }}>/100</span></div>
              <div style={{ fontSize: 13.5, marginTop: 14, lineHeight: 1.6 }}>
                {result.risk === "HIGH" && t.riskHighMsg}
                {result.risk === "MODERATE" && t.riskModerateMsg}
                {result.risk === "LOW" && t.riskLowMsg}
              </div>
              <div style={{ background: "rgba(255,255,255,.6)", borderRadius: 9, padding: "10px 12px", fontSize: 12, marginTop: 16, color: C.inkSoft }}>
                {t.aiDisclaimer}
              </div>
              {result.risk === "HIGH" && (
                <Btn kind="brick" full icon={Siren} onClick={() => router.push("/patient/emergency")} style={{ marginTop: 14 }}>{t.escalate}</Btn>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
