"""Blueprint endpoints: GET /api/gis/cases, GET /api/gis/hotspots, GET /api/gis/hospitals."""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.gis import DiseaseCaseOut, HotspotOut
from app.schemas.hospital import HospitalOut
from app.services import gis_service, hospital_service

router = APIRouter(prefix="/api/gis", tags=["gis"])


@router.get("/cases", response_model=list[DiseaseCaseOut])
def cases(db: Session = Depends(get_db)):
    rows = gis_service.get_cases(db)
    return [{"id": c.id, "district": c.district, "disease": c.disease, "severity": c.severity, "x": c.map_x, "y": c.map_y} for c in rows]


@router.get("/hotspots", response_model=list[HotspotOut])
def hotspots(db: Session = Depends(get_db)):
    return gis_service.get_hotspots(db)


@router.get("/hospitals", response_model=list[HospitalOut])
def gis_hospitals(db: Session = Depends(get_db)):
    return hospital_service.get_hospitals(db)
