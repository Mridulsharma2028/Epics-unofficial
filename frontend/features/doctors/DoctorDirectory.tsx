"use client";
import React, { useEffect, useState } from "react";
import { CalendarDays, CheckCircle2, Stethoscope } from "lucide-react";
import { C } from "@/lib/theme";
import { useApp } from "@/lib/context";
import { DOCTORS } from "@/lib/mockData";
import { Card } from "@/components/ui/Card";
import { Btn } from "@/components/ui/Button";
import { IconTile } from "@/components/ui/IconTile";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getDoctors, Doctor } from "@/services/doctorService";
import { bookAppointment } from "@/services/appointmentService";

// Blueprint: patient/doctors — "Find a doctor" directory feeding into
// patient/appointments. Loads from GET /api/doctors (falls back to the
// local DOCTORS mock while loading / if the backend is unreachable), and
// "Book appointment" calls POST /api/appointments for real.
export function DoctorDirectory() {
  const { t, name } = useApp();
  const [doctors, setDoctors] = useState<Doctor[]>(DOCTORS);
  const [booked, setBooked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    getDoctors().then(setDoctors);
  }, []);

  async function onBook(doctorName: string) {
    await bookAppointment(doctorName, name);
    setBooked((p) => ({ ...p, [doctorName]: true }));
  }

  return (
    <div>
      <SectionLabel>{t.findDoctor}</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 18 }}>
        {doctors.map((d) => (
          <Card key={d.name}>
            <IconTile icon={Stethoscope} />
            <div style={{ fontWeight: 600, fontSize: 14.5, marginTop: 10 }}>{d.name}</div>
            <div style={{ fontSize: 12.5, color: C.inkSoft }}>{d.spec} · {d.hospital}</div>
            <div style={{ fontSize: 12, color: C.teal, marginTop: 8, fontWeight: 600 }}>{t.nextAvailable} {d.avail}</div>
            {booked[d.name] ? (
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 12, fontSize: 13, fontWeight: 600, color: C.teal }}>
                <CheckCircle2 size={15} /> {t.booked}
              </div>
            ) : (
              <Btn size="sm" full style={{ marginTop: 12 }} icon={CalendarDays} onClick={() => onBook(d.name)}>{t.bookAppointment}</Btn>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
