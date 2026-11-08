export function dashboardGreeting(hour = new Date().getHours()) {
  if (hour < 12) return "Bom dia, Gestor";
  if (hour < 18) return "Boa tarde, Gestor";
  return "Boa noite, Gestor";
}