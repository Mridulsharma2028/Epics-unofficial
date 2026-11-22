import { PatientDetail } from "@/features/patients/PatientDetail";
export default function Page({ params }: { params: { id: string } }) {
  return <PatientDetail patientId={params.id} />;
}
