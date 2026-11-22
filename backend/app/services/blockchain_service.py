from sqlalchemy.orm import Session
from app.models import HealthRecord
from app.blockchain.hashing import compute_record_hash


def verify_record(db: Session, record_id: str) -> dict:
    record = db.query(HealthRecord).filter(HealthRecord.id == record_id).first()
    if not record:
        return {"recordId": record_id, "status": "NOT_FOUND"}

    recomputed = compute_record_hash(record.id, record.diagnosis, record.doctor_name, record.record_date)
    status = "VERIFIED" if recomputed == record.record_hash else "MISMATCH"
    return {"recordId": record_id, "status": status}
