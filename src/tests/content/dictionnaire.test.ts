/**
 * Dictionnaire : intégrité du contenu (LaTeX, vocabulaire, renvois), couverture de tout le
 * jeu (définitions du carnet, résultats, outils admis) et règles de repérage des notions.
 */
import { describe, expect, it } from 'vitest';
import { DEFINITIONS, THEOREMS } from '@/content';
import { AUX_TOOLS } from '@/content/catalog';
import {
  DICO,
  DICO_BY_ID,
  findTerms,
  formKey,
  linkHtml,
  matcherFor,
  searchDico,
  symbolsFor,
  texKey,
  usagesOf,
} from '@/content/dictionnaire';
import { assertMixedText } from './validate';

/** Définitions du carnet couvertes par une entrée plus générale (doublons ou cas particuliers). */
const COVERED_BY: Record<string, string> = {
  'stampacchia-forme-coercive': 'coercivite',
  'trace-intervalle': 'trace-sobolev',
  'plancherel-critere-dirac': 'dirac',
  'dualite-interpolation-crochet': 'crochet-dualite',
  'dualite-interpolation-triplet': 'triplet',
  'injections-fractionnaires-injection': 'injection-continue',
  'ba-topologie-faible-etoile': 'faible-etoile',
  'al-injection-compacte': 'injection-compacte',
  'adjoint-operateur-ferme': 'operateur-ferme',
  'fredholm-alternative': 'resultat-fredholm',
  'fredholm-orthogonal': 'orthogonalite',
  'spectral-general-mu-u': 'mesure-spectrale',
  'extension-operateur': 'extension',
};

const link = (html: string, track?: 'analyse' | 'lie') => {
  const ids: string[] = [];
  const out = linkHtml(html, matcherFor(track), {});
  for (const m of out.matchAll(/data-term="([^"]+)"/g)) ids.push(m[1]!);
  return { out, ids };
};

describe('Dictionnaire — contenu', () => {
  it('identifiants uniques, définitions présentes, textes valides (LaTeX, vocabulaire)', () => {
    const ids = new Set<string>();
    for (const e of DICO) {
      expect(ids.has(e.id), `identifiant en double : ${e.id}`).toBe(false);
      ids.add(e.id);
      expect(e.definition.length, `${e.id} : définition vide`).toBeGreaterThan(10);
      assertMixedText(e.term, `${e.id}.term`);
      assertMixedText(e.definition, `${e.id}.definition`);
      if (e.notation) assertMixedText(e.notation, `${e.id}.notation`);
      e.complements.forEach((c, i) => assertMixedText(c.text, `${e.id}.complement${i}`));
    }
    expect(DICO.length).toBeGreaterThan(300);
  });

  it('renvois valides : notions préalables et « voir aussi » existent, sans boucle sur soi', () => {
    for (const e of DICO) {
      for (const r of [...(e.prerequisites ?? []), ...(e.related ?? [])]) {
        expect(DICO_BY_ID.has(r), `${e.id} : renvoi inconnu ${r}`).toBe(true);
        expect(r, `${e.id} se cite lui-même`).not.toBe(e.id);
      }
    }
  });

  it('chaque définition du carnet du jeu figure dans le dictionnaire', () => {
    const reused = new Set(DICO.map((e) => e.from).filter(Boolean));
    for (const d of DEFINITIONS) {
      const ok = reused.has(d.id) || (COVERED_BY[d.id] !== undefined && DICO_BY_ID.has(COVERED_BY[d.id]!));
      expect(ok, `définition du carnet absente du dictionnaire : ${d.id}`).toBe(true);
    }
    for (const e of DICO) if (e.from) expect(DEFINITIONS.some((d) => d.id === e.from), `${e.id} : from inconnu ${e.from}`).toBe(true);
  });

  it('chaque résultat du jeu et chaque outil admis a sa fiche', () => {
    for (const th of THEOREMS) expect(DICO_BY_ID.get(`resultat-${th.id}`)?.theoremId).toBe(th.id);
    for (const key of Object.keys(AUX_TOOLS)) expect(DICO_BY_ID.get(`outil-${key}`)?.toolId, `outil sans fiche : ${key}`).toBe(key);
  });

  it('aucune forme n’est revendiquée par deux entrées d’un même parcours', () => {
    for (const track of ['analyse', 'lie'] as const) {
      const owner = new Map<string, string>();
      for (const e of DICO) {
        if (e.track && e.track !== track) continue;
        for (const f of e.forms) {
          const k = formKey(f);
          const o = owner.get(k);
          // Un homonyme propre au parcours peut remplacer une entrée commune : c'est voulu.
          if (o && DICO_BY_ID.get(o)!.track === e.track) throw new Error(`forme « ${k} » partagée par ${o} et ${e.id} (${track})`);
          owner.set(k, e.id);
        }
      }
    }
  });
});

