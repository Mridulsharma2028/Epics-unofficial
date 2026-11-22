// Calls the real backend: GET /api/doctors. Falls back to
// lib/mockData.ts::DOCTORS if the backend is unreachable.
import { DOCTORS } from "@/lib/mockData";
import { api, withFallback } from "@/lib/apiClient";

export type Doctor = { id?: string; name: string; spec: string; hospital: string; avail: string };

export async function getDoctors(): Promise<Doctor[]> {
  return withFallback(() => api.get<Doctor[]>("/doctors"), DOCTORS, "doctorService.getDoctors");
}
