/** Compléments pédagogiques originaux : sources du cours, preuves délimitées et contrôles actifs. */
export interface OperatorSource {
  kind: 'polycopie' | 'cours-analyse' | 'complement';
  label: string;
  /** Numéros des pages du PDF, pas des pages imprimées. */
  pdfPages: number[];
}

export interface OperatorQuestion {
  id: string;
  prompt: string;
  options: { text: string; feedback: string }[];
  correctIndex: number;
}

export interface OperatorLesson {
  id: string;
  title: string;
  lead: string;
  prerequisites: string[];
  sources: OperatorSource[];
  theoremIds: string[];
  atlasId: string;
  sections: { title: string; body: string }[];
  example: { title: string; body: string };
  proof: {
    title: string;
    scope: 'complete-example' | 'theorem-roadmap';
    scopeNote: string;
    steps: string[];
  };
  pitfalls: string[];
  questions: OperatorQuestion[];
}
