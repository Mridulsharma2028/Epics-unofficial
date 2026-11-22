from pydantic import BaseModel
from typing import Literal, Optional

Risk = Literal["LOW", "MODERATE", "HIGH"]


class PatientOut(BaseModel):
    id: str
    name: str
    age: Optional[int] = None
    village: Optional[str] = None
    risk: Risk = "LOW"
    temp: float
    hr: int
    spo2: int
    condition: str = ""

    class Config:
        from_attributes = True


class PatientUpdate(BaseModel):
    name: Optional[str] = None
    village: Optional[str] = None
    condition: Optional[str] = None
    risk: Optional[Risk] = None


class HealthRecordOut(BaseModel):
    id: str
    date: str
    doctor: str
    diagnosis: str
    hash: str
    verified: bool = True

    class Config:
        from_attributes = True
