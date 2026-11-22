"use client";
import React, { useEffect, useState } from "react";
import {
  AreaChart, Area, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { AlertTriangle, Building2, TrendingUp, Truck } from "lucide-react";
import { C, FONT_HEAD } from "@/lib/theme";
import { useApp } from "@/lib/context";
import { MOCK_CASES, MOCK_HOSPITALS, FORECAST } from "@/lib/mockData";
import { Card } from "@/components/ui/Card";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GISMap } from "@/components/GISMap";
import { getOverview, AnalyticsOverview } from "@/services/analyticsService";

// Blueprint module: "Government Dashboard" — cases, hotspots, hospital
// capacity, ambulances and analytics, at a glance. Stat cards load from
// GET /api/analytics/overview (falls back to a local calc matching the
// original hardcoded logic while loading / if the backend is unreachable).
export default function GovernmentDashboardPage() {
  const { t } = useApp();
  const [overview, setOverview] = useState<AnalyticsOverview>({
    active_cases: MOCK_CASES.length * 7,
    high_severity_hotspots: MOCK_CASES.filter((c) => c.severity === "HIGH").length,
    hospital_beds_total: MOCK_HOSPITALS.reduce((s, h) => s + h.bedsTotal, 0),
    hospital_beds_available: MOCK_HOSPITALS.reduce((s, h) => s + h.bedsAvail, 0),
    ambulances_total: 3,
    ambulances_available: 2,
  });

  useEffect(() => {
    getOverview().then(setOverview);
  }, []);

  const stats: [string, string | number, typeof TrendingUp, string][] = [
    [t.statActiveCases, overview.active_cases, TrendingUp, C.teal],
    [t.statHighSeverity, overview.high_severity_hotspots, AlertTriangle, C.brick],
    [t.statBedsFree, `${overview.hospital_beds_available}/${overview.hospital_beds_total}`, Building2, C.marigoldDeep],
    [t.statAmbulances, `${overview.ambulances_available}/${overview.ambulances_total}`, Truck, C.teal],
  ];

  return (
    <div>
      <SectionLabel>{t.publicHealthOverview}</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginTop: 18, marginBottom: 20 }}>
        {stats.map(([l, v, Icon, col]) => (
          <Card key={l}>
            <Icon size={17} color={col} />
            <div style={{ fontFamily: FONT_HEAD, fontSize: 24, fontWeight: 600, marginTop: 8 }}>{v}</div>
            <div style={{ fontSize: 12, color: C.inkSoft }}>{l}</div>
          </Card>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 18 }}>
        <Card>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: C.inkSoft, marginBottom: 10 }}>{t.hotspotsSnapshot}</div>
          <GISMap diseaseFilter="All" sevFilter="All" />
        </Card>
        <Card>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: C.inkSoft, marginBottom: 10 }}>{t.caseTrend}</div>
          <ResponsiveContainer width="100%" height={210}>
            <AreaChart data={[...FORECAST]}>
              <CartesianGrid stroke={C.line} strokeDasharray="3 3" />
              <XAxis dataKey="week" fontSize={10} stroke={C.inkSoft} />
              <YAxis fontSize={10} stroke={C.inkSoft} />
              <Tooltip />
              <Area type="monotone" dataKey="cases" stroke={C.marigoldDeep} fill={C.marigoldPale} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
          <div style={{ fontSize: 11, color: C.inkSoft, marginTop: 6 }}>{t.forecastNote}</div>
        </Card>
      </div>
    </div>
  );
}