describe('Dictionnaire — repérage dans les énoncés', () => {
  it('la forme la plus longue l’emporte et les mots restent entiers', () => {
    expect(link('Soit K un convexe fermé non vide.', 'analyse').ids).toEqual(['convexe', 'ferme']);
    expect(link('A est un opérateur fermé.', 'analyse').ids).toEqual(['operateur-ferme']);
    expect(link('A est hémicontinu et coercif.', 'analyse').ids).toEqual(['hemicontinu', 'coercivite']);
    expect(link('un semi-groupe de contractions', 'analyse').ids).toEqual(['contraction']);
    expect(link('la suite est de Cauchy dans H', 'analyse').ids).toContain('suite-de-cauchy');
    expect(link('par Cauchy–Schwarz', 'analyse').ids).toEqual(['outil-cauchy-schwarz']);
    expect(link('Banach–Steinhaus donne une borne uniforme', 'analyse').ids).toEqual(['resultat-banach-steinhaus', 'bornitude-uniforme']);
  });

  it('les homonymes sont départagés par le parcours', () => {
    expect(link('une distribution', 'analyse').ids).toEqual(['distribution']);
    expect(link('une distribution', 'lie').ids).toEqual(['distribution-geometrique']);
    expect(link('la trace', 'analyse').ids).toEqual(['trace-sobolev']);
    expect(link('la trace', 'lie').ids).toEqual(['trace-matrice']);
    expect(link('le générateur', 'lie').ids).toEqual(['generateur-infinitesimal']);
    expect(link('le générateur', 'analyse').ids).toEqual(['generateur-semi-groupe']);
    expect(link('le crochet', 'lie').ids).toEqual(['crochet-lie-champs']);
  });

  it('tournures courantes, première occurrence seulement, exclusions', () => {
    expect(link('Par la suite, on note', 'analyse').ids).toEqual([]);
    expect(link('dans la mesure où', 'analyse').ids).toEqual([]);
    expect(link('compact puis compact', 'analyse').ids).toEqual(['compact']);
    const out = linkHtml('un ensemble compact', matcherFor('analyse'), { exclude: new Set(['compact']) });
    expect(out).not.toContain('data-term');
  });

  it('jamais à l’intérieur du code ni d’un lien existant', () => {
    expect(link('<code>compact</code> et compact', 'analyse').out.match(/data-term/g)?.length).toBe(1);
    expect(link('<a href="#">compact</a>', 'analyse').ids).toEqual([]);
  });

  it('les notations isolées renvoient à leur fiche', () => {
    expect(symbolsFor('analyse').get(texKey('H^1_0(\\Omega)'))).toBe('h1-0');
    expect(symbolsFor('lie').get(texKey('SO(3)'))).toBe('so3');
    expect(symbolsFor('analyse').get(texKey('x+1'))).toBeUndefined();
  });

  it('couverture : chaque résultat du jeu cite des notions du dictionnaire', () => {
    for (const th of THEOREMS) {
      const hits = findTerms(th.statement.replace(/\$[^$]*\$/g, ' '), matcherFor());
      const spaces = th.spaces.join(' ').replace(/\$[^$]*\$/g, ' ');
      expect(hits.length + findTerms(spaces, matcherFor()).length, `aucune notion repérée pour ${th.id}`).toBeGreaterThan(0);
    }
  });
});

describe('Dictionnaire — usages et recherche', () => {
  it('« Dans le jeu » liste les résultats qui emploient la notion', () => {
    const u = usagesOf('compact').map((x) => x.theoremId);
    expect(u).toContain('rellich');
    expect(u).toContain('fredholm');
    // Une entrée réservée à la géométrie de Lie ne compte que ce parcours.
    expect(usagesOf('distribution-geometrique').map((x) => x.theoremId)).toContain('frobenius');
    expect(usagesOf('distribution-geometrique').map((x) => x.theoremId)).not.toContain('distributions');
  });

  it('recherche insensible aux accents, intitulé d’abord', () => {
    expect(searchDico('continuite')[0]!.id).toBe('continuite');
    expect(searchDico('hilbert').slice(0, 3).map((e) => e.id)).toContain('espace-hilbert');
    expect(searchDico('orbite')[0]!.id).toBe('orbite');
  });
});
