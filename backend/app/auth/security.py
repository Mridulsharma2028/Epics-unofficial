"""
JWT issuing/verification. This prototype uses passwordless demo login (see
app/services/auth_service.py) so there is no password hashing/verification
flow wired up yet — passlib is already a dependency for when that's added.
"""
from datetime import datetime, timedelta
from typing import Optional

from jose import jwt, JWTError

from app.config import settings


def create_access_token(subject: str, role: str, name: str) -> str:
    expire = datetime.utcnow() + timedelta(minutes=settings.jwt_expire_minutes)
    payload = {"sub": subject, "role": role, "name": name, "exp": expire}
    return jwt.encode(payload, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)


def decode_access_token(token: str) -> Optional[dict]:
    try:
        return jwt.decode(token, settings.jwt_secret_key, algorithms=[settings.jwt_algorithm])
    except JWTError:
        return None
