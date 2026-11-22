from sqlalchemy.orm import Session
from app.models import Hospital, Ambulance


def get_hospitals(db: Session) -> list[dict]:
    hospitals = db.query(Hospital).order_by(Hospital.distance_km).all()
    ambulances = {a.hospital_id: a for a in db.query(Ambulance).all()}
    out = []
    for h in hospitals:
        amb = ambulances.get(h.id)
        out.append({
            "name": h.name,
            "distanceKm": h.distance_km,
            "bedsTotal": h.total_beds,
            "bedsAvail": h.available_beds,
            "icuAvail": h.icu_beds,
            "ambulance": amb.status if amb else "Unavailable",
            "eta": amb.eta if amb else "—",
        })
    return out


def get_ambulances(db: Session) -> list[Ambulance]:
    return db.query(Ambulance).all()
