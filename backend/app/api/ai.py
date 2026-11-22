"""Blueprint endpoints: POST /api/ai/symptom-check, POST /api/ai/risk-prediction,
POST /api/ai/chat."""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.ai import (
    SymptomCheckRequest, RiskAssessmentOut, RiskPredictionRequest, ChatRequest, ChatResponse,
)
from app.services import ai_service
from app.models import AIPrediction
from app.models.user import gen_id

router = APIRouter(prefix="/api/ai", tags=["ai"])


@router.post("/symptom-check", response_model=RiskAssessmentOut)
def symptom_check(body: SymptomCheckRequest, db: Session = Depends(get_db)):
    result = ai_service.assess_symptoms(body.symptom_count, body.duration_weight, body.breathlessness, body.fever_and_cough)
    db.add(AIPrediction(
        id=gen_id(), patient_id=body.patient_id, model="logreg-symptom-triage-v1",
        prediction=result["risk"], risk_score=result["score"], confidence=result.get("confidence"),
    ))
    db.commit()
    return result


@router.post("/risk-prediction", response_model=RiskAssessmentOut)
def risk_prediction(body: RiskPredictionRequest, db: Session = Depends(get_db)):
    result = ai_service.predict_from_clinical_input(
        body.age, body.temp, body.heart_rate, body.spo2,
        body.symptom_fever, body.symptom_cough, body.symptom_body_pain, body.symptom_breathlessness,
        body.duration_days,
    )
    db.add(AIPrediction(
        id=gen_id(), patient_id=body.patient_id, model="logreg-symptom-triage-v1",
        prediction=result["risk"], risk_score=result["score"], confidence=result.get("confidence"),
    ))
    db.commit()
    return result


@router.post("/chat", response_model=ChatResponse)
def chat(body: ChatRequest):
    return {"reply": ai_service.chat_reply(body.message)}
