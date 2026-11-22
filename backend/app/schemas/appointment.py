from pydantic import BaseModel
from typing import Optional


class AppointmentIn(BaseModel):
    doctor_name: str
    patient_name: Optional[str] = None
    appointment_time: Optional[str] = None
    type: str = "Video consultation"


class AppointmentOut(BaseModel):
    id: str
    doctor_name: str
    patient_name: Optional[str]
    appointment_time: str
    status: str
    type: str

    class Config:
        from_attributes = True
