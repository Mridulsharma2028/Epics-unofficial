"""
AarogyaNet AI backend — FastAPI entrypoint. See blueprint section 2
("Final Prototype Architecture") for how this fits the overall stack:

    Next.js frontend -> REST API / WebSocket -> FastAPI backend -> DB

Run locally:
    uvicorn app.main:app --reload

Interactive API docs (Swagger UI) once running: http://localhost:8000/docs
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database.db import Base, engine, SessionLocal
from app.database.seed import seed_if_empty
import app.models  # noqa: F401 — ensures all models are registered on Base

from app.api import (
    auth, patients, doctors, vitals, ai, appointments, hospitals, emergency, gis, blockchain, analytics,
)

app = FastAPI(
    title="AarogyaNet AI API",
    description="Intelligent Rural Healthcare & Pandemic Response Platform — backend prototype.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

for router in (auth.router, patients.router, doctors.router, vitals.router, ai.router,
               appointments.router, hospitals.router, emergency.router, gis.router,
               blockchain.router, analytics.router):
    app.include_router(router)


@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)
    if settings.seed_demo_data:
        db = SessionLocal()
        try:
            seed_if_empty(db)
        finally:
            db.close()


@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": "aarogyanet-ai-backend"}


@app.get("/")
def root():
    return {
        "service": "AarogyaNet AI API",
        "docs": "/docs",
        "health": "/api/health",
    }
