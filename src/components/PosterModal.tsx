import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, Download, ExternalLink, Sparkles, CheckCircle } from 'lucide-react';

interface PosterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PosterModal: React.FC<PosterModalProps> = ({ isOpen, onClose }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const posterPath = "/assets/aistudio/WhatsApp_Image_2026-10-28_at_11.15.05_AM_10223931.jpeg";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative bg-white rounded-2xl w-full max-w-5xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:px-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-indigo-100 text-indigo-700">
                <Sparkles className="w-4 h-4" />
              </span>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                Reference Infographic Poster
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Grammar Correction and Rewrite Tool • Original Syllabus Blueprint
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoomLevel(prev => Math.max(0.7, prev - 0.2))}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
              title="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-bold text-slate-600 w-12 text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel(prev => Math.min(2.0, prev + 0.2))}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
              title="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <a
              href={posterPath}
              download="grammar_correction_infographic.jpeg"
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 ml-1"
              title="Download original image"
            >
              <Download className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300 ml-2"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body with Scrollable and Zoomable Image */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 bg-slate-900/95 flex items-center justify-center">
          <div
            className="transition-transform duration-200 origin-center"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <img
              src={posterPath}
              alt="Grammar Correction and Rewrite Tool Infographic"
              className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl border border-slate-700"
            />
          </div>
        </div>

        {/* Modal Footer with Section Map */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-bold text-slate-800">Sections Included:</span>
            <span className="bg-white px-2 py-0.5 rounded border border-slate-200 text-[11px]">1. Problem Statement</span>
            <span className="bg-white px-2 py-0.5 rounded border border-slate-200 text-[11px]">2. Flowchart</span>
            <span className="bg-white px-2 py-0.5 rounded border border-slate-200 text-[11px]">3. Architecture</span>
            <span className="bg-white px-2 py-0.5 rounded border border-slate-200 text-[11px]">4. Algorithm</span>
            <span className="bg-white px-2 py-0.5 rounded border border-slate-200 text-[11px]">5. Current Input</span>
            <span className="bg-white px-2 py-0.5 rounded border border-slate-200 text-[11px]">6. Expected Output</span>
            <span className="bg-white px-2 py-0.5 rounded border border-slate-200 text-[11px]">7. Advantages</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-xs transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
