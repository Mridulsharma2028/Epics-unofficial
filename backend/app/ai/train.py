"""
Trains the symptom-triage classifier and saves it to
app/ai/artifacts/model.joblib. Run directly (`python -m app.ai.train`) to
retrain and see evaluation metrics printed; app/ai/model.py also calls this
automatically the first time the API starts and no artifact exists yet.

Model: multinomial Logistic Regression over the 4-feature synthetic dataset
(see dataset.py). Evaluated with accuracy / precision / recall / F1 and a
confusion matrix per blueprint section 11's evaluation checklist.
"""
import os

import joblib
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

from app.ai.dataset import generate_synthetic_dataset, FEATURE_COLUMNS

ARTIFACT_DIR = os.path.join(os.path.dirname(__file__), "artifacts")
MODEL_PATH = os.path.join(ARTIFACT_DIR, "model.joblib")


def train_and_save() -> dict:
    df = generate_synthetic_dataset()
    X = df[FEATURE_COLUMNS].values
    y = df["risk"].values

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    scaler = StandardScaler().fit(X_train)
    X_train_s = scaler.transform(X_train)
    X_test_s = scaler.transform(X_test)

    model = LogisticRegression(max_iter=1000)
    model.fit(X_train_s, y_train)

    y_pred = model.predict(X_test_s)
    report = classification_report(y_test, y_pred, output_dict=True)
    cm = confusion_matrix(y_test, y_pred, labels=model.classes_).tolist()

    os.makedirs(ARTIFACT_DIR, exist_ok=True)
    joblib.dump({"model": model, "scaler": scaler, "classes": list(model.classes_)}, MODEL_PATH)

    return {
        "accuracy": report["accuracy"],
        "macro_f1": report["macro avg"]["f1-score"],
        "confusion_matrix": cm,
        "classes": list(model.classes_),
    }


if __name__ == "__main__":
    metrics = train_and_save()
    print("Trained symptom-triage model. Evaluation on held-out test split:")
    print(f"  accuracy: {metrics['accuracy']:.3f}")
    print(f"  macro F1: {metrics['macro_f1']:.3f}")
    print(f"  classes:  {metrics['classes']}")
    print(f"  confusion matrix: {metrics['confusion_matrix']}")
    print(f"Saved to {MODEL_PATH}")
