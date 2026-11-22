// Synthetic / demo data only — see blueprint section 31 "Prototype Safety &
// Data Notes". No real patient PII. Replace with calls into services/*.ts
// (which in turn will call the FastAPI backend) when that's available.

export type Patient = {
  id: string; name: string; age: number; village: string;
  risk: "LOW" | "MODERATE" | "HIGH";
  temp: number; hr: number; spo2: number; condition: string;
};

export const MOCK_PATIENTS: Patient[] = [
  { id: "P001", name: "Asha Devi", age: 35, village: "Sarangpur", risk: "LOW", temp: 98.4, hr: 76, spo2: 98, condition: "Routine checkup" },
  { id: "P002", name: "Ramesh Kol", age: 52, village: "Barwani Kalan", risk: "HIGH", temp: 101.2, hr: 104, spo2: 91, condition: "Fever, cough, breathlessness" },
  { id: "P003", name: "Sunita Bai", age: 29, village: "Nardev", risk: "MODERATE", temp: 99.6, hr: 88, spo2: 95, condition: "Fever, body pain" },
  { id: "P004", name: "Mahesh Yadav", age: 61, village: "Khategaon", risk: "LOW", temp: 98.1, hr: 72, spo2: 97, condition: "Diabetes follow-up" },
];

export type Hospital = {
  name: string; distanceKm: number; bedsTotal: number; bedsAvail: number;
  icuAvail: number; ambulance: string; eta: string;
};

export const MOCK_HOSPITALS: Hospital[] = [
  { name: "District Civil Hospital", distanceKm: 6.2, bedsTotal: 120, bedsAvail: 18, icuAvail: 3, ambulance: "Available", eta: "9 min" },
  { name: "Primary Health Centre — Sarangpur", distanceKm: 2.1, bedsTotal: 20, bedsAvail: 5, icuAvail: 0, ambulance: "Available", eta: "4 min" },
  { name: "Community Health Centre — Kannod", distanceKm: 14.5, bedsTotal: 45, bedsAvail: 11, icuAvail: 1, ambulance: "En route", eta: "16 min" },
];

export type DiseaseCase = {
  id: number; district: string; disease: string;
  severity: "LOW" | "MODERATE" | "HIGH"; x: number; y: number;
};

export const MOCK_CASES: DiseaseCase[] = [
  { id: 1, district: "Sarangpur", disease: "Seasonal Fever", severity: "HIGH", x: 120, y: 90 },
  { id: 2, district: "Barwani Kalan", disease: "Seasonal Fever", severity: "HIGH", x: 210, y: 130 },
  { id: 3, district: "Nardev", disease: "Diarrhoeal Disease", severity: "MODERATE", x: 160, y: 180 },
  { id: 4, district: "Kannod", disease: "Dengue (suspected)", severity: "MODERATE", x: 260, y: 70 },
  { id: 5, district: "Khategaon", disease: "Seasonal Fever", severity: "LOW", x: 90, y: 200 },
  { id: 6, district: "Udaynagar", disease: "Dengue (suspected)", severity: "HIGH", x: 300, y: 160 },
];

export type HealthRecord = {
  id: string; date: string; doctor: string; diagnosis: string;
  hash: string; verified: boolean;
};

export const MOCK_RECORDS: HealthRecord[] = [
  { id: "REC-2291", date: "2026-08-02", doctor: "Dr. Kavita Rao", diagnosis: "Viral fever", hash: "0x9f21...4ac3", verified: true },
  { id: "REC-2107", date: "2026-05-18", doctor: "Dr. Anil Mehta", diagnosis: "Seasonal allergy", hash: "0x77bd...11e9", verified: true },
  { id: "REC-1980", date: "2026-02-27", doctor: "Dr. Kavita Rao", diagnosis: "Routine checkup — normal", hash: "0x3aa0...908c", verified: true },
];

export const MEDICINES = ["Paracetamol", "Amoxicillin", "Ibuprofen", "Metformin", "Azithromycin", "Warfarin"];

export const INTERACTIONS: Record<string, string> = {
  "Ibuprofen+Warfarin": "Increased bleeding risk — avoid combination without medical supervision.",
  "Amoxicillin+Warfarin": "May increase bleeding risk — monitor closely.",
};

export const FORECAST = [
  { week: "W1", cases: 40 }, { week: "W2", cases: 55 }, { week: "W3", cases: 49 },
  { week: "W4", cases: 70 }, { week: "W5 (proj.)", cases: 88 }, { week: "W6 (proj.)", cases: 101 },
];

export const DOCTORS = [
  { name: "Dr. Kavita Rao", spec: "General Physician", hospital: "District Civil Hospital", avail: "Today, 4:00 PM" },
  { name: "Dr. Anil Mehta", spec: "Pediatrician", hospital: "PHC Sarangpur", avail: "Tomorrow, 10:00 AM" },
  { name: "Dr. Neha Joshi", spec: "General Medicine", hospital: "CHC Kannod", avail: "Today, 6:30 PM" },
];
