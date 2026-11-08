export type DemoProfile = "turista" | "gestor";

// Navigation only: this is not authentication or a permission check.
export function demoDestination(profile: DemoProfile) {
  return profile === "gestor" ? "/dashboard" : "/descobrir";
}

const demoStorageKeys = [
  "ecotravel-accessibility-settings",
  "ecotravel-manager-accessibility-settings",
  "ecotravel-preferences-v1",
  "ecotravel-tips-v1",
  "ecotravel-credits",
];

export function clearDemoBrowserData() {
  if (typeof window === "undefined") return;

  for (const key of demoStorageKeys) {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // Continue clearing the remaining app-owned data when storage is restricted.
    }
  }

  try {
    document.cookie = "sidebar_state=; path=/; max-age=0";
  } catch {
    // The login redirect still proceeds if cookies are unavailable.
  }
}