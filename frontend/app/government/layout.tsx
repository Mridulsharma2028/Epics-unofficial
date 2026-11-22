"use client";
import React from "react";
import { Activity, Building2, Home, MapPin } from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { useApp } from "@/lib/context";
import type { TabConfig } from "@/components/layout/Sidebar";

export default function GovernmentLayout({ children }: { children: React.ReactNode }) {
  const { t } = useApp();
  const tabs: TabConfig[] = [
    { key: "dashboard", href: "/government/dashboard", icon: Home, label: t.dashboard },
    { key: "map", href: "/government/map", icon: MapPin, label: t.map },
    { key: "diseases", href: "/government/diseases", icon: Activity, label: t.diseases },
    { key: "hospitals", href: "/government/hospitals", icon: Building2, label: t.hospitals },
  ];
  return <Shell tabs={tabs} portalLabel={t.government}>{children}</Shell>;
}
