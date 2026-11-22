"use client";
import React, { useEffect, useState } from "react";
import { Building2 } from "lucide-react";
import { C } from "@/lib/theme";
import { useApp } from "@/lib/context";
import { MOCK_HOSPITALS, Hospital } from "@/lib/mockData";
import { Card } from "@/components/ui/Card";
import { IconTile } from "@/components/ui/IconTile";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getHospitals } from "@/services/gisService";

// Blueprint: government/hospitals — hospital & ambulance capacity view,
// loaded from GET /api/gis/hospitals (falls back to lib/mockData.ts while
// loading / if the backend is unreachable).
export function HospitalCapacity() {
  const { t } = useApp();
  const [hospitals, setHospitals] = useState<Hospital[]>(MOCK_HOSPITALS);

  useEffect(() => {
    getHospitals().then(setHospitals);
  }, []);

  return (
    <div>
      <SectionLabel>{t.hospCapacityTitle}</SectionLabel>
      <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
        {hospitals.map((h) => (
          <Card key={h.name}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <IconTile icon={Building2} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14.5 }}>{h.name}</div>
                  <div style={{ fontSize: 12, color: C.inkSoft }}>{h.distanceKm} km · {t.ambulanceLabel} {h.ambulance}</div>
                </div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.teal }}>{h.bedsAvail}/{h.bedsTotal} {t.bedsFreeSuffix}</div>
            </div>
            <ProgressBar value={h.bedsAvail} max={h.bedsTotal} color={C.teal} />
          </Card>
        ))}
      </div>
    </div>
  );
}
