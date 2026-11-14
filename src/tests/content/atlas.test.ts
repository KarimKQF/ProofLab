/**
 * Atlas visuel de géométrie de Lie : intégrité des données générées, présence des images,
 * absence de tout lien externe, cohérence des renvois (catalogue, laboratoire G), recherche.
 */
import { existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  ATLAS_PARTS,
  ATLAS_PLATES,
  LIE_SCENES,
  SCENE_FOR_THEOREM,
  SCENE_PLATES,
  plateById,
  plateImage,
  searchPlates,
  theoremsForPlate,
} from '@/content/atlas';
import { ATLAS_DATA } from '@/content/atlas/atlas-lie.data';
import { THEOREM_CATALOG } from '@/content/catalog';

const PUBLIC = resolve(process.cwd(), 'public');

describe('Atlas visuel : données', () => {
  it('90 planches numérotées de 1 à 90, 17 parties, chaque planche dans les bornes de sa partie', () => {
    expect(ATLAS_PLATES.map((p) => p.n)).toEqual(Array.from({ length: 90 }, (_, i) => i + 1));
    expect(ATLAS_PARTS.map((p) => p.roman)).toEqual(['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII']);
    for (const p of ATLAS_PLATES) {
      const part = ATLAS_PARTS.find((x) => x.roman === p.part);
      expect(part, `planche ${p.n}`).toBeDefined();
      expect(p.n).toBeGreaterThanOrEqual(part!.plates[0]);
      expect(p.n).toBeLessThanOrEqual(part!.plates[1]);
      expect(p.partTitle).toBe(part!.title);
      expect(p.pdfPage).toBe(p.n + 3);
    }
    expect(ATLAS_PARTS.filter((p) => p.group === 'tronc').map((p) => p.roman)).toEqual(['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']);
  });

  it('chaque planche porte ses textes, une réponse localisée et une référence au cours cohérente', () => {
    for (const p of ATLAS_PLATES) {
      for (const field of [p.title, p.question, p.lecture, p.origine, p.verifier.question, p.verifier.reponse]) expect(field.trim().length, `planche ${p.n}`).toBeGreaterThan(0);
      const box = p.verifier.box!;
      expect(box, `planche ${p.n}`).not.toBeNull();
      expect(box[0]).toBeGreaterThan(0.5);
      expect(box[0]).toBeLessThan(box[2]);
      expect(box[1]).toBeLessThan(box[3]);
      expect(box[3]).toBeLessThanOrEqual(1);
      const part = ATLAS_PARTS.find((x) => x.roman === p.part)!;
      expect(p.cours, `planche ${p.n}`).not.toBeNull();
      expect(p.cours!.chapters[0]).toBeGreaterThanOrEqual(part.chapters[0]);
      expect(p.cours!.chapters[1]).toBeLessThanOrEqual(part.chapters[1]);
      expect(p.cours!.pages[0]).toBeLessThanOrEqual(p.cours!.pages[1]);
      // Pages imprimées du cours : 1 à 255 (PDF 21 à 275).
      expect(p.cours!.pages[1] + 20).toBeLessThanOrEqual(275);
    }
  });

  it('aucun lien externe, aucune URL n’a été recopiée du PDF', () => {
    const all = JSON.stringify(ATLAS_DATA);
    expect(all).not.toMatch(/https?:|www\.|chatgpt|\.com\b|openai/i);
  });

  it('chaque planche a son image et sa vignette dans public/atlas-lie', () => {
    for (const p of ATLAS_PLATES) {
      for (const size of ['full', 'mini'] as const) {
        const rel = plateImage(p.n, size).replace(/^.*?atlas-lie\//, 'atlas-lie/');
        const file = resolve(PUBLIC, rel);
        expect(existsSync(file), rel).toBe(true);
        expect(statSync(file).size).toBeGreaterThan(size === 'full' ? 20_000 : 2_000);
      }
    }
  });
});

describe('Atlas visuel : renvois', () => {
  it('le catalogue ne renvoie qu’à des planches existantes ; chaque résultat Lie a au moins une planche', () => {
    for (const e of THEOREM_CATALOG) for (const n of e.atlas ?? []) expect(plateById(n), `${e.id} → ${n}`).toBeDefined();
    const lie = THEOREM_CATALOG.filter((e) => e.doc === 'cours-lie');
    expect(lie).toHaveLength(11);
    for (const e of lie) expect(e.atlas?.length ?? 0, e.id).toBeGreaterThan(0);
    expect(theoremsForPlate(8).map((e) => e.id)).toContain('crochet-lie');
  });

  it('les planches liées à un résultat relèvent des chapitres de ce résultat', () => {
    // Résultat → chapitres du cours (bornes larges) : les planches citées doivent y tomber.
    const CHAPTERS: Record<string, [number, number]> = {
      'niveau-regulier': [4, 17],
      'crochet-lie': [6, 7],
      frobenius: [10, 10],
      'orbite-stabilisateur': [20, 22],
      'algebre-lie-matricielle': [24, 27],
      exponentielle: [28, 36],
      rodrigues: [31, 31],
      'revetement-su2': [32, 32],
      'symetries-edo': [38, 42],
      noether: [51, 54],
      'flot-hamiltonien': [55, 76],
    };
    for (const [id, [a, b]] of Object.entries(CHAPTERS)) {
      const e = THEOREM_CATALOG.find((x) => x.id === id)!;
      for (const n of e.atlas!) {
        const c = plateById(n)!.cours!.chapters;
        expect(c[0], `${id} → planche ${n}`).toBeGreaterThanOrEqual(a);
        expect(c[1], `${id} → planche ${n}`).toBeLessThanOrEqual(b);
      }
    }
  });

  it('scènes du laboratoire G : planches existantes, résultats existants et reliés au laboratoire', () => {
    expect(Object.keys(SCENE_PLATES).sort()).toEqual(LIE_SCENES.map((s) => s.id).sort());
    for (const plates of Object.values(SCENE_PLATES)) for (const n of plates) expect(plateById(n)).toBeDefined();
    for (const [id, scene] of Object.entries(SCENE_FOR_THEOREM)) {
      const e = THEOREM_CATALOG.find((x) => x.id === id);
      expect(e?.lab, id).toBe('groupes-lie');
      expect(LIE_SCENES.some((s) => s.id === scene)).toBe(true);
    }
    for (const e of THEOREM_CATALOG.filter((x) => x.lab === 'groupes-lie')) expect(SCENE_FOR_THEOREM[e.id], e.id).toBeDefined();
  });
});

describe('Atlas visuel : recherche', () => {
  it('insensible à la casse et aux accents, tous les mots requis', () => {
    expect(searchPlates('crochet').map((p) => p.n)).toContain(8);
    expect(searchPlates('GEODESIQUE').map((p) => p.n)).toContain(18);
    expect(searchPlates('noether').map((p) => p.n)).toContain(60);
    const both = searchPlates('symplectique verlet').map((p) => p.n);
    expect(both).toEqual([66]);
    expect(searchPlates('   ')).toHaveLength(90);
    expect(searchPlates('zzz introuvable')).toHaveLength(0);
  });
});
