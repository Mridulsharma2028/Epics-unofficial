import os
import tempfile

import pytest
from fastapi.testclient import TestClient

# Point at a throwaway SQLite file before importing the app, so tests never
# touch a developer's real aarogyanet.db.
_tmp_db = tempfile.NamedTemporaryFile(suffix=".db", delete=False)
os.environ["DATABASE_URL"] = f"sqlite:///{_tmp_db.name}"

from app.main import app  # noqa: E402


@pytest.fixture(scope="session")
def client():
    with TestClient(app) as c:
        yield c
