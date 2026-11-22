"""
Import every model here so Base.metadata is fully populated before
Base.metadata.create_all() runs in app/main.py.
"""
from app.models.user import User
from app.models.patient import Patient
from app.models.doctor import Doctor
from app.models.health_record import HealthRecord
from app.models.vitals import VitalReading
from app.models.appointment import Appointment
from app.models.hospital import Hospital
from app.models.ambulance import Ambulance
from app.models.disease_case import DiseaseCase
from app.models.alert import Alert
from app.models.ai_prediction import AIPrediction

__all__ = [
    "User", "Patient", "Doctor", "HealthRecord", "VitalReading", "Appointment",
    "Hospital", "Ambulance", "DiseaseCase", "Alert", "AIPrediction",
]
