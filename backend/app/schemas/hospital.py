from pydantic import BaseModel


class HospitalOut(BaseModel):
    name: str
    distanceKm: float
    bedsTotal: int
    bedsAvail: int
    icuAvail: int
    ambulance: str
    eta: str
