// Thin fetch wrapper shared by every services/*.ts file. Talks to the
// FastAPI backend at NEXT_PUBLIC_API_BASE_URL (see .env.example). Holds the
// demo JWT in a module-level variable (set by authService after
// login/register) rather than React state, since services/ are plain
// functions, not components/hooks.
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

let authToken: string | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
}

export function getAuthToken() {
  return authToken;
}

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };
  if (authToken) headers["Authorization"] = `Bearer ${authToken}`;

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new ApiError(res.status, body || res.statusText);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const api = {
  get: <T>(path: string) => request<T>(path, { method: "GET" }),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "POST", body: body !== undefined ? JSON.stringify(body) : undefined }),
  put: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "PUT", body: body !== undefined ? JSON.stringify(body) : undefined }),
};

// Every services/*.ts function wraps its api.* call in try/catch and falls
// back to lib/mockData.ts on failure (backend not running, network error,
// etc.) — this helper keeps that pattern short and logs a single
// consistent, non-alarming message instead of an unhandled rejection.
export async function withFallback<T>(fn: () => Promise<T>, fallback: T, label: string): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (typeof window !== "undefined") {
      console.warn(`[AarogyaNet] ${label} — backend unavailable, using local demo data.`, err);
    }
    return fallback;
  }
}
