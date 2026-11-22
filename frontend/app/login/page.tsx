"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Building2, ChevronRight, Stethoscope, User } from "lucide-react";
import { C, FONT_BODY, FONT_HEAD } from "@/lib/theme";
import { useApp, Role } from "@/lib/context";
import { Card } from "@/components/ui/Card";
import { Btn } from "@/components/ui/Button";
import { login as loginRequest } from "@/services/authService";

// Blueprint endpoint: POST /api/auth/login. Demo auth only — see
// services/authService.ts for where the real call goes.
export default function LoginPage() {
  const { t, role, setRole, login } = useApp();
  const router = useRouter();
  const [name, setName] = useState("");
  const [idField, setIdField] = useState("");

  const roles: { key: Role; label: string; icon: typeof User }[] = [
    { key: "patient", label: t.patient, icon: User },
    { key: "doctor", label: t.doctor, icon: Stethoscope },
    { key: "government", label: t.government, icon: Building2 },
  ];

  async function onContinue() {
    const finalName = name || (role === "patient" ? "Asha Devi" : role === "doctor" ? "Dr. Kavita Rao" : "District Health Office");
    await loginRequest(role, idField);
    login(role, finalName);
    router.push(`/${role}/dashboard`);
  }

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: FONT_BODY, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <Card style={{ width: 400, maxWidth: "100%" }}>
        <Link href="/" style={{ fontSize: 12.5, color: C.inkSoft, textDecoration: "none", display: "block", marginBottom: 16 }}>{t.backHome}</Link>
        <div style={{ fontFamily: FONT_HEAD, fontSize: 24, fontWeight: 600, color: C.tealDeep, marginBottom: 4 }}>{t.loginTitle}</div>
        <div style={{ fontSize: 13, color: C.inkSoft, marginBottom: 22 }}>{t.loginSub}</div>

        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {roles.map((r) => (
            <div key={r.key} onClick={() => setRole(r.key)} style={{
              flex: 1, textAlign: "center", padding: "12px 6px", borderRadius: 10, cursor: "pointer",
              border: `1.5px solid ${role === r.key ? C.teal : C.line}`,
              background: role === r.key ? C.tealPale : "transparent",
            }}>
              <r.icon size={18} color={role === r.key ? C.tealDeep : C.inkSoft} style={{ marginBottom: 4 }} />
              <div style={{ fontSize: 12.5, fontWeight: 600, color: role === r.key ? C.tealDeep : C.inkSoft }}>{r.label}</div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 12.5, fontWeight: 600, marginBottom: 6, color: C.inkSoft }}>{t.fullName}</div>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Asha Devi"
          style={{ width: "100%", padding: "11px 13px", borderRadius: 9, border: `1px solid ${C.line}`, fontSize: 14, marginBottom: 14, fontFamily: FONT_BODY }} />

        <div style={{ fontSize: 12.5, fontWeight: 600, marginBottom: 6, color: C.inkSoft }}>
          {role === "patient" ? t.idLabelPatient : role === "doctor" ? t.idLabelDoctor : t.idLabelGov}
        </div>
        <input value={idField} onChange={(e) => setIdField(e.target.value)}
          placeholder={role === "patient" ? "ARN-IND-2026-001284" : role === "doctor" ? "MCI-MP-88213" : "GOV-MP-0042"}
          style={{ width: "100%", padding: "11px 13px", borderRadius: 9, border: `1px solid ${C.line}`, fontSize: 14, marginBottom: 20, fontFamily: FONT_BODY }} />

        <Btn full onClick={onContinue}>{t.continueBtn} <ChevronRight size={15} /></Btn>
        <div style={{ fontSize: 11.5, color: C.inkSoft, marginTop: 12, textAlign: "center" }}>{t.authNote}</div>
        <div style={{ fontSize: 12.5, color: C.inkSoft, marginTop: 16, textAlign: "center" }}>
          {t.noAccount} <Link href="/register" style={{ color: C.teal, fontWeight: 600, textDecoration: "none" }}>{t.goRegister}</Link>
        </div>
      </Card>
    </div>
  );
}
