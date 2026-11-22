import React from "react";
import { C } from "@/lib/theme";
import type { LucideIcon } from "lucide-react";

export function IconTile({ icon: Icon, color = C.teal, bg = C.tealPale, size = 38 }: {
  icon: LucideIcon; color?: string; bg?: string; size?: number;
}) {
  return (
    <div style={{ width: size, height: size, borderRadius: 10, background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <Icon size={size * 0.5} color={color} />
    </div>
  );
}
