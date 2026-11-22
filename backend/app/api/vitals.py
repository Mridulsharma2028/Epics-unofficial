"""Blueprint endpoints: POST /api/vitals, GET /api/vitals/{patient_id},
WS /ws/vitals/{patient_id}."""
from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session

from app.database.db import get_db, SessionLocal
from app.schemas.vitals import VitalReadingIn
from app.services import vitals_service
from app.iot.simulator import manager

router = APIRouter(tags=["vitals"])


@router.post("/api/vitals")
async def push_vitals(body: VitalReadingIn, db: Session = Depends(get_db)):
    reading = vitals_service.push_reading(db, body.patientId, body.temp, body.hr, body.spo2)
    await manager.broadcast(body.patientId, {
        "patientId": body.patientId, "temp": reading.temperature,
        "hr": reading.heart_rate, "spo2": reading.spo2,
        "recordedAt": reading.recorded_at.isoformat(),
    })
    return {"ok": True}


@router.get("/api/vitals/{patient_id}")
def get_vitals_history(patient_id: str, db: Session = Depends(get_db)):
    rows = vitals_service.get_history(db, patient_id)
    return [
        {"patientId": patient_id, "temp": r.temperature, "hr": r.heart_rate, "spo2": r.spo2, "recordedAt": r.recorded_at}
        for r in rows
    ]


@router.websocket("/ws/vitals/{patient_id}")
async def vitals_ws(websocket: WebSocket, patient_id: str):
    await manager.connect(patient_id, websocket)
    try:
        while True:
            # Clients don't need to send anything; this just keeps the
            # connection open to receive broadcast() pushes from POST /vitals.
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(patient_id, websocket)
