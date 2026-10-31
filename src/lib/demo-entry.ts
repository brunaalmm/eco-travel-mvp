export type DemoProfile = "turista" | "gestor";

// Navigation only: this is not authentication or a permission check.
export function demoDestination(profile: DemoProfile) {
  return profile === "gestor" ? "/dashboard" : "/descobrir";
}