"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Bot, HeartPulse, MapPin, Siren, QrCode, ShieldCheck,
  User, Stethoscope, Building2, Languages,
} from "lucide-react";
import { C, FONT_HEAD, FONT_BODY } from "@/lib/theme";
import { useApp, Role } from "@/lib/context";
import { Card } from "@/components/ui/Card";
import { Btn } from "@/components/ui/Button";
import { IconTile } from "@/components/ui/IconTile";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SystemDiagram } from "@/components/landing/SystemDiagram";

// Blueprint module: "Landing Website" — public-facing entry point into the
// three role portals (app/login handles the actual role switch).
export default function LandingPage() {
  const { t, lang, setLang, setRole } = useApp();
  const router = useRouter();

  const modules = [
    { icon: Bot, title: t.mod1Title, desc: t.mod1Desc },
    { icon: HeartPulse, title: t.mod2Title, desc: t.mod2Desc },
    { icon: MapPin, title: t.mod3Title, desc: t.mod3Desc },
    { icon: Siren, title: t.mod4Title, desc: t.mod4Desc },
    { icon: QrCode, title: t.mod5Title, desc: t.mod5Desc },
    { icon: ShieldCheck, title: t.mod6Title, desc: t.mod6Desc },
  ];

  function goLogin(role?: Role) {
    if (role) setRole(role);
    router.push("/login");
  }

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: FONT_BODY, color: C.ink }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 42px" }}>
        <div style={{ fontFamily: FONT_HEAD, fontSize: 21, fontWeight: 700, color: C.tealDeep }}>AarogyaNet AI</div>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div onClick={() => setLang(lang === "en" ? "hi" : "en")} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: C.inkSoft, cursor: "pointer" }}>
            <Languages size={15} /> {lang === "en" ? "EN / हिं" : "हिं / EN"}
          </div>
          <Btn onClick={() => goLogin()} size="sm">{t.loginBtn}</Btn>
        </div>
      </div>

      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "38px 42px 20px", display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 50, alignItems: "center" }}>
        <div>
          <div style={{ display: "inline-block", background: C.marigoldPale, color: C.marigoldDeep, fontSize: 12.5, fontWeight: 600, padding: "5px 12px", borderRadius: 999, marginBottom: 18 }}>
            {t.badge}
          </div>
          <h1 style={{ fontFamily: FONT_HEAD, fontSize: 46, lineHeight: 1.12, fontWeight: 600, color: C.tealDeep, margin: "0 0 18px" }}>
            {t.tagline}
          </h1>
          <p style={{ fontSize: 16.5, color: C.inkSoft, lineHeight: 1.6, maxWidth: 480, margin: "0 0 28px" }}>
            {t.sub}
          </p>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.inkSoft, marginBottom: 10 }}>{t.enterAs}</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Btn kind="primary" icon={User} onClick={() => goLogin("patient")}>{t.patient}</Btn>
            <Btn kind="subtle" icon={Stethoscope} onClick={() => goLogin("doctor")}>{t.doctor}</Btn>
            <Btn kind="subtle" icon={Building2} onClick={() => goLogin("government")}>{t.government}</Btn>
          </div>
          <div style={{ display: "flex", gap: 34, marginTop: 34 }}>
            {[["6", t.stat1], ["4 min", t.stat2], ["EN / हिं", t.stat3]].map(([a, b]) => (
              <div key={b}>
                <div style={{ fontFamily: FONT_HEAD, fontSize: 24, fontWeight: 600, color: C.tealDeep }}>{a}</div>
                <div style={{ fontSize: 12, color: C.inkSoft, maxWidth: 110 }}>{b}</div>
              </div>
            ))}
          </div>
        </div>
        <Card style={{ background: C.tealDeep, border: "none" }}>
          <div style={{ color: "#fff", fontSize: 12.5, opacity: 0.7, marginBottom: 10, fontWeight: 600 }}>{t.ecosystemHeading}</div>
          <SystemDiagram />
          <div style={{ color: "rgba(255,255,255,.65)", fontSize: 11.5, marginTop: 10 }}>{t.ecosystemNote}</div>
        </Card>
      </div>

      <div style={{ maxWidth: 1120, margin: "40px auto 0", padding: "0 42px" }}>
        <SectionLabel>{t.builtHeading}</SectionLabel>
        <div style={{ color: C.inkSoft, fontSize: 14, marginBottom: 22 }}>{t.builtSub}</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {modules.map((m) => (
            <Card key={m.title} style={{ display: "flex", gap: 13 }}>
              <IconTile icon={m.icon} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 14.5, marginBottom: 3 }}>{m.title}</div>
                <div style={{ fontSize: 13, color: C.inkSoft, lineHeight: 1.5 }}>{m.desc}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div style={{ textAlign: "center", padding: "50px 20px 30px", color: C.inkSoft, fontSize: 12.5 }}>
        {t.footerNote}
      </div>
    </div>
  );
}
