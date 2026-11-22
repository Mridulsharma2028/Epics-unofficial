"""Blueprint table: ambulances — id, vehicle_number, latitude, longitude,
status, hospital_id."""
from sqlalchemy import Column, String, Float
from app.database.db import Base
from app.models.user import gen_id


class Ambulance(Base):
    __tablename__ = "ambulances"

    id = Column(String, primary_key=True, default=gen_id)
    vehicle_number = Column(String, nullable=False)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    status = Column(String, default="Available")  # Available | En route | Busy
    hospital_id = Column(String, nullable=True)
    eta = Column(String, nullable=True)  # display string, demo-only
