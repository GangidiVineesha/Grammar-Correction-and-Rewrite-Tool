import React from 'react';
import { Target, Lightbulb, CheckSquare, Layers, Cpu, PenTool, Sparkles, Binary, Compass, ArrowRight } from 'lucide-react';

export const AlgorithmGuide: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: "Input Processing",
      badge: "Tokenization & Cleaning",
      color: "blue",
      bullets: [
        "Receive the sentence(s) from the user or batch payload.",
        "Tokenize raw strings into subwords (WordPiece or BPE tokens) to handle rare words and inflections.",
        "Clean anomalous punctuation and normalize Unicode characters.",
        "Encode token IDs into dense numerical vector embeddings with positional encodings."
      ],
      codeSnippet: `tokens = tokenizer.encode("She dont like coffee.")\n// Output IDs: [1856, 3412, 89, 2067, 6310, 13]`
    },
    {
      number: 2,
      title: "Transformer Model",
      badge: "Multi-Head Attention",
      color: "indigo",
      bullets: [
        "Encoder captures the bidirectional context of the entire sentence at once.",
        "Self-attention heads identify long-range syntactic dependencies (e.g., subject 'She' ➔ auxiliary 'dont').",
        "Decoder uses cross-attention to condition output generation on the encoder representations.",
        "Computes token-level logits across the model vocabulary using attention mechanisms."
      ],
      codeSnippet: `Attention(Q, K, V) = softmax( (Q * K^T) / sqrt(d_k) ) * V\n// Attention score(She, dont) = 0.94`
    },
    {
      number: 3,
      title: "Text Generation",
      badge: "Dual Output Pathways",
      color: "purple",
      bullets: [
        "Use a fine-tuned language model (e.g. T5, BART, or modern Gemini Transformer).",
        "Generate two distinct outputs simultaneously or sequentially:",
        "Output A: Exact grammatical correction (fixing grammar, syntax, spelling, and agreement).",
        "Output B: Simplified / clearer alternative (idiomatic rewrites, native fluency, and optimal sentence rhythm)."
      ],
      codeSnippet: `beam_search_decode(\n  output_mode=["grammatical_correction", "clearer_alternative"],\n  temperature=0.2\n)`
    },
    {
      number: 4,
      title: "Post-processing",
      badge: "Detokenization & Formatting",
      color: "amber",
      bullets: [
        "Detokenize subword token sequences back into human-readable strings.",
        "Enforce standard capitalization rules and sentence terminal punctuation.",
        "Calculate token-by-token diff deltas between original and generated outputs.",
        "Structure results into a side-by-side comparison schema."
      ],
      codeSnippet: `formatted_text = detokenize(decoder_tokens)\ndiff_chunks = compute_word_diff(input_text, formatted_text)`
    },
    {
      number: 5,
      title: "Output Delivery",
      badge: "Side-by-Side Presentation",
      color: "emerald",
      bullets: [
        "Display original sentence, corrected version, and clearer alternative side-by-side.",
        "Highlight exact grammatical rules violated (e.g. Subject-Verb Agreement, Article Omission).",
        "Provide confidence metrics and copy/audio options for seamless user adoption."
      ],
      codeSnippet: `return {\n  original: "She dont like coffee.",\n  corrected: "She doesn't like coffee.",\n  clearer: "She is not a fan of coffee."\n}`
    }
  ];

  return (
    <div className="space-y-8">
      {/* SECTION 1: Problem Statement Banner (from Poster Section 1) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 font-bold text-sm flex items-center justify-center">
            1
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Problem Statement & Academic Framework
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Problem Statement Card */}
          <div className="bg-rose-50/50 rounded-xl p-4 sm:p-5 border border-rose-200/80">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-rose-600" />
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
                Problem Statement
              </h3>
            </div>
            <p className="text-sm font-semibold text-rose-950 mb-1">
              Grammar Correction and Rewrite Tool
            </p>
            <p className="text-xs text-slate-700 leading-relaxed">
              Suggest corrected wording and a clearer alternative for supplied sentences to eliminate grammatical ambiguities and enhance communicative impact.
            </p>
          </div>

          {/* Syllabus Concept Card */}
          <div className="bg-indigo-50/50 rounded-xl p-4 sm:p-5 border border-indigo-200/80">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
                Syllabus Concept
              </h3>
            </div>
            <ul className="text-xs text-slate-800 space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
                <span className="font-semibold text-indigo-950">
                  Advanced Transformer techniques
                </span>
                <span className="text-slate-600 block text-[11px]">
                  Multi-Head Self-Attention, Bidirectional Encoding, Logit Sampling.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
                <span className="font-semibold text-indigo-950">
                  Text Generation Applications
                </span>
                <span className="text-slate-600 block text-[11px]">
                  Autoregressive beam search, fine-tuned sequence-to-sequence rewriting.
                </span>
              </li>
            </ul>
          </div>

          {/* Expected Output Card */}
          <div className="bg-emerald-50/50 rounded-xl p-4 sm:p-5 border border-emerald-200/80">
            <div className="flex items-center gap-2 mb-2">
              <CheckSquare className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
                Expected Output
              </h3>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed mb-2">
              Complete multi-column side-by-side presentation encompassing:
            </p>
            <div className="space-y-1.5 text-xs font-medium text-slate-800">
              <div className="flex items-center gap-2 text-rose-700 bg-white p-1.5 rounded border border-rose-100">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>1. Original Input sentences</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-800 bg-white p-1.5 rounded border border-emerald-100">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>2. Grammatically corrected wording</span>
              </div>
              <div className="flex items-center gap-2 text-indigo-800 bg-white p-1.5 rounded border border-indigo-100">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                <span>3. Clearer natural alternative</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: Algorithm Explanation (from Poster Section 4) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 font-bold text-sm flex items-center justify-center">
              4
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Algorithm Explanation
            </h2>
          </div>
          <span className="text-xs text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full font-bold border border-purple-200">
            End-to-End NLP Execution
          </span>
        </div>

        <div className="space-y-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-slate-200 p-5 hover:border-slate-300 transition-colors bg-white shadow-2xs"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {step.number}
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900">
                      {step.title}
                    </h3>
                    <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                      {step.badge}
                    </span>
                  </div>

                  <ul className="space-y-1.5 pl-10 text-xs sm:text-sm text-slate-700">
                    {step.bullets.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="md:w-80 shrink-0">
                  <div className="bg-slate-950 text-slate-200 rounded-xl p-3 font-mono text-[11px] leading-relaxed overflow-x-auto shadow-inner border border-slate-800">
                    <div className="text-slate-500 text-[10px] uppercase font-bold mb-1 border-b border-slate-800 pb-1">
                      Pseudo-Code Trace
                    </div>
                    <pre className="text-indigo-300">
                      <code>{step.codeSnippet}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
