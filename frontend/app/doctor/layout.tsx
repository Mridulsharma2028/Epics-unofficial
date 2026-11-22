"use client";
import React from "react";
import { CalendarDays, ClipboardList, Home, Users } from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { useApp } from "@/lib/context";
import type { TabConfig } from "@/components/layout/Sidebar";

export default function DoctorLayout({ children }: { children: React.ReactNode }) {
  const { t } = useApp();
  const tabs: TabConfig[] = [
    { key: "dashboard", href: "/doctor/dashboard", icon: Home, label: t.dashboard },
    { key: "patients", href: "/doctor/patients", icon: Users, label: t.patients },
    { key: "consultations", href: "/doctor/consultations", icon: ClipboardList, label: t.consultations },
    { key: "appointments", href: "/doctor/appointments", icon: CalendarDays, label: t.appointments },
  ];
  return <Shell tabs={tabs} portalLabel={t.doctor}>{children}</Shell>;
}
