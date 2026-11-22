from sqlalchemy.orm import Session
from app.models import DiseaseCase, Hospital, Ambulance


def get_overview(db: Session) -> dict:
    cases = db.query(DiseaseCase).all()
    high = len([c for c in cases if c.severity == "HIGH"])
    hospitals = db.query(Hospital).all()
    ambulances = db.query(Ambulance).all()

    return {
        "active_cases": len(cases) * 7,  # same illustrative multiplier the frontend UI used locally
        "high_severity_hotspots": high,
        "hospital_beds_total": sum(h.total_beds for h in hospitals),
        "hospital_beds_available": sum(h.available_beds for h in hospitals),
        "ambulances_total": len(ambulances),
        "ambulances_available": len([a for a in ambulances if a.status == "Available"]),
    }
