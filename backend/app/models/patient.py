"""Blueprint table: patients — id, user_id, health_id, date_of_birth, gender,
blood_group, village, district, state, latitude, longitude.

Extended with the live-vitals + risk snapshot fields the frontend's
Patient type (lib/mockData.ts) expects on the doctor queue, so a single row
serves both the DB-design table and the API response shape without a join.
"""
from sqlalchemy import Column, String, Integer, Float, DateTime
from datetime import datetime
from app.database.db import Base
from app.models.user import gen_id


class Patient(Base):
    __tablename__ = "patients"

    id = Column(String, primary_key=True, default=gen_id)  # e.g. "P001" for seeded demo rows
    user_id = Column(String, nullable=True)
    name = Column(String, nullable=False)
    health_id = Column(String, unique=True, nullable=True)
    date_of_birth = Column(String, nullable=True)
    age = Column(Integer, nullable=True)
    gender = Column(String, nullable=True)
    blood_group = Column(String, nullable=True)
    village = Column(String, nullable=True)
    district = Column(String, nullable=True)
    state = Column(String, nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)

    # Latest known vitals + AI risk snapshot (for the doctor queue view).
    risk = Column(String, default="LOW")  # LOW | MODERATE | HIGH
    temp = Column(Float, default=98.4)
    hr = Column(Integer, default=76)
    spo2 = Column(Integer, default=98)
    condition = Column(String, default="")

    created_at = Column(DateTime, default=datetime.utcnow)
