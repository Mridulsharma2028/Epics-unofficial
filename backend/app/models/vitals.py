"""Blueprint table: vitals — id, patient_id, temperature, heart_rate, spo2,
blood_pressure, device_id, recorded_at."""
from sqlalchemy import Column, String, Integer, Float, DateTime
from datetime import datetime
from app.database.db import Base
from app.models.user import gen_id


class VitalReading(Base):
    __tablename__ = "vitals"

    id = Column(String, primary_key=True, default=gen_id)
    patient_id = Column(String, nullable=False, index=True)
    temperature = Column(Float, nullable=False)
    heart_rate = Column(Integer, nullable=False)
    spo2 = Column(Integer, nullable=False)
    blood_pressure = Column(String, nullable=True)
    device_id = Column(String, default="simulator")
    recorded_at = Column(DateTime, default=datetime.utcnow)
