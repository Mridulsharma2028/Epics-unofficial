"use client";
import React from "react";
import { C, FONT_BODY } from "@/lib/theme";
import type { LucideIcon } from "lucide-react";

type Kind = "primary" | "marigold" | "brick" | "ghost" | "subtle";

export function Btn({
  children, onClick, kind = "primary", size = "md", icon: Icon, full, disabled, style,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  kind?: Kind;
  size?: "sm" | "md";
  icon?: LucideIcon;
  full?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
}) {
  const kinds: Record<Kind, React.CSSProperties> = {
    primary: { background: C.tealDeep, color: "#fff", border: `1px solid ${C.tealDeep}` },
    marigold: { background: C.marigold, color: C.tealDeep, border: `1px solid ${C.marigold}` },
    brick: { background: C.brick, color: "#fff", border: `1px solid ${C.brick}` },
    ghost: { background: "transparent", color: C.ink, border: `1px solid ${C.line}` },
    subtle: { background: C.bgAlt, color: C.ink, border: `1px solid ${C.line}` },
  };
  const pad = size === "sm" ? "7px 12px" : "10px 18px";
  return (
    <button
      onClick={disabled ? undefined : onClick}
      style={{
        ...kinds[kind], padding: pad, borderRadius: 9, fontSize: size === "sm" ? 13 : 14.5, fontWeight: 600,
        display: "inline-flex", alignItems: "center", gap: 7, width: full ? "100%" : "auto",
        justifyContent: full ? "center" : "flex-start", opacity: disabled ? 0.5 : 1,
        fontFamily: FONT_BODY, cursor: disabled ? "default" : "pointer",
        transition: "opacity .15s, transform .1s", ...style,
      }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = "scale(0.98)"; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
    >
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
}
