from pydantic import BaseModel
from typing import Optional


class DoctorOut(BaseModel):
    id: str
    name: str
    spec: Optional[str] = None
    hospital: Optional[str] = None
    avail: Optional[str] = None

    class Config:
        from_attributes = True
