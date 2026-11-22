"""Not explicitly listed in blueprint section 10's endpoint table, but
analytics.py is named in both the backend api/ structure (section 9) and the
Government Dashboard's scope (section 3, "analytics"). Aggregates the same
figures the frontend's government dashboard previously computed locally."""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.analytics import AnalyticsOverview
from app.services import analytics_service

router = APIRouter(prefix="/api/analytics", tags=["analytics"])


@router.get("/overview", response_model=AnalyticsOverview)
def overview(db: Session = Depends(get_db)):
    return analytics_service.get_overview(db)
