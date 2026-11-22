"""Blueprint table: health_records — id, patient_id, doctor_id, diagnosis,
symptoms, notes, prescription, created_at, record_hash."""
from sqlalchemy import Column, String, DateTime
from datetime import datetime
from app.database.db import Base
from app.models.user import gen_id


class HealthRecord(Base):
    __tablename__ = "health_records"

    id = Column(String, primary_key=True, default=gen_id)
    patient_id = Column(String, nullable=False)
    doctor_id = Column(String, nullable=True)
    doctor_name = Column(String, nullable=True)
    diagnosis = Column(String, nullable=False)
    symptoms = Column(String, nullable=True)
    notes = Column(String, nullable=True)
    prescription = Column(String, nullable=True)
    record_hash = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    record_date = Column(String, nullable=True)  # display date used to seed demo hashes deterministically
