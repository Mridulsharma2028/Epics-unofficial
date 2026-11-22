"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { AlertTriangle, Activity, Siren } from "lucide-react";
import { C } from "@/lib/theme";
import { useApp } from "@/lib/context";
import { useVitalStream } from "@/hooks/useVitalStream";
import { Card } from "@/components/ui/Card";
import { Btn } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { pushVitalReading } from "@/services/vitalsService";

// Blueprint module: "IoT Vital Monitoring" (patient/vitals). Simulator mode —
// see hooks/useVitalStream.ts — demonstrates the real-time alerting flow
// described in blueprint section 14 without physical sensors. Each
// simulated tick is also pushed to POST /api/vitals, which persists it and
// broadcasts it over WS /ws/vitals/P001 for any subscribed doctor-side view.
export function VitalsMonitor() {
  const { t } = useApp();
  const router = useRouter();
  const [running, setRunning] = useState(false);
  const [data, alarm] = useVitalStream(running);
  const latest = data[data.length - 1];
  const lastPushedTick = useRef<string | null>(null);

  useEffect(() => {
    if (!running || latest.t === lastPushedTick.current) return;
    lastPushedTick.current = latest.t;
    pushVitalReading({ patientId: "P001", temp: latest.temp, hr: latest.hr, spo2: latest.spo2 });
  }, [latest, running]);

  return (
    <div>
      <SectionLabel>{t.vitals} monitoring</SectionLabel>
      <div style={{ color: C.inkSoft, fontSize: 14, marginBottom: 18 }}>{t.vitalsSubtitle}</div>
      {alarm && (
        <div className="arn-rise" style={{ background: C.brickPale, color: C.brick, padding: "12px 16px", borderRadius: 10, marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, fontWeight: 600 }}>
            <AlertTriangle size={17} className="arn-pulse" /> {t.alarmMsg}
          </div>
          <Btn kind="brick" size="sm" icon={Siren} onClick={() => router.push("/patient/emergency")}>{t.triggerEmergency}</Btn>
        </div>
      )}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ display: "flex", gap: 22 }}>
            <div><div style={{ fontSize: 11.5, color: C.inkSoft }}>{t.spo2Label}</div><div style={{ fontSize: 20, fontWeight: 700, color: alarm ? C.brick : C.teal }}>{latest.spo2}%</div></div>
            <div><div style={{ fontSize: 11.5, color: C.inkSoft }}>{t.hrLabel}</div><div style={{ fontSize: 20, fontWeight: 700, color: alarm ? C.brick : C.ink }}>{latest.hr} bpm</div></div>
            <div><div style={{ fontSize: 11.5, color: C.inkSoft }}>{t.temperatureLabel}</div><div style={{ fontSize: 20, fontWeight: 700 }}>{latest.temp}°F</div></div>
          </div>
          <Btn kind={running ? "brick" : "primary"} size="sm" icon={Activity} onClick={() => setRunning(!running)}>{running ? t.stopSim : t.startSim}</Btn>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data}>
            <CartesianGrid stroke={C.line} strokeDasharray="3 3" />
            <XAxis dataKey="t" fontSize={11} stroke={C.inkSoft} />
            <YAxis domain={[80, 110]} fontSize={11} stroke={C.inkSoft} />
            <Tooltip />
            <Line type="monotone" dataKey="spo2" stroke={C.brick} strokeWidth={2} dot={false} name="SpO₂ %" />
            <Line type="monotone" dataKey="hr" stroke={C.teal} strokeWidth={2} dot={false} name="Heart rate" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
