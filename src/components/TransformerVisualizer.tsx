import React, { useState } from 'react';
import { Cpu, Eye, Zap, Layers, GitCommit, Binary, Info } from 'lucide-react';
import { TransformerInsights } from '../types/grammar';

interface TransformerVisualizerProps {
  insights: TransformerInsights;
  original: string;
}

export const TransformerVisualizer: React.FC<TransformerVisualizerProps> = ({
  insights,
  original
}) => {
  const [selectedTokenIndex, setSelectedTokenIndex] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<'attention' | 'tokens' | 'decoder'>('attention');

  const tokens = insights.tokens && insights.tokens.length > 0 
    ? insights.tokens 
    : original.split(' ');

  const currentToken = selectedTokenIndex !== null && tokens[selectedTokenIndex] !== undefined
    ? tokens[selectedTokenIndex]
    : null;

  // Find attention connections for currently selected token
  const activeConnections = insights.attentionPairs.filter(pair => 
    currentToken && (pair.from.toLowerCase() === currentToken.toLowerCase() || pair.to.toLowerCase() === currentToken.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-400/30">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              Transformer Internal Mechanics
              <span className="text-[10px] font-mono bg-indigo-500/30 text-indigo-300 border border-indigo-400/30 px-2 py-0.5 rounded-full">
                Attention & Embeddings
              </span>
            </h3>
            <p className="text-xs text-slate-300">
              Interactive inspection of tokenization, attention weights, and decoder generation
            </p>
          </div>
        </div>

        {/* Inner sub-tabs */}
        <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab('attention')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'attention'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            Self-Attention Map
          </button>
          <button
            onClick={() => setActiveTab('tokens')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'tokens'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            Subword Tokenizer
          </button>
          <button
            onClick={() => setActiveTab('decoder')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'decoder'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            Decoder Trace
          </button>
        </div>
      </div>

      <div className="p-5">
        {/* TAB 1: Attention Map */}
        {activeTab === 'attention' && (
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-indigo-600" />
                  Select Token to Inspect Multi-Head Attention:
                </label>
                <span className="text-xs text-indigo-600 font-medium">
                  Click any word to inspect contextual binding
                </span>
              </div>

              {/* Token Chips bar */}
              <div className="flex flex-wrap items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                {tokens.map((token, idx) => {
                  const isSelected = selectedTokenIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedTokenIndex(idx)}
                      className={`px-3.5 py-1.5 rounded-lg font-mono text-sm font-semibold transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-400'
                          : 'bg-white text-slate-700 border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50'
                      }`}
                    >
                      <span>{token}</span>
                      <span className={`text-[10px] font-normal px-1 rounded ${
                        isSelected ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-100 text-slate-500'
                      }`}>
                        t_{idx}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Attention Connections Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  Self-Attention Connections for "{currentToken}"
                </h4>

                {activeConnections.length > 0 ? (
                  <div className="space-y-2.5">
                    {activeConnections.map((conn, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                              {conn.from}
                            </span>
                            <span className="text-slate-400 text-xs">➔</span>
                            <span className="font-mono text-xs font-bold text-indigo-900 bg-indigo-100/70 px-2 py-0.5 rounded">
                              {conn.to}
                            </span>
                          </div>
                          <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                            {(conn.weight * 100).toFixed(0)}% weight
                          </span>
                        </div>
                        {/* Weight bar */}
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-1.5">
                          <div
                            className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                            style={{ width: `${conn.weight * 100}%` }}
                          />
                        </div>
                        <p className="text-xs text-slate-600">
                          {conn.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-slate-400 text-xs bg-white rounded-lg border border-dashed border-slate-200">
                    <Info className="w-5 h-5 mx-auto mb-1 text-slate-300" />
                    Standard uniform positional self-attention with neighbouring context tokens.
                  </div>
                )}
              </div>

              {/* Mathematical Formulation Card */}
              <div className="border border-indigo-100 rounded-xl p-4 bg-indigo-50/30 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-indigo-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Binary className="w-3.5 h-3.5 text-indigo-600" />
                    Transformer Self-Attention Formulation
                  </h4>
                  <div className="bg-slate-900 text-indigo-300 p-3 rounded-lg font-mono text-xs mb-3 shadow-inner">
                    <code>Attention(Q, K, V) = softmax( (Q * K^T) / sqrt(d_k) ) * V</code>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    In text grammar correction, the <strong>Encoder</strong> creates query (Q), key (K), and value (V) vectors for each word. The dot-product calculates syntactic dependency: when an error like <em>"She dont"</em> occurs, the attention heads assign high weight between <em>"She"</em> and <em>"dont"</em>, signaling a number mismatch.
                  </p>
                </div>

                <div className="p-2.5 bg-white rounded-lg border border-indigo-100 text-[11px] text-indigo-900">
                  <span className="font-bold">Key Insight:</span> Unlike older RNNs that process sequentially, Transformers compute pairwise attention across the entire sentence simultaneously in parallel!
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Subword Tokenizer */}
        {activeTab === 'tokens' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Subword Vocabulary Decomposition (Byte-Pair / SentencePiece)
              </h4>
              <span className="text-xs text-slate-500 font-mono">
                Vocabulary size: ~32,000+ tokens
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {insights.subwords && insights.subwords.length > 0 ? (
                insights.subwords.map((sub, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center hover:border-indigo-400 hover:bg-indigo-50/40 transition-colors"
                  >
                    <div className="font-mono text-sm font-bold text-indigo-900 mb-1">
                      "{sub.token}"
                    </div>
                    <div className="text-[10px] font-mono text-slate-500 bg-white border border-slate-200 rounded px-1.5 py-0.5 inline-block mb-1">
                      ID: #{sub.id}
                    </div>
                    <div className="text-[11px] font-semibold text-indigo-700">
                      {sub.pos}
                    </div>
                  </div>
                ))
              ) : (
                tokens.map((t, i) => (
                  <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                    <div className="font-mono text-sm font-bold text-slate-800 mb-1">"{t}"</div>
                    <div className="text-[10px] text-slate-400 font-mono">ID: #{1042 + i * 29}</div>
                  </div>
                ))
              )}
            </div>

            <div className="p-3 bg-slate-100/70 rounded-xl text-xs text-slate-600 flex items-center gap-2">
              <Info className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>
                Subword tokenization splits prefixes, suffixes, and contractions (e.g. "don" + "'t" or "dont") so the model can handle out-of-vocabulary words and spelling anomalies gracefully.
              </span>
            </div>
          </div>
        )}

        {/* TAB 3: Decoder Step Trace */}
        {activeTab === 'decoder' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Autoregressive Decoder Sequence Generation
              </h4>
              <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                Beam Search / Top-P Sampling
              </span>
            </div>

            <div className="space-y-2">
              {insights.decoderSteps && insights.decoderSteps.length > 0 ? (
                insights.decoderSteps.map((step) => (
                  <div
                    key={step.step}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                        {step.step}
                      </span>
                      <span className="font-mono text-sm font-bold text-slate-900 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                        {step.token}
                      </span>
                      <span className="text-xs text-slate-600">
                        {step.rationale}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <span className="text-xs font-mono font-semibold text-emerald-700">
                        {(step.probability * 100).toFixed(0)}% logit prob
                      </span>
                      <div className="w-16 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full"
                          style={{ width: `${step.probability * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-slate-400 text-xs">
                  Run an analysis to inspect autoregressive token generation.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
