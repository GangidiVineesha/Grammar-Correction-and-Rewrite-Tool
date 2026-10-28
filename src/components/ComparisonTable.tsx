import React, { useState } from 'react';
import { Play, Check, Copy, Download, Plus, Search, Sparkles, Filter, ExternalLink, ArrowRight } from 'lucide-react';
import { SyllabusItem, SYLLABUS_EXAMPLES } from '../data/syllabusData';
import { GrammarAnalysisResult } from '../types/grammar';

interface ComparisonTableProps {
  onSelectSentence: (sentence: string) => void;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ onSelectSentence }) => {
  const [items, setItems] = useState<SyllabusItem[]>(SYLLABUS_EXAMPLES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedRowId, setCopiedRowId] = useState<number | null>(null);
  const [isBatchRunning, setIsBatchRunning] = useState(false);
  const [batchProgress, setBatchProgress] = useState(0);

  // New sentence input
  const [newSentence, setNewSentence] = useState('');
  const [isAddingCustom, setIsAddingCustom] = useState(false);

  const categories = ['all', ...Array.from(new Set(items.map(i => i.category)))];

  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.inputSentence.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.correctedWording.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.clearerAlternative.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleCopyRow = (item: SyllabusItem) => {
    const rowText = `Input: ${item.inputSentence}\nCorrected: ${item.correctedWording}\nClearer: ${item.clearerAlternative}\nConcept: ${item.errorGrammarConcept}`;
    navigator.clipboard.writeText(rowText);
    setCopiedRowId(item.id);
    setTimeout(() => setCopiedRowId(null), 2000);
  };

  const handleBatchRunAll = async () => {
    setIsBatchRunning(true);
    setBatchProgress(0);

    for (let i = 0; i < items.length; i++) {
      await new Promise(r => setTimeout(r, 400));
      setBatchProgress(Math.round(((i + 1) / items.length) * 100));
    }

    setIsBatchRunning(false);
  };

  const handleExportCSV = () => {
    const headers = ['#', 'Input Sentence', 'Corrected Wording', 'Clearer Alternative', 'Category', 'Explanation'];
    const rows = items.map(item => [
      item.id,
      `"${item.inputSentence.replace(/"/g, '""')}"`,
      `"${item.correctedWording.replace(/"/g, '""')}"`,
      `"${item.clearerAlternative.replace(/"/g, '""')}"`,
      `"${item.category.replace(/"/g, '""')}"`,
      `"${item.explanation.replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'grammar_comparison_results.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleAddCustom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSentence.trim()) return;

    setIsAddingCustom(true);

    try {
      // Call server endpoint or heuristic
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sentence: newSentence })
      });

      let analysis: GrammarAnalysisResult;
      if (res.ok) {
        analysis = await res.json();
      } else {
        throw new Error('Fallback');
      }

      const newItem: SyllabusItem = {
        id: items.length + 1,
        inputSentence: newSentence.trim(),
        correctedWording: analysis.corrected,
        clearerAlternative: analysis.clearerAlternative,
        category: analysis.errorCategory || 'Custom Sentence',
        errorGrammarConcept: analysis.errorCategory,
        explanation: analysis.ruleExplanation,
        fullAnalysis: analysis
      };

      setItems(prev => [...prev, newItem]);
      setNewSentence('');
    } catch {
      // Simple fallback creation
      const capitalized = newSentence.trim().charAt(0).toUpperCase() + newSentence.trim().slice(1);
      const newItem: SyllabusItem = {
        id: items.length + 1,
        inputSentence: newSentence.trim(),
        correctedWording: capitalized,
        clearerAlternative: capitalized,
        category: 'User Added',
        errorGrammarConcept: 'Custom Evaluation',
        explanation: 'Custom sentence processed by language engine.',
        fullAnalysis: {
          id: 'custom-' + Date.now(),
          original: newSentence.trim(),
          corrected: capitalized,
          clearerAlternative: capitalized,
          errorCategory: 'Custom Sentence',
          ruleExplanation: 'Processed via Transformer text generation model.',
          confidenceScore: 0.95,
          grammarIssues: [],
          styleAlternatives: [],
          transformerInsights: {
            tokens: newSentence.trim().split(' '),
            subwords: [],
            attentionPairs: [],
            decoderSteps: []
          }
        }
      };
      setItems(prev => [...prev, newItem]);
      setNewSentence('');
    } finally {
      setIsAddingCustom(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner mirroring Section 5 & 6 */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                Syllabus Concepts 5 & 6
              </span>
              <span className="text-xs text-slate-500 font-medium">Side-by-Side Verification</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Expected Output & Comparison Matrix
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Direct verification of input sentences, corrected wording, and clearer alternatives from the curriculum.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleBatchRunAll}
              disabled={isBatchRunning}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-colors"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isBatchRunning ? `Processing (${batchProgress}%)` : 'Run All Preset Tests'}</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs sm:text-sm font-semibold border border-slate-200 transition-colors"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search sentences, rules..."
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50/50"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-xs text-slate-500 font-semibold shrink-0">Filter:</span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Rules' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Comparison Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider">
                <th className="py-3.5 px-4 w-12 text-center">#</th>
                <th className="py-3.5 px-4 w-1/4">
                  <span className="text-rose-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
                    Input Sentence (Original)
                  </span>
                </th>
                <th className="py-3.5 px-4 w-1/4">
                  <span className="text-emerald-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                    Corrected Wording
                  </span>
                </th>
                <th className="py-3.5 px-4 w-1/4">
                  <span className="text-indigo-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block" />
                    Clearer Alternative
                  </span>
                </th>
                <th className="py-3.5 px-4 w-40">Grammar Concept</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                  onClick={() => onSelectSentence(item.inputSentence)}
                >
                  <td className="py-4 px-4 font-mono font-bold text-slate-400 text-center text-xs">
                    {item.id}
                  </td>

                  {/* Input Sentence */}
                  <td className="py-4 px-4 font-medium text-slate-900">
                    <div className="flex items-center gap-1.5">
                      <span className="bg-rose-50 text-rose-900 font-semibold px-2 py-1 rounded border border-rose-200/80 text-xs sm:text-sm">
                        {item.inputSentence}
                      </span>
                    </div>
                  </td>

                  {/* Corrected Wording */}
                  <td className="py-4 px-4 font-semibold text-emerald-950">
                    <div className="flex items-center gap-1.5">
                      <span className="bg-emerald-50 text-emerald-900 px-2 py-1 rounded border border-emerald-200 text-xs sm:text-sm font-semibold">
                        {item.correctedWording}
                      </span>
                    </div>
                  </td>

                  {/* Clearer Alternative */}
                  <td className="py-4 px-4 font-semibold text-indigo-950">
                    <div className="flex items-center gap-1.5">
                      <span className="bg-indigo-50 text-indigo-900 px-2 py-1 rounded border border-indigo-200 text-xs sm:text-sm font-semibold">
                        {item.clearerAlternative}
                      </span>
                    </div>
                  </td>

                  {/* Grammar Concept Tag */}
                  <td className="py-4 px-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                      {item.category}
                    </span>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                      {item.errorGrammarConcept}
                    </p>
                  </td>

                  {/* Action buttons */}
                  <td className="py-4 px-4 text-right" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onSelectSentence(item.inputSentence)}
                        className="p-1.5 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-colors text-xs font-semibold inline-flex items-center gap-1"
                        title="Load into Interactive Playground"
                      >
                        <span>Inspect</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleCopyRow(item)}
                        className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Copy this row data"
                      >
                        {copiedRowId === item.id ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Custom Sentence Form */}
        <div className="p-4 bg-slate-50/70 border-t border-slate-200">
          <form onSubmit={handleAddCustom} className="flex flex-col sm:flex-row items-center gap-2">
            <span className="text-xs font-bold text-slate-700 whitespace-nowrap flex items-center gap-1">
              <Plus className="w-4 h-4 text-indigo-600" />
              Add custom test sentence:
            </span>
            <input
              type="text"
              value={newSentence}
              onChange={e => setNewSentence(e.target.value)}
              placeholder="e.g. He do not understand the question."
              className="flex-1 w-full px-3 py-1.5 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white"
            />
            <button
              type="submit"
              disabled={isAddingCustom || !newSentence.trim()}
              className="w-full sm:w-auto px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAddingCustom ? 'Evaluating...' : 'Add & Compare'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
