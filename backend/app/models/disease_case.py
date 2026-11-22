"""Blueprint table: disease_cases — id, patient_id, disease, severity,
latitude, longitude, reported_at."""
from sqlalchemy import Column, String, Integer, Float, DateTime
from datetime import datetime
from app.database.db import Base
from app.models.user import gen_id


class DiseaseCase(Base):
    __tablename__ = "disease_cases"

    id = Column(Integer, primary_key=True, autoincrement=True)
    patient_id = Column(String, nullable=True)
    district = Column(String, nullable=False)
    disease = Column(String, nullable=False)
    severity = Column(String, nullable=False)  # LOW | MODERATE | HIGH
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    map_x = Column(Float, nullable=True)  # schematic-map coordinates used by the
    map_y = Column(Float, nullable=True)  # frontend's illustrative GIS view
    reported_at = Column(DateTime, default=datetime.utcnow)
