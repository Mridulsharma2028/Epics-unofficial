"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { C, FONT_HEAD } from "@/lib/theme";
import { useApp } from "@/lib/context";

export type TabConfig = { key: string; href: string; icon: LucideIcon; label: string };

export function Sidebar({ tabs, portalLabel }: { tabs: TabConfig[]; portalLabel: string }) {
  const pathname = usePathname();
  const { t, logout } = useApp();

  return (
    <div style={{ width: 226, background: C.tealDeep, color: "#fff", display: "flex", flexDirection: "column", flexShrink: 0 }}>
      <div style={{ padding: "22px 20px", borderBottom: "1px solid rgba(255,255,255,.12)" }}>
        <div style={{ fontFamily: FONT_HEAD, fontSize: 19, fontWeight: 700 }}>AarogyaNet</div>
        <div style={{ fontSize: 11.5, opacity: 0.7, marginTop: 2 }}>{portalLabel} {t.portalSuffix}</div>
      </div>
      <div style={{ padding: "14px 10px", flex: 1 }}>
        {tabs.map((tb) => {
          const active = pathname === tb.href || pathname.startsWith(tb.href + "/");
          return (
            <Link key={tb.key} href={tb.href} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 9,
              marginBottom: 3, fontSize: 14, fontWeight: 500, textDecoration: "none",
              background: active ? "rgba(255,255,255,.14)" : "transparent",
              color: active ? "#fff" : "rgba(255,255,255,.72)",
            }}>
              <tb.icon size={16} /> {tb.label}
            </Link>
          );
        })}
      </div>
      <div style={{ padding: 14, borderTop: "1px solid rgba(255,255,255,.12)" }}>
        <div onClick={logout} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, opacity: 0.8, cursor: "pointer", padding: "8px 10px" }}>
          <LogOut size={15} /> {t.logOut}
        </div>
      </div>
    </div>
  );
}
