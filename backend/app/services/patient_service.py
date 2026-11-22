from typing import Optional
from sqlalchemy.orm import Session

from app.models import Patient, HealthRecord


def get_patient_queue(db: Session) -> list[Patient]:
    rows = db.query(Patient).all()
    # Risk-sorted so HIGH-risk patients surface first, matching the doctor
    # dashboard's queue ordering in the frontend.
    order = {"HIGH": 0, "MODERATE": 1, "LOW": 2}
    return sorted(rows, key=lambda p: order.get(p.risk, 3))


def get_patient(db: Session, patient_id: str) -> Optional[Patient]:
    return db.query(Patient).filter(Patient.id == patient_id).first()


def update_patient(db: Session, patient_id: str, **fields) -> Optional[Patient]:
    patient = get_patient(db, patient_id)
    if not patient:
        return None
    for k, v in fields.items():
        if v is not None:
            setattr(patient, k, v)
    db.commit()
    db.refresh(patient)
    return patient


def get_patient_records(db: Session, patient_id: str) -> list[dict]:
    rows = db.query(HealthRecord).filter(HealthRecord.patient_id == patient_id).order_by(HealthRecord.record_date.desc()).all()
    return [
        {
            "id": r.id,
            "date": r.record_date,
            "doctor": r.doctor_name,
            "diagnosis": r.diagnosis,
            "hash": r.record_hash,
            "verified": True,
        }
        for r in rows
    ]
