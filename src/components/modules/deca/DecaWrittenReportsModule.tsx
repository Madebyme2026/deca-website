import React, { useState } from 'react';
import { useSimulationStore } from '../../../store/simulationStore';
import { FileText, Sliders, MessageSquare, CheckSquare, Layers, User, Award } from 'lucide-react';

export const DecaWrittenReportsModule: React.FC = () => {
  const { studentReportText, setStudentReportText, rubricCriteria, updateRubricScore } = useSimulationStore();

  const [activeView, setActiveView] = useState<'REPORT' | 'SLIDES' | 'QA' | 'RUBRIC'>('REPORT');
  const [reportPages, setReportPages] = useState<5 | 11 | 30>(11);
  const [roleView, setRoleView] = useState<'STUDENT' | 'JUDGE'>('STUDENT');

  // Q&A Defense state
  const [qaIndex, setQaIndex] = useState(0);
  const [qaAnswer, setQaAnswer] = useState('');
  const [qaLog, setQaLog] = useState<{ q: string; a: string }[]>([]);

  const questions = [
    'How does your proposed WACC discount rate of 8.5% adjust if central banks hike interest rates by an additional 150 basis points?',
    'What specific covenant provisions in your commercial mortgage prevent debt acceleration during a floating-rate liquidity crunch?',
    'Explain how double-entry ledger audits prevent fraudulent equity misstatements on the Balance Sheet.',
  ];

  const handleAnswerQA = () => {
    if (!qaAnswer.trim()) return;
    setQaLog([...qaLog, { q: questions[qaIndex], a: qaAnswer }]);
    setQaAnswer('');
    if (qaIndex < questions.length - 1) {
      setQaIndex(qaIndex + 1);
    }
  };

  const totalPointsEarned = rubricCriteria.reduce((sum, c) => sum + c.earnedPoints, 0);

  return (
    <div className="flex flex-col gap-4 text-[#fafafa] font-mono">
      {/* Banner */}
      <div className="bg-[#18181b] border border-[#27272a] p-4 flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#eab308]/10 text-[#eab308] border border-[#eab308]/30">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white uppercase tracking-wider">
              Written Project, Slides & Q&A Defense Engine
            </h1>
            <p className="text-xs text-[#71717a]">
              Official 5/11/30 Page Business Plan Formatter, Presentation Slide Deck Configurator, & Rubric Scoring
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveView('REPORT')}
            className={`px-3 py-1.5 text-xs font-bold uppercase border cursor-pointer ${
              activeView === 'REPORT' ? 'bg-[#eab308] text-[#09090b] border-[#eab308]' : 'bg-[#09090b] text-[#71717a] border-[#27272a]'
            }`}
          >
            Report Portal ({reportPages}p)
          </button>
          <button
            onClick={() => setActiveView('SLIDES')}
            className={`px-3 py-1.5 text-xs font-bold uppercase border cursor-pointer ${
              activeView === 'SLIDES' ? 'bg-[#eab308] text-[#09090b] border-[#eab308]' : 'bg-[#09090b] text-[#71717a] border-[#27272a]'
            }`}
          >
            Visual Slide Deck
          </button>
          <button
            onClick={() => setActiveView('QA')}
            className={`px-3 py-1.5 text-xs font-bold uppercase border cursor-pointer ${
              activeView === 'QA' ? 'bg-[#eab308] text-[#09090b] border-[#eab308]' : 'bg-[#09090b] text-[#71717a] border-[#27272a]'
            }`}
          >
            Q&A Defense Engine
          </button>
          <button
            onClick={() => setActiveView('RUBRIC')}
            className={`px-3 py-1.5 text-xs font-bold uppercase border cursor-pointer ${
              activeView === 'RUBRIC' ? 'bg-[#eab308] text-[#09090b] border-[#eab308]' : 'bg-[#09090b] text-[#71717a] border-[#27272a]'
            }`}
          >
            Rubric Dashboard
          </button>
        </div>
      </div>

      {/* VIEW 1: Written Report Portal */}
      {activeView === 'REPORT' && (
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-3 bg-[#18181b] border border-[#27272a] p-4">
            <h2 className="text-xs font-bold text-[#71717a] uppercase tracking-wider mb-3 border-b border-[#27272a] pb-2">
              DECA Framework Format
            </h2>

            <div className="space-y-2 mb-4">
              <label className="text-[10px] text-[#71717a] uppercase block">Select Document Standard</label>
              <div className="flex flex-col gap-1">
                {[5, 11, 30].map((pg) => (
                  <button
                    key={pg}
                    onClick={() => setReportPages(pg as 5 | 11 | 30)}
                    className={`text-left p-2 text-xs border cursor-pointer ${
                      reportPages === pg ? 'bg-[#eab308] text-[#09090b] font-bold border-[#eab308]' : 'bg-[#09090b] text-[#71717a] border-[#27272a]'
                    }`}
                  >
                    {pg}-Page Strategic Business Plan
                  </button>
                ))}
              </div>
            </div>

            <div className="text-[10px] text-[#71717a] bg-[#09090b] p-3 border border-[#27272a]">
              Guidelines: Formatted with Executive Summary, Financial Statements, Swot, and Double-Entry Audit Logs.
            </div>
          </div>

          <div className="col-span-12 lg:col-span-9 bg-[#18181b] border border-[#27272a] p-5">
            <h2 className="text-xs font-bold text-[#eab308] uppercase tracking-wider mb-3 border-b border-[#27272a] pb-2">
              Strategic Business Plan Draft Canvas ({reportPages} Pages)
            </h2>

            <textarea
              rows={18}
              value={studentReportText}
              onChange={(e) => setStudentReportText(e.target.value)}
              className="w-full bg-[#09090b] border border-[#27272a] p-4 text-xs text-[#d4d4d8] focus:border-[#eab308] outline-none font-mono leading-relaxed resize-y"
            />
          </div>
        </div>
      )}

      {/* VIEW 2: Visual Slide Deck Designer */}
      {activeView === 'SLIDES' && (
        <div className="bg-[#18181b] border border-[#27272a] p-5">
          <h2 className="text-xs font-bold text-[#eab308] uppercase tracking-wider mb-4 border-b border-[#27272a] pb-2">
            Presentation Visual Aid Slide Deck Configurator
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#09090b] border border-[#eab308] p-4 flex flex-col justify-between h-48">
              <span className="text-[10px] text-[#eab308] uppercase font-bold">SLIDE 01 · TITLE</span>
              <div className="text-sm font-bold text-white uppercase">DECA Capital Allocation & Debt Restructuring</div>
              <span className="text-[10px] text-[#71717a]">Visual Props: Executive Summary Card</span>
            </div>

            <div className="bg-[#09090b] border border-[#27272a] p-4 flex flex-col justify-between h-48">
              <span className="text-[10px] text-[#71717a] uppercase font-bold">SLIDE 02 · REAL ESTATE</span>
              <div className="text-sm font-bold text-white uppercase">Midtown Commerce Plaza NOI & DSCR Metrics</div>
              <span className="text-[10px] text-[#71717a]">Visual Props: Cap Rate Waterfall Graph</span>
            </div>

            <div className="bg-[#09090b] border border-[#27272a] p-4 flex flex-col justify-between h-48">
              <span className="text-[10px] text-[#71717a] uppercase font-bold">SLIDE 03 · DCF VALUATION</span>
              <div className="text-sm font-bold text-white uppercase">Discounted Cash Flow Intrinsic Sensitivity</div>
              <span className="text-[10px] text-[#71717a]">Visual Props: WACC Sensitivity Matrix</span>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: Q&A Defense Engine */}
      {activeView === 'QA' && (
        <div className="bg-[#18181b] border border-[#27272a] p-5 space-y-4">
          <h2 className="text-xs font-bold text-[#eab308] uppercase tracking-wider border-b border-[#27272a] pb-2">
            Q&A Defense Engine: Follow-up Questions from Expert Judges
          </h2>

          <div className="bg-[#09090b] border border-[#eab308] p-4">
            <div className="text-[10px] text-[#eab308] uppercase font-bold mb-1">Judge Question #{qaIndex + 1}:</div>
            <div className="text-sm font-bold text-white">{questions[qaIndex]}</div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] text-[#71717a] uppercase block">Your Defensive Response</label>
            <textarea
              rows={4}
              value={qaAnswer}
              onChange={(e) => setQaAnswer(e.target.value)}
              placeholder="Formulate your response utilizing precise financial metrics..."
              className="w-full bg-[#09090b] border border-[#27272a] p-3 text-xs text-white focus:border-[#eab308] outline-none font-mono"
            />
            <button
              onClick={handleAnswerQA}
              className="bg-[#eab308] hover:bg-[#ca8a04] text-[#09090b] font-bold px-4 py-2 text-xs uppercase cursor-pointer"
            >
              Submit Answer to Judge
            </button>
          </div>

          {qaLog.length > 0 && (
            <div className="space-y-2 pt-4 border-t border-[#27272a]">
              <div className="text-xs font-bold text-white uppercase">Recorded Q&A Transcript</div>
              {qaLog.map((item, i) => (
                <div key={i} className="bg-[#09090b] border border-[#27272a] p-3 text-xs">
                  <div className="text-[#eab308] font-bold mb-1">Q: {item.q}</div>
                  <div className="text-[#d4d4d8]">A: {item.a}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* VIEW 4: DECA Rubric Dashboard (Dual View) */}
      {activeView === 'RUBRIC' && (
        <div className="bg-[#18181b] border border-[#27272a] p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-[#27272a] pb-3">
            <div>
              <h2 className="text-xs font-bold text-[#eab308] uppercase tracking-wider">
                Official DECA Performance Indicator Assessment Rubric
              </h2>
              <span className="text-[10px] text-[#71717a]">TOTAL SCORE: {totalPointsEarned} / 100 PTS</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setRoleView('STUDENT')}
                className={`px-3 py-1 text-xs cursor-pointer ${
                  roleView === 'STUDENT' ? 'bg-[#eab308] text-[#09090b] font-bold' : 'bg-[#09090b] text-[#71717a]'
                }`}
              >
                Student View
              </button>
              <button
                onClick={() => setRoleView('JUDGE')}
                className={`px-3 py-1 text-xs cursor-pointer ${
                  roleView === 'JUDGE' ? 'bg-[#eab308] text-[#09090b] font-bold' : 'bg-[#09090b] text-[#71717a]'
                }`}
              >
                Teacher/Judge View
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {rubricCriteria.map((c) => (
              <div key={c.id} className="bg-[#09090b] border border-[#27272a] p-4 flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="text-xs font-bold text-white">{c.indicator}</div>
                  <div className="text-[10px] text-[#71717a] mt-1">{c.feedback}</div>
                </div>

                <div className="flex items-center gap-3">
                  {roleView === 'JUDGE' ? (
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-[#71717a]">Score:</span>
                      <input
                        type="number"
                        min="0"
                        max={c.maxPoints}
                        value={c.earnedPoints}
                        onChange={(e) => updateRubricScore(c.id, Number(e.target.value))}
                        className="w-16 bg-[#18181b] border border-[#27272a] p-1 text-xs font-bold text-white text-center font-mono"
                      />
                      <span className="text-xs text-[#71717a]">/ {c.maxPoints}</span>
                    </div>
                  ) : (
                    <div className="text-right">
                      <span className="text-sm font-bold text-[#10b981]">{c.earnedPoints}</span>
                      <span className="text-xs text-[#71717a]"> / {c.maxPoints} PTS</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
