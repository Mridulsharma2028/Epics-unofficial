// Calls the real backend: POST /api/auth/register, POST /api/auth/login.
// On success, stores the returned JWT in lib/apiClient.ts so every other
// service call is authenticated from then on. Falls back to a local demo
// token if the backend is unreachable — consistent with every other
// services/*.ts file — so the frontend still works standalone.
import { Role } from "@/lib/context";
import { api, setAuthToken, withFallback } from "@/lib/apiClient";

type TokenResponse = { token: string; role: Role };

export async function login(role: Role, idOrPhone: string): Promise<TokenResponse> {
  const res = await withFallback(
    () => api.post<TokenResponse>("/auth/login", { role, id_or_phone: idOrPhone }),
    { token: "demo-jwt-token", role },
    "authService.login",
  );
  setAuthToken(res.token);
  return res;
}

export async function register(role: Role, name: string, idOrPhone: string): Promise<TokenResponse> {
  const res = await withFallback(
    () => api.post<TokenResponse>("/auth/register", { role, name, id_or_phone: idOrPhone }),
    { token: "demo-jwt-token", role },
    "authService.register",
  );
  setAuthToken(res.token);
  return res;
}
