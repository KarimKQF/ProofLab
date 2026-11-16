/**
 * Éditeur de démonstration par blocs logiques et laboratoire H : modèle (types de blocs,
 * candidats, coups de pouce, analyse à rebours, rédaction), puis une démonstration par
 * l'absurde construite entièrement au clic, avec la règle « introduire avant d'utiliser ».
 */
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { EXERCISE_BY_ID } from '@/content';
import { analyzeGraph, emptyGraph } from '@/core/proof-engine/engine';
import {
  backwardStep,
  blocksFromGraph,
  blockSentence,
  inferKind,
  isAbsurdIntro,
  nextSteps,
  targetCandidates,
} from '@/components/proof/blocks/model';
import { goalMethods } from '@/components/proof/blocks/ProofGuide';
import { DemonstrationLab, DEMOS } from '@/labs/demonstration/DemonstrationLab';
import { GlossaryProvider } from '@/components/glossary/GlossaryProvider';
import { emptySave } from '@/storage/save';
import { useGame } from '@/storage/store';

const PW = EXERCISE_BY_ID.get('poincare-wirtinger.intermediaire')!;
const spec = PW.proof;

beforeEach(() => {
  useGame.setState({ save: emptySave(0), ready: true });
  localStorage.clear();
});

describe('Blocs — modèle', () => {
  it('le type de bloc suit la nature de l’affirmation', () => {
    expect(inferKind(spec, 'fin')).toBe('conclusion');
    expect(inferKind(spec, 'contra')).toBe('absurde');
    expect(inferKind(spec, 'rellich', 'j-rellich')).toBe('theoreme');
    expect(inferKind(spec, 'norme', 'j-norme')).toBe('deduction');
    expect(isAbsurdIntro(spec.nodes.find((n) => n.id === 'abs'))).toBe(true);
  });

  it('candidats : un bloc « contradiction » propose d’abord les contradictions', () => {
    const visible = new Set(spec.nodes.map((n) => n.id));
    const c = targetCandidates(spec, 'absurde', visible, new Set());
    expect(c.recommended.map((n) => n.id)).toEqual(['contra']);
    expect(c.others.length).toBeGreaterThan(0);
  });

  it('coups de pouce : vers l’avant (introduire d’abord), puis à rebours depuis le but', () => {
    const a0 = analyzeGraph(spec, emptyGraph(), { allowedTheorems: null });
    const fwd = nextSteps(spec, a0, new Set());
    expect(fwd[0]!.node).toBe('neg');
    expect(fwd[0]!.needsIntro).toEqual(['abs']);
    expect(nextSteps(spec, a0, new Set(['abs']))[0]!.needsIntro).toEqual([]);
    const back = backwardStep(spec, a0, 'fin')!;
    expect(back.rule.by).toBe('j-absurde');
    expect(back.missing).toEqual(['contra']);
  });

  it('reprise d’un brouillon : les hypothèses locales utilisées redeviennent des blocs d’introduction', () => {
    const graph = { placed: ['neg'], steps: { neg: { premises: ['abs'], justification: 'j-negation' } } };
    const blocks = blocksFromGraph(spec, graph);
    expect(blocks.map((b) => [b.kind, b.node])).toEqual([
      ['intro', 'abs'],
      ['deduction', 'neg'],
    ]);
  });

  it('rédaction : les prémisses sont citées par leur repère', () => {
    const block = { key: 'k', kind: 'deduction' as const, node: 'norme', premises: ['rellich', 'vn'], justification: 'j-norme' };
    const refs: Record<string, string> = { rellich: '(4)', vn: '(3)' };
    const s = blockSentence(spec, block, (id) => spec.nodes.find((n) => n.id === id)!.text, (id) => refs[id]!);
    expect(s.startsWith('D’après (4) et (3)'.replace('’', "'"))).toBe(true);
    expect(s).toContain('continuité de la norme');
  });

  it('guide : la méthode de l’absurde est proposée pour cette preuve', () => {
    expect(goalMethods(spec).map((m) => m.id)).toContain('absurde');
  });

  it('le laboratoire ne liste que des démonstrations', () => {
    expect(DEMOS.length).toBeGreaterThan(30);
    expect(DEMOS.every((d) => d.spec.purpose === 'demonstration')).toBe(true);
  });
});

/** Le laboratoire s'ouvre sur la preuve modèle (effacement progressif) : passer à la page blanche. */
function pageBlanche() {
  fireEvent.click(document.querySelector('[data-effacement="blanche"]')!);
}

/** Ajoute un bloc d'étape et le remplit : affirmation, prémisses, justification, vérification. */
function playBlock(index: number, kind: string, node: string, premises: string[], by: string) {
  fireEvent.click(screen.getByTestId(`ajouter-${kind}`));
  const bloc = within(screen.getByTestId(`bloc-${index}`));
  if (kind !== 'conclusion') {
    if (!bloc.queryByTestId(`cible-${node}`)) fireEvent.click(bloc.getByRole('button', { name: /Autres affirmations/ }));
    fireEvent.click(bloc.getByTestId(`cible-${node}`));
  }
  if (!bloc.queryByTestId('choix-premisses')) fireEvent.click(bloc.getByTestId('ajouter-premisse'));
  for (const p of premises) fireEvent.click(bloc.getByTestId(`premisse-${p}`));
  fireEvent.click(bloc.getByTestId('choisir-justification'));
  fireEvent.click(bloc.getByTestId(`justif-${by}`));
  fireEvent.click(bloc.getByTestId('verifier-bloc'));
}

