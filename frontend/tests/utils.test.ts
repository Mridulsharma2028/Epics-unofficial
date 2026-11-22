import { describe, expect, it } from "vitest";
import { riskColor, riskBg } from "@/lib/utils";
import { C } from "@/lib/theme";

// Example unit test — see blueprint section 27 "Testing Checklist".
// Extend this folder with component tests (React Testing Library) and
// integration tests as real screens are built out.
describe("risk helpers", () => {
  it("maps HIGH risk to the brick color", () => {
    expect(riskColor("HIGH")).toBe(C.brick);
    expect(riskBg("HIGH")).toBe(C.brickPale);
  });

  it("maps MODERATE risk to the marigold color", () => {
    expect(riskColor("MODERATE")).toBe(C.marigoldDeep);
  });

  it("defaults unknown/LOW risk to teal", () => {
    expect(riskColor("LOW")).toBe(C.teal);
    expect(riskColor("anything-else")).toBe(C.teal);
  });
});
