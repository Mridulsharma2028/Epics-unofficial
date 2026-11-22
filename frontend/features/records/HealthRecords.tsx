"use client";
import React, { useEffect, useState } from "react";
import { CheckCircle2, FileText, Lock, ShieldCheck, Unlock } from "lucide-react";
import { C, FONT_HEAD } from "@/lib/theme";
import { useApp } from "@/lib/context";
import { MOCK_RECORDS, HealthRecord } from "@/lib/mockData";
import { Card } from "@/components/ui/Card";
import { Btn } from "@/components/ui/Button";
import { IconTile } from "@/components/ui/IconTile";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { DemoQR } from "@/components/DemoQR";
import { verifyRecordHash } from "@/services/blockchainService";
import { getPatientRecords } from "@/services/patientService";

// Blueprint modules: "Digital Health ID" + "Health Records" +
// "Blockchain Verification" (patient/records). Records load from
// GET /api/patients/P001/records (the demo patient this screen always
// shows); "Verify hash" calls GET /api/blockchain/verify/{record_id} for a
// real SHA-256 recompute-and-compare against the backend.
export function HealthRecords() {
  const { t } = useApp();
  const [records, setRecords] = useState<HealthRecord[]>(MOCK_RECORDS);
  const [verified, setVerified] = useState<Record<string, boolean>>({});
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    getPatientRecords("P001").then(setRecords);
  }, []);

  async function verify(id: string) {
    const res = await verifyRecordHash(id);
    if (res.status === "VERIFIED") setVerified((p) => ({ ...p, [id]: true }));
  }

  return (
    <div>
      <SectionLabel>{t.recordsTitle}</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.4fr", gap: 18, marginTop: 18 }}>
        <Card style={{ background: C.tealDeep, color: "#fff" }}>
          <div style={{ fontSize: 12, opacity: 0.7, fontWeight: 600 }}>{t.digitalHealthIdCardLabel}</div>
          <div style={{ fontFamily: FONT_HEAD, fontSize: 19, marginTop: 4 }}>ARN-IND-2026-001284</div>
          <div style={{ fontSize: 12.5, opacity: 0.75, marginTop: 2 }}>Asha Devi · Sarangpur</div>
          <div style={{ background: "#fff", borderRadius: 10, padding: 14, marginTop: 16, width: 128 }}>
            <DemoQR seed={1284} />
          </div>
          <div style={{ fontSize: 10.5, opacity: 0.6, marginTop: 8 }}>{t.demoQrNote}</div>
          <div onClick={() => setUnlocked(!unlocked)} style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 14, fontSize: 12.5, cursor: "pointer", background: "rgba(255,255,255,.12)", padding: "8px 12px", borderRadius: 8, width: "fit-content" }}>
            {unlocked ? <Unlock size={14} /> : <Lock size={14} />} {unlocked ? t.authGranted : t.simulateScan}
          </div>
          {!unlocked && <div style={{ fontSize: 11, opacity: 0.6, marginTop: 8 }}>{t.publicScanNote}</div>}
        </Card>

        <Card>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: C.inkSoft, marginBottom: 10 }}>{t.consultationHistory}</div>
          {records.map((r) => (
            <div key={r.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: `1px solid ${C.line}` }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <IconTile icon={FileText} size={32} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13.5 }}>{r.diagnosis}</div>
                  <div style={{ fontSize: 12, color: C.inkSoft }}>{r.id} · {r.date} · {r.doctor}</div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                {verified[r.id] ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 5, color: C.teal, fontSize: 12.5, fontWeight: 600 }}><CheckCircle2 size={15} /> {t.verified}</div>
                ) : (
                  <Btn size="sm" kind="ghost" icon={ShieldCheck} onClick={() => verify(r.id)}>{t.verifyHash}</Btn>
                )}
                <div style={{ fontSize: 10.5, color: C.inkSoft, marginTop: 3 }}>{r.hash}</div>
              </div>
            </div>
          ))}
          <div style={{ fontSize: 11.5, color: C.inkSoft, marginTop: 12 }}>{t.recordsNote}</div>
        </Card>
      </div>
    </div>
  );
}
