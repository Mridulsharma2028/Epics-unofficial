from sqlalchemy.orm import Session
from app.models import Doctor


def get_doctors(db: Session) -> list[dict]:
    rows = db.query(Doctor).all()
    return [
        {"id": d.id, "name": d.name, "spec": d.specialization, "hospital": d.hospital_name, "avail": d.availability}
        for d in rows
    ]


def get_doctor(db: Session, doctor_id: str):
    return db.query(Doctor).filter(Doctor.id == doctor_id).first()
