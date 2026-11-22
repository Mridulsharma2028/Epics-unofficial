"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { WifiOff } from "lucide-react";
import { C, FONT_BODY } from "@/lib/theme";
import { useApp } from "@/lib/context";
import { Sidebar, TabConfig } from "./Sidebar";
import { TopBar } from "./TopBar";

// Shared authenticated-area shell: sidebar nav + top bar + offline banner.
// Each role's app/<role>/layout.tsx renders <Shell tabs={...}> around its
// child routes and redirects to /login if there's no active demo session.
export function Shell({ tabs, portalLabel, children }: { tabs: TabConfig[]; portalLabel: string; children: React.ReactNode }) {
  const { name, offline, t } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!name) router.replace("/login");
  }, [name, router]);

  if (!name) return null;

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: FONT_BODY, color: C.ink, display: "flex" }}>
      <Sidebar tabs={tabs} portalLabel={portalLabel} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <TopBar />
        <div className="arn-scroll" style={{ flex: 1, overflowY: "auto", padding: 26 }}>
          {offline && (
            <div style={{ background: C.brickPale, color: C.brick, padding: "9px 14px", borderRadius: 9, fontSize: 13, marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
              <WifiOff size={15} /> {t.offlineBanner}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
