import { PatientQueue } from "@/features/patients/PatientQueue";
// Blueprint: doctor/patients — same queue as the dashboard, kept as its own
// route so it can diverge (e.g. filters, search) without touching dashboard/.
export default function Page() { return <PatientQueue />; }
