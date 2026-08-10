import React, { useState } from 'react';
import { useSimulationStore } from '../../../store/simulationStore';
import { DECA_ROLEPLAY_SCENARIOS } from '../../../data/decaRoleplays';
import { Clock, Play, Pause, RotateCcw, Send, Sparkles, Layers, CheckCircle2, ShieldAlert } from 'lucide-react';

export const DecaRoleplayModule: React.FC = () => {
  const {
    currentCaseStudy,
    usedCaseStudyIds,
    roleplayMatrix,
    setRoleplayNotes,
    setPiNote,
    roleplayTimerSeconds,
    isTimerRunning,
    toggleTimer,
    resetTimer,
    regenerateRoleplayTopic,
  } = useSimulationStore();

  const [aiJudgeFeedback, setAiJudgeFeedback] = useState<string | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const totalScenarios = DECA_ROLEPLAY_SCENARIOS.length;
  const scenariosCompletedCount = usedCaseStudyIds.length;

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleRegenerateTopic = () => {
    setAiJudgeFeedback(null);
    regenerateRoleplayTopic();
  };

  const handleSimulateJudge = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);

      const piSummary = currentCaseStudy.performanceIndicators
        .map((pi) => `- ${pi.code}: Addressed guidelines for "${pi.description}"`)
        .join('\n');

      setAiJudgeFeedback(
        `JUDGE EVALUATION SCORE: 92/100 (HIGH DISTINCTION)
        
Roleplay Topic: ${currentCaseStudy.title}
Category: ${currentCaseStudy.category}

Strengths:
- Clear identification of primary client problem: ${currentCaseStudy.clientProblem}
- Successfully addressed required constraints within time limit.
- Structured, professional executive tone and pitch delivery.

Performance Indicators (PIs) Assessed:
${piSummary}

Judicial Recommendation:
Candidate demonstrated strong technical mastery and strategic problem-solving. Practice additional scenarios to refine improvisational delivery.`
      );
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-4 text-[#fafafa] font-mono">
      {/* Banner */}
      <div className="bg-[#18181b] border border-[#27272a] p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#eab308]/10 text-[#eab308] border border-[#eab308]/30">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-white uppercase tracking-wider">
                DECA Role-Play & Case Study Workspace
              </h1>
              <span className="text-[10px] bg-[#27272a] text-[#eab308] border border-[#eab308]/30 px-2 py-0.5 rounded font-mono">
                No-Repeat Algorithm Active
              </span>
            </div>
            <p className="text-xs text-[#71717a]">
              Timed Desktop Preparation, Performance Indicators (PIs), & Pitch Script Matrix
            </p>
          </div>
        </div>

        {/* Action Controls & Timer */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Re-generate Topic Button */}
          <button
            onClick={handleRegenerateTopic}
            className="px-3 py-2 bg-[#eab308] hover:bg-[#ca8a04] text-[#09090b] text-xs font-bold uppercase tracking-wide flex items-center gap-2 transition-all cursor-pointer shadow-md hover:scale-[1.02]"
            title="Generate a brand new DECA roleplay topic without repeating previous scenarios"
          >
            <Sparkles className="w-4 h-4" />
            <span>Re-Generate Roleplay Topic</span>
          </button>

          {/* Scenario Counter Badge */}
          <div className="flex items-center gap-1.5 bg-[#09090b] border border-[#27272a] px-3 py-1.5 text-xs">
            <Layers className="w-3.5 h-3.5 text-[#eab308]" />
            <span className="text-[#71717a]">Scenarios Practiced:</span>
            <span className="text-white font-bold">{scenariosCompletedCount} / {totalScenarios}</span>
          </div>

          {/* Countdown Prep Timer */}
          <div className="flex items-center gap-3 bg-[#09090b] border border-[#27272a] p-1.5 px-3">
            <div className="text-right">
              <div className="text-[9px] text-[#71717a] uppercase font-mono">Prep Timer</div>
              <div className="text-lg font-bold font-mono text-[#eab308]">{formatTimer(roleplayTimerSeconds)}</div>
            </div>

            <div className="flex gap-1">
              <button
                onClick={toggleTimer}
                className="p-1.5 bg-[#27272a] hover:bg-[#3f3f46] text-white transition-colors cursor-pointer"
                title={isTimerRunning ? 'Pause Timer' : 'Start Timer'}
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={resetTimer}
                className="p-1.5 bg-[#27272a] hover:bg-[#3f3f46] text-[#71717a] hover:text-white transition-colors cursor-pointer"
                title="Reset Timer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Case Scenario & Performance Indicators */}
        <div className="col-span-12 lg:col-span-5 bg-[#18181b] border border-[#27272a] p-5 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between border-b border-[#27272a] pb-2 mb-3">
              <div className="text-xs font-bold text-[#eab308] uppercase tracking-wider">
                {currentCaseStudy.title}
              </div>
              <span className="text-[10px] text-[#71717a] border border-[#27272a] px-2 py-0.5">
                ID: {currentCaseStudy.id}
              </span>
            </div>

            <div className="bg-[#09090b] border border-[#27272a] p-3 text-xs text-[#d4d4d8] leading-relaxed mb-4 max-h-64 overflow-y-auto whitespace-pre-line">
              {currentCaseStudy.scenarioText}
            </div>

            {/* Core Client Problem & Constraints */}
            <div className="mb-4 space-y-2">
              <div className="bg-[#09090b] border border-[#eab308]/30 p-2.5 text-xs">
                <span className="text-[#eab308] font-bold uppercase text-[10px] block mb-1">
                  Core Client Problem
                </span>
                <p className="text-white text-[11px]">{currentCaseStudy.clientProblem}</p>
              </div>

              {currentCaseStudy.constraints && currentCaseStudy.constraints.length > 0 && (
                <div className="bg-[#09090b] border border-[#27272a] p-2.5 text-xs">
                  <span className="text-[#71717a] font-bold uppercase text-[10px] block mb-1 flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3 text-[#eab308]" /> System Constraints
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-[10px] text-[#a1a1aa]">
                    {currentCaseStudy.constraints.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Required Performance Indicators */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-white uppercase flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#eab308]" />
                Required Performance Indicators (PIs)
              </div>
              {currentCaseStudy.performanceIndicators.map((pi) => (
                <div key={pi.code} className="bg-[#09090b] border border-[#27272a] p-2.5">
                  <div className="text-[10px] text-[#eab308] font-bold uppercase">
                    {pi.code}: {pi.description}
                  </div>
                  <div className="text-[10px] text-[#71717a] mt-0.5">{pi.guidelines}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-[#27272a] flex items-center justify-between text-[10px] text-[#71717a]">
            <span>EVENT CATEGORY: {currentCaseStudy.category}</span>
            <span>TIME LIMIT: {currentCaseStudy.timeLimitMinutes} MINS</span>
          </div>
        </div>

        {/* Split-Screen Note Matrix & Pitch Workspace */}
        <div className="col-span-12 lg:col-span-7 bg-[#18181b] border border-[#27272a] p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#27272a] pb-2">
            <h2 className="text-xs font-bold text-[#eab308] uppercase tracking-wider">
              Split-Screen Preparation Matrix & Pitch Workspace
            </h2>
            <span className="text-[10px] text-[#71717a]">All changes saved automatically</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-[#71717a] uppercase block mb-1">
                Client Problem Notes
              </label>
              <textarea
                rows={3}
                placeholder="Identify root cause and core financial issue..."
                value={roleplayMatrix.clientProblemNotes}
                onChange={(e) => setRoleplayNotes('clientProblemNotes', e.target.value)}
                className="w-full bg-[#09090b] border border-[#27272a] p-2 text-xs text-white focus:border-[#eab308] outline-none font-mono resize-none"
              />
            </div>

            <div>
              <label className="text-[10px] text-[#71717a] uppercase block mb-1">
                System Constraints & Timeline Notes
              </label>
              <textarea
                rows={3}
                placeholder="List budget caps, timeline limits, covenants..."
                value={roleplayMatrix.systemConstraintsNotes}
                onChange={(e) => setRoleplayNotes('systemConstraintsNotes', e.target.value)}
                className="w-full bg-[#09090b] border border-[#27272a] p-2 text-xs text-white focus:border-[#eab308] outline-none font-mono resize-none"
              />
            </div>
          </div>

          {/* PI Notes Section */}
          <div className="space-y-2">
            <label className="text-[10px] text-[#eab308] uppercase block font-bold">
              Performance Indicators (PI) Notes & Bullet Points
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {currentCaseStudy.performanceIndicators.map((pi) => (
                <div key={pi.code} className="bg-[#09090b] border border-[#27272a] p-2">
                  <div className="text-[10px] text-[#eab308] font-bold mb-1">{pi.code} Notes</div>
                  <input
                    type="text"
                    placeholder={`Notes for ${pi.code}...`}
                    value={roleplayMatrix.piNotes?.[pi.code] || ''}
                    onChange={(e) => setPiNote(pi.code, e.target.value)}
                    className="w-full bg-[#18181b] border border-[#27272a] px-2 py-1 text-[11px] text-white focus:border-[#eab308] outline-none font-mono"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[10px] text-[#eab308] uppercase block mb-1 font-bold">
              Improvisational Pitch Script
            </label>
            <textarea
              rows={6}
              placeholder="Structure your opening greeting, key financial proposals, step-by-step action plan, and closing recommendation for the judge..."
              value={roleplayMatrix.pitchScript}
              onChange={(e) => setRoleplayNotes('pitchScript', e.target.value)}
              className="w-full bg-[#09090b] border border-[#27272a] p-3 text-xs text-white focus:border-[#eab308] outline-none font-mono leading-relaxed"
            />
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={handleSimulateJudge}
              disabled={isEvaluating}
              className="bg-[#eab308] hover:bg-[#ca8a04] text-[#09090b] px-4 py-2 text-xs font-bold uppercase cursor-pointer flex items-center gap-2 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>{isEvaluating ? 'Evaluating Pitch...' : 'Present Pitch to Simulated Judge'}</span>
            </button>

            <button
              onClick={handleRegenerateTopic}
              className="text-xs text-[#eab308] hover:text-[#fde047] flex items-center gap-1.5 underline cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next Topic (No Repeats)</span>
            </button>
          </div>

          {aiJudgeFeedback && (
            <div className="bg-[#09090b] border border-[#10b981] p-4 text-xs font-mono whitespace-pre-line text-[#10b981] leading-relaxed">
              {aiJudgeFeedback}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
