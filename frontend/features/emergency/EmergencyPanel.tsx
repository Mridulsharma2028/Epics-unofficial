"use client";
import React, { useEffect, useState } from "react";
import { Siren, Truck } from "lucide-react";
import { C } from "@/lib/theme";
import { useApp } from "@/lib/context";
import { MOCK_HOSPITALS, Hospital } from "@/lib/mockData";
import { Card } from "@/components/ui/Card";
import { Btn } from "@/components/ui/Button";
import { IconTile } from "@/components/ui/IconTile";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { dispatchAmbulance, getNearestHospitals } from "@/services/emergencyService";

// Blueprint module: "Emergency Response" — hospital, bed, ambulance and
// route/ETA workflow (patient/emergency). Hospital list loads from
// GET /api/emergency/hospitals; "Trigger Emergency" calls
// POST /api/emergency/dispatch for real.
export function EmergencyPanel({ severity: initSev = "MODERATE" }: { severity?: string }) {
  const { t } = useApp();
  const [triggered, setTriggered] = useState(false);
  const [hospitals, setHospitals] = useState<Hospital[]>(MOCK_HOSPITALS);
  const [sel, setSel] = useState<Hospital>(MOCK_HOSPITALS[0]);

  useEffect(() => {
    getNearestHospitals().then((list) => {
      setHospitals(list);
      if (list.length) setSel(list[0]);
    });
  }, []);

  async function trigger() {
    await dispatchAmbulance(sel, initSev);
    setTriggered(true);
  }

  return (
    <div>
      <SectionLabel>{t.emergencyTitle}</SectionLabel>
      {!triggered ? (
        <Card style={{ maxWidth: 480 }}>
          <div style={{ fontSize: 13.5, color: C.inkSoft, marginBottom: 14 }}>{t.emergencyConfirm}</div>
          <Btn kind="brick" full icon={Siren} onClick={trigger}>{t.triggerEmergency}</Btn>
        </Card>
      ) : (
        <div className="arn-rise">
          <div style={{ display: "flex", alignItems: "center", gap: 10, background: C.brickPale, color: C.brick, padding: "12px 16px", borderRadius: 10, marginBottom: 16, fontWeight: 600, fontSize: 13.5 }}>
            <Siren size={17} className="arn-pulse" /> {t.dispatchedMsg} {initSev}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            <Card>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: C.inkSoft, marginBottom: 10 }}>{t.nearestHospitals}</div>
              {hospitals.map((h) => (
                <div key={h.name} onClick={() => setSel(h)} style={{ padding: "10px 10px", borderRadius: 9, cursor: "pointer", marginBottom: 6, border: `1.5px solid ${sel.name === h.name ? C.teal : C.line}`, background: sel.name === h.name ? C.tealPale : "transparent" }}>
                  <div style={{ fontWeight: 600, fontSize: 13.5 }}>{h.name}</div>
                  <div style={{ fontSize: 12, color: C.inkSoft }}>{h.distanceKm} km · {h.bedsAvail}/{h.bedsTotal} {t.bedsFreeSuffix} · {t.icuLabel} {h.icuAvail}</div>
                </div>
              ))}
            </Card>
            <Card>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: C.inkSoft, marginBottom: 10 }}>{t.dispatchStatus}</div>
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
                <IconTile icon={Truck} bg={C.marigoldPale} color={C.marigoldDeep} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{t.ambulanceLabel} {sel.ambulance}</div>
                  <div style={{ fontSize: 12.5, color: C.inkSoft }}>{t.etaLabel} {sel.eta} {t.toLabel} {sel.name}</div>
                </div>
              </div>
              <div style={{ fontSize: 12, color: C.inkSoft, marginBottom: 4 }}>{t.bedAvailability}</div>
              <ProgressBar value={sel.bedsAvail} max={sel.bedsTotal} color={C.teal} />
              <div style={{ fontSize: 11.5, color: C.inkSoft, marginTop: 6 }}>{sel.bedsAvail} {t.ofLabel} {sel.bedsTotal} {t.bedsAvailableSuffix} · {sel.icuAvail} {t.icuLabel}</div>
              <div style={{ marginTop: 16, fontSize: 12.5, color: C.inkSoft }}>{t.routeNote}</div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
