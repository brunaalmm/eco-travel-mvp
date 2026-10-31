import { describe, expect, it } from "vitest";
import { demoDestination } from "@/lib/demo-entry";

describe("Demo profile navigation", () => {
  it("sends Turista to the existing tourist home", () => {
    expect(demoDestination("turista")).toBe("/descobrir");
  });
  it("sends Gestor to the separate dashboard", () => {
    expect(demoDestination("gestor")).toBe("/dashboard");
  });
});