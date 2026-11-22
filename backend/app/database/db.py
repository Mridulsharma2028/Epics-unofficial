"""
SQLAlchemy engine/session setup. Defaults to SQLite (zero setup for the
demo) — point DATABASE_URL at Postgres in production, per blueprint
section 4's recommended stack. No code elsewhere depends on which DB is
used; only this file and the connect_args tweak below are DB-specific.
"""
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

from app.config import settings

connect_args = {"check_same_thread": False} if settings.database_url.startswith("sqlite") else {}

engine = create_engine(settings.database_url, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    """FastAPI dependency — yields a request-scoped DB session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
