import React, { useState } from 'react';
import { Check, Copy, Volume2, Sparkles, AlertCircle, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { GrammarAnalysisResult } from '../types/grammar';
import { computeWordDiff } from '../utils/diffHelper';

interface SideBySideCardsProps {
  analysis: GrammarAnalysisResult;
}

export const SideBySideCards: React.FC<SideBySideCardsProps> = ({ analysis }) => {
  const [copiedType, setCopiedType] = useState<'corrected' | 'clearer' | null>(null);
  const [activeAlternativeTone, setActiveAlternativeTone] = useState<string>('clearer');

  const diffToCorrected = computeWordDiff(analysis.original, analysis.corrected);
  const currentAlternativeText = 
    activeAlternativeTone === 'clearer' 
      ? analysis.clearerAlternative 
      : (analysis.styleAlternatives.find(a => a.tone === activeAlternativeTone)?.text || analysis.clearerAlternative);

  const diffToClearer = computeWordDiff(analysis.original, currentAlternativeText);

  const handleCopy = (text: string, type: 'corrected' | 'clearer') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6">
      {/* 3-Column Side-by-Side Comparison Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Original Input */}
        <div className="bg-white rounded-2xl border border-rose-200 p-5 shadow-xs flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-rose-400" />
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-100 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                Input Sentence
              </span>
              <span className="text-xs text-slate-400 font-mono">Original</span>
            </div>

            <div className="min-h-[70px] flex items-center">
              <p className="text-base sm:text-lg font-medium text-slate-800 leading-relaxed">
                {analysis.original}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
              {analysis.errorCategory}
            </span>
            <button
              onClick={() => handleSpeak(analysis.original)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition-colors"
              title="Listen to original"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Card 2: Corrected Wording */}
        <div className="bg-white rounded-2xl border border-emerald-300 p-5 shadow-xs flex flex-col justify-between relative overflow-hidden bg-linear-to-b from-emerald-50/20 to-white">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-emerald-500" />
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-md border border-emerald-200 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                Corrected Wording
              </span>
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                {(analysis.confidenceScore * 100).toFixed(0)}% confident
              </span>
            </div>

            <div className="min-h-[70px] flex items-center">
              <p className="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed">
                {analysis.corrected}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-emerald-700 font-medium">
              Standard grammatical rules fixed
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleSpeak(analysis.corrected)}
                className="text-slate-400 hover:text-emerald-700 p-1.5 rounded-md hover:bg-emerald-50 transition-colors"
                title="Listen to correction"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleCopy(analysis.corrected, 'corrected')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-slate-600 hover:text-emerald-800 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 transition-colors font-medium text-xs"
              >
                {copiedType === 'corrected' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Card 3: Clearer Alternative */}
        <div className="bg-white rounded-2xl border border-indigo-300 p-5 shadow-xs flex flex-col justify-between relative overflow-hidden bg-linear-to-b from-indigo-50/30 to-white">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-indigo-500" />
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-800 bg-indigo-100/70 px-2.5 py-1 rounded-md border border-indigo-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                Clearer Alternative
              </span>
              <span className="text-xs text-indigo-600 font-semibold">
                Rewritten for clarity
              </span>
            </div>

            <div className="min-h-[70px] flex items-center">
              <p className="text-base sm:text-lg font-semibold text-indigo-950 leading-relaxed">
                {currentAlternativeText}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-indigo-600 font-medium">
              Enhanced natural flow
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleSpeak(currentAlternativeText)}
                className="text-slate-400 hover:text-indigo-700 p-1.5 rounded-md hover:bg-indigo-50 transition-colors"
                title="Listen to clearer alternative"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleCopy(currentAlternativeText, 'clearer')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-slate-600 hover:text-indigo-800 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 transition-colors font-medium text-xs"
              >
                {copiedType === 'clearer' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Word-by-Word Diff Inspection Bar */}
      <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 shadow-sm border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            <h4 className="text-sm font-bold text-white tracking-wide">
              Transformer Diff Visualization: Original vs. Corrected
            </h4>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Deleted / Error
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" /> Corrected Token
            </span>
          </div>
        </div>

        <div className="text-base sm:text-lg font-mono leading-loose tracking-wide flex flex-wrap items-center gap-x-1.5 gap-y-2 py-1">
          {diffToCorrected.map((chunk, idx) => {
            if (chunk.type === 'removed') {
              return (
                <span
                  key={idx}
                  className="bg-rose-950/80 text-rose-300 line-through decoration-rose-500 decoration-2 px-2 py-0.5 rounded-md border border-rose-800/80"
                  title="Original erroneous word"
                >
                  {chunk.value}
                </span>
              );
            }
            if (chunk.type === 'added') {
              return (
                <span
                  key={idx}
                  className="bg-emerald-950/80 text-emerald-300 font-bold px-2 py-0.5 rounded-md border border-emerald-700 animate-pulse"
                  title="Corrected word generated by Decoder"
                >
                  {chunk.value}
                </span>
              );
            }
            return (
              <span key={idx} className="text-slate-300">
                {chunk.value}
              </span>
            );
          })}
        </div>
      </div>

      {/* Grammar Rule Explanation & Linguistic Concept Card */}
      <div className="bg-linear-to-r from-indigo-50/80 via-blue-50/50 to-slate-50 border border-indigo-200/80 rounded-2xl p-5 shadow-xs">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-indigo-600 text-white shrink-0 mt-0.5 shadow-xs">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span>Grammar Concept:</span>
                <span className="text-indigo-700 bg-indigo-100/70 px-2.5 py-0.5 rounded-md font-extrabold text-xs">
                  {analysis.errorCategory}
                </span>
              </h4>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed font-normal">
              {analysis.ruleExplanation}
            </p>

            {/* Identified Issues Tags */}
            {analysis.grammarIssues && analysis.grammarIssues.length > 0 && (
              <div className="mt-3 pt-3 border-t border-indigo-100/80 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {analysis.grammarIssues.map((issue, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg p-2.5 border border-indigo-100 text-xs shadow-2xs"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="line-through text-rose-600 font-bold font-mono">
                        {issue.issue}
                      </span>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                      <span className="text-emerald-700 font-bold font-mono">
                        {issue.correction}
                      </span>
                      <span className="ml-auto text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                        {issue.type}
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-normal">
                      {issue.explanation}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Multiple Tone Alternatives Switcher */}
      {analysis.styleAlternatives && analysis.styleAlternatives.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Explore Different Rewrite Registers & Tones</span>
            </h4>
            <span className="text-xs text-slate-400">Transformer text generation</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {analysis.styleAlternatives.map((alt) => (
              <button
                key={alt.tone}
                onClick={() => setActiveAlternativeTone(alt.tone)}
                className={`text-left p-3.5 rounded-xl border transition-all ${
                  activeAlternativeTone === alt.tone
                    ? 'border-indigo-600 bg-indigo-50/60 shadow-xs ring-1 ring-indigo-600'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="capitalize font-bold text-xs text-indigo-900 bg-indigo-100/60 px-2 py-0.5 rounded">
                    {alt.tone}
                  </span>
                  {activeAlternativeTone === alt.tone && (
                    <span className="text-[10px] text-indigo-600 font-bold">Selected</span>
                  )}
                </div>
                <p className="text-xs font-semibold text-slate-800 line-clamp-2 mb-1">
                  "{alt.text}"
                </p>
                <p className="text-[11px] text-slate-500">
                  {alt.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
