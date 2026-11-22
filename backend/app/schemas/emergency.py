from pydantic import BaseModel
from typing import Optional


class DispatchRequest(BaseModel):
    hospital_name: str
    severity: str = "MODERATE"
    patient_id: Optional[str] = None


class DispatchResponse(BaseModel):
    dispatched: bool
    hospital: str
    severity: str
    ambulance: Optional[str] = None
    eta: Optional[str] = None
