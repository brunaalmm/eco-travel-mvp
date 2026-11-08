import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { PreferencesProvider } from '@/components/PreferencesProvider';
import { parsePreferences, recommendation, type Preferences } from '@/lib/preferences-model';
import { destinations, carbonKg, offsetSuggestions } from '@/lib/data';

const preferences: Preferences = { style: 'Parques Urbanos', mode: 'Bicicleta', impact: 'Menor pegada de CO₂', simulatedLocation: true };
afterEach(() => { cleanup(); localStorage.clear(); });
describe('Primeiro acesso', () => {
  it('não bloqueia a tela de login', () => {
    render(<PreferencesProvider><p>Tela de login</p></PreferencesProvider>);
    expect(screen.getByText('Tela de login')).toBeInTheDocument();
  });
  it('descarta preferências incompletas ou inválidas', () => {
    expect(parsePreferences('{"style":"Praias"}')).toBeNull();
    expect(parsePreferences('invalid')).toBeNull();
  });
});
describe('Recomendação e carbono', () => {
  it('prioriza parques urbanos para o estilo Parques Urbanos', () => {
    const sorted = [...destinations].sort((a,b) => recommendation(b,preferences).score - recommendation(a,preferences).score);
    expect(sorted[0]?.id).toBe('sao-paulo');
  });
  it('bicicleta em trecho curto tem emissão zero', () => {
    const d = destinations.find(d => d.id === 'sao-paulo');
    if (!d) throw new Error('Missing São Paulo');
    expect(recommendation(d,preferences)).toMatchObject({ transport: 'bike', kg: 0 });
    expect(recommendation(d,preferences).km).toBe(20);
  });
  it('não propõe caminhar centenas de quilômetros', () => {
    const d = destinations.find(d => d.id === 'brotas');
    if (!d) throw new Error('Missing Brotas');
    expect(recommendation(d,{...preferences, mode:'A pé'})).toMatchObject({ transport:'onibus', km:500, kg:44.5, adjusted:true });
  });
  it('explica 100 km de ônibus e compensação sem plantio de mudas', () => {
    expect(carbonKg(100,'onibus')).toBe(8.9);
    expect(offsetSuggestions(8.9).join(' ')).toMatch(/SOS Mata Atlântica/);
    expect(offsetSuggestions(8.9).join(' ')).not.toMatch(/muda/);
  });
});