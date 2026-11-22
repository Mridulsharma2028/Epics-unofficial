from pydantic import BaseModel
from datetime import datetime


class VitalReadingIn(BaseModel):
    patientId: str
    temp: float
    hr: int
    spo2: int


class VitalReadingOut(BaseModel):
    patientId: str
    temp: float
    hr: int
    spo2: int
    recordedAt: datetime
