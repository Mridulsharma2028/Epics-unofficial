"""Blueprint endpoints: POST /api/emergency/create, GET /api/emergency/hospitals,
GET /api/emergency/ambulances, POST /api/emergency/dispatch."""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.hospital import HospitalOut
from app.schemas.emergency import DispatchRequest, DispatchResponse
from app.services import hospital_service, emergency_service

router = APIRouter(prefix="/api/emergency", tags=["emergency"])


@router.get("/hospitals", response_model=list[HospitalOut])
def emergency_hospitals(db: Session = Depends(get_db)):
    return hospital_service.get_hospitals(db)


@router.get("/ambulances")
def emergency_ambulances(db: Session = Depends(get_db)):
    rows = hospital_service.get_ambulances(db)
    return [{"id": a.id, "vehicleNumber": a.vehicle_number, "status": a.status, "eta": a.eta} for a in rows]


@router.post("/create")
def create_emergency(body: DispatchRequest, db: Session = Depends(get_db)):
    result = emergency_service.dispatch(db, body.hospital_name, body.severity)
    return result


@router.post("/dispatch", response_model=DispatchResponse)
def dispatch(body: DispatchRequest, db: Session = Depends(get_db)):
    return emergency_service.dispatch(db, body.hospital_name, body.severity)
