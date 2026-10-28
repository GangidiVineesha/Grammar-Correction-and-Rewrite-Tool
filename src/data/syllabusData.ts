import { GrammarAnalysisResult } from '../types/grammar';

export interface SyllabusItem {
  id: number;
  inputSentence: string;
  correctedWording: string;
  clearerAlternative: string;
  category: string;
  errorGrammarConcept: string;
  explanation: string;
  fullAnalysis: GrammarAnalysisResult;
}

export const SYLLABUS_EXAMPLES: SyllabusItem[] = [
  {
    id: 1,
    inputSentence: "She dont like coffee.",
    correctedWording: "She doesn't like coffee.",
    clearerAlternative: "She is not a fan of coffee.",
    category: "Subject-Verb Agreement",
    errorGrammarConcept: "Third-Person Singular Auxiliary Negation",
    explanation: "Third-person singular subjects ('he', 'she', 'it') take 'does not' / 'doesn't' in simple present tense, not 'do not' / 'dont'.",
    fullAnalysis: {
      id: "syl-1",
      original: "She dont like coffee.",
      corrected: "She doesn't like coffee.",
      clearerAlternative: "She is not a fan of coffee.",
      errorCategory: "Subject-Verb Agreement & Contraction",
      ruleExplanation: "In the present simple tense, the third-person singular subject ('She') requires the auxiliary verb 'does not' or contracted form 'doesn't', rather than 'don't' ('do not').",
      confidenceScore: 0.99,
      grammarIssues: [
        {
          issue: "dont",
          correction: "doesn't",
          type: "Subject-Verb Agreement & Missing Apostrophe",
          explanation: "Third-person singular subject ('She') must use 'doesn't' (does not) with base verb 'like'."
        }
      ],
      styleAlternatives: [
        { tone: "formal", text: "She does not care for coffee.", description: "Polite and traditional phrasing" },
        { tone: "casual", text: "She is not really into coffee.", description: "Natural conversational tone" },
        { tone: "concise", text: "She dislikes coffee.", description: "Direct and compact" },
        { tone: "creative", text: "Coffee has never been her cup of tea.", description: "Expressive figurative touch" }
      ],
      transformerInsights: {
        tokens: ["She", "dont", "like", "coffee", "."],
        subwords: [
          { token: "She", id: 1856, pos: "PRON (3rd Sing)" },
          { token: "don", id: 3412, pos: "AUX (Plural mismatch)" },
          { token: "t", id: 89, pos: "PART (Negative)" },
          { token: "like", id: 2067, pos: "VERB (Base form)" },
          { token: "coffee", id: 6310, pos: "NOUN (Direct object)" },
          { token: ".", id: 13, pos: "PUNCT" }
        ],
        attentionPairs: [
          { from: "dont", to: "She", weight: 0.94, explanation: "Encoder cross-attention detects pronoun 'She' dictates auxiliary agreement." },
          { from: "dont", to: "like", weight: 0.81, explanation: "Self-attention links auxiliary negation to verb complement." },
          { from: "like", to: "coffee", weight: 0.72, explanation: "Transitive predicate-object semantic binding." }
        ],
        decoderSteps: [
          { step: 1, token: "She", probability: 0.99, rationale: "Replicates subject token with high fidelity." },
          { step: 2, token: "doesn't", probability: 0.97, rationale: "Masked multi-head attention predicts corrected 3rd-person singular auxiliary." },
          { step: 3, token: "like", probability: 0.98, rationale: "Retains base infinitive after modal auxiliary." },
          { step: 4, token: "coffee.", probability: 0.99, rationale: "Completes object noun phrase." }
        ]
      }
    }
  },
  {
    id: 2,
    inputSentence: "I am agree with you.",
    correctedWording: "I agree with you.",
    clearerAlternative: "I think you are right.",
    category: "Verb Redundancy",
    errorGrammarConcept: "Unnecessary Auxiliary Copula",
    explanation: "'Agree' is already a dynamic action verb, not a predicate adjective. Combining the auxiliary verb 'am' with 'agree' is redundant.",
    fullAnalysis: {
      id: "syl-2",
      original: "I am agree with you.",
      corrected: "I agree with you.",
      clearerAlternative: "I think you are right.",
      errorCategory: "Verb Redundancy / Auxiliary Error",
      ruleExplanation: "'Agree' is already a dynamic action verb, not an adjective. Combining auxiliary 'am' with 'agree' creates grammatical redundancy. Use simply 'I agree'.",
      confidenceScore: 0.98,
      grammarIssues: [
        {
          issue: "am agree",
          correction: "agree",
          type: "Unnecessary Auxiliary Verb",
          explanation: "'Agree' is an active verb; do not use the copula 'am' before it."
        }
      ],
      styleAlternatives: [
        { tone: "formal", text: "I concur with your assessment.", description: "Professional and executive discourse" },
        { tone: "casual", text: "You took the words right out of my mouth.", description: "Colloquial agreement" },
        { tone: "concise", text: "I agree entirely.", description: "Brevity with emphasis" },
        { tone: "creative", text: "We are on the exact same wavelength.", description: "Idiomatic clarity" }
      ],
      transformerInsights: {
        tokens: ["I", "am", "agree", "with", "you", "."],
        subwords: [
          { token: "I", id: 40, pos: "PRON (1st Sing)" },
          { token: "am", id: 669, pos: "AUX (Redundant copula)" },
          { token: "agree", id: 4321, pos: "VERB (Main verb)" },
          { token: "with", id: 351, pos: "ADP (Preposition)" },
          { token: "you", id: 345, pos: "PRON (Object)" },
          { token: ".", id: 13, pos: "PUNCT" }
        ],
        attentionPairs: [
          { from: "agree", to: "am", weight: 0.96, explanation: "High attention confirms syntactic collision between copula and root verb." },
          { from: "agree", to: "with", weight: 0.88, explanation: "Prepositional verb collocation resolution." }
        ],
        decoderSteps: [
          { step: 1, token: "I", probability: 0.99, rationale: "Subject pronoun generation." },
          { step: 2, token: "agree", probability: 0.96, rationale: "Prunes redundant 'am' token via beam search logit suppression." },
          { step: 3, token: "with", probability: 0.98, rationale: "Emits governed preposition." },
          { step: 4, token: "you.", probability: 0.99, rationale: "Noun phrase completion." }
        ]
      }
    }
  },
  {
    id: 3,
    inputSentence: "This is very good product.",
    correctedWording: "This is a very good product.",
    clearerAlternative: "This product is really good.",
    category: "Missing Article",
    errorGrammarConcept: "Indefinite Article before Singular Countable Nouns",
    explanation: "'Product' is a singular countable noun. When modified by an adjective ('very good'), it requires an indefinite article ('a').",
    fullAnalysis: {
      id: "syl-3",
      original: "This is very good product.",
      corrected: "This is a very good product.",
      clearerAlternative: "This product is really good.",
      errorCategory: "Missing Indefinite Article",
      ruleExplanation: "'Product' is a singular countable noun. Singular countable nouns in English require a determiner such as 'a' or 'an' when preceded by an adjective phrase ('very good').",
      confidenceScore: 0.97,
      grammarIssues: [
        {
          issue: "very good product",
          correction: "a very good product",
          type: "Determiner Omission",
          explanation: "Singular countable noun 'product' modified by an adjective requires the indefinite article 'a'."
        }
      ],
      styleAlternatives: [
        { tone: "formal", text: "This item demonstrates exceptional quality.", description: "Commercial & business formal" },
        { tone: "casual", text: "This product is seriously impressive.", description: "Friendly endorsement" },
        { tone: "concise", text: "This is an excellent product.", description: "Crisp and impactful" },
        { tone: "creative", text: "This product stands head and shoulders above the rest.", description: "Vivid descriptive flair" }
      ],
      transformerInsights: {
        tokens: ["This", "is", "very", "good", "product", "."],
        subwords: [
          { token: "This", id: 1215, pos: "DET/PRON (Demonstrative)" },
          { token: "is", id: 318, pos: "VERB (Copula)" },
          { token: "very", id: 845, pos: "ADV (Degree modifier)" },
          { token: "good", id: 922, pos: "ADJ (Descriptive)" },
          { token: "product", id: 2478, pos: "NOUN (Singular countable)" },
          { token: ".", id: 13, pos: "PUNCT" }
        ],
        attentionPairs: [
          { from: "product", to: "is", weight: 0.89, explanation: "Predicate nominal link detects missing determiner boundary." },
          { from: "very", to: "good", weight: 0.91, explanation: "Adverbial modifier scope." }
        ],
        decoderSteps: [
          { step: 1, token: "This", probability: 0.99, rationale: "Replicates demonstrative head." },
          { step: 2, token: "is", probability: 0.99, rationale: "Copula verb generation." },
          { step: 3, token: "a", probability: 0.95, rationale: "Inserts indefinite article 'a' based on noun countability constraint." },
          { step: 4, token: "very", probability: 0.96, rationale: "Degree adverb preservation." },
          { step: 5, token: "good", probability: 0.97, rationale: "Adjective phrase completion." },
          { step: 6, token: "product.", probability: 0.99, rationale: "Noun termination." }
        ]
      }
    }
  },
  {
    id: 4,
    inputSentence: "We was late for the meeting.",
    correctedWording: "We were late for the meeting.",
    clearerAlternative: "We arrived late at the meeting.",
    category: "Subject-Verb Agreement",
    errorGrammarConcept: "Past Tense Copula Agreement with Plural Pronoun",
    explanation: "The first-person plural subject 'We' must pair with the plural past tense verb 'were', not singular 'was'.",
    fullAnalysis: {
      id: "syl-4",
      original: "We was late for the meeting.",
      corrected: "We were late for the meeting.",
      clearerAlternative: "We arrived late at the meeting.",
      errorCategory: "Subject-Verb Agreement (Past Tense)",
      ruleExplanation: "The subject 'We' is first-person plural. In past tense English, plural subjects must take the plural past copula 'were' rather than the singular form 'was'.",
      confidenceScore: 0.99,
      grammarIssues: [
        {
          issue: "was",
          correction: "were",
          type: "Past Tense Copula Agreement",
          explanation: "Plural subject 'We' demands 'were', not singular 'was'."
        }
      ],
      styleAlternatives: [
        { tone: "formal", text: "We were delayed in attending the meeting.", description: "Professional corporate communication" },
        { tone: "casual", text: "We didn't make it to the meeting on time.", description: "Casual everyday explanation" },
        { tone: "concise", text: "We arrived late.", description: "Direct and straightforward" },
        { tone: "creative", text: "The meeting had already started by the time we walked in.", description: "Narrative storytelling context" }
      ],
      transformerInsights: {
        tokens: ["We", "was", "late", "for", "the", "meeting", "."],
        subwords: [
          { token: "We", id: 1135, pos: "PRON (1st Plural)" },
          { token: "was", id: 373, pos: "VERB (Singular mismatch)" },
          { token: "late", id: 2394, pos: "ADJ (Predicate adjective)" },
          { token: "for", id: 329, pos: "ADP (Preposition)" },
          { token: "the", id: 262, pos: "DET (Definite article)" },
          { token: "meeting", id: 3077, pos: "NOUN (Event object)" },
          { token: ".", id: 13, pos: "PUNCT" }
        ],
        attentionPairs: [
          { from: "was", to: "We", weight: 0.98, explanation: "Strong attention between subject 'We' and verb 'was' pinpoints number conflict." },
          { from: "late", to: "for", weight: 0.85, explanation: "Adjectival complement alignment." }
        ],
        decoderSteps: [
          { step: 1, token: "We", probability: 0.99, rationale: "Replicates plural subject pronoun." },
          { step: 2, token: "were", probability: 0.98, rationale: "Replaces 'was' with correct plural past copular form." },
          { step: 3, token: "late", probability: 0.99, rationale: "Predicate adjective emission." },
          { step: 4, token: "for the meeting.", probability: 0.99, rationale: "Prepositional complement sequence." }
        ]
      }
    }
  },
  {
    id: 5,
    inputSentence: "Please explain me about this.",
    correctedWording: "Please explain this to me.",
    clearerAlternative: "Can you tell me more about this?",
    category: "Transitive Verb & Preposition",
    errorGrammarConcept: "Transitive Verb Complementation Pattern",
    explanation: "The verb 'explain' takes a direct object (the topic/item) followed by the prepositional phrase 'to [person]', not 'explain [person] about [topic]'.",
    fullAnalysis: {
      id: "syl-5",
      original: "Please explain me about this.",
      corrected: "Please explain this to me.",
      clearerAlternative: "Can you tell me more about this?",
      errorCategory: "Transitive Verb Complementation & Preposition",
      ruleExplanation: "The verb 'explain' is a transitive verb that requires the direct object (the thing being explained, 'this') to precede the indirect recipient introduced by 'to' ('to me'). Saying 'explain me about this' incorrectly mimics the syntax of 'tell'.",
      confidenceScore: 0.98,
      grammarIssues: [
        {
          issue: "explain me about this",
          correction: "explain this to me",
          type: "Dative Complementation",
          explanation: "'Explain' takes [direct object] + [to + indirect object]. Do not use 'explain [person] about [thing]'."
        }
      ],
      styleAlternatives: [
        { tone: "formal", text: "Could you please elaborate on this matter?", description: "High-register polite business inquiry" },
        { tone: "casual", text: "Could you walk me through this?", description: "Friendly collaborative phrasing" },
        { tone: "concise", text: "Please clarify this.", description: "Punchy, executive request" },
        { tone: "creative", text: "I would love to understand the story behind this.", description: "Engaged, enthusiastic inquiry" }
      ],
      transformerInsights: {
        tokens: ["Please", "explain", "me", "about", "this", "."],
        subwords: [
          { token: "Please", id: 4429, pos: "INTJ (Polite marker)" },
          { token: "explain", id: 4899, pos: "VERB (Transitive)" },
          { token: "me", id: 502, pos: "PRON (Misplaced indirect obj)" },
          { token: "about", id: 546, pos: "ADP (Redundant preposition)" },
          { token: "this", id: 428, pos: "PRON (Direct object)" },
          { token: ".", id: 13, pos: "PUNCT" }
        ],
        attentionPairs: [
          { from: "explain", to: "me", weight: 0.95, explanation: "Subcategorization frame mismatch detected on verb arguments." },
          { from: "explain", to: "this", weight: 0.91, explanation: "Discovers semantic patient 'this' belongs directly after 'explain'." }
        ],
        decoderSteps: [
          { step: 1, token: "Please", probability: 0.99, rationale: "Politeness marker preservation." },
          { step: 2, token: "explain", probability: 0.99, rationale: "Transitive verb emission." },
          { step: 3, token: "this", probability: 0.96, rationale: "Places direct object directly after transitive verb." },
          { step: 4, token: "to me.", probability: 0.97, rationale: "Constructs correct prepositional recipient phrase 'to me'." }
        ]
      }
    }
  }
];
