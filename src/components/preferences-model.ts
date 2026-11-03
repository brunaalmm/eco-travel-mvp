import { carbonKg, tripKm, type Destination, type TransportId } from '@/lib/data';

export const preferenceKey = 'ecotravel-preferences-v1';
export const styles = ['Trilhas e Aventura', 'Praias', 'Parques Urbanos'] as const;
export const modes = ['A pé', 'Trilha', 'Carona Solidária', 'Ônibus', 'Carro'] as const;
export const impacts = ['Menor pegada de CO₂', 'Proteção da biodiversidade', 'Apoio local'] as const;
export type Preferences = { style: typeof styles[number]; mode: typeof modes[number]; impact: typeof impacts[number]; simulatedLocation: boolean };

export function parsePreferences(value: string | null): Preferences | null {
  if (!value) return null;
  try {
    const p = JSON.parse(value);
    return p && styles.includes(p.style) && modes.includes(p.mode) && impacts.includes(p.impact) && typeof p.simulatedLocation === 'boolean' ? p : null;
  } catch { return null; }
}

export function recommendation(d: Destination, p: Preferences) {
  const km = tripKm[d.id] ?? 0;
  const active = p.mode === 'A pé' || p.mode === 'Trilha';
  const transport: TransportId = active ? (km > 30 ? 'onibus' : 'pe') : p.mode === 'Carro' ? 'carro' : p.mode === 'Carona Solidária' ? 'carona' : 'onibus';
  const styleMatch = p.style === 'Praias' ? d.macroRegion === 'Litoral' : p.style === 'Parques Urbanos' ? d.id === 'sao-paulo' : d.id !== 'sao-paulo';
  const impactMatch = p.impact === 'Menor pegada de CO₂' ? km <= 120 : p.impact === 'Proteção da biodiversidade' ? d.id !== 'sao-paulo' : ['paranapiacaba', 'peruibe', 'jundiai'].includes(d.id);
  const score = 60 + (styleMatch ? 22 : 0) + (impactMatch ? 10 : 0) + (p.simulatedLocation && km <= 120 ? 6 : 0);
  return { score, km, transport, kg: carbonKg(km, transport), adjusted: active && km > 30 };
}