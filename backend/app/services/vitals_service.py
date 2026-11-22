from sqlalchemy.orm import Session
from app.models import VitalReading, Patient


def push_reading(db: Session, patient_id: str, temp: float, hr: int, spo2: int) -> VitalReading:
    reading = VitalReading(patient_id=patient_id, temperature=temp, heart_rate=hr, spo2=spo2, device_id="simulator")
    db.add(reading)

    # Keep the patient row's "latest snapshot" fields (used by the doctor
    # queue) in sync, and flag HIGH risk on the same thresholds as the
    # blueprint's alert scenario (section 14).
    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    if patient:
        patient.temp, patient.hr, patient.spo2 = temp, hr, spo2
        if spo2 < 92 or hr > 100:
            patient.risk = "HIGH"

    db.commit()
    db.refresh(reading)
    return reading


def get_history(db: Session, patient_id: str, limit: int = 50) -> list[VitalReading]:
    return (
        db.query(VitalReading)
        .filter(VitalReading.patient_id == patient_id)
        .order_by(VitalReading.recorded_at.desc())
        .limit(limit)
        .all()
    )
