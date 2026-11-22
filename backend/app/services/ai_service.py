from app.ai.model import predict as model_predict


def assess_symptoms(symptom_count: int, duration_weight: float, breathlessness: bool, fever_and_cough: bool) -> dict:
    return model_predict(symptom_count, duration_weight, breathlessness, fever_and_cough)


def predict_from_clinical_input(age: int, temp: float, heart_rate: int, spo2: int, fever: bool, cough: bool,
                                 body_pain: bool, breathlessness: bool, duration_days: int) -> dict:
    """Adapts the fuller clinical-style input (blueprint section 11) onto the
    same trained model's 4-feature interface."""
    symptom_count = sum([fever, cough, body_pain, breathlessness])
    duration_weight = 20 if duration_days >= 5 else 10 if duration_days >= 3 else 0
    result = model_predict(symptom_count, duration_weight, breathlessness, fever and cough)

    # Clinical vitals can escalate risk even when the symptom model alone
    # wouldn't (e.g. very low SpO2), same idea as blueprint section 14's
    # abnormal-vitals alert thresholds.
    if spo2 < 90 or heart_rate > 110:
        result = {**result, "risk": "HIGH", "score": max(result["score"], 80.0)}
    return result


SAFE_CHAT_REPLY = (
    "I can help you think through symptoms and general next steps, but I'm not able to "
    "diagnose conditions or replace a doctor. For anything urgent — severe breathlessness, "
    "chest pain, heavy bleeding, or loss of consciousness — please go to the nearest hospital "
    "or use the Emergency screen right away. Otherwise, try the symptom checker for a "
    "preliminary risk read, and book a consultation with a doctor for anything persistent."
)


def chat_reply(message: str) -> str:
    # Deliberately not free-form generation — a fixed, safety-reviewed reply
    # per blueprint section 31 ("AI outputs must not be presented as
    # definitive diagnosis or autonomous medical prescription").
    return SAFE_CHAT_REPLY
