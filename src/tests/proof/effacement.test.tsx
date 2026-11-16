/**
 * Effacement progressif du laboratoire de démonstration : la preuve modèle (dérivation de
 * référence) est lue, puis ses justifications sont retrouvées, puis ses étapes effacées sont
 * reconstruites. Chaque étape se termine par une vérification du moteur.
 */
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { DEMONSTRATIONS, EXERCISES, EXERCISE_BY_ID } from '@/content';
import { allowedTheorems } from '@/content/catalog';
import { analyzeGraph, isGiven } from '@/core/proof-engine/engine';
import { referenceDerivation } from '@/core/proof-engine/reference';
import { fadedSteps, fadingSeed } from '@/components/proof/blocks/model';
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

describe('Démonstration de référence', () => {
  it('chaque preuve du contenu a une dérivation de référence acceptée par le moteur', () => {
    const specs = [
      ...EXERCISES.flatMap((e) => [
        { spec: e.proof, allowed: allowedTheorems(e.theoremId, e.proof.purpose, e.prerequisites), where: e.id },
        ...(e.variant.proof ? [{ spec: e.variant.proof, allowed: allowedTheorems(e.theoremId, e.variant.proof.purpose, e.prerequisites), where: `${e.id}~v` }] : []),
      ]),
      ...DEMONSTRATIONS.map((d) => ({ spec: d.proof, allowed: allowedTheorems(d.theoremId, d.proof.purpose, d.prerequisites), where: d.id })),
    ];
    for (const { spec: s, allowed, where } of specs) {
      const rules = referenceDerivation(s);
      expect(rules, where).not.toBeNull();
      const placed: string[] = [];
      const steps: Record<string, { premises: string[]; justification: string }> = {};
      for (const r of rules!) {
        // Chaque prémisse est une donnée ou une étape antérieure.
        for (const p of r.from) {
          const n = s.nodes.find((x) => x.id === p)!;
          expect(isGiven(n) || placed.includes(p), `${where} : ${p} avant ${r.to}`).toBe(true);
        }
        placed.push(r.to);
        steps[r.to] = { premises: r.from, justification: r.by };
      }
      expect(placed[placed.length - 1], where).toBe(s.goal);
      const passedChecks = new Set(s.nodes.filter((n) => n.check).map((n) => n.id));
      const a = analyzeGraph(s, { placed, steps }, { allowedTheorems: allowed, passedChecks });
      expect(a.goalReached, where).toBe(true);
      expect(a.cycles, where).toEqual([]);
    }
  });

  it('effacement : une étape sur deux à partir de la fin, jamais la conclusion', () => {
    expect(fadedSteps(['a', 'b', 'c', 'd', 'fin'], 'fin')).toEqual(['d', 'b']);
    expect(fadedSteps(['a', 'fin'], 'fin')).toEqual(['a']);
    const seed = fadingSeed(spec, 'completer')!;
    expect(seed.masked.length).toBeGreaterThan(0);
    expect(seed.masked).not.toContain(spec.goal);
    expect(seed.blocks.filter((b) => b.hole).map((b) => b.hole).sort()).toEqual([...seed.masked].sort());
    for (const id of seed.masked) expect(seed.graph.placed).not.toContain(id);
  });
});

function openLab(query = 'exercice=poincare-wirtinger.intermediaire') {
  render(
    <MemoryRouter initialEntries={[`/labo/demonstration?${query}`]}>
      <GlossaryProvider>
        <DemonstrationLab />
      </GlossaryProvider>
    </MemoryRouter>,
  );
}

