"use client";
import React from "react";
import { ShieldCheck } from "lucide-react";
import { C, FONT_BODY } from "@/lib/theme";
import { useApp } from "@/lib/context";
import { Card } from "@/components/ui/Card";
import { IconTile } from "@/components/ui/IconTile";
import { SectionLabel } from "@/components/ui/SectionLabel";

// Blueprint section 6 lists "Admin/Health Worker: operational management,
// verification and controlled administrative functions" but the blueprint's
// own frontend page structure (section 8) does not define admin/ sub-pages
// yet. This placeholder keeps the route reachable and documents intent —
// build it out the same way as patient/doctor/government once the specific
// admin screens are designed.
export default function AdminPage() {
  const { t } = useApp();
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: FONT_BODY, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <Card style={{ maxWidth: 480 }}>
        <IconTile icon={ShieldCheck} />
        <div style={{ marginTop: 14 }}>
          <SectionLabel>{t.adminTitle}</SectionLabel>
        </div>
        <div style={{ fontSize: 13.5, color: C.inkSoft, marginTop: 6, lineHeight: 1.6 }}>{t.adminSub}</div>
        <div style={{ fontSize: 12, color: C.inkSoft, marginTop: 14, background: C.bgAlt, borderRadius: 9, padding: "10px 12px" }}>{t.adminNote}</div>
      </Card>
    </div>
  );
}
