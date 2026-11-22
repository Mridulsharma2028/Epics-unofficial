from pydantic import BaseModel


class AnalyticsOverview(BaseModel):
    active_cases: int
    high_severity_hotspots: int
    hospital_beds_total: int
    hospital_beds_available: int
    ambulances_total: int
    ambulances_available: int
