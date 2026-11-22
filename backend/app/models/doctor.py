"""Blueprint table: doctors — id, user_id, specialization, license_number,
hospital_id, availability."""
from sqlalchemy import Column, String, DateTime
from datetime import datetime
from app.database.db import Base
from app.models.user import gen_id


class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(String, primary_key=True, default=gen_id)
    user_id = Column(String, nullable=True)
    name = Column(String, nullable=False)
    specialization = Column(String, nullable=True)
    license_number = Column(String, nullable=True)
    hospital_id = Column(String, nullable=True)
    hospital_name = Column(String, nullable=True)
    availability = Column(String, nullable=True)  # human-readable slot, demo-only
    created_at = Column(DateTime, default=datetime.utcnow)
