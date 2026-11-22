"""
Synthetic training data generator for the symptom-triage model — see
blueprint section 11/12 ("AI/ML Prototype" / "Dataset Workflow"). Clearly
synthetic, documented here rather than pulled from any real patient data.

Feature set is intentionally limited to what the frontend's AI Assistant
screen actually collects and sends (see
frontend/services/aiService.ts::assessSymptoms and
app/schemas/ai.py::SymptomCheckRequest):
    - symptom_count        (0-6, how many symptoms were selected)
    - duration_weight      (0, 10 or 20 — how long symptoms have lasted)
    - breathlessness       (0/1)
    - fever_and_cough      (0/1, both present together)

Labels are generated with the same rule the frontend used as its original
deterministic stand-in, plus Gaussian noise on the label boundary so the
model has to learn a decision boundary rather than memorize the rule
exactly — this keeps the exercise honest as a "trained model" while staying
consistent with the limited inputs actually available.
"""
import numpy as np
import pandas as pd

FEATURE_COLUMNS = ["symptom_count", "duration_weight", "breathlessness", "fever_and_cough"]


def generate_synthetic_dataset(n: int = 4000, seed: int = 42) -> pd.DataFrame:
    rng = np.random.default_rng(seed)

    symptom_count = rng.integers(0, 7, size=n)
    duration_weight = rng.choice([0, 10, 20], size=n, p=[0.4, 0.35, 0.25])
    breathlessness = rng.integers(0, 2, size=n)
    fever_and_cough = rng.integers(0, 2, size=n)

    base_score = symptom_count * 12 + duration_weight
    base_score = base_score + breathlessness * 25 + fever_and_cough * 10
    noise = rng.normal(0, 6, size=n)
    score = np.clip(base_score + noise, 0, 100)

    risk = np.where(score >= 55, "HIGH", np.where(score >= 28, "MODERATE", "LOW"))

    return pd.DataFrame({
        "symptom_count": symptom_count,
        "duration_weight": duration_weight,
        "breathlessness": breathlessness,
        "fever_and_cough": fever_and_cough,
        "score": score,
        "risk": risk,
    })
