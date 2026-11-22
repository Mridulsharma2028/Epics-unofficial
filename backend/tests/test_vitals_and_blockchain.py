def test_push_and_read_vitals(client):
    resp = client.post("/api/vitals", json={"patientId": "P001", "temp": 99.1, "hr": 80, "spo2": 96})
    assert resp.status_code == 200
    assert resp.json()["ok"] is True

    hist = client.get("/api/vitals/P001")
    assert hist.status_code == 200
    assert len(hist.json()) >= 1


def test_blockchain_verify_seeded_record(client):
    resp = client.get("/api/blockchain/verify/REC-2291")
    assert resp.status_code == 200
    assert resp.json()["status"] == "VERIFIED"


def test_blockchain_verify_missing_record(client):
    resp = client.get("/api/blockchain/verify/REC-DOES-NOT-EXIST")
    assert resp.status_code == 200
    assert resp.json()["status"] == "NOT_FOUND"
