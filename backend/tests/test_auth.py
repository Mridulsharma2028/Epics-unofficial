def test_login_creates_demo_session(client):
    resp = client.post("/api/auth/login", json={"role": "patient", "id_or_phone": "9998887771"})
    assert resp.status_code == 200
    body = resp.json()
    assert body["role"] == "patient"
    assert body["token"]


def test_me_requires_token(client):
    resp = client.get("/api/auth/me")
    assert resp.status_code == 401

    login = client.post("/api/auth/login", json={"role": "doctor", "id_or_phone": "MCI-TEST-1"})
    token = login.json()["token"]
    resp = client.get("/api/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert resp.status_code == 200
    assert resp.json()["role"] == "doctor"
