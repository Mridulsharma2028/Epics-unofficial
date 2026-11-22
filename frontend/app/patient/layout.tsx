"use client";
import React from "react";
import {
  Home, Bot, HeartPulse, FileText, Stethoscope, CalendarDays, Pill, Siren,
} from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { useApp } from "@/lib/context";
import type { TabConfig } from "@/components/layout/Sidebar";

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  const { t } = useApp();
  const tabs: TabConfig[] = [
    { key: "dashboard", href: "/patient/dashboard", icon: Home, label: t.dashboard },
    { key: "assistant", href: "/patient/assistant", icon: Bot, label: t.assistant },
    { key: "vitals", href: "/patient/vitals", icon: HeartPulse, label: t.vitals },
    { key: "records", href: "/patient/records", icon: FileText, label: t.records },
    { key: "doctors", href: "/patient/doctors", icon: Stethoscope, label: t.doctors },
    { key: "appointments", href: "/patient/appointments", icon: CalendarDays, label: t.appointments },
    { key: "medicines", href: "/patient/medicines", icon: Pill, label: t.medicines },
    { key: "emergency", href: "/patient/emergency", icon: Siren, label: t.emergency },
  ];
  return <Shell tabs={tabs} portalLabel={t.patient}>{children}</Shell>;
}