describe('Laboratoire H — effacement progressif', () => {
  it('s’ouvre sur la preuve modèle, complète, figée et rédigée', () => {
    openLab();
    expect(document.querySelector('[data-effacement="lire"]')!.getAttribute('aria-selected')).toBe('true');
    const steps = [...document.querySelectorAll('[data-verrou="tout"]')].filter((el) => el.getAttribute('data-kind') !== 'intro');
    expect(steps.length).toBe(referenceDerivation(spec)!.length);
    for (const el of steps) expect(el.getAttribute('data-status')).toBe('demontre');
    expect(screen.getByTestId('preuve-redigee')).toBeInTheDocument();
    expect(screen.getByTestId('lecture-guidee')).toBeInTheDocument();
    expect(screen.queryByTestId('retirer-bloc-1')).toBeNull();
    fireEvent.click(screen.getByTestId('etape-suivante'));
    expect(document.querySelector('[data-effacement="justifier"]')!.getAttribute('aria-selected')).toBe('true');
  });

  it('étape 2 : retrouver chaque justification jusqu’au but', () => {
    localStorage.setItem('prooflab:effacement:poincare-wirtinger.intermediaire', JSON.stringify({ level: 'justifier', reached: ['lire'] }));
    openLab();
    const rules = referenceDerivation(spec)!;
    const intros = document.querySelectorAll('[data-kind="intro"]').length;
    rules.forEach((r, i) => {
      const bloc = within(screen.getByTestId(`bloc-${intros + i}`));
      expect(bloc.queryByTestId('choisir-cible')).toBeNull();
      fireEvent.click(bloc.getByTestId('choisir-justification'));
      fireEvent.click(bloc.getByTestId(`justif-${r.by}`));
      fireEvent.click(bloc.getByTestId('verifier-bloc'));
    });
    expect(screen.getByTestId('demo-reussie')).toBeInTheDocument();
    const saved = JSON.parse(localStorage.getItem('prooflab:effacement:poincare-wirtinger.intermediaire')!);
    expect(saved.reached).toContain('justifier');
    expect(useGame.getState().save.exercises).toEqual({});
  });

  it('étape 3 : les étapes effacées sont masquées, puis reconstruites', () => {
    localStorage.setItem('prooflab:effacement:poincare-wirtinger.intermediaire', JSON.stringify({ level: 'completer', reached: [] }));
    openLab();
    const rules = referenceDerivation(spec)!;
    const holes = [...document.querySelectorAll('[data-trou]')];
    expect(holes.length).toBe(fadedSteps(rules.map((r) => r.to), spec.goal).length);
    expect(screen.getAllByTestId('trou-consigne').length).toBe(holes.length);
    // Ailleurs, une étape effacée n'est citée que par son repère, sans son texte.
    expect(document.querySelector('[title*="effacée, à reconstruire"]')).not.toBeNull();
    for (const id of fadedSteps(rules.map((r) => r.to), spec.goal)) {
      const text = spec.nodes.find((n) => n.id === id)!.text.replace(/\$/g, '');
      for (const el of document.querySelectorAll('[title]')) expect(el.getAttribute('title')).not.toBe(text);
    }
    for (const el of holes) {
      const id = el.getAttribute('data-trou')!;
      const r = rules.find((x) => x.to === id)!;
      const bloc = within(el as HTMLElement);
      if (!bloc.queryByTestId(`cible-${id}`)) {
        if (!bloc.queryByTestId('choix-cible')) fireEvent.click(bloc.getByTestId('choisir-cible'));
        if (!bloc.queryByTestId(`cible-${id}`)) fireEvent.click(bloc.getByRole('button', { name: /Autres affirmations/ }));
      }
      fireEvent.click(bloc.getByTestId(`cible-${id}`));
      if (!bloc.queryByTestId('choix-premisses')) fireEvent.click(bloc.getByTestId('ajouter-premisse'));
      for (const p of r.from) fireEvent.click(bloc.getByTestId(`premisse-${p}`));
      fireEvent.click(bloc.getByTestId('choisir-justification'));
      fireEvent.click(bloc.getByTestId(`justif-${r.by}`));
      fireEvent.click(bloc.getByTestId('verifier-bloc'));
    }
    expect(screen.getByTestId('demo-reussie')).toBeInTheDocument();
  });

  it('une démonstration de résultat se choisit par son résultat', () => {
    const d = DEMOS.find((x) => x.query.resultat);
    if (!d) return;
    openLab(`resultat=${d.query.resultat}`);
    expect(screen.getByTestId('effacement')).toBeInTheDocument();
    expect(document.querySelectorAll('[data-verrou="tout"]').length).toBeGreaterThan(0);
  });
});
