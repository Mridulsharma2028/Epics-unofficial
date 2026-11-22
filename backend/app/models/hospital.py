"""Blueprint table: hospitals — id, name, latitude, longitude, total_beds,
available_beds, icu_beds, phone."""
from sqlalchemy import Column, String, Integer, Float
from app.database.db import Base
from app.models.user import gen_id


class Hospital(Base):
    __tablename__ = "hospitals"

    id = Column(String, primary_key=True, default=gen_id)
    name = Column(String, nullable=False)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    distance_km = Column(Float, default=0.0)  # convenience field for the demo emergency flow
    total_beds = Column(Integer, default=0)
    available_beds = Column(Integer, default=0)
    icu_beds = Column(Integer, default=0)
    phone = Column(String, nullable=True)
