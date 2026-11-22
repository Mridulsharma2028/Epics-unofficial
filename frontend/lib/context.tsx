"use client";

// Global, in-memory app state shared across every route via React Context.
// Holds the demo "session" (role/name/health id), the EN/HI language choice
// and the offline/online simulation toggle. This stands in for real
// auth/JWT state (see blueprint section 6 "User Roles and Access") — swap
// `login`/`logout` for real calls into services/authService.ts once the
// FastAPI backend exists. State is intentionally not persisted to
// localStorage so each demo session starts clean.
import React, { createContext, useContext, useMemo, useState } from "react";
import { STR, Lang, TDict } from "./i18n";

export type Role = "patient" | "doctor" | "government" | "admin";

type AppState = {
  role: Role;
  setRole: (r: Role) => void;
  name: string;
  healthId: string | null;
  login: (role: Role, name: string) => void;
  logout: () => void;
  lang: Lang;
  setLang: (l: Lang) => void;
  t: TDict;
  offline: boolean;
  setOffline: (v: boolean) => void;
};

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>("patient");
  const [name, setName] = useState("");
  const [healthId, setHealthId] = useState<string | null>(null);
  const [lang, setLang] = useState<Lang>("en");
  const [offline, setOffline] = useState(false);

  const login = (r: Role, n: string) => {
    setRole(r);
    setName(n);
    setHealthId(r === "patient" ? "ARN-IND-2026-001284" : null);
  };
  const logout = () => {
    setName("");
    setHealthId(null);
  };

  const t = useMemo(() => STR[lang], [lang]);

  const value: AppState = {
    role, setRole, name, healthId, login, logout, lang, setLang, t, offline, setOffline,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp() must be used within <AppProvider>");
  return ctx;
}
