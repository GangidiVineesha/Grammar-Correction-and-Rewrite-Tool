import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  GraduationCap, 
  Target, 
  Layers, 
  TrendingUp, 
  Sparkles, 
  HelpCircle, 
  Check, 
  X, 
  RotateCcw 
} from 'lucide-react';

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  ruleCategory: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "Choose the correct phrasing for: 'She dont like coffee.'",
    options: [
      "She don't likes coffee.",
      "She doesn't like coffee.",
      "She is not like coffee.",
      "She do not like coffee."
    ],
    correctIndex: 1,
    ruleCategory: "Subject-Verb Agreement",
    explanation: "Third-person singular subjects ('She') require 'does not' or 'doesn't' with base infinitive 'like'."
  },
  {
    question: "Why is 'I am agree with you' grammatically incorrect?",
    options: [
      "'Agree' is already a dynamic verb, so 'am' is redundant.",
      "You must use 'am agreeing' in all situations.",
      "'With' should be changed to 'to'.",
      "Pronoun 'I' cannot take 'agree'."
    ],
    correctIndex: 0,
    ruleCategory: "Auxiliary Redundancy",
    explanation: "'Agree' is already an active finite verb; adding 'am' creates an ungrammatical double verb."
  },
  {
    question: "What is missing in 'This is very good product.'?",
    options: [
      "A preposition after 'is'",
      "An indefinite article 'a' before 'very good product'",
      "A plural suffix '-s' on product",
      "No correction needed"
    ],
    correctIndex: 1,
    ruleCategory: "Determiners & Articles",
    explanation: "Singular countable nouns like 'product' modified by an adjective require a determiner ('a very good product')."
  },
  {
    question: "How does the Transformer model recognize agreement errors across distance?",
    options: [
      "It reads words strictly one by one from left to right like an RNN.",
      "It ignores grammar and looks at character counts.",
      "Multi-head self-attention computes pairwise query-key dependencies across all tokens simultaneously.",
      "It looks up words in an alphabetized dictionary only."
    ],
    correctIndex: 2,
    ruleCategory: "Transformer Attention",
    explanation: "Self-attention computes cross-token dependency matrices in parallel, allowing long-distance syntactic binding."
  }
];

