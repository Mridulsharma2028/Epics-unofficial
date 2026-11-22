"""Blueprint endpoints: POST /api/auth/register, POST /api/auth/login, GET /api/auth/me."""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.auth import LoginRequest, RegisterRequest, TokenResponse, MeResponse
from app.services import auth_service
from app.auth.dependencies import get_current_user, CurrentUser

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/login", response_model=TokenResponse)
def login(body: LoginRequest, db: Session = Depends(get_db)):
    return auth_service.login(db, body.role, body.id_or_phone)


@router.post("/register", response_model=TokenResponse)
def register(body: RegisterRequest, db: Session = Depends(get_db)):
    return auth_service.register(db, body.role, body.name, body.id_or_phone)


@router.get("/me", response_model=MeResponse)
def me(user: CurrentUser = Depends(get_current_user)):
    return {"id": user.id, "name": user.name, "role": user.role}
