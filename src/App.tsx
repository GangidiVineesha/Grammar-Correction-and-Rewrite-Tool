import React, { useState } from 'react';
import { Header, TabType } from './components/Header';
import { Playground } from './components/Playground';
import { ComparisonTable } from './components/ComparisonTable';
import { ArchitectureFlowchart } from './components/ArchitectureFlowchart';
import { AlgorithmGuide } from './components/AlgorithmGuide';
import { AdvantagesSection } from './components/AdvantagesSection';
import { PosterModal } from './components/PosterModal';
import { Sparkles, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('playground');
  const [selectedSentence, setSelectedSentence] = useState<string>('She dont like coffee.');
  const [isPosterOpen, setIsPosterOpen] = useState<boolean>(false);

  const handleSelectSentence = (sentence: string) => {
    setSelectedSentence(sentence);
    setActiveTab('playground');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Header Navigation */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenPosterModal={() => setIsPosterOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'playground' && (
          <Playground initialSentence={selectedSentence} />
        )}

        {activeTab === 'comparison' && (
          <ComparisonTable onSelectSentence={handleSelectSentence} />
        )}

        {activeTab === 'architecture' && (
          <ArchitectureFlowchart />
        )}

        {activeTab === 'algorithm' && (
          <AlgorithmGuide />
        )}

        {activeTab === 'benefits' && (
          <AdvantagesSection />
        )}
      </main>

      {/* Reference Infographic Lightbox Modal */}
      <PosterModal
        isOpen={isPosterOpen}
        onClose={() => setIsPosterOpen(false)}
      />

      {/* Footer with Syllabus and Concept Citation */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-800 text-sm">
              Grammar Correction and Rewrite Tool
            </span>
            <span>•</span>
            <span>Advanced Transformer Techniques & Text Generation</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPosterOpen(true)}
              className="text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              View Blueprint Infographic
            </button>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-700 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Syllabus Aligned
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
