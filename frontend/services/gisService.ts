// Calls the real backend: GET /api/gis/cases, GET /api/gis/hospitals.
// Falls back to lib/mockData.ts if the backend is unreachable.
import { MOCK_CASES, MOCK_HOSPITALS, DiseaseCase, Hospital } from "@/lib/mockData";
import { api, withFallback } from "@/lib/apiClient";

export async function getDiseaseCases(): Promise<DiseaseCase[]> {
  return withFallback(() => api.get<DiseaseCase[]>("/gis/cases"), MOCK_CASES, "gisService.getDiseaseCases");
}

export async function getHospitals(): Promise<Hospital[]> {
  return withFallback(() => api.get<Hospital[]>("/gis/hospitals"), MOCK_HOSPITALS, "gisService.getHospitals");
}
