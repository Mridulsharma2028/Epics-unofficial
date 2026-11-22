"use client";
import React, { useState } from "react";
import { CalendarDays, User } from "lucide-react";
import { C } from "@/lib/theme";
import { useApp } from "@/lib/context";
import { Card } from "@/components/ui/Card";
import { Btn } from "@/components/ui/Button";
import { IconTile } from "@/components/ui/IconTile";
import { SectionLabel } from "@/components/ui/SectionLabel";

// Blueprint module: "Telemedicine" — used by patient/appointments,
// doctor/appointments and doctor/consultations (the consultation interface
// can begin here; WebRTC can be added later per blueprint section 16).
export function Appointments() {
  const { t } = useApp();
  const [joined, setJoined] = useState(false);
  const list = [
    { doc: "Dr. Kavita Rao", when: "Thu, 18 Sep · 11:30 AM", type: t.videoConsultation, status: t.statusConfirmed },
    { doc: "Dr. Anil Mehta", when: "Mon, 22 Sep · 9:00 AM", type: t.inPerson, status: t.statusPending },
  ];
  return (
    <div>
      <SectionLabel>{t.apptTitle}</SectionLabel>
      <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
        {list.map((a) => (
          <Card key={a.doc} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <IconTile icon={CalendarDays} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{a.doc}</div>
                <div style={{ fontSize: 12.5, color: C.inkSoft }}>{a.when} · {a.type}</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: a.status === t.statusConfirmed ? C.teal : C.marigoldDeep }}>{a.status}</span>
              {a.type === t.videoConsultation && <Btn size="sm" onClick={() => setJoined(true)}>{t.join}</Btn>}
            </div>
          </Card>
        ))}
      </div>
      {joined && (
        <Card style={{ marginTop: 18, background: C.tealDeep, color: "#fff" }} className="arn-rise">
          <div style={{ fontSize: 12.5, opacity: 0.7, fontWeight: 600 }}>{t.liveConsult}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
            {[`Asha Devi ${t.youSuffix}`, "Dr. Kavita Rao"].map((p) => (
              <div key={p} style={{ background: "rgba(255,255,255,.08)", borderRadius: 10, aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 6 }}>
                <User size={26} />
                <div style={{ fontSize: 12 }}>{p}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 11.5, opacity: 0.65, marginTop: 10 }}>{t.webrtcNote}</div>
        </Card>
      )}
    </div>
  );
}
