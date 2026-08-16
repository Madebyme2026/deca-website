import React, { useState } from 'react';
import { useSimulationStore } from '../../../store/simulationStore';
import {
  Target,
  Award,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  BarChart3,
  Users,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  FileCheck,
  BookOpen,
} from 'lucide-react';

export const DecaRubricsModule: React.FC = () => {
  const { rubricCriteria, setActiveTab } = useSimulationStore();
  const [selectedTab, setSelectedTab] = useState<'rubric' | 'frameworks' | 'judge_tips'>('rubric');

  const performanceIndicatorList = [
    {
      code: 'CR:009',
      name: 'Adversarial Customer De-escalation',
      category: 'Customer Relations / Hospitality',
      tiers: [
        { label: 'Exceeds (24-25 pts)', text: 'Immediately isolates hostility to private VIP area, validates guest urgency without defensiveness, and resolves within policy comp limits.' },
        { label: 'Meets (18-23 pts)', text: 'Politely listens to complaint, acknowledges delay, and offers standard coupon or refund.' },
        { label: 'Below (0-17 pts)', text: 'Argues with guest in lobby, blames coworkers, or promises unapproved financial compensations.' },
      ],
    },
    {
      code: 'EI:015',
      name: 'Emotional Intelligence & Professional Demeanor',
      category: 'Human Resources / Interpersonal',
      tiers: [
        { label: 'Exceeds (24-25 pts)', text: 'Maintains composure under hostile confrontation, exhibits active listening, and uses neutral non-defensive body language.' },
        { label: 'Meets (18-23 pts)', text: 'Remains calm but displays nervous tension or provides mechanical scripted responses.' },
        { label: 'Below (0-17 pts)', text: 'Interrupts customer, displays irritation, or becomes visibly defensive.' },
      ],
    },
    {
      code: 'HT:008',
      name: 'Hospitality Service Recovery Execution',
      category: 'Hotel & Lodging Operations',
      tiers: [
        { label: 'Exceeds (24-25 pts)', text: 'Applies L.A.S.T. / H.E.A.T. frameworks, coordinates cross-departmental fix (Housekeeping, Valet, Front Desk), and follows up in person.' },
        { label: 'Meets (18-23 pts)', text: 'Applies basic discount or room upgrade without cross-departmental operational fix.' },
        { label: 'Below (0-17 pts)', text: 'Fails to address root cause; leaves customer feeling unheard.' },
      ],
    },
    {
      code: 'FI:064',
      name: 'Cash Flow vs. Net Profit Analysis',
      category: 'Business Finance / Accounting',
      tiers: [
        { label: 'Exceeds (24-25 pts)', text: 'Accurately articulates working capital constraints, cash burn rates, inventory carrying costs, and Net 30/60 trade terms.' },
        { label: 'Meets (18-23 pts)', text: 'States that revenue is not equal to cash on hand with general terminology.' },
        { label: 'Below (0-17 pts)', text: 'Confuses revenue with cash flow or miscalculates gross profit margins.' },
      ],
    },
  ];

  const totalPoints = rubricCriteria.reduce((sum, c) => sum + c.earnedPoints, 0);

  return (
    <div className="flex flex-col flex-1 gap-5 w-full animate-fadeIn">
      {/* Header */}
      <div className="bg-[#121318] border border-[#27272a] p-4 sm:p-5 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#10b981]/10 text-[#10b981] rounded-xl border border-[#10b981]/20">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-[#10b981]/20 text-[#10b981] font-mono px-2 py-0.5 rounded font-bold uppercase">
                DECA GRADING ENGINE
              </span>
              <span className="text-xs text-[#71717a] font-mono">100-Point Standard Scale</span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-white tracking-tight mt-0.5">
              Performance Indicators (PIs) & Rubric Master
            </h1>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center bg-[#18181b] border border-[#27272a] p-1 rounded-lg">
          <button
            onClick={() => setSelectedTab('rubric')}
            className={`px-3 py-1.5 rounded text-xs font-mono transition-colors cursor-pointer ${
              selectedTab === 'rubric'
                ? 'bg-[#10b981] text-[#09090b] font-bold'
                : 'text-[#a1a1aa] hover:text-white'
            }`}
          >
            Live Rubric Score
          </button>
          <button
            onClick={() => setSelectedTab('frameworks')}
            className={`px-3 py-1.5 rounded text-xs font-mono transition-colors cursor-pointer ${
              selectedTab === 'frameworks'
                ? 'bg-[#10b981] text-[#09090b] font-bold'
                : 'text-[#a1a1aa] hover:text-white'
            }`}
          >
            PI Mastery Matrix
          </button>
          <button
            onClick={() => setSelectedTab('judge_tips')}
            className={`px-3 py-1.5 rounded text-xs font-mono transition-colors cursor-pointer ${
              selectedTab === 'judge_tips'
                ? 'bg-[#10b981] text-[#09090b] font-bold'
                : 'text-[#a1a1aa] hover:text-white'
            }`}
          >
            Judge Tips & Traps
          </button>
        </div>
      </div>

      {/* Tab Content 1: Live Rubric Score */}
      {selectedTab === 'rubric' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left: Rubric Criteria List (col-span-8) */}
          <div className="lg:col-span-8 space-y-3">
            <div className="bg-[#18181b] border border-[#27272a] p-4 rounded-xl">
              <h2 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-3">
                Evaluated Performance Indicators
              </h2>

              <div className="space-y-3">
                {rubricCriteria.map((c) => (
                  <div
                    key={c.id}
                    className="bg-[#09090b] border border-[#27272a] p-3.5 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span>{c.indicator}</span>
                        <span className="text-[10px] bg-[#10b981]/15 text-[#10b981] px-1.5 py-0.2 rounded font-mono font-bold">
                          {c.earnedPoints} / {c.maxPoints} pts
                        </span>
                      </div>
                      <p className="text-[11px] text-[#a1a1aa] leading-relaxed">{c.feedback}</p>
                    </div>

                    <div className="shrink-0 text-right">
                      <span className="text-base font-black font-mono text-[#10b981]">
                        {c.earnedPoints}
                      </span>
                      <span className="text-xs font-mono text-[#71717a]"> / 25</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Score Card & Next Steps (col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-[#18181b] border border-[#27272a] p-5 rounded-xl text-center flex flex-col items-center">
              <span className="text-[10px] uppercase font-mono text-[#71717a] tracking-wider mb-1">
                Overall Roleplay Score
              </span>
              <div className="text-4xl font-black font-mono text-[#10b981] tracking-tight">
                {totalPoints} <span className="text-lg text-[#71717a] font-normal">/ 100</span>
              </div>
              <span className="text-xs font-mono text-[#eab308] font-bold mt-1 bg-[#eab308]/10 px-2.5 py-0.5 rounded">
                🏆 State / ICDC Qualifier Benchmark (90+)
              </span>

              <div className="w-full bg-[#09090b] border border-[#27272a] p-3 rounded-lg mt-4 text-left space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#a1a1aa]">Executive Presence</span>
                  <span className="text-[#10b981] font-bold">Exceeds (25/25)</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#a1a1aa]">PI Application</span>
                  <span className="text-[#10b981] font-bold">Exceeds (48/50)</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#a1a1aa]">Solution Feasibility</span>
                  <span className="text-[#10b981] font-bold">Exceeds (23/25)</span>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('deca_roleplay')}
                className="w-full mt-4 bg-[#eab308] hover:bg-[#ca8a04] text-[#09090b] py-2 rounded-lg text-xs font-bold font-mono uppercase tracking-wider transition-colors cursor-pointer"
              >
                Practice Another Roleplay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 2: PI Mastery Matrix */}
      {selectedTab === 'frameworks' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {performanceIndicatorList.map((pi) => (
              <div key={pi.code} className="bg-[#18181b] border border-[#27272a] p-4 rounded-xl space-y-3">
                <div className="flex items-center justify-between border-b border-[#27272a] pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#eab308] bg-[#eab308]/15 px-2 py-0.5 rounded">
                      {pi.code}
                    </span>
                    <span className="text-xs font-bold text-white">{pi.name}</span>
                  </div>
                  <span className="text-[10px] text-[#71717a] font-mono">{pi.category}</span>
                </div>

                <div className="space-y-2">
                  {pi.tiers.map((t, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-lg text-xs ${
                        idx === 0
                          ? 'bg-[#10b981]/10 border border-[#10b981]/30 text-white'
                          : idx === 1
                          ? 'bg-[#09090b] border border-[#27272a] text-[#a1a1aa]'
                          : 'bg-[#f43f5e]/10 border border-[#f43f5e]/20 text-[#fca5a5]'
                      }`}
                    >
                      <div className="font-bold font-mono text-[10px] uppercase mb-0.5 flex items-center gap-1">
                        {idx === 0 && <CheckCircle2 className="w-3 h-3 text-[#10b981]" />}
                        <span>{t.label}</span>
                      </div>
                      <p className="text-[11px] leading-relaxed">{t.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 3: Judge Tips & Traps */}
      {selectedTab === 'judge_tips' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-[#18181b] border border-[#27272a] p-5 rounded-xl space-y-3">
            <h3 className="text-sm font-bold text-[#10b981] font-mono uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>What DECA Judges Award Top Points For</span>
            </h3>
            <ul className="space-y-2 text-xs text-[#d4d4d8] leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[#10b981] font-bold">1.</span>
                <span><strong>Explicit Indicator Callouts:</strong> State your PIs in clear business phrasing (e.g. <em>"To address our first indicator on cash flow recovery..."</em>).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#10b981] font-bold">2.</span>
                <span><strong>Structured Action Timelines:</strong> Judges love 3-step or 4-week timelines (Immediate, 30 Days, 60 Days, 90 Days).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#10b981] font-bold">3.</span>
                <span><strong>Calculated Financial Bounds:</strong> Quote specific dollar amounts, comp caps, and gross margin floors rather than vague estimates.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#10b981] font-bold">4.</span>
                <span><strong>Handshake & Demeanor:</strong> Maintain confident eye contact, professional posture, and thank the judge by their scenario name.</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#18181b] border border-[#27272a] p-5 rounded-xl space-y-3">
            <h3 className="text-sm font-bold text-[#f43f5e] font-mono uppercase tracking-wider flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>Fatal Mistakes That Cost Competitors State / ICDC</span>
            </h3>
            <ul className="space-y-2 text-xs text-[#d4d4d8] leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[#f43f5e] font-bold">1.</span>
                <span><strong>Skipping a Performance Indicator:</strong> Leaving out even one PI automatically caps that rubric section at 0–10 points.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#f43f5e] font-bold">2.</span>
                <span><strong>Violating Given Budget Constraints:</strong> Offering $1,000 in free stays when the scenario budget cap is $250.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#f43f5e] font-bold">3.</span>
                <span><strong>Arguing or Blaming Coworkers:</strong> Never blame the night auditor, housekeeper, or front desk staff in front of an adversarial guest.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#f43f5e] font-bold">4.</span>
                <span><strong>Rambling Without Visual Structure:</strong> Running out of time on indicator #2 because you spent 8 minutes on introductions.</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
