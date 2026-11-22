"use client";
import React from "react";
import { User, Wifi, WifiOff, Languages } from "lucide-react";
import { C } from "@/lib/theme";
import { useApp } from "@/lib/context";

export function TopBar() {
  const { name, healthId, lang, setLang, offline, setOffline, t } = useApp();
  return (
    <div style={{
      height: 62, borderBottom: `1px solid ${C.line}`, display: "flex", alignItems: "center",
      justifyContent: "space-between", padding: "0 26px", background: C.panel, flexShrink: 0,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: 999, background: C.marigoldPale, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <User size={17} color={C.marigoldDeep} />
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>{name}</div>
          {healthId && <div style={{ fontSize: 11, color: C.inkSoft }}>{healthId}</div>}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div onClick={() => setOffline(!offline)} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: offline ? C.brick : C.teal, cursor: "pointer", fontWeight: 600 }}>
          {offline ? <WifiOff size={15} /> : <Wifi size={15} />} {offline ? t.offlineCached : t.online}
        </div>
        <div onClick={() => setLang(lang === "en" ? "hi" : "en")} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: C.inkSoft, cursor: "pointer" }}>
          <Languages size={15} /> {lang === "en" ? "EN" : "हिं"}
        </div>
      </div>
    </div>
  );
}
