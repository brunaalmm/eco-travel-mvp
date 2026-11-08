import { describe, expect, it } from "vitest";
import { clearDemoBrowserData, demoDestination } from "@/lib/demo-entry";

describe("Demo profile navigation", () => {
  it("sends Turista to the existing tourist home", () => {
    expect(demoDestination("turista")).toBe("/descobrir");
  });
  it("sends Gestor to the separate dashboard", () => {
    expect(demoDestination("gestor")).toBe("/dashboard");
  });
  it("clears only EcoTravel browser data and preserves unrelated site data", () => {
    for (const key of ["ecotravel-accessibility-settings", "ecotravel-manager-accessibility-settings", "ecotravel-preferences-v1", "ecotravel-tips-v1", "ecotravel-credits"]) {
      localStorage.setItem(key, "saved");
    }
    localStorage.setItem("unrelated-site-data", "keep");
    document.cookie = "sidebar_state=true; path=/";

    clearDemoBrowserData();

    expect(localStorage.getItem("ecotravel-accessibility-settings")).toBeNull();
    expect(localStorage.getItem("ecotravel-preferences-v1")).toBeNull();
    expect(localStorage.getItem("ecotravel-tips-v1")).toBeNull();
    expect(localStorage.getItem("ecotravel-credits")).toBeNull();
    expect(localStorage.getItem("unrelated-site-data")).toBe("keep");
    expect(document.cookie).not.toContain("sidebar_state");
  });
});