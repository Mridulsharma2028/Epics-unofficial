from pydantic import BaseModel
from typing import Literal

Role = Literal["patient", "doctor", "government", "admin"]


class LoginRequest(BaseModel):
    role: Role
    id_or_phone: str = ""


class RegisterRequest(BaseModel):
    role: Role
    name: str
    id_or_phone: str = ""


class TokenResponse(BaseModel):
    token: str
    role: Role


class MeResponse(BaseModel):
    id: str
    name: str
    role: Role
