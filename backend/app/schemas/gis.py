from pydantic import BaseModel
from typing import Literal

Severity = Literal["LOW", "MODERATE", "HIGH"]


class DiseaseCaseOut(BaseModel):
    id: int
    district: str
    disease: str
    severity: Severity
    x: float
    y: float

    class Config:
        from_attributes = True


class HotspotOut(BaseModel):
    district: str
    case_count: int
    severity: Severity
