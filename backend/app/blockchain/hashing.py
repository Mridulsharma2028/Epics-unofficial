"""
Demo integrity/verification layer — see blueprint section 19: health
records stay in protected relational storage (app/models/health_record.py);
this module only computes and compares a SHA-256 hash over the record's
clinical content, standing in for a real blockchain/Hyperledger write.

A real implementation would submit `record_hash` to a distributed ledger
and verify() would read back the ledger's stored value instead of
recomputing locally — the function signatures here are written so that
swap is a services-layer change only.
"""
import hashlib


def compute_record_hash(record_id: str, diagnosis: str, doctor_name: str, record_date: str) -> str:
    payload = f"{record_id}|{diagnosis}|{doctor_name}|{record_date}".encode("utf-8")
    digest = hashlib.sha256(payload).hexdigest()
    return f"0x{digest[:8]}...{digest[-4:]}"


def compute_full_hash(record_id: str, diagnosis: str, doctor_name: str, record_date: str) -> str:
    payload = f"{record_id}|{diagnosis}|{doctor_name}|{record_date}".encode("utf-8")
    return hashlib.sha256(payload).hexdigest()
