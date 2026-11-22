// Calls the real backend: POST /api/vitals — persists each simulated
// reading (see hooks/useVitalStream.ts) and broadcasts it over
// WS /ws/vitals/{patient_id} to any subscribed doctor-side clients. Fails
// silently (returns { ok: false }) if the backend is unreachable, since a
// dropped vitals push during the client-side simulation isn't worth
// interrupting the demo over.
import { api, withFallback } from "@/lib/apiClient";

export async function pushVitalReading(reading: { patientId: string; temp: number; hr: number; spo2: number }) {
  return withFallback(
    () => api.post<{ ok: boolean }>("/vitals", reading),
    { ok: false },
    "vitalsService.pushVitalReading",
  );
}
