# AarogyaNet AI — Prototype

Full-stack implementation of the **AarogyaNet AI Prototype Blueprint**:
a Next.js frontend and a FastAPI backend, wired together end-to-end.

```
AarogyaNet-AI/
├── frontend/        Next.js (App Router) — see frontend/README.md
├── backend/         FastAPI — see backend/README.md
└── docker-compose.yml
```

Only `frontend/` and `backend/` are built out here — the blueprint's wider
repository structure (section 23) also lists `ai/`, `iot/`, `gis/`,
`blockchain/`, `datasets/`, `docs/`, `research-paper/`, `presentation/`,
`diagrams/`, `screenshots/`. Those live *inside* `backend/app/` in this
implementation (`ai/`, `iot/`, `gis/`, `blockchain/` are backend modules,
not separate top-level services) — add the documentation/research folders
alongside this README as your team produces that material.

## Run everything with one command

```bash
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:8000 (Swagger docs at `/docs`)

## Run it without Docker

**Backend** (terminal 1):
```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

**Frontend** (terminal 2):
```bash
cd frontend
npm install
cp .env.example .env.local   # NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
npm run dev
```

Open http://localhost:3000, pick Patient / Doctor / Government, and
continue — no real credentials needed. Every screen now calls the FastAPI
backend (patient queue, AI symptom check, vitals push/read, GIS cases,
emergency dispatch, blockchain verify, doctor directory, appointment
booking, government analytics). If the backend isn't running, the frontend
falls back to its built-in mock data so it never hard-fails — see each
`frontend/services/*.ts` file for the exact fallback behavior.

## What's genuinely working vs. illustrative

- **Real**: JWT-based demo auth + RBAC, SQLAlchemy models matching the
  blueprint's DB design 1:1, a trained (if simple) scikit-learn model
  behind the AI Assistant, a real SHA-256 hash/verify blockchain layer, a
  WebSocket endpoint for live vitals, and full CRUD-ish flows for patients,
  doctors, appointments, vitals, hospitals and disease cases.
- **Illustrative** (and documented as such in code comments): the GIS
  hotspot method (district case-count thresholds, not real spatial
  clustering), the "blockchain" (hash compare, not a distributed ledger),
  and the frontend's schematic SVG map (not real map tiles).

See `backend/README.md` and `frontend/README.md` for the full detail on
each.
