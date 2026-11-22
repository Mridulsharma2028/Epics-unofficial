// Calls the real backend: POST /api/appointments. Falls back to a
// locally-simulated booking confirmation if the backend is unreachable.
import { api, withFallback } from "@/lib/apiClient";

export async function bookAppointment(doctorName: string, patientName?: string) {
  return withFallback(
    () => api.post("/appointments", { doctor_name: doctorName, patient_name: patientName, type: "Video consultation" }),
    { id: "local-demo", doctor_name: doctorName, patient_name: patientName, status: "Pending", type: "Video consultation" },
    "appointmentService.bookAppointment",
  );
}
