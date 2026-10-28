export interface GrammarIssue {
  issue: string;
  correction: string;
  type: string;
  explanation: string;
}

export interface StyleAlternative {
  tone: 'formal' | 'casual' | 'concise' | 'creative';
  text: string;
  description: string;
}

export interface TransformerSubword {
  token: string;
  id: number;
  pos: string;
}

export interface AttentionPair {
  from: string;
  to: string;
  weight: number;
  explanation: string;
}

export interface DecoderStep {
  step: number;
  token: string;
  probability: number;
  rationale: string;
}

export interface TransformerInsights {
  tokens: string[];
  subwords: TransformerSubword[];
  attentionPairs: AttentionPair[];
  decoderSteps: DecoderStep[];
}

export interface GrammarAnalysisResult {
  id: string;
  original: string;
  corrected: string;
  clearerAlternative: string;
  errorCategory: string;
  ruleExplanation: string;
  confidenceScore: number;
  grammarIssues: GrammarIssue[];
  styleAlternatives: StyleAlternative[];
  transformerInsights: TransformerInsights;
}

export interface DiffPart {
  type: 'same' | 'removed' | 'added';
  value: string;
}
