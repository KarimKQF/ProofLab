/**
 * Schémas typés du contenu pédagogique. Le contenu est entièrement séparé de
 * l'interface : ajouter un monde, un théorème ou un exercice revient à ajouter des
 * données conformes à ces schémas. Les tests de `src/tests/content` valident tout
 * le contenu contre ces schémas et contre le moteur de preuve.
 */
import { z } from 'zod';

const Id = z.string().min(1);
/** Texte mixte : français et LaTeX entre $…$ ou $$…$$. */
const Mixed = z.string().min(1);

export const NODE_KINDS = [
  'hypothese',
  'definition',
  'egalite',
  'inegalite',
  'inclusion',
  'consequence',
  'application-theoreme',
  'conclusion',
  'contradiction',
] as const;
export type NodeKind = (typeof NODE_KINDS)[number];

export const NODE_KIND_LABEL: Record<NodeKind, string> = {
  hypothese: 'Hypothèse',
  definition: 'Définition',
  egalite: 'Égalité',
  inegalite: 'Inégalité',
  inclusion: 'Inclusion',
  consequence: 'Conséquence',
  'application-theoreme': 'Application d’un théorème',
  conclusion: 'Conclusion',
  contradiction: 'Contradiction',
};

export const ClosedCheckSchema = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('rational'), prompt: Mixed, expected: z.string(), placeholder: z.string().optional() }),
  z.object({
    kind: z.literal('rational-vector'),
    prompt: Mixed,
    expected: z.array(z.string()).min(1),
    labels: z.array(z.string()).optional(),
  }),
  z.object({
    kind: z.literal('expr-equiv'),
    prompt: Mixed,
    expected: z.string(),
    vars: z.array(z.string()),
    placeholder: z.string().optional(),
  }),
  z.object({
    kind: z.literal('matrix-spd'),
    prompt: Mixed,
    size: z.number().int().min(2).max(3),
    property: z.enum(['spd', 'coercive-nonsymmetric', 'symmetric-not-spd']),
  }),
  z.object({
    kind: z.literal('choice'),
    prompt: Mixed,
    options: z.array(Mixed).min(2),
    correct: z.array(z.number().int().min(0)).min(1),
    explanation: Mixed,
  }),
]);

export const ProofNodeSchema = z.object({
  id: Id,
  kind: z.enum(NODE_KINDS),
  text: Mixed,
  /** Hypothèse locale (« Soit… », « Supposons par l'absurde… »). */
  local: z.boolean().optional(),
  /** Proposition plausible mais non démontrable : ne doit jamais être dérivable. */
  distractor: z.boolean().optional(),
  /** Mode guidé : le distracteur n'apparaît qu'une fois ces nœuds établis. */
  after: z.array(Id).optional(),
  /** Clés de déverrouillage pour un laboratoire. */
  unlocks: z.array(z.string()).optional(),
  /** Valeur à calculer exactement avant de pouvoir affirmer le nœud. */
  check: ClosedCheckSchema.optional(),
  /** Texte affiché tant que le calcul n'a pas été validé (ne révèle pas la valeur). */
  masked: Mixed.optional(),
});

export const JustificationSchema = z.object({
  id: Id,
  label: Mixed,
  /** Théorème invoqué : soumis au contrôle d'utilisation prématurée. */
  theorem: Id.optional(),
});

export const RuleSchema = z.object({
  from: z.array(Id),
  to: Id,
  by: Id,
  /** Identifiant du chemin de preuve auquel cette règle appartient. */
  path: Id.optional(),
});

export const TrapSchema = z.object({
  conclusion: Id,
  /** Déclenché si toutes ces prémisses sont sélectionnées (absent : quelles qu'elles soient). */
  premises: z.array(Id).optional(),
  /** Déclenché pour cette justification (absent : quelle qu'elle soit). */
  by: Id.optional(),
  verdict: z.enum(['incorrect', 'a-justifier']),
  message: Mixed,
  concept: Id,
  counterexample: Mixed.optional(),
});

export const RemovableSchema = z.object({
  hypothesis: Id,
  label: Mixed,
  /** Si vrai, le test de contenu exige que le but ne soit plus dérivable sans cette hypothèse. */
  necessary: z.boolean(),
  explanation: Mixed,
  counterexample: Mixed,
});

export const ProofSpecSchema = z.object({
  purpose: z.enum(['demonstration', 'application']),
  goal: Id,
  nodes: z.array(ProofNodeSchema).min(2),
  justifications: z.array(JustificationSchema).min(1),
  rules: z.array(RuleSchema).min(1),
  traps: z.array(TrapSchema),
  removable: z.array(RemovableSchema),
  paths: z.array(z.object({ id: Id, label: Mixed })).optional(),
});

export const LEVELS = ['facile', 'intermediaire', 'difficile'] as const;
export type Level = (typeof LEVELS)[number];
export const LEVEL_LABEL: Record<Level, string> = {
  facile: 'Facile',
  intermediaire: 'Intermédiaire',
  difficile: 'Difficile',
};

export const RUBRIC_CRITERIA = ['Hypothèses', 'Méthode', 'Validité des étapes', 'Justifications', 'Conclusion'] as const;
export type RubricCriterion = (typeof RUBRIC_CRITERIA)[number];

