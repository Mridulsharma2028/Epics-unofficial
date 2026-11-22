// Calls the real backend: GET /api/emergency/hospitals, POST /api/emergency/dispatch.
// Falls back to lib/mockData.ts / a locally-simulated dispatch if the
// backend is unreachable.
import { MOCK_HOSPITALS, Hospital } from "@/lib/mockData";
import { api, withFallback } from "@/lib/apiClient";

export async function getNearestHospitals(): Promise<Hospital[]> {
  return withFallback(
    () => api.get<Hospital[]>("/emergency/hospitals"),
    MOCK_HOSPITALS,
    "emergencyService.getNearestHospitals",
  );
}

export async function dispatchAmbulance(hospital: Hospital, severity: string) {
  return withFallback(
    () => api.post("/emergency/dispatch", { hospital_name: hospital.name, severity }),
    { dispatched: true, hospital: hospital.name, severity },
    "emergencyService.dispatchAmbulance",
  );
}
