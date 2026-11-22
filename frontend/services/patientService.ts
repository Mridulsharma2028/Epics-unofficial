// Calls the real backend: GET /api/patients, GET /api/patients/{id},
// GET /api/patients/{id}/records. Falls back to lib/mockData.ts if the
// backend is unreachable.
import { MOCK_PATIENTS, MOCK_RECORDS, Patient, HealthRecord } from "@/lib/mockData";
import { api, withFallback } from "@/lib/apiClient";

export async function getPatientQueue(): Promise<Patient[]> {
  return withFallback(() => api.get<Patient[]>("/patients"), MOCK_PATIENTS, "patientService.getPatientQueue");
}

export async function getPatient(id: string): Promise<Patient | undefined> {
  return withFallback(
    () => api.get<Patient>(`/patients/${id}`),
    MOCK_PATIENTS.find((p) => p.id === id),
    "patientService.getPatient",
  );
}

export async function getPatientRecords(patientId: string = "P001"): Promise<HealthRecord[]> {
  return withFallback(
    () => api.get<HealthRecord[]>(`/patients/${patientId}/records`),
    MOCK_RECORDS,
    "patientService.getPatientRecords",
  );
}
