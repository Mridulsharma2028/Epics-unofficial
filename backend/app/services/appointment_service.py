from sqlalchemy.orm import Session
from app.models import Appointment


def book_appointment(db: Session, doctor_name: str, patient_name: str, appointment_time: str, type_: str) -> Appointment:
    appt = Appointment(
        doctor_name=doctor_name,
        patient_name=patient_name,
        appointment_time=appointment_time or "To be scheduled",
        type=type_,
        status="Pending",
    )
    db.add(appt)
    db.commit()
    db.refresh(appt)
    return appt


def list_appointments(db: Session, patient_name: str | None = None) -> list[Appointment]:
    q = db.query(Appointment)
    if patient_name:
        q = q.filter(Appointment.patient_name == patient_name)
    return q.order_by(Appointment.created_at.desc()).all()
