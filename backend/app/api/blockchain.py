"""Blueprint endpoints: POST /api/blockchain/record-hash,
GET /api/blockchain/verify/{record_id}."""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.blockchain import RecordHashRequest, RecordHashResponse, VerifyResponse
from app.services import blockchain_service
from app.models import HealthRecord
from app.blockchain.hashing import compute_record_hash

router = APIRouter(prefix="/api/blockchain", tags=["blockchain"])


@router.post("/record-hash", response_model=RecordHashResponse)
def record_hash(body: RecordHashRequest, db: Session = Depends(get_db)):
    record = db.query(HealthRecord).filter(HealthRecord.id == body.record_id).first()
    if not record:
        return {"recordId": body.record_id, "hash": ""}
    h = compute_record_hash(record.id, record.diagnosis, record.doctor_name, record.record_date)
    return {"recordId": body.record_id, "hash": h}


@router.get("/verify/{record_id}", response_model=VerifyResponse)
def verify(record_id: str, db: Session = Depends(get_db)):
    return blockchain_service.verify_record(db, record_id)
