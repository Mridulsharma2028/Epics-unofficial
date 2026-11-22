"""Blueprint table: ai_predictions — id, patient_id, model, prediction,
risk_score, confidence, created_at."""
from sqlalchemy import Column, String, Float, DateTime
from datetime import datetime
from app.database.db import Base
from app.models.user import gen_id


class AIPrediction(Base):
    __tablename__ = "ai_predictions"

    id = Column(String, primary_key=True, default=gen_id)
    patient_id = Column(String, nullable=True)
    model = Column(String, nullable=False)  # e.g. "logreg-symptom-triage-v1"
    prediction = Column(String, nullable=False)  # LOW | MODERATE | HIGH
    risk_score = Column(Float, nullable=False)
    confidence = Column(Float, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
