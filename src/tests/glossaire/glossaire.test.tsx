/**
 * Dictionnaire dans l'interface : notions cliquables dans une fiche de résultat, bulle de
 * définition (navigation de notion en notion, retour, fermeture), page Dictionnaire.
 */
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { GlossaryProvider } from '@/components/glossary/GlossaryProvider';
import { MathText } from '@/components/Math';
import { TermScope } from '@/components/glossary/context';
import { TheoremPage } from '@/pages/TheoremPage';
import { DictionaryPage } from '@/pages/DictionaryPage';
import { emptySave } from '@/storage/save';
import { useGame } from '@/storage/store';

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <GlossaryProvider>
        <Routes>
          <Route path="/theoreme/:id" element={<TheoremPage />} />
          <Route path="/dictionnaire" element={<DictionaryPage />} />
          <Route path="/dictionnaire/:id" element={<DictionaryPage />} />
        </Routes>
      </GlossaryProvider>
    </MemoryRouter>,
  );

beforeEach(() => {
  useGame.setState({ save: emptySave(0), ready: true });
  localStorage.clear();
});

describe('Notions cliquables', () => {
  it('sans l’option terms, aucun lien ; avec, une seule occurrence liée par texte', () => {
    render(
      <MemoryRouter>
        <GlossaryProvider>
          <TermScope track="analyse">
            <p data-testid="sans">
              <MathText text="Un ensemble compact est fermé." />
            </p>
            <p data-testid="avec">
              <MathText text="Un ensemble compact est fermé ; un compact est borné." terms />
            </p>
          </TermScope>
        </GlossaryProvider>
      </MemoryRouter>,
    );
    expect(screen.getByTestId('sans').querySelector('[data-term]')).toBeNull();
    const ids = [...screen.getByTestId('avec').querySelectorAll('[data-term]')].map((e) => e.getAttribute('data-term'));
    expect(ids).toEqual(['compact', 'ferme', 'partie-bornee']);
  });

  it('fiche de résultat : la bulle de définition s’ouvre, se parcourt et se ferme', () => {
    renderAt('/theoreme/lax-milgram');
    const term = document.querySelector('[data-term="coercivite"]') as HTMLElement;
    expect(term).not.toBeNull();
    // La fiche ne se lie pas à elle-même.
    expect(document.querySelector('main [data-term="resultat-lax-milgram"], [data-term="resultat-lax-milgram"]')).toBeNull();
    fireEvent.click(term);
    const bubble = screen.getByTestId('bulle-definition');
    expect(within(bubble).getByRole('heading', { name: 'Coercivité' })).toBeInTheDocument();
    expect(bubble.querySelector('[data-complement="attention"]')).not.toBeNull();
    // Une notion citée dans la fiche ouvre sa propre fiche, avec retour.
    fireEvent.click(bubble.querySelector('[data-term="forme-bilineaire"]')!);
    expect(within(screen.getByTestId('bulle-definition')).getByRole('heading', { name: 'Forme bilinéaire' })).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('bulle-retour'));
    expect(within(screen.getByTestId('bulle-definition')).getByRole('heading', { name: 'Coercivité' })).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByTestId('bulle-definition')).toBeNull();
  });

  it('au clavier : Entrée sur une notion ouvre sa fiche', () => {
    renderAt('/theoreme/frobenius');
    const term = document.querySelector('[data-term="distribution-geometrique"]') as HTMLElement;
    expect(term).not.toBeNull();
    expect(term.getAttribute('tabindex')).toBe('0');
    fireEvent.keyDown(term, { key: 'Enter' });
    expect(within(screen.getByTestId('bulle-definition')).getByRole('heading', { name: /Distribution \(de sous-espaces tangents\)/ })).toBeInTheDocument();
  });
});

describe('Page Dictionnaire', () => {
  it('recherche sans accents puis fiche complète : usages et chemin des notions préalables', () => {
    renderAt('/dictionnaire');
    fireEvent.change(screen.getByRole('searchbox', { name: 'Chercher dans le dictionnaire' }), { target: { value: 'compacite' } });
    expect(document.querySelector('[data-entree="compact"]')).not.toBeNull();
  });

  it('fiche « Compact » : définition, compléments, résultats qui l’emploient, chemin', () => {
    renderAt('/dictionnaire/compact');
    expect(screen.getByRole('heading', { level: 2, name: 'Compact' })).toBeInTheDocument();
    expect(screen.getByTestId('usages').textContent).toMatch(/Rellich/);
    expect(screen.getByTestId('chemin').querySelectorAll('[data-term]').length).toBeGreaterThan(1);
    // Sur la page, une notion citée mène à sa fiche (pas de bulle).
    fireEvent.click(document.querySelector('[data-entry="compact"] [data-term="sous-suite"]')!);
    expect(screen.queryByTestId('bulle-definition')).toBeNull();
    expect(screen.getByRole('heading', { level: 2, name: /Sous-suite/ })).toBeInTheDocument();
  });
});
