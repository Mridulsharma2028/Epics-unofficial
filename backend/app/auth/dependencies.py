"""
FastAPI dependencies for authentication + role-based access control (RBAC),
per blueprint section 6 ("Implement role-based access control so a user can
access only the resources permitted by their role").

Design note: this prototype's read-only GET endpoints (patient queue,
hospitals, GIS cases, etc.) are left open so the demo works instantly
without every screen needing a login first — matching how the current
frontend actually calls them. `require_user` and `require_role` are applied
to the write/action endpoints (booking, dispatch, vitals ingestion, record
hashing) where an identity genuinely matters. Tighten further per-endpoint
as real screens are built out.
"""
from typing import Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from app.auth.security import decode_access_token

bearer_scheme = HTTPBearer(auto_error=False)


class CurrentUser:
    def __init__(self, id: str, role: str, name: str):
        self.id = id
        self.role = role
        self.name = name


def get_current_user(
    creds: Optional[HTTPAuthorizationCredentials] = Depends(bearer_scheme),
) -> CurrentUser:
    if creds is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")
    payload = decode_access_token(creds.credentials)
    if payload is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")
    return CurrentUser(id=payload["sub"], role=payload["role"], name=payload["name"])


def require_role(*roles: str):
    def _checker(user: CurrentUser = Depends(get_current_user)) -> CurrentUser:
        if roles and user.role not in roles:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient role for this action")
        return user
    return _checker
