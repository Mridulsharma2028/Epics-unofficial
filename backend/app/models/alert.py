"""Blueprint table: alerts — id, patient_id, type, severity, message,
status, created_at."""
from sqlalchemy import Column, String, DateTime
from datetime import datetime
from app.database.db import Base
from app.models.user import gen_id


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(String, primary_key=True, default=gen_id)
    patient_id = Column(String, nullable=False)
    type = Column(String, nullable=False)  # e.g. "abnormal_vitals"
    severity = Column(String, nullable=False)
    message = Column(String, nullable=False)
    status = Column(String, default="open")  # open | acknowledged | resolved
    created_at = Column(DateTime, default=datetime.utcnow)
