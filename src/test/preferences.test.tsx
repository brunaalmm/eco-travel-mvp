import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { PreferencesProvider } from '@/components/PreferencesProvider';
import { preferenceKey, parsePreferences, recommendation, type Preferences } from '@/components/preferences-model';
import { destinations, carbonKg, treesToOffset } from '@/lib/data';

const preferences: Preferences = { style: 'Parques Urbanos', mode: 'Carona Solidária', impact: 'Menor pegada de CO₂', simulatedLocation: true };
afterEach(() => { cleanup(); localStorage.clear(); });
describe('Primeiro acesso', () => {
  it('bloqueia telas e dicas até completar as três respostas', async () => {
    render(<PreferencesProvider><p>Dicas educativas</p></PreferencesProvider>);
    await screen.findByRole('button', { name: 'Praias', exact: true });
    expect(screen.queryByText('Dicas educativas')).toBeNull();
    const save = screen.getByRole('button', { name: 'Salvar Preferências e Gerar Roteiros com IA' });
    expect(save).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Praias', exact: true }));
    fireEvent.click(screen.getByRole('button', { name: 'Ônibus', exact: true }));
    expect(save).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Apoio local', exact: true }));
    fireEvent.click(save);
    await screen.findByText('Dicas educativas');
    expect(parsePreferences(localStorage.getItem(preferenceKey))).toEqual({ style: 'Praias', mode: 'Ônibus', impact: 'Apoio local', simulatedLocation: false });
  });
  it('não repete onboarding após restaurar preferências salvas', async () => {
    localStorage.setItem(preferenceKey, JSON.stringify(preferences));
    render(<PreferencesProvider><p>Roteiros disponíveis</p></PreferencesProvider>);
    await waitFor(() => expect(screen.getByText('Roteiros disponíveis')).toBeInTheDocument());
    expect(screen.queryByRole('button', { name: 'Praias', exact: true })).toBeNull();
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
  it('usa o fator compartilhado para carona e origem simulada', () => {
    const d = destinations.find(d => d.id === 'sao-paulo');
    if (!d) throw new Error('Missing São Paulo');
    expect(recommendation(d,preferences).kg).toBe(1.28);
    expect(recommendation(d,preferences).km).toBe(20);
  });
  it('não propõe caminhar centenas de quilômetros', () => {
    const d = destinations.find(d => d.id === 'brotas');
    if (!d) throw new Error('Missing Brotas');
    expect(recommendation(d,{...preferences, mode:'A pé'})).toMatchObject({ transport:'onibus', km:500, kg:44.5, adjusted:true });
  });
  it('explica 100 km de ônibus e compensação arredondada para cima', () => {
    expect(carbonKg(100,'onibus')).toBe(8.9);
    expect(treesToOffset(8.9)).toBe(2);
  });
});