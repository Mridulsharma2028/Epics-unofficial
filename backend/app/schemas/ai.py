from pydantic import BaseModel
from typing import Literal, Optional

Risk = Literal["LOW", "MODERATE", "HIGH"]


class SymptomCheckRequest(BaseModel):
    """Matches frontend/services/aiService.ts::assessSymptoms(). Symptom
    labels themselves are language-dependent (EN/HI) so the frontend sends
    only the derived, language-agnostic counts/flags it already computed."""
    symptom_count: int
    duration_weight: float
    breathlessness: bool = False
    fever_and_cough: bool = False
    patient_id: Optional[str] = None


class RiskAssessmentOut(BaseModel):
    score: float
    risk: Risk
    confidence: Optional[float] = None


class RiskPredictionRequest(BaseModel):
    """Fuller clinical-style input per blueprint section 11 — not yet called
    by the frontend UI, provided for completeness / future use."""
    age: int
    temp: float
    heart_rate: int
    spo2: int
    symptom_fever: bool = False
    symptom_cough: bool = False
    symptom_body_pain: bool = False
    symptom_breathlessness: bool = False
    duration_days: int = 1
    patient_id: Optional[str] = None


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    reply: str