export const SourceSchema = z.object({
  /** polycopie : analyse fonctionnelle et EDP ; cours-lie : géométrie différentielle et groupes de Lie. */
  doc: z.enum(['polycopie', 'cours-lie', 'complement']),
  /** Page du PDF (polycopié : page imprimée = page PDF − 4 ; cours de Lie : page imprimée = page PDF − 20). */
  pdfPage: z.number().int().positive().optional(),
  label: Mixed,
});

export const VerificationSchema = z.object({
  /** D'où vient la démonstration. */
  origin: z.enum(['polycopie', 'polycopie-corrige', 'cours-lie', 'complement']),
  /**
   * « machine » : structure et calculs fermés testés automatiquement ;
   * « relecture-ia » : en plus, relecture mathématique indépendante par un agent IA.
   * Aucun de ces statuts n'est une vérification formelle ni une validation humaine.
   */
  review: z.enum(['machine', 'relecture-ia']),
  notes: z.string().optional(),
});

export const ExerciseSchema = z.object({
  id: Id,
  theoremId: Id,
  level: z.enum(LEVELS),
  title: Mixed,
  statement: Mixed,
  source: SourceSchema,
  /** Théorèmes ou outils à connaître pour traiter l'exercice. */
  prerequisites: z.array(Id),
  concepts: z.array(Id).min(1),
  proof: ProofSpecSchema,
  closedChecks: z.array(ClosedCheckSchema).optional(),
  /** Solution complète vérifiée (Markdown + LaTeX). */
  solution: Mixed,
  /** Décomposition de la démonstration en étapes. */
  steps: z.array(Mixed).min(1),
  commonErrors: z
    .array(z.object({ id: Id, description: Mixed, concept: Id }))
    .min(1),
  hints: z.tuple([Mixed, Mixed, Mixed]),
  rubric: z
    .array(z.object({ criterion: z.enum(RUBRIC_CRITERIA), description: Mixed, points: z.number().int().positive() }))
    .length(5),
  variant: z.object({
    statement: Mixed,
    solution: Mixed,
    proof: ProofSpecSchema.optional(),
    closedChecks: z.array(ClosedCheckSchema).optional(),
  }),
  verification: VerificationSchema,
});

export const HypothesisSchema = z.object({
  id: Id,
  text: Mixed,
  /** Pourquoi cette hypothèse est indispensable (contre-exemple éventuel). */
  whenRemoved: Mixed.optional(),
});

export const TheoremSchema = z.object({
  id: Id,
  /** Espaces, objets et topologies en jeu (affichés avant l'énoncé). */
  spaces: z.array(Mixed).min(1),
  hypotheses: z.array(HypothesisSchema).min(1),
  statement: Mixed,
  /** Bilan explicite : existence, unicité, régularité, stabilité (seulement ce qui est affirmé). */
  conclusions: z.object({
    existence: Mixed.optional(),
    unicite: Mixed.optional(),
    regularite: Mixed.optional(),
    stabilite: Mixed.optional(),
    autre: Mixed.optional(),
  }),
  /** La démonstration figure-t-elle intégralement dans le polycopié ? */
  sourceProof: z.enum(['complete', 'idee', 'admise']),
  proofOutline: z.array(Mixed).min(1),
  warnings: z.array(Mixed),
  usefulFor: Mixed,
  verification: VerificationSchema,
});

export const DefinitionSchema = z.object({
  id: Id,
  term: Mixed,
  statement: Mixed,
  source: SourceSchema,
});

export const ConceptSchema = z.object({
  id: Id,
  label: Mixed,
  /** Rappel affiché dans le tableau de bord lorsque ce concept est fragile. */
  reminder: Mixed,
});

export const CounterexampleTaskSchema = z.object({
  id: Id,
  theoremId: Id.optional(),
  title: Mixed,
  /** Assertion trop générale ou fausse, présentée au joueur. */
  claim: Mixed,
  /** Énoncé exact correspondant. */
  correctStatement: Mixed,
  /** Ce que le joueur doit produire. */
  task: Mixed,
  check: ClosedCheckSchema,
  /** Démonstration que le contre-exemple en est bien un. */
  explanation: Mixed,
  concept: Id,
  source: SourceSchema,
});

export type ClosedCheckData = z.infer<typeof ClosedCheckSchema>;
export type ProofNodeSpec = z.infer<typeof ProofNodeSchema>;
export type JustificationSpec = z.infer<typeof JustificationSchema>;
export type RuleSpec = z.infer<typeof RuleSchema>;
export type TrapSpec = z.infer<typeof TrapSchema>;
export type RemovableSpec = z.infer<typeof RemovableSchema>;
export type ProofSpec = z.infer<typeof ProofSpecSchema>;
export type Exercise = z.infer<typeof ExerciseSchema>;
export type TheoremContent = z.infer<typeof TheoremSchema>;
export type Definition = z.infer<typeof DefinitionSchema>;
export type Concept = z.infer<typeof ConceptSchema>;
export type CounterexampleTask = z.infer<typeof CounterexampleTaskSchema>;
export type Source = z.infer<typeof SourceSchema>;
export type Verification = z.infer<typeof VerificationSchema>;
