import React from "react";
import { C } from "@/lib/theme";

export function Card({ children, style, className }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) {
  return (
    <div className={className} style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 14, padding: 20, ...style }}>
      {children}
    </div>
  );
}
