import { C, Risk } from "./theme";

export function riskColor(r: Risk | string): string {
  if (r === "HIGH") return C.brick;
  if (r === "MODERATE") return C.marigoldDeep;
  return C.teal;
}

export function riskBg(r: Risk | string): string {
  if (r === "HIGH") return C.brickPale;
  if (r === "MODERATE") return C.marigoldPale;
  return C.tealPale;
}
