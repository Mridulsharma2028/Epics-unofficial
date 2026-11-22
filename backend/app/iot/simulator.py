"""
Blueprint section 13 ("IoT Prototype") — sensor simulator + a WebSocket
connection manager so the frontend's VitalsMonitor screen can (optionally)
receive live pushes instead of only polling GET /api/vitals/{patient_id}.

Actual demo vitals generation currently happens client-side in the
frontend (hooks/useVitalStream.ts), matching blueprint section 13's
"Provide a simulator mode so the complete demo works without physical
sensors." This module provides the server-side counterpart — pushing a
reading via POST /api/vitals (app/api/vitals.py) broadcasts it to any
WebSocket clients subscribed to that patient — for teams that want the
simulator running server-side instead (e.g. a real ESP32 posting readings).
"""
from typing import Dict, List

from fastapi import WebSocket


class VitalsConnectionManager:
    def __init__(self):
        self.connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, patient_id: str, ws: WebSocket):
        await ws.accept()
        self.connections.setdefault(patient_id, []).append(ws)

    def disconnect(self, patient_id: str, ws: WebSocket):
        conns = self.connections.get(patient_id, [])
        if ws in conns:
            conns.remove(ws)

    async def broadcast(self, patient_id: str, payload: dict):
        for ws in list(self.connections.get(patient_id, [])):
            try:
                await ws.send_json(payload)
            except Exception:
                self.disconnect(patient_id, ws)


manager = VitalsConnectionManager()