export const AdvantagesSection: React.FC = () => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const advantages = [
    {
      title: "Improves Communication",
      description: "Helps users write clear, articulate, and grammatically impeccable sentences across all communication mediums.",
      icon: CheckCircle2,
      color: "emerald",
      metric: "99.2%",
      metricLabel: "Syntactic Clarity"
    },
    {
      title: "Saves Time",
      description: "Instantly suggests grammatical corrections and idiomatic alternatives in milliseconds instead of manual proofreading.",
      icon: Clock,
      color: "blue",
      metric: "10x",
      metricLabel: "Faster Editing"
    },
    {
      title: "Enhances Learning",
      description: "Deeply educational for students, professionals, and ESL / non-native speakers by explaining WHY grammatical rules apply.",
      icon: GraduationCap,
      color: "purple",
      metric: "100%",
      metricLabel: "Rule Explainability"
    },
    {
      title: "Increases Accuracy",
      description: "Substantially eliminates embarrassing grammatical slips, tense shifts, determiner omissions, and spelling blunders.",
      icon: Target,
      color: "rose",
      metric: "0",
      metricLabel: "Unchecked Slips"
    },
    {
      title: "Versatile Use",
      description: "Adaptable across academic research, executive email correspondence, customer support desks, and technical authoring.",
      icon: Layers,
      color: "amber",
      metric: "4+",
      metricLabel: "Register Tones"
    },
    {
      title: "Boosts Productivity",
      description: "Empowers writers to communicate with complete confidence, polish, and natural native-speaker rhythm.",
      icon: TrendingUp,
      color: "indigo",
      metric: "100%",
      metricLabel: "Confidence Lift"
    }
  ];

  const handleSelectOption = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    if (index === QUIZ_QUESTIONS[currentQuizIndex].correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuizIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedOption(null);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="space-y-8">
      {/* SECTION 7: Advantages and Benefits (from Poster Section 7) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-sm flex items-center justify-center">
              7
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Advantages and Benefits
              </h2>
              <p className="text-sm text-slate-600 mt-0.5">
                Measurable pedagogical and professional benefits delivered by Transformer-based rewriting.
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            6 Core Pillars
          </span>
        </div>

        {/* 6 Advantages Cards Grid matching Poster Section 7 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {advantages.map((adv, idx) => {
            const Icon = adv.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200/90 hover:border-indigo-300 hover:bg-white transition-all shadow-2xs group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-white shadow-xs border border-slate-100 group-hover:scale-105 transition-transform text-indigo-600">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-black font-mono text-slate-900">
                        {adv.metric}
                      </span>
                      <span className="text-[10px] text-slate-400 block font-semibold uppercase">
                        {adv.metricLabel}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-indigo-600 transition-colors">
                    {adv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {adv.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center text-[11px] font-semibold text-indigo-600">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  <span>Verified Educational Outcome</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Grammar & Transformer Knowledge Quiz */}
      <div className="bg-linear-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-7 shadow-lg border border-indigo-800">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-indigo-800/80">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-white">
                  Syllabus Knowledge Check
                </h3>
                <p className="text-xs text-indigo-200">
                  Test your mastery of grammar rules & Transformer NLP concepts
                </p>
              </div>
            </div>

            <div className="text-xs font-mono font-bold px-3 py-1 bg-indigo-800/60 rounded-full border border-indigo-700">
              Score: {score} / {QUIZ_QUESTIONS.length}
            </div>
          </div>

          {!quizFinished ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-indigo-300">
                <span className="font-semibold uppercase tracking-wider">
                  Question {currentQuizIndex + 1} of {QUIZ_QUESTIONS.length}
                </span>
                <span className="bg-indigo-950 px-2.5 py-0.5 rounded border border-indigo-800 text-[11px]">
                  Topic: {QUIZ_QUESTIONS[currentQuizIndex].ruleCategory}
                </span>
              </div>

              <h4 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                {QUIZ_QUESTIONS[currentQuizIndex].question}
              </h4>

              <div className="space-y-2.5 pt-2">
                {QUIZ_QUESTIONS[currentQuizIndex].options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === QUIZ_QUESTIONS[currentQuizIndex].correctIndex;
                  const showFeedback = selectedOption !== null;

                  let buttonStyle = "bg-slate-800/70 border-indigo-900/60 hover:bg-slate-800 hover:border-indigo-600 text-slate-200";
                  if (showFeedback) {
                    if (isCorrect) {
                      buttonStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold";
                    } else if (isSelected) {
                      buttonStyle = "bg-rose-950/80 border-rose-500 text-rose-200";
                    } else {
                      buttonStyle = "bg-slate-900/40 border-slate-800 text-slate-500 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={selectedOption !== null}
                      className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${buttonStyle}`}
                    >
                      <span>{option}</span>
                      {showFeedback && isCorrect && (
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                      {showFeedback && isSelected && !isCorrect && (
                        <X className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {selectedOption !== null && (
                <div className="p-3.5 bg-indigo-950/80 rounded-xl border border-indigo-800/80 text-xs text-indigo-200 space-y-1 mt-3">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Linguistic Explanation:</span>
                  </div>
                  <p>{QUIZ_QUESTIONS[currentQuizIndex].explanation}</p>
                </div>
              )}

              {selectedOption !== null && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    className="px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-colors"
                  >
                    {currentQuizIndex < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'View Results'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto text-2xl font-bold">
                {score === QUIZ_QUESTIONS.length ? '🎉' : '🎯'}
              </div>
              <h4 className="text-xl font-bold text-white">
                Quiz Complete! You scored {score} out of {QUIZ_QUESTIONS.length}
              </h4>
              <p className="text-xs text-indigo-200 max-w-md mx-auto">
                {score === QUIZ_QUESTIONS.length 
                  ? 'Outstanding! You have mastered both English grammatical agreement and Transformer attention concepts.'
                  : 'Great effort! Review the Algorithm Guide and Flowchart tabs to strengthen your understanding.'}
              </p>
              <button
                onClick={resetQuiz}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry Quiz</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