describe('Laboratoire H — démonstration en blocs', () => {
  it('Poincaré–Wirtinger par l’absurde, bloc par bloc, jusqu’à la rédaction', () => {
    render(
      <MemoryRouter initialEntries={['/labo/demonstration?exercice=poincare-wirtinger.intermediaire']}>
        <GlossaryProvider>
          <DemonstrationLab />
        </GlossaryProvider>
      </MemoryRouter>,
    );
    pageBlanche();
    expect(screen.getByRole('heading', { level: 1, name: 'Démonstration' })).toBeInTheDocument();
    expect(screen.getByTestId('editeur-blocs')).toBeInTheDocument();

    // Tant qu'elle n'est pas introduite par un bloc « Supposons… », l'hypothèse par
    // l'absurde n'est pas proposée comme prémisse, et le bloc sans elle n'est pas validé.
    fireEvent.click(screen.getByTestId('ajouter-deduction'));
    const first = within(screen.getByTestId('bloc-0'));
    fireEvent.click(first.getByTestId('cible-neg'));
    expect(first.getByTestId('choix-premisses')).toBeInTheDocument();
    expect(first.queryByTestId('premisse-abs')).toBeNull();
    expect(screen.queryByTestId('fait-abs')).toBeNull();
    fireEvent.click(first.getByTestId('choisir-justification'));
    fireEvent.click(first.getByTestId('justif-j-negation'));
    fireEvent.click(first.getByTestId('verifier-bloc'));
    expect(screen.getByTestId('bloc-0').getAttribute('data-status')).not.toBe('demontre');
    fireEvent.click(first.getByTestId('retirer-bloc-0'));

    fireEvent.click(screen.getByTestId('ajouter-intro'));
    fireEvent.click(screen.getByTestId('introduire-abs'));
    playBlock(1, 'deduction', 'neg', ['abs'], 'j-negation');
    expect(screen.getByTestId('bloc-1').getAttribute('data-status')).toBe('demontre');
    playBlock(2, 'deduction', 'vn', ['neg', 'h-borne'], 'j-normalise');
    playBlock(3, 'theoreme', 'rellich', ['vn', 'h-borne', 'h-lip'], 'j-rellich');
    playBlock(4, 'deduction', 'norme', ['rellich', 'vn'], 'j-norme');
    playBlock(5, 'deduction', 'moy', ['rellich', 'vn', 'h-borne'], 'j-moy');
    playBlock(6, 'deduction', 'grad', ['rellich', 'vn'], 'j-grad');
    playBlock(7, 'deduction', 'nul', ['grad', 'moy', 'h-connexe'], 'j-connexe');
    playBlock(8, 'absurde', 'contra', ['norme', 'nul'], 'j-contra');
    playBlock(9, 'conclusion', 'fin', ['contra'], 'j-absurde');

    for (let i = 1; i <= 9; i++) expect(screen.getByTestId(`bloc-${i}`).getAttribute('data-status')).toBe('demontre');
    expect(screen.getByTestId('demo-reussie')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('lire-preuve'));
    const written = screen.getByTestId('preuve-redigee');
    expect(written.textContent).toMatch(/\(10\)/);
    expect(written.textContent).toMatch(/Supposons par l'absurde/);
    // Le laboratoire n'écrit rien dans la progression des exercices.
    expect(useGame.getState().save.exercises).toEqual({});
  });

  it('un bloc incorrect est refusé avec son contre-exemple, sans être validé', () => {
    render(
      <MemoryRouter initialEntries={['/labo/demonstration?exercice=poincare-wirtinger.intermediaire']}>
        <GlossaryProvider>
          <DemonstrationLab />
        </GlossaryProvider>
      </MemoryRouter>,
    );
    pageBlanche();
    fireEvent.click(screen.getByTestId('ajouter-intro'));
    fireEvent.click(screen.getByTestId('introduire-abs'));
    playBlock(1, 'deduction', 'neg', ['abs'], 'j-negation');
    playBlock(2, 'deduction', 'vn', ['neg', 'h-borne'], 'j-normalise');
    playBlock(3, 'theoreme', 'rellich', ['vn', 'h-borne', 'h-lip'], 'j-rellich');
    // Semi-continuité : piège caractérisé (incorrect).
    playBlock(4, 'deduction', 'norme', ['rellich', 'vn'], 'j-faible');
    const bloc = screen.getByTestId('bloc-4');
    expect(bloc.getAttribute('data-status')).not.toBe('demontre');
    expect(within(bloc).getByTestId('verdict-bloc').textContent).toMatch(/Incorrect/);
    expect(within(bloc).getByTestId('verdict-bloc').textContent).toMatch(/Contre-exemple/);
  });

  it('guide : coups de pouce calculés et plan révélé pas à pas', () => {
    render(
      <MemoryRouter initialEntries={['/labo/demonstration?exercice=poincare-wirtinger.intermediaire']}>
        <GlossaryProvider>
          <DemonstrationLab />
        </GlossaryProvider>
      </MemoryRouter>,
    );
    pageBlanche();
    fireEvent.click(screen.getByTestId('que-etablir'));
    const steps = screen.getByTestId('etapes-possibles');
    expect(steps.querySelector('[data-etape-possible="neg"]')).not.toBeNull();
    expect(steps.textContent).toMatch(/Introduis d’abord/);
    fireEvent.click(screen.getByTestId('plan-suivant'));
    expect(screen.getByTestId('plan').querySelectorAll('li')).toHaveLength(1);
  });
});
