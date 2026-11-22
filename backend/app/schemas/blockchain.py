from pydantic import BaseModel
from typing import Literal


class RecordHashRequest(BaseModel):
    record_id: str


class RecordHashResponse(BaseModel):
    recordId: str
    hash: str


class VerifyResponse(BaseModel):
    recordId: str
    status: Literal["VERIFIED", "MISMATCH", "NOT_FOUND"]
