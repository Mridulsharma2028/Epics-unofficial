"""Blueprint table: users — id, name, email, phone, password_hash, role, created_at."""
import uuid
from datetime import datetime

from sqlalchemy import Column, String, DateTime
from app.database.db import Base


def gen_id() -> str:
    return uuid.uuid4().hex[:12]


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=gen_id)
    name = Column(String, nullable=False)
    email = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    # Nullable: this prototype uses passwordless demo login (see
    # app/services/auth_service.py) so real users created via /auth/register
    # or /auth/login never populate this column. It stays here so wiring in
    # real password auth later is a services-layer change only.
    password_hash = Column(String, nullable=True)
    role = Column(String, nullable=False)  # patient | doctor | government | admin
    created_at = Column(DateTime, default=datetime.utcnow)
