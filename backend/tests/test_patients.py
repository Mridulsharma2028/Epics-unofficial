def test_seeded_patient_queue(client):
    resp = client.get("/api/patients")
    assert resp.status_code == 200
    names = [p["name"] for p in resp.json()]
    assert "Asha Devi" in names
    assert "Ramesh Kol" in names


def test_get_single_patient(client):
    resp = client.get("/api/patients/P001")
    assert resp.status_code == 200
    assert resp.json()["name"] == "Asha Devi"


def test_get_patient_records(client):
    resp = client.get("/api/patients/P001/records")
    assert resp.status_code == 200
    assert len(resp.json()) >= 1
