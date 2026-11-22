"""Blueprint endpoints: GET /api/patients/{id}, PUT /api/patients/{id},
GET /api/patients/{id}/records. GET /api/patients (list) is added for the
doctor queue view — see frontend/services/patientService.ts::getPatientQueue."""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.patient import PatientOut, PatientUpdate, HealthRecordOut
from app.services import patient_service
from app.auth.dependencies import require_role

router = APIRouter(prefix="/api/patients", tags=["patients"])


@router.get("", response_model=list[PatientOut])
def list_patients(db: Session = Depends(get_db)):
    return patient_service.get_patient_queue(db)


@router.get("/{patient_id}", response_model=PatientOut)
def get_patient(patient_id: str, db: Session = Depends(get_db)):
    patient = patient_service.get_patient(db, patient_id)
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient


@router.put("/{patient_id}", response_model=PatientOut)
def update_patient(
    patient_id: str, body: PatientUpdate, db: Session = Depends(get_db),
    _user=Depends(require_role("doctor", "admin")),
):
    patient = patient_service.update_patient(db, patient_id, **body.model_dump(exclude_unset=True))
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient


@router.get("/{patient_id}/records", response_model=list[HealthRecordOut])
def get_records(patient_id: str, db: Session = Depends(get_db)):
    return patient_service.get_patient_records(db, patient_id)
