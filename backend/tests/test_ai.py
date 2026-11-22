def test_symptom_check_low_risk(client):
    resp = client.post("/api/ai/symptom-check", json={
        "symptom_count": 0, "duration_weight": 0, "breathlessness": False, "fever_and_cough": False,
    })
    assert resp.status_code == 200
    body = resp.json()
    assert body["risk"] == "LOW"


def test_symptom_check_high_risk(client):
    resp = client.post("/api/ai/symptom-check", json={
        "symptom_count": 5, "duration_weight": 20, "breathlessness": True, "fever_and_cough": True,
    })
    assert resp.status_code == 200
    body = resp.json()
    assert body["risk"] == "HIGH"
    assert 0 <= body["score"] <= 100
