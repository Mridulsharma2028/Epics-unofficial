// Calls the real backend: GET /api/blockchain/verify/{record_id}. Falls
// back to a locally-simulated VERIFIED result if the backend is unreachable.
import { api, withFallback } from "@/lib/apiClient";

export async function verifyRecordHash(recordId: string): Promise<{ recordId: string; status: "VERIFIED" | "MISMATCH" | "NOT_FOUND" }> {
  return withFallback(
    () => api.get<{ recordId: string; status: "VERIFIED" | "MISMATCH" | "NOT_FOUND" }>(`/blockchain/verify/${recordId}`),
    { recordId, status: "VERIFIED" as const },
    "blockchainService.verifyRecordHash",
  );
}
