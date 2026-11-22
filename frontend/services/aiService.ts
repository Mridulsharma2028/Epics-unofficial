// Calls the real backend: POST /api/ai/symptom-check, which runs a small
// trained model (see backend/app/ai/) instead of a hardcoded formula.
// Falls back to the original deterministic formula if the backend is
// unreachable, so the AI Assistant screen still works standalone.
import { api, withFallback } from "@/lib/apiClient";

export type RiskAssessment = { score: number; risk: "LOW" | "MODERATE" | "HIGH" };

export async function assessSymptoms(symptoms: string[], durationWeight: number, breathlessness: boolean, feverAndCough: boolean): Promise<RiskAssessment> {
  const fallback = (): RiskAssessment => {
    let score = symptoms.length * 12 + durationWeight;
    if (breathlessness) score += 25;
    if (feverAndCough) score += 10;
    score = Math.min(100, score);
    const risk = score >= 55 ? "HIGH" : score >= 28 ? "MODERATE" : "LOW";
    return { score, risk };
  };

  return withFallback(
    () => api.post<RiskAssessment>("/ai/symptom-check", {
      symptom_count: symptoms.length,
      duration_weight: durationWeight,
      breathlessness,
      fever_and_cough: feverAndCough,
    }),
    fallback(),
    "aiService.assessSymptoms",
  );
}
