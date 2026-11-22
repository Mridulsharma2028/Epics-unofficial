import React from "react";
import { C, FONT_HEAD } from "@/lib/theme";

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div style={{ fontFamily: FONT_HEAD, fontSize: 20, fontWeight: 600, color: C.tealDeep, marginBottom: 4 }}>{children}</div>;
}
