# AarogyaNet AI — Backend

FastAPI implementation of the backend described in the **AarogyaNet AI
Prototype Blueprint**, following the exact structure from blueprint section 9:

```
backend/
├── app/
│   ├── main.py         FastAPI app, CORS, router wiring, startup seed
│   ├── api/             one router per blueprint service (11 files)
│   ├── models/           SQLAlchemy models — one per blueprint DB table (section 7)
│   ├── schemas/          Pydantic request/response contracts
│   ├── services/         business logic called by the routers
│   ├── database/         engine/session + demo data seeding
│   ├── auth/              JWT issuing/verification + RBAC dependency
│   ├── ai/                 synthetic dataset, training script, trained model wrapper
│   ├── iot/                 vitals WebSocket connection manager
│   ├── gis/                  hotspot classification
│   └── blockchain/            SHA-256 record hash/verify
└── tests/               pytest suite
```

## Getting started

```bash
cd backend
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

The API is now at **http://localhost:8000** — interactive docs (Swagger UI)
at **http://localhost:8000/docs**.

On first startup it creates a local SQLite file (`aarogyanet.db`) and seeds
it with the same synthetic demo data the frontend previously hardcoded
(`Asha Devi`, `Dr. Kavita Rao`, the three demo hospitals, etc.) — see
`app/database/seed.py`. Delete `aarogyanet.db` to reset.

## Connecting the frontend

In `frontend/.env` (copy from `frontend/.env.example`):

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

`frontend/services/*.ts` call this backend directly and fall back to the
frontend's local mock data if the backend is unreachable, so the frontend
keeps working standalone during development. With both running
(`uvicorn` here, `npm run dev` in `frontend/`), every screen — patient
queue, AI assistant, vitals, GIS map, emergency dispatch, blockchain
verification — is backed by real HTTP calls into this API.

## Auth model (read this before assuming it's production-ready)

This is a **passwordless demo auth** flow matching the frontend's login
screen (name + role + an ID/phone/license field, no password input):
`POST /api/auth/login` looks up a user by role + id/phone and
auto-provisions one if it doesn't exist, then issues a JWT. There is no
password verification. `app/models/user.py` still has a `password_hash`
column and `passlib` is already a dependency, so wiring in real credential
checking later is a `services/auth_service.py`-only change.

Read-only GET endpoints (patient queue, hospitals, GIS cases, etc.) are
open with no auth required, so the demo works instantly. Write/action
endpoints that need an identity (booking, vitals ingestion, blockchain
record-hash, patient record updates) go through `require_role(...)` in
`app/auth/dependencies.py` — tighten this further per-endpoint as real
screens are built.

## The AI model

`app/ai/` trains a small multinomial Logistic Regression on a **synthetic**
dataset (`app/ai/dataset.py`) whose 4 features match exactly what the
frontend's AI Assistant screen sends (`symptom_count`, `duration_weight`,
`breathlessness`, `fever_and_cough`) — see blueprint section 11. Train (or
retrain) it directly:

```bash
python -m app.ai.train
```

This prints accuracy / macro-F1 / a confusion matrix on a held-out test
split, and saves the model to `app/ai/artifacts/model.joblib`.
`POST /api/ai/symptom-check` loads (or auto-trains) this model rather than
using a hardcoded formula. `POST /api/ai/risk-prediction` accepts a fuller,
clinical-style input (age, vitals, individual symptom flags) per blueprint
section 10's endpoint table — the frontend doesn't call it yet.

## Database

SQLite by default — zero setup. Swap to Postgres (blueprint section 4's
recommended stack) by changing `DATABASE_URL` in `.env`, e.g.:

```
DATABASE_URL=postgresql+psycopg2://user:password@localhost:5432/aarogyanet
```

No application code needs to change — `app/database/db.py` is the only
DB-specific file.

## GIS & Blockchain — what's real vs. illustrative

- **GIS**: `app/gis/hotspots.py` groups seeded `disease_cases` rows by
  district and classifies severity by case-count thresholds — a documented,
  intentionally simple stand-in for real spatial clustering (e.g. DBSCAN
  over lat/lng). See the module docstring and blueprint section 15.
- **Blockchain**: `app/blockchain/hashing.py` computes and compares a
  SHA-256 hash over each health record's clinical content — a genuine
  integrity check, but a stand-in for actually writing to a distributed
  ledger (blueprint section 19). Records live in normal relational storage;
  blockchain here is verification-layer only, as the blueprint specifies.

## Tests

```bash
pytest
```

Covers auth (JWT issuing + `/me`), the seeded patient queue, the AI
symptom-check endpoint's risk bands, vitals push/read, and blockchain
verify (including the NOT_FOUND case). Extend per blueprint section 27
("Testing Checklist") as more endpoints get real logic.
