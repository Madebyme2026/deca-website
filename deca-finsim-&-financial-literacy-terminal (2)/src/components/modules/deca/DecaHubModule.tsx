import React, { useState } from 'react';
import { useSimulationStore } from '../../../store/simulationStore';
import { DECA_ROLEPLAY_SCENARIOS } from '../../../data/decaRoleplays';
import {
  Award,
  BookOpen,
  Clock,
  FileText,
  Target,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Flame,
  Coffee,
  Building,
  HelpCircle,
  Play,
  RotateCcw,
  ArrowRight,
  Layers,
  GraduationCap,
} from 'lucide-react';

export const DecaHubModule: React.FC = () => {
  const {
    setActiveTab,
    examQuestions,
    currentCaseStudy,
    roleplayTimerSeconds,
    isTimerRunning,
    toggleTimer,
    resetTimer,
  } = useSimulationStore();

  const [selectedClusterFilter, setSelectedClusterFilter] = useState<string>('ALL');

  const hospitalityScenarios = DECA_ROLEPLAY_SCENARIOS.filter((s) => s.category.toLowerCase().includes('hospitality'));
  const financeScenarios = DECA_ROLEPLAY_SCENARIOS.filter((s) => s.category.toLowerCase().includes('finance') || s.category.toLowerCase().includes('accounting'));
  const marketingScenarios = DECA_ROLEPLAY_SCENARIOS.filter((s) => s.category.toLowerCase().includes('marketing') || s.category.toLowerCase().includes('merchandising'));
  const managementScenarios = DECA_ROLEPLAY_SCENARIOS.filter((s) => s.category.toLowerCase().includes('management') || s.category.toLowerCase().includes('human resources') || s.category.toLowerCase().includes('ethics'));

  const clusters = [
    { name: 'Hospitality & Tourism (HTDM/HLM)', count: 20, icon: '🏨' },
    { name: 'Business Finance & Accounting (BFS/ACT)', count: 25, icon: '📈' },
    { name: 'Marketing & Merchandising (MMS/SEM)', count: 25, icon: '📣' },
    { name: 'Business Management & Admin (HRM/BSM)', count: 20, icon: '🏢' },
    { name: 'Personal Financial Literacy (PFL)', count: 20, icon: '💳' },
  ];

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col flex-1 gap-5 w-full animate-fadeIn">
      {/* DECA Hero Banner */}
      <div className="bg-[#121318] border-2 border-[#eab308]/40 p-5 sm:p-6 rounded-xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#eab308]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-[#eab308] text-[#09090b] px-2.5 py-0.5 rounded font-black text-xs font-mono uppercase tracking-wider">
              DECA WING
            </span>
            <span className="text-xs font-mono text-[#eab308] font-bold">
              OFFICIAL HIGH SCHOOL PREPARATION ARENA
            </span>
          </div>
          <h1 className="text-xl sm:text-3xl font-black text-white tracking-tight">
            DECA Competition Command Center
          </h1>
          <p className="text-xs sm:text-sm text-[#d4d4d8] mt-1 leading-relaxed">
            Welcome to the dedicated DECA Competition Suite. Everything you need to qualify for ICDC: 110 cluster exam questions with full explanations, {DECA_ROLEPLAY_SCENARIOS.length} realistic judge roleplays across 4 core sectors, written event outlines, and performance indicator grading rubrics.
          </p>
        </div>

        {/* Quick Launch Buttons */}
        <div className="flex flex-wrap md:flex-col gap-2 w-full md:w-auto shrink-0 relative z-10">
          <button
            onClick={() => setActiveTab('deca_exams')}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#eab308] hover:bg-[#ca8a04] text-[#09090b] px-4 py-2.5 rounded-lg text-xs font-bold font-mono uppercase tracking-wider transition-all shadow-md cursor-pointer"
          >
            <Award className="w-4 h-4" />
            <span>Launch 110-Q Exam</span>
          </button>
          <button
            onClick={() => setActiveTab('deca_roleplay')}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#18181b] hover:bg-[#27272a] text-[#fafafa] border border-[#eab308]/40 hover:border-[#eab308] px-4 py-2.5 rounded-lg text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer"
          >
            <Clock className="w-4 h-4 text-[#eab308]" />
            <span>Start 15m Roleplay</span>
          </button>
        </div>
      </div>

      {/* 4 Core Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Exam Simulator */}
        <div
          onClick={() => setActiveTab('deca_exams')}
          className="bg-[#18181b] hover:bg-[#202024] border border-[#27272a] hover:border-[#eab308]/60 p-4 rounded-xl cursor-pointer transition-all flex flex-col justify-between group shadow-lg"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 bg-[#eab308]/10 text-[#eab308] rounded-lg">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-[#eab308] bg-[#eab308]/10 px-2 py-0.5 rounded font-bold">
                110 QUESTIONS
              </span>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-[#eab308] transition-colors mb-1">
              Cluster Exam Simulator
            </h3>
            <p className="text-xs text-[#a1a1aa] leading-relaxed">
              Test knowledge in Business Finance, Hospitality, Accounting, and Marketing with comprehensive answer rationales.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#27272a] flex items-center justify-between text-xs font-mono text-[#eab308]">
            <span>Practice Now</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 2: Roleplays */}
        <div
          onClick={() => setActiveTab('deca_roleplay')}
          className="bg-[#18181b] hover:bg-[#202024] border border-[#27272a] hover:border-[#f59e0b]/60 p-4 rounded-xl cursor-pointer transition-all flex flex-col justify-between group shadow-lg"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 bg-[#f59e0b]/10 text-[#f59e0b] rounded-lg">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-[#f59e0b] bg-[#f59e0b]/10 px-2 py-0.5 rounded font-bold">
                {DECA_ROLEPLAY_SCENARIOS.length} SCENARIOS
              </span>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-[#f59e0b] transition-colors mb-1">
              Roleplay & Case Studies
            </h3>
            <p className="text-xs text-[#a1a1aa] leading-relaxed">
              Hospitality recovery, corporate finance, marketing campaigns, and business management & administration cases.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#27272a] flex items-center justify-between text-xs font-mono text-[#f59e0b]">
            <span>Begin Prep Timer</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 3: Written Events */}
        <div
          onClick={() => setActiveTab('deca_reports')}
          className="bg-[#18181b] hover:bg-[#202024] border border-[#27272a] hover:border-[#eab308]/60 p-4 rounded-xl cursor-pointer transition-all flex flex-col justify-between group shadow-lg"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 bg-[#eab308]/10 text-[#eab308] rounded-lg">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-[#fafafa] bg-[#27272a] px-2 py-0.5 rounded font-bold">
                5 / 11 / 30 PGS
              </span>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-[#eab308] transition-colors mb-1">
              Written Event Builder
            </h3>
            <p className="text-xs text-[#a1a1aa] leading-relaxed">
              Design business growth proposals, franchise models, slide presentation decks, and simulate judge cross-examination.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#27272a] flex items-center justify-between text-xs font-mono text-[#eab308]">
            <span>Build Proposal</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 4: PI Scoring Rubrics */}
        <div
          onClick={() => setActiveTab('deca_rubrics')}
          className="bg-[#18181b] hover:bg-[#202024] border border-[#27272a] hover:border-[#10b981]/60 p-4 rounded-xl cursor-pointer transition-all flex flex-col justify-between group shadow-lg"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 bg-[#10b981]/10 text-[#10b981] rounded-lg">
                <Target className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded font-bold">
                RUBRICS
              </span>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-[#10b981] transition-colors mb-1">
              Performance Indicators (PIs)
            </h3>
            <p className="text-xs text-[#a1a1aa] leading-relaxed">
              Master the official 100-point DECA rubric guidelines (CR, EI, HT, FI, SM) to maximize scores in front of judges.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#27272a] flex items-center justify-between text-xs font-mono text-[#10b981]">
            <span>View Rubric Matrix</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Two Columns: Scenarios Highlight + Exam Clusters breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Featured Roleplay Scenarios (col-span-7) */}
        <div className="lg:col-span-7 bg-[#18181b] border border-[#27272a] p-4 sm:p-5 rounded-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-[#27272a] pb-2">
              <div className="flex items-center gap-2">
                <Coffee className="w-4 h-4 text-[#eab308]" />
                <h2 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Featured Roleplay Scenarios
                </h2>
              </div>
              <span className="text-[10px] text-[#71717a] font-mono">{DECA_ROLEPLAY_SCENARIOS.length} Scenarios Across 4 Sectors</span>
            </div>

            <div className="space-y-2.5">
              {DECA_ROLEPLAY_SCENARIOS.slice(0, 4).map((scenario) => (
                <div
                  key={scenario.id}
                  onClick={() => {
                    useSimulationStore.setState({ currentCaseStudy: scenario });
                    setActiveTab('deca_roleplay');
                  }}
                  className="bg-[#09090b] hover:bg-[#121318] border border-[#27272a] hover:border-[#eab308]/50 p-3 rounded-lg cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="space-y-1 pr-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] bg-[#eab308]/15 text-[#eab308] px-1.5 py-0.2 rounded font-mono font-bold">
                        {scenario.category.split('/')[0]}
                      </span>
                      <span className="text-[10px] text-[#71717a] font-mono">
                        ⏱️ {scenario.timeLimitMinutes} min prep
                      </span>
                    </div>
                    <div className="text-xs font-bold text-white group-hover:text-[#eab308] transition-colors">
                      {scenario.title}
                    </div>
                    <p className="text-[11px] text-[#a1a1aa] line-clamp-1">
                      {scenario.clientProblem}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#71717a] group-hover:text-[#eab308] shrink-0" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#27272a] flex items-center justify-between">
            <span className="text-[11px] text-[#71717a] font-mono">
              Includes LAST, HEAT, and SBI de-escalation frameworks
            </span>
            <button
              onClick={() => setActiveTab('deca_roleplay')}
              className="text-xs font-bold font-mono text-[#eab308] hover:text-[#fde047] flex items-center gap-1 cursor-pointer"
            >
              <span>View All {DECA_ROLEPLAY_SCENARIOS.length} Cases</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: 110 Exam Questions Breakdown & Cheat Sheets (col-span-5) */}
        <div className="lg:col-span-5 bg-[#18181b] border border-[#27272a] p-4 sm:p-5 rounded-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-[#27272a] pb-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#eab308]" />
                <h2 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  110 Exam Questions by Cluster
                </h2>
              </div>
              <span className="text-[10px] text-[#eab308] font-mono font-bold">100% Loaded</span>
            </div>

            <div className="space-y-2">
              {clusters.map((c, i) => (
                <div
                  key={i}
                  onClick={() => setActiveTab('deca_exams')}
                  className="bg-[#09090b] hover:bg-[#121318] border border-[#27272a] hover:border-[#eab308]/40 p-2.5 rounded-lg flex items-center justify-between cursor-pointer transition-all text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{c.icon}</span>
                    <span className="text-white font-medium">{c.name}</span>
                  </div>
                  <span className="font-mono text-[#eab308] font-bold text-[11px] bg-[#eab308]/10 px-2 py-0.5 rounded">
                    {c.count} Qs
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Tip Pill */}
            <div className="bg-[#121318] border border-[#eab308]/30 p-3 rounded-lg mt-4 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-[#eab308] shrink-0 mt-0.5" />
              <div className="text-[11px] text-[#d4d4d8] leading-relaxed">
                <strong className="text-white font-semibold">ICDC Competitor Tip:</strong> State your Performance Indicators explicitly in the first 2 minutes of your roleplay presentation to guarantee judge rubric points.
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#27272a] flex items-center justify-between">
            <span className="text-[11px] text-[#71717a] font-mono">
              Comprehensive Answer Rationales
            </span>
            <button
              onClick={() => setActiveTab('deca_exams')}
              className="text-xs font-bold font-mono text-[#eab308] hover:text-[#fde047] flex items-center gap-1 cursor-pointer"
            >
              <span>Take Full Exam</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
