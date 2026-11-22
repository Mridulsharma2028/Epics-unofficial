"""Blueprint endpoints: GET /api/doctors, GET /api/doctors/{id}, POST /api/appointments."""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.doctor import DoctorOut
from app.schemas.appointment import AppointmentIn, AppointmentOut
from app.services import doctor_service, appointment_service

router = APIRouter(prefix="/api", tags=["doctors"])


@router.get("/doctors", response_model=list[DoctorOut])
def list_doctors(db: Session = Depends(get_db)):
    return doctor_service.get_doctors(db)


@router.get("/doctors/{doctor_id}", response_model=DoctorOut)
def get_doctor(doctor_id: str, db: Session = Depends(get_db)):
    d = doctor_service.get_doctor(db, doctor_id)
    if not d:
        raise HTTPException(status_code=404, detail="Doctor not found")
    return {"id": d.id, "name": d.name, "spec": d.specialization, "hospital": d.hospital_name, "avail": d.availability}


@router.post("/appointments", response_model=AppointmentOut)
def create_appointment(body: AppointmentIn, db: Session = Depends(get_db)):
    return appointment_service.book_appointment(db, body.doctor_name, body.patient_name, body.appointment_time, body.type)
