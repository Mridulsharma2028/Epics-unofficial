"""
Loads (training on first use if needed) the symptom-triage model and
exposes a single predict() function used by app/services/ai_service.py.
"""
import os
import joblib
import numpy as np

from app.ai.train import train_and_save, MODEL_PATH
from app.ai.dataset import FEATURE_COLUMNS

_cache = None


def _load():
    global _cache
    if _cache is not None:
        return _cache
    if not os.path.exists(MODEL_PATH):
        train_and_save()
    _cache = joblib.load(MODEL_PATH)
    return _cache


def predict(symptom_count: int, duration_weight: float, breathlessness: bool, fever_and_cough: bool):
    bundle = _load()
    model, scaler = bundle["model"], bundle["scaler"]

    x = np.array([[symptom_count, duration_weight, int(breathlessness), int(fever_and_cough)]])
    x_s = scaler.transform(x)

    proba = model.predict_proba(x_s)[0]
    classes = list(model.classes_)
    risk = classes[int(np.argmax(proba))]
    confidence = float(np.max(proba))

    # Score is reported on the same 0-100 scale the frontend/UI already
    # expects, derived from class probabilities weighted toward HIGH, so the
    # displayed number moves smoothly with model confidence rather than
    # jumping in fixed bands.
    weights = {"LOW": 15, "MODERATE": 45, "HIGH": 85}
    score = float(sum(proba[i] * weights[classes[i]] for i in range(len(classes))))
    score = round(min(100.0, max(0.0, score)), 1)

    return {"score": score, "risk": risk, "confidence": round(confidence, 3)}
