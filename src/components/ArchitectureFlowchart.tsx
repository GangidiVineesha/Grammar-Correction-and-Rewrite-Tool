import React, { useState } from 'react';
import { Play, ArrowDown, ArrowRight, Layers, Cpu, Database, CheckCircle, Sparkles, Filter, Code2, RefreshCw } from 'lucide-react';

export const ArchitectureFlowchart: React.FC = () => {
  const [activeStage, setActiveStage] = useState<string>('transformer');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);

  const startSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimStep(1);

    const steps = [1, 2, 3, 4, 5, 6];
    steps.forEach((step, index) => {
      setTimeout(() => {
        setSimStep(step);
        if (index === steps.length - 1) {
          setTimeout(() => setIsSimulating(false), 800);
        }
      }, (index + 1) * 700);
    });
  };

  return (
    <div className="space-y-8">
      {/* Simulation Controls Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Syllabus Sections 2 & 3
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Flowchart & Architecture Pipeline
          </h2>
          <p className="text-sm text-slate-600">
            Interactive structural diagram of text preprocessing, Transformer encoder-decoder mechanics, and text generation.
          </p>
        </div>

        <button
          onClick={startSimulation}
          disabled={isSimulating}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold text-sm rounded-xl shadow-xs transition-colors shrink-0"
        >
          {isSimulating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Simulating Pipeline...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>Animate Pipeline Flow</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SECTION 2: Flowchart (Left / 5 columns) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 font-bold text-sm flex items-center justify-center">
                2
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                Flowchart
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">Step-by-Step Logic</span>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center space-y-2 py-2">
            {/* 1. Start */}
            <div className={`px-6 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
              simStep === 1
                ? 'bg-emerald-500 text-white ring-4 ring-emerald-200 scale-105'
                : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
            }`}>
              Start
            </div>

            <ArrowDown className={`w-4 h-4 transition-colors ${simStep >= 2 ? 'text-indigo-600' : 'text-slate-300'}`} />

            {/* 2. Input sentence(s) */}
            <button
              onClick={() => setActiveStage('input')}
              className={`w-full max-w-xs p-3 rounded-xl border text-center transition-all ${
                activeStage === 'input' || simStep === 2
                  ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 font-bold shadow-xs ring-2 ring-indigo-300'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="text-xs font-extrabold">Input sentence(s)</div>
              <div className="text-[11px] text-slate-500 mt-0.5">User supplies ungrammatical text</div>
            </button>

            <ArrowDown className={`w-4 h-4 transition-colors ${simStep >= 3 ? 'text-indigo-600' : 'text-slate-300'}`} />

            {/* 3. Preprocess text */}
            <button
              onClick={() => setActiveStage('preprocessing')}
              className={`w-full max-w-xs p-3 rounded-xl border text-center transition-all ${
                activeStage === 'preprocessing' || simStep === 3
                  ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 font-bold shadow-xs ring-2 ring-indigo-300'
                  : 'border-rose-200 bg-rose-50/30 text-rose-900 hover:bg-rose-50/60'
              }`}
            >
              <div className="text-xs font-extrabold">Preprocess text</div>
              <div className="text-[11px] text-rose-700 mt-0.5">(tokenization, cleaning)</div>
            </button>

            <ArrowDown className={`w-4 h-4 transition-colors ${simStep >= 4 ? 'text-indigo-600' : 'text-slate-300'}`} />

            {/* 4. Grammar Correction & Rewrite using Transformer */}
            <button
              onClick={() => setActiveStage('transformer')}
              className={`w-full max-w-xs p-3.5 rounded-xl border text-center transition-all ${
                activeStage === 'transformer' || simStep === 4
                  ? 'border-indigo-600 bg-indigo-600 text-white font-extrabold shadow-md ring-2 ring-indigo-300'
                  : 'border-blue-300 bg-blue-50 text-blue-900 font-bold hover:bg-blue-100/60'
              }`}
            >
              <div className="text-xs uppercase tracking-wide">
                Grammar Correction & Rewrite
              </div>
              <div className="text-[11px] opacity-90 font-medium mt-0.5">
                using Advanced Transformer Model
              </div>
            </button>

            <ArrowDown className={`w-4 h-4 transition-colors ${simStep >= 5 ? 'text-indigo-600' : 'text-slate-300'}`} />

            {/* 5. Generate corrected sentence and clearer alternative */}
            <button
              onClick={() => setActiveStage('generation')}
              className={`w-full max-w-xs p-3 rounded-xl border text-center transition-all ${
                activeStage === 'generation' || simStep === 5
                  ? 'border-amber-500 bg-amber-500 text-white font-bold shadow-xs ring-2 ring-amber-300'
                  : 'border-amber-200 bg-amber-50/70 text-amber-900 hover:bg-amber-100/60'
              }`}
            >
              <div className="text-xs font-extrabold">Generate Output Sentences</div>
              <div className="text-[11px] opacity-90 mt-0.5">
                Corrected wording & Clearer alternative
              </div>
            </button>

            <ArrowDown className={`w-4 h-4 transition-colors ${simStep >= 6 ? 'text-indigo-600' : 'text-slate-300'}`} />

            {/* 6. Display output (side-by-side comparison) */}
            <button
              onClick={() => setActiveStage('output')}
              className={`w-full max-w-xs p-3 rounded-xl border text-center transition-all ${
                activeStage === 'output' || simStep === 6
                  ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 font-bold shadow-xs ring-2 ring-indigo-300'
                  : 'border-indigo-200 bg-indigo-50/40 text-indigo-900 hover:bg-indigo-100/60'
              }`}
            >
              <div className="text-xs font-extrabold">Display Output</div>
              <div className="text-[11px] text-indigo-700 mt-0.5">
                (side-by-side comparison matrix)
              </div>
            </button>

            <ArrowDown className="w-4 h-4 text-slate-300" />

            {/* 7. End */}
            <div className="px-6 py-2 rounded-full font-bold text-xs uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
              End
            </div>
          </div>
        </div>

        {/* SECTION 3: Architecture Diagram (Right / 7 columns) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-800 font-bold text-sm flex items-center justify-center">
                  3
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  Architecture Diagram
                </h3>
              </div>
              <span className="text-xs text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded">
                Encoder-Decoder Topology
              </span>
            </div>

            {/* Architecture Canvas Visual */}
            <div className="space-y-4">
              {/* Row 1: Input Text & Text Preprocessing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Input Text Box */}
                <div
                  onClick={() => setActiveStage('input')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    activeStage === 'input'
                      ? 'border-blue-500 bg-blue-50 shadow-xs ring-2 ring-blue-300'
                      : 'border-blue-200 bg-blue-50/40 hover:bg-blue-50'
                  }`}
                >
                  <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider block mb-1">
                    Input Text
                  </span>
                  <div className="text-xs font-semibold text-slate-800">
                    (Incorrect/Original Sentence)
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 font-mono">
                    e.g. "She dont like coffee."
                  </div>
                </div>

                {/* Text Preprocessing Box */}
                <div
                  onClick={() => setActiveStage('preprocessing')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    activeStage === 'preprocessing'
                      ? 'border-rose-500 bg-rose-50 shadow-xs ring-2 ring-rose-300'
                      : 'border-rose-200 bg-rose-50/40 hover:bg-rose-50'
                  }`}
                >
                  <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider block mb-1">
                    Text Preprocessing
                  </span>
                  <ul className="text-xs text-slate-700 space-y-0.5 font-medium">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Tokenization (BPE)
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Cleaning (Whitespace/Symbols)
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Encoding (Token IDs to Vectors)
                    </li>
                  </ul>
                </div>
              </div>

              {/* Row 2: Advanced Transformer Model Box & Language Model */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Transformer Model Block (2 cols) */}
                <div
                  onClick={() => setActiveStage('transformer')}
                  className={`sm:col-span-2 p-4 rounded-xl border cursor-pointer transition-all ${
                    activeStage === 'transformer'
                      ? 'border-indigo-600 bg-indigo-50 shadow-xs ring-2 ring-indigo-300'
                      : 'border-indigo-200 bg-indigo-50/30 hover:bg-indigo-50/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-1">
                      <Cpu className="w-3.5 h-3.5 text-indigo-600" />
                      Advanced Transformer Model
                    </span>
                    <span className="text-[10px] text-indigo-700 font-mono">
                      Attention Core
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {/* Encoder */}
                    <div className="bg-white p-2.5 rounded-lg border border-indigo-100 shadow-2xs">
                      <div className="text-xs font-bold text-indigo-900">
                        Encoder
                      </div>
                      <div className="text-[11px] text-slate-600 mt-0.5">
                        (understands context & bidirectional relationships)
                      </div>
                    </div>

                    {/* Decoder */}
                    <div className="bg-white p-2.5 rounded-lg border border-indigo-100 shadow-2xs">
                      <div className="text-xs font-bold text-indigo-900">
                        Decoder
                      </div>
                      <div className="text-[11px] text-slate-600 mt-0.5">
                        (generates corrected & rewritten text token-by-token)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Language Model (Training + Fine-tuning) */}
                <div
                  onClick={() => setActiveStage('lm')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    activeStage === 'lm'
                      ? 'border-purple-600 bg-purple-50 shadow-xs ring-2 ring-purple-300'
                      : 'border-purple-200 bg-purple-50/40 hover:bg-purple-50'
                  }`}
                >
                  <span className="text-xs font-bold text-purple-900 uppercase tracking-wider flex items-center gap-1 mb-1">
                    <Database className="w-3.5 h-3.5 text-purple-600" />
                    Language Model
                  </span>
                  <div className="text-xs font-semibold text-slate-800">
                    Foundation Weights
                  </div>
                  <div className="text-[11px] text-slate-600 mt-1">
                    • Training data (Massive web corpora)
                  </div>
                  <div className="text-[11px] text-slate-600">
                    • Fine-tuning (Grammar error correction datasets)
                  </div>
                </div>
              </div>

              {/* Row 3: Post-processing */}
              <div
                onClick={() => setActiveStage('postprocessing')}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  activeStage === 'postprocessing'
                    ? 'border-amber-500 bg-amber-50 shadow-xs ring-2 ring-amber-300'
                    : 'border-amber-200 bg-amber-50/40 hover:bg-amber-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                    Post-processing
                  </span>
                  <span className="text-[10px] text-amber-800 font-medium">
                    Selection & Formatting
                  </span>
                </div>
                <div className="text-xs text-slate-700 mt-0.5">
                  Formatting, capitalization restoration, detokenization, and selecting the highest-probability suggestion.
                </div>
              </div>

              {/* Row 4: Final Output Box */}
              <div
                onClick={() => setActiveStage('output')}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  activeStage === 'output'
                    ? 'border-emerald-600 bg-emerald-50 shadow-xs ring-2 ring-emerald-300'
                    : 'border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    Output
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700">
                    Final Deliverables
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-900">
                  (Corrected sentence + Clearer alternative in side-by-side comparison)
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Stage Explanation Card */}
          <div className="mt-4 p-4 rounded-xl bg-slate-900 text-white border border-slate-800">
            <div className="flex items-center justify-between mb-1 text-xs">
              <span className="font-mono text-indigo-400 font-bold uppercase tracking-wider">
                Stage Deep-Dive: {activeStage}
              </span>
              <span className="text-slate-400">Click any block to learn more</span>
            </div>

            {activeStage === 'transformer' && (
              <p className="text-xs text-slate-300 leading-relaxed">
                The core Transformer model relies on <strong>Multi-Head Attention</strong>. The encoder maps words into dense embeddings that incorporate context from both left and right directions simultaneously. The decoder applies masked attention to predict the next corrected or rewritten token without cheating on future words.
              </p>
            )}
            {activeStage === 'preprocessing' && (
              <p className="text-xs text-slate-300 leading-relaxed">
                Text is normalized, stripped of non-standard control bytes, and converted into subword tokens using algorithms like Byte-Pair Encoding (BPE). This allows handling typos, rare inflections, and punctuation boundaries like "dont" ➔ ["don", "t"].
              </p>
            )}
            {activeStage === 'input' && (
              <p className="text-xs text-slate-300 leading-relaxed">
                The raw string entered by the user or supplied from a document. Examples include common second-language grammar errors like missing articles ("This is very good product") or subject-verb mismatches ("We was late").
              </p>
            )}
            {activeStage === 'lm' && (
              <p className="text-xs text-slate-300 leading-relaxed">
                Pre-trained on billions of tokens to acquire syntactic, semantic, and world knowledge, then fine-tuned on paired grammar correction datasets (e.g. CoNLL, BEA, Lang-8) to master nuanced error correction and natural human rewrites.
              </p>
            )}
            {activeStage === 'postprocessing' && (
              <p className="text-xs text-slate-300 leading-relaxed">
                Detokenizes subwords back into clean natural text, applies sentence capitalization rules, aligns punctuation, and calculates confidence scores to present the most authoritative phrasing to the user.
              </p>
            )}
            {activeStage === 'output' && (
              <p className="text-xs text-slate-300 leading-relaxed">
                Renders both the strict grammatical fix and the stylistic clearer alternative side-by-side, allowing users to choose between grammatical correctness and conversational eloquence.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
