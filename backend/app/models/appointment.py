"""Blueprint table: appointments — id, patient_id, doctor_id,
appointment_time, status, type."""
from sqlalchemy import Column, String, DateTime
from datetime import datetime
from app.database.db import Base
from app.models.user import gen_id


class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(String, primary_key=True, default=gen_id)
    patient_id = Column(String, nullable=True)
    patient_name = Column(String, nullable=True)
    doctor_id = Column(String, nullable=True)
    doctor_name = Column(String, nullable=False)
    appointment_time = Column(String, nullable=False)  # display string, demo-only
    status = Column(String, default="Pending")  # Pending | Confirmed
    type = Column(String, default="Video consultation")  # or "In-person"
    created_at = Column(DateTime, default=datetime.utcnow)
