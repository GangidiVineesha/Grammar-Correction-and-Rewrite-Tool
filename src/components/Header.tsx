import React from 'react';
import { Sparkles, CheckCircle2, BookOpen, GitGraph, FileText, Layers, Award, Image as ImageIcon } from 'lucide-react';

export type TabType = 'playground' | 'comparison' | 'architecture' | 'algorithm' | 'benefits';

interface HeaderProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenPosterModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onSelectTab, onOpenPosterModal }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-indigo-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Branding Banner replicating the poster aesthetic */}
        <div className="py-3.5 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            {/* Logo Badge inspired by the Aa pen icon in the image */}
            <div className="relative group flex items-center justify-center w-12 h-12 rounded-2xl bg-linear-to-tr from-indigo-600 via-indigo-500 to-blue-500 text-white shadow-md shadow-indigo-200">
              <span className="font-extrabold text-xl tracking-tight">Aa</span>
              <span className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-900 rounded-full p-0.5 shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  Grammar Correction and Rewrite Tool
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Transformer Powered
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-indigo-600 tracking-wide mt-0.5 flex items-center gap-2">
                <span>Correct</span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span>Rewrite</span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span className="text-slate-600 font-medium">Communicate Better</span>
              </p>
            </div>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenPosterModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
              title="View the original reference infographic poster"
            >
              <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />
              <span>Reference Infographic</span>
            </button>
            <div className="hidden lg:flex items-center text-xs font-medium px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
              <span>Syllabus: Advanced Transformers</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none text-sm">
          <button
            onClick={() => onSelectTab('playground')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg font-semibold text-xs sm:text-sm whitespace-nowrap transition-all ${
              activeTab === 'playground'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Interactive Tool</span>
          </button>

          <button
            onClick={() => onSelectTab('comparison')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg font-semibold text-xs sm:text-sm whitespace-nowrap transition-all ${
              activeTab === 'comparison'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Side-by-Side Benchmark</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
              activeTab === 'comparison' ? 'bg-indigo-700 text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              5 Preset
            </span>
          </button>

          <button
            onClick={() => onSelectTab('architecture')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg font-semibold text-xs sm:text-sm whitespace-nowrap transition-all ${
              activeTab === 'architecture'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <GitGraph className="w-4 h-4" />
            <span>Flowchart & Architecture</span>
          </button>

          <button
            onClick={() => onSelectTab('algorithm')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg font-semibold text-xs sm:text-sm whitespace-nowrap transition-all ${
              activeTab === 'algorithm'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Algorithm & Syllabus</span>
          </button>

          <button
            onClick={() => onSelectTab('benefits')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg font-semibold text-xs sm:text-sm whitespace-nowrap transition-all ${
              activeTab === 'benefits'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Advantages & Benefits</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
