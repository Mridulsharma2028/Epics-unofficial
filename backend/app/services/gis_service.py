from sqlalchemy.orm import Session
from app.models import DiseaseCase
from app.gis.hotspots import classify_hotspots


def get_cases(db: Session) -> list[DiseaseCase]:
    return db.query(DiseaseCase).all()


def get_hotspots(db: Session) -> list[dict]:
    districts = [c.district for c in db.query(DiseaseCase).all()]
    return classify_hotspots(districts)
