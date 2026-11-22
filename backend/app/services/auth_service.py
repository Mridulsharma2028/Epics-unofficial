"""
Passwordless demo auth, matching the frontend's login screen (name + role +
an ID/phone/license field, no password input). login() is upsert-like: an
unrecognized id_or_phone is auto-provisioned so the demo works whether or
not someone hit /register first — see the note in
frontend/services/authService.ts.
"""
from sqlalchemy.orm import Session

from app.models import User, Patient, Doctor
from app.models.user import gen_id
from app.auth.security import create_access_token


def _get_or_create_user(db: Session, role: str, name: str, id_or_phone: str) -> User:
    query = db.query(User).filter(User.role == role)
    if id_or_phone:
        query = query.filter((User.phone == id_or_phone) | (User.email == id_or_phone))
    user = query.first()
    if user:
        return user

    user = User(id=gen_id(), name=name or "Demo User", role=role, phone=id_or_phone or None)
    db.add(user)
    db.flush()

    # Auto-provision the matching domain row so this user shows up in the
    # relevant lists (e.g. a newly registered doctor appears in GET /doctors).
    if role == "patient":
        db.add(Patient(id=user.id, user_id=user.id, name=user.name, health_id=f"ARN-IND-2026-{user.id[:6].upper()}"))
    elif role == "doctor":
        db.add(Doctor(id=user.id, user_id=user.id, name=user.name, specialization="General Physician"))

    db.commit()
    db.refresh(user)
    return user


def login(db: Session, role: str, id_or_phone: str) -> dict:
    user = _get_or_create_user(db, role, name="", id_or_phone=id_or_phone)
    token = create_access_token(subject=user.id, role=user.role, name=user.name)
    return {"token": token, "role": user.role}


def register(db: Session, role: str, name: str, id_or_phone: str) -> dict:
    user = _get_or_create_user(db, role, name=name, id_or_phone=id_or_phone)
    # If the account already existed, keep the name they registered with fresh.
    if name and user.name != name:
        user.name = name
        db.commit()
    token = create_access_token(subject=user.id, role=user.role, name=user.name)
    return {"token": token, "role": user.role}
