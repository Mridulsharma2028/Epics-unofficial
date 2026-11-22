// Calls the real backend: GET /api/analytics/overview. Falls back to a
// locally-computed overview (matching the original hardcoded logic on the
// government dashboard) if the backend is unreachable.
import { api, withFallback } from "@/lib/apiClient";
import { MOCK_CASES, MOCK_HOSPITALS } from "@/lib/mockData";

export type AnalyticsOverview = {
  active_cases: number;
  high_severity_hotspots: number;
  hospital_beds_total: number;
  hospital_beds_available: number;
  ambulances_total: number;
  ambulances_available: number;
};

export async function getOverview(): Promise<AnalyticsOverview> {
  const fallback: AnalyticsOverview = {
    active_cases: MOCK_CASES.length * 7,
    high_severity_hotspots: MOCK_CASES.filter((c) => c.severity === "HIGH").length,
    hospital_beds_total: MOCK_HOSPITALS.reduce((s, h) => s + h.bedsTotal, 0),
    hospital_beds_available: MOCK_HOSPITALS.reduce((s, h) => s + h.bedsAvail, 0),
    ambulances_total: 3,
    ambulances_available: 2,
  };
  return withFallback(() => api.get<AnalyticsOverview>("/analytics/overview"), fallback, "analyticsService.getOverview");
}
