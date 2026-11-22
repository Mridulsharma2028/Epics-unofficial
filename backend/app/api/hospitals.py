"""Blueprint endpoint (shared with GIS/Emergency tables): hospital capacity
list, used by GET /api/gis/hospitals and GET /api/emergency/hospitals."""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.hospital import HospitalOut
from app.services import hospital_service

router = APIRouter(prefix="/api/hospitals", tags=["hospitals"])


@router.get("", response_model=list[HospitalOut])
def list_hospitals(db: Session = Depends(get_db)):
    return hospital_service.get_hospitals(db)
