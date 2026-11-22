"""Blueprint's Doctors service also lists POST /api/appointments (handled in
api/doctors.py to keep creation next to the doctor lookup it's booked
against). This router covers reading appointments back."""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.appointment import AppointmentOut
from app.services import appointment_service

router = APIRouter(prefix="/api/appointments", tags=["appointments"])


@router.get("", response_model=list[AppointmentOut])
def list_appointments(patient_name: str | None = None, db: Session = Depends(get_db)):
    return appointment_service.list_appointments(db, patient_name)
