"""
Prototype hotspot classification — see blueprint section 15 ("Calculate
prototype hotspot density using a documented geospatial method... Clearly
distinguish prototype analytical thresholds from clinical/public-health
standards.").

Method (documented, intentionally simple for a prototype): group reported
disease_cases rows by district, count cases per district, and classify
severity by case-count thresholds below. This is NOT a clinical or
public-health standard — it's a stand-in for real spatial clustering
(e.g. DBSCAN over lat/lng, or a proper kernel density estimate) that a
production system would use once real geocoded case data is available.
"""
from collections import Counter
from typing import Iterable

HIGH_THRESHOLD = 3   # >=3 cases in a district -> HIGH
MODERATE_THRESHOLD = 1  # >=1 case -> MODERATE, else LOW


def classify_hotspots(districts: Iterable[str]) -> list[dict]:
    counts = Counter(districts)
    hotspots = []
    for district, count in counts.items():
        if count >= HIGH_THRESHOLD:
            severity = "HIGH"
        elif count >= MODERATE_THRESHOLD:
            severity = "MODERATE"
        else:
            severity = "LOW"
        hotspots.append({"district": district, "case_count": count, "severity": severity})
    return sorted(hotspots, key=lambda h: h["case_count"], reverse=True)
