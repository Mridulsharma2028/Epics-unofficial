import React from "react";
import { C } from "@/lib/theme";

// Illustrative, non-scannable QR pattern (deterministic from `seed`) used for
// the Digital Health ID demo. See blueprint section 17 — a public QR scan
// must never expose the full record without authentication.
export function DemoQR({ seed = 1 }: { seed?: number }) {
  const cells: boolean[] = [];
  let s = seed;
  const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  for (let i = 0; i < 100; i++) cells.push(rand() > 0.55);
  return (
    <svg viewBox="0 0 100 100" style={{ width: "100%" }}>
      <rect width="100" height="100" fill="#fff" />
      {cells.map((on, i) => on && <rect key={i} x={(i % 10) * 10} y={Math.floor(i / 10) * 10} width="10" height="10" fill={C.tealDeep} />)}
      <rect x="0" y="0" width="24" height="24" fill="none" stroke={C.tealDeep} strokeWidth="4" />
      <rect x="76" y="0" width="24" height="24" fill="none" stroke={C.tealDeep} strokeWidth="4" />
      <rect x="0" y="76" width="24" height="24" fill="none" stroke={C.tealDeep} strokeWidth="4" />
    </svg>
  );
}
