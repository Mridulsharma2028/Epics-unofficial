"""
Seeds the database with the same synthetic demo data as
frontend/lib/mockData.ts, so switching the frontend from its local mocks to
this API is seamless — patient names, hospitals, disease cases and health
records all match. Runs once at startup (app/main.py) if SEED_DEMO_DATA=true
and the users table is empty.
"""
from sqlalchemy.orm import Session

from app.models import (
    User, Patient, Doctor, HealthRecord, Appointment, Hospital, Ambulance, DiseaseCase,
)
from app.blockchain.hashing import compute_record_hash


def seed_if_empty(db: Session):
    if db.query(User).count() > 0:
        return

    # --- Patients (frontend/lib/mockData.ts::MOCK_PATIENTS) ---
    patients = [
        Patient(id="P001", name="Asha Devi", age=35, village="Sarangpur", risk="LOW",
                temp=98.4, hr=76, spo2=98, condition="Routine checkup",
                health_id="ARN-IND-2026-001284", district="Sarangpur"),
        Patient(id="P002", name="Ramesh Kol", age=52, village="Barwani Kalan", risk="HIGH",
                temp=101.2, hr=104, spo2=91, condition="Fever, cough, breathlessness",
                district="Barwani Kalan"),
        Patient(id="P003", name="Sunita Bai", age=29, village="Nardev", risk="MODERATE",
                temp=99.6, hr=88, spo2=95, condition="Fever, body pain", district="Nardev"),
        Patient(id="P004", name="Mahesh Yadav", age=61, village="Khategaon", risk="LOW",
                temp=98.1, hr=72, spo2=97, condition="Diabetes follow-up", district="Khategaon"),
    ]
    db.add_all(patients)

    # --- Doctors (frontend/lib/mockData.ts::DOCTORS) ---
    doctors = [
        Doctor(id="D001", name="Dr. Kavita Rao", specialization="General Physician",
               hospital_name="District Civil Hospital", availability="Today, 4:00 PM"),
        Doctor(id="D002", name="Dr. Anil Mehta", specialization="Pediatrician",
               hospital_name="PHC Sarangpur", availability="Tomorrow, 10:00 AM"),
        Doctor(id="D003", name="Dr. Neha Joshi", specialization="General Medicine",
               hospital_name="CHC Kannod", availability="Today, 6:30 PM"),
    ]
    db.add_all(doctors)

    # --- Hospitals (frontend/lib/mockData.ts::MOCK_HOSPITALS) ---
    hospitals = [
        Hospital(id="H001", name="District Civil Hospital", distance_km=6.2,
                 total_beds=120, available_beds=18, icu_beds=3),
        Hospital(id="H002", name="Primary Health Centre — Sarangpur", distance_km=2.1,
                 total_beds=20, available_beds=5, icu_beds=0),
        Hospital(id="H003", name="Community Health Centre — Kannod", distance_km=14.5,
                 total_beds=45, available_beds=11, icu_beds=1),
    ]
    db.add_all(hospitals)

    # --- Ambulances ---
    ambulances = [
        Ambulance(id="A001", vehicle_number="MP-09-AB-1123", status="Available",
                  hospital_id="H001", eta="9 min"),
        Ambulance(id="A002", vehicle_number="MP-09-AB-1187", status="Available",
                  hospital_id="H002", eta="4 min"),
        Ambulance(id="A003", vehicle_number="MP-09-AB-1204", status="En route",
                  hospital_id="H003", eta="16 min"),
    ]
    db.add_all(ambulances)

    # --- Disease cases (frontend/lib/mockData.ts::MOCK_CASES) ---
    cases = [
        DiseaseCase(district="Sarangpur", disease="Seasonal Fever", severity="HIGH", map_x=120, map_y=90),
        DiseaseCase(district="Barwani Kalan", disease="Seasonal Fever", severity="HIGH", map_x=210, map_y=130),
        DiseaseCase(district="Nardev", disease="Diarrhoeal Disease", severity="MODERATE", map_x=160, map_y=180),
        DiseaseCase(district="Kannod", disease="Dengue (suspected)", severity="MODERATE", map_x=260, map_y=70),
        DiseaseCase(district="Khategaon", disease="Seasonal Fever", severity="LOW", map_x=90, map_y=200),
        DiseaseCase(district="Udaynagar", disease="Dengue (suspected)", severity="HIGH", map_x=300, map_y=160),
    ]
    db.add_all(cases)

    # --- Health records (frontend/lib/mockData.ts::MOCK_RECORDS), hash computed
    # for real via app/blockchain/hashing.py so /blockchain/verify has
    # something genuine to recompute and compare against. ---
    record_defs = [
        ("REC-2291", "2026-08-02", "Dr. Kavita Rao", "Viral fever"),
        ("REC-2107", "2026-05-18", "Dr. Anil Mehta", "Seasonal allergy"),
        ("REC-1980", "2026-02-27", "Dr. Kavita Rao", "Routine checkup — normal"),
    ]
    for rec_id, date, doctor, diagnosis in record_defs:
        record_hash = compute_record_hash(rec_id, diagnosis, doctor, date)
        db.add(HealthRecord(
            id=rec_id, patient_id="P001", doctor_name=doctor, diagnosis=diagnosis,
            record_hash=record_hash, record_date=date,
        ))

    # --- A couple of seeded appointments so doctor/appointments isn't empty ---
    db.add_all([
        Appointment(doctor_name="Dr. Kavita Rao", patient_name="Asha Devi",
                    appointment_time="Thu, 18 Sep · 11:30 AM", status="Confirmed",
                    type="Video consultation"),
        Appointment(doctor_name="Dr. Anil Mehta", patient_name="Asha Devi",
                    appointment_time="Mon, 22 Sep · 9:00 AM", status="Pending",
                    type="In-person"),
    ])

    db.commit()
