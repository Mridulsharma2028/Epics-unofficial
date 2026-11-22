from sqlalchemy.orm import Session
from app.models import Hospital, Ambulance


def dispatch(db: Session, hospital_name: str, severity: str) -> dict:
    hospital = db.query(Hospital).filter(Hospital.name == hospital_name).first()
    if not hospital:
        return {"dispatched": False, "hospital": hospital_name, "severity": severity}

    ambulance = db.query(Ambulance).filter(Ambulance.hospital_id == hospital.id).first()
    if ambulance:
        ambulance.status = "En route"
        db.commit()

    return {
        "dispatched": True,
        "hospital": hospital.name,
        "severity": severity,
        "ambulance": ambulance.vehicle_number if ambulance else None,
        "eta": ambulance.eta if ambulance else None,
    }
