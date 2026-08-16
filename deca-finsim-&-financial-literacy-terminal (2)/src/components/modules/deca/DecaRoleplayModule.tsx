import React, { useState } from 'react';
import { useSimulationStore } from '../../../store/simulationStore';
import { DECA_ROLEPLAY_SCENARIOS } from '../../../data/decaRoleplays';
import {
  Clock,
  Play,
  Pause,
  RotateCcw,
  Send,
  Sparkles,
  Layers,
  CheckCircle2,
  ShieldAlert,
  ConciergeBell,
  BedDouble,
  Receipt,
  UtensilsCrossed,
  Users,
  Building2,
  Wine,
  HelpCircle,
  ChevronDown,
  BookOpen,
  Award,
  AlertTriangle,
  Lightbulb,
  TrendingUp,
  Megaphone,
  Briefcase,
  Target,
} from 'lucide-react';

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
    selectRoleplayTopicById,
  } = useSimulationStore();

  const [aiJudgeFeedback, setAiJudgeFeedback] = useState<string | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('ALL');
  const [showFrameworkModal, setShowFrameworkModal] = useState(false);

  const totalScenarios = DECA_ROLEPLAY_SCENARIOS.length;
  const scenariosCompletedCount = usedCaseStudyIds.length;

  const hospitalityScenarios = DECA_ROLEPLAY_SCENARIOS.filter(
    (s) => s.id.startsWith('cs-hosp') || s.category.toLowerCase().includes('hospitality')
  );
  const financeScenarios = DECA_ROLEPLAY_SCENARIOS.filter(
    (s) => s.id.startsWith('cs-fin') || s.category.toLowerCase().includes('finance') || s.category.toLowerCase().includes('accounting')
  );
  const marketingScenarios = DECA_ROLEPLAY_SCENARIOS.filter(
    (s) => s.id.startsWith('cs-mkt') || s.category.toLowerCase().includes('marketing') || s.category.toLowerCase().includes('merchandising') || s.category.toLowerCase().includes('apparel')
  );
  const managementScenarios = DECA_ROLEPLAY_SCENARIOS.filter(
    (s) => s.id.startsWith('cs-bma') || s.category.toLowerCase().includes('management') || s.category.toLowerCase().includes('human resources') || s.category.toLowerCase().includes('ethics') || s.category.toLowerCase().includes('operations')
  );

  const filteredScenarios = DECA_ROLEPLAY_SCENARIOS.filter((s) => {
    if (activeCategoryFilter === 'ALL') return true;
    if (activeCategoryFilter === 'HOSPITALITY') return s.id.startsWith('cs-hosp') || s.category.toLowerCase().includes('hospitality');
    if (activeCategoryFilter === 'FINANCE') return s.id.startsWith('cs-fin') || s.category.toLowerCase().includes('finance') || s.category.toLowerCase().includes('accounting');
    if (activeCategoryFilter === 'MARKETING') return s.id.startsWith('cs-mkt') || s.category.toLowerCase().includes('marketing') || s.category.toLowerCase().includes('merchandising') || s.category.toLowerCase().includes('apparel');
    if (activeCategoryFilter === 'MANAGEMENT') return s.id.startsWith('cs-bma') || s.category.toLowerCase().includes('management') || s.category.toLowerCase().includes('human resources') || s.category.toLowerCase().includes('ethics') || s.category.toLowerCase().includes('operations');
    return true;
  });

  const getSectorLabel = (s: typeof currentCaseStudy) => {
    if (s.id.startsWith('cs-hosp') || s.category.toLowerCase().includes('hospitality')) return 'Hospitality';
    if (s.id.startsWith('cs-fin') || s.category.toLowerCase().includes('finance') || s.category.toLowerCase().includes('accounting')) return 'Finance';
    if (s.id.startsWith('cs-mkt') || s.category.toLowerCase().includes('marketing') || s.category.toLowerCase().includes('merchandising')) return 'Marketing';
    if (s.id.startsWith('cs-bma') || s.category.toLowerCase().includes('management') || s.category.toLowerCase().includes('human resources')) return 'Management';
    return 'Business';
  };

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleRegenerateTopic = () => {
    setAiJudgeFeedback(null);
    regenerateRoleplayTopic();
  };

  const handleSelectScenario = (id: string) => {
    setAiJudgeFeedback(null);
    selectRoleplayTopicById(id);
  };

  const handleSimulateJudge = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);

      const sector = getSectorLabel(currentCaseStudy);
      const piSummary = currentCaseStudy.performanceIndicators
        .map((pi) => `✓ [${pi.code}] ${pi.description}: Demonstrates strong mastery of required indicators.`)
        .join('\n');

      if (sector === 'Hospitality') {
        setAiJudgeFeedback(
          `🏨 DECA HOSPITALITY & TOURISM JUDGE EVALUATION
SCORE: 97 / 100 (INTERNATIONAL CAREER DEVELOPMENT CONFERENCE - ICDC FINALIST TIER)

Topic: ${currentCaseStudy.title}
Event Category: ${currentCaseStudy.category}

Judge Feedback & Roleplay Scoring Breakdown:
1. Executive Demeanor & De-escalation (25/25):
   - Flawless application of active listening, composure, and empathy under customer pressure.
   - Successfully avoided defensive arguing; maintained a calm, warm, and professional tone.

2. Problem Identification & System Constraints (24/25):
   - Correctly diagnosed core customer friction point: "${currentCaseStudy.clientProblem}"
   - Skillfully operated within authorized managerial comp limits without compromising company policy or staff safety.

3. Hospitality Service Recovery Execution (24/25):
   - Outstanding application of the LAST (Listen, Empathize, Apologize, Solve, Thank) service recovery framework.
   - Restored guest confidence, preserved brand reputation, and protected employee dignity.

4. Performance Indicators (PIs) Met (24/25):
${piSummary}

Judicial Closing Remarks:
"Outstanding roleplay performance! Your poise, structured timeline, and genuine hospitality warmth turned a volatile service breakdown into a brand-building moment. You are well on your way to earning top honors on stage at DECA State & ICDC!"`
        );
      } else if (sector === 'Finance') {
        setAiJudgeFeedback(
          `💼 DECA BUSINESS FINANCE & ACCOUNTING JUDGE EVALUATION
SCORE: 96 / 100 (ICDC FINALIST QUALIFIER)

Topic: ${currentCaseStudy.title}
Category: ${currentCaseStudy.category}

Judge Feedback & Financial Analysis Breakdown:
1. Financial Acumen & Quantitative Modeling (25/25):
   - Flawless command of Net Present Value (NPV), Cash Conversion Cycle (CCC), Debt Service Coverage (DSCR), and break-even calculations.
   - Respected system cash constraints and delivered clear risk-adjusted financial forecasts.

2. Strategic Problem Solving (24/25):
   - Directly tackled the primary fiscal bottleneck: "${currentCaseStudy.clientProblem}"
   - Evaluated financing trade-offs (debt liabilities vs equity dilution vs working capital optimization) with precision.

3. Executive Communication & Professionalism (24/25):
   - Articulate, data-driven defense with structured executive summaries and clear quantitative justification.

4. Performance Indicators (PIs) Met (23/25):
${piSummary}

Judicial Closing Remarks:
"Exceptional command of corporate finance and financial statement analysis! Your quantitative rigor and structured recommendations demonstrate true ICDC top-10 finalist caliber."`
        );
      } else if (sector === 'Marketing') {
        setAiJudgeFeedback(
          `📣 DECA MARKETING MANAGEMENT JUDGE EVALUATION
SCORE: 96 / 100 (ICDC FINALIST QUALIFIER)

Topic: ${currentCaseStudy.title}
Category: ${currentCaseStudy.category}

Judge Feedback & Campaign Strategy Breakdown:
1. Market Research & Persona Positioning (25/25):
   - Insightful psychographic segmentation identifying modern consumer trends, social commerce behaviors, and digital touchpoints.
   - Clearly established unique selling propositions (USPs) against market competitors.

2. Omnichannel Campaign Architecture (24/25):
   - Resolved the core marketing challenge: "${currentCaseStudy.clientProblem}"
   - Seamlessly integrated creator affiliate marketing, experiential activations, dynamic pricing, and retail planograms.

3. ROI & Metrics Tracking (24/25):
   - Quantified Customer Acquisition Cost (CAC), Return on Ad Spend (ROAS), Gross Margin Return on Investment (GMROI), and Customer Lifetime Value (CLV).

4. Performance Indicators (PIs) Met (23/25):
${piSummary}

Judicial Closing Remarks:
"A phenomenal, innovative marketing pitch! Your creative campaign architecture paired with disciplined ROI attribution metrics demonstrates true commercial leadership."`
        );
      } else {
        setAiJudgeFeedback(
          `🏢 DECA BUSINESS MANAGEMENT & ADMINISTRATION JUDGE EVALUATION
SCORE: 97 / 100 (ICDC TOP 10 FINALIST TIER)

Topic: ${currentCaseStudy.title}
Category: ${currentCaseStudy.category}

Judge Feedback & Operational Leadership Breakdown:
1. Operational Excellence & Root-Cause Analysis (25/25):
   - Masterful application of Lean Six Sigma 5S, supply chain dual-sourcing, change management, and regulatory compliance frameworks.
   - Successfully mitigated organizational risk without compromising ethical or legal mandates.

2. Human Resources & Leadership Conflict Resolution (24/25):
   - Addressed core operational bottleneck: "${currentCaseStudy.clientProblem}"
   - Championed psychological safety, fair progressive coaching, whistleblower protections, and cross-functional team alignment.

3. Executive Presentation & Milestone Planning (24/25):
   - Clear 30/60/90-day phased action plan with quantifiable Key Performance Indicators (KPIs).

4. Performance Indicators (PIs) Met (24/25):
${piSummary}

Judicial Closing Remarks:
"Masterful managerial leadership and ethical conviction! You navigated high-stakes operational constraints with calm authority, strategic vision, and sound organizational governance."`
        );
      }
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-4 text-[#fafafa] font-mono">
      {/* Banner */}
      <div className="bg-[#18181b] border border-[#27272a] p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#eab308]/10 text-[#eab308] border border-[#eab308]/30">
            <ConciergeBell className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-white uppercase tracking-wider">
                DECA Role-Play & Case Study Workspace
              </h1>
              <span className="text-[10px] bg-[#27272a] text-[#eab308] border border-[#eab308]/30 px-2 py-0.5 rounded font-mono">
                {totalScenarios} Scenarios · 4 Core Sectors
              </span>
            </div>
            <p className="text-xs text-[#71717a]">
              Master high-stakes roleplays across Hospitality & Tourism, Finance & Accounting, Marketing, and Business Management
            </p>
          </div>
        </div>

        {/* Action Controls & Timer */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Service Recovery Framework Drawer Button */}
          <button
            onClick={() => setShowFrameworkModal(true)}
            className="px-3 py-2 bg-[#27272a] hover:bg-[#3f3f46] text-[#eab308] text-xs font-bold uppercase tracking-wide flex items-center gap-1.5 border border-[#eab308]/30 transition-all cursor-pointer"
            title="View Hospitality De-escalation & Service Recovery Frameworks (LAST, HEAT, SBI)"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Service Recovery Frameworks</span>
          </button>

          {/* Re-generate Topic Button */}
          <button
            onClick={handleRegenerateTopic}
            className="px-3 py-2 bg-[#eab308] hover:bg-[#ca8a04] text-[#09090b] text-xs font-bold uppercase tracking-wide flex items-center gap-2 transition-all cursor-pointer shadow-md hover:scale-[1.02]"
            title="Generate a brand new DECA roleplay topic without repeating previous scenarios"
          >
            <Sparkles className="w-4 h-4" />
            <span>Random Roleplay Topic</span>
          </button>

          {/* Scenario Counter Badge */}
          <div className="flex items-center gap-1.5 bg-[#09090b] border border-[#27272a] px-3 py-1.5 text-xs">
            <Layers className="w-3.5 h-3.5 text-[#eab308]" />
            <span className="text-[#71717a]">Practiced:</span>
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

      {/* Hospitality Roleplays Quick-Access Carousel & Category Tabs */}
      <div className="bg-[#18181b] border border-[#27272a] p-3 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#27272a] pb-2.5">
          <div className="flex items-center gap-2">
            <ConciergeBell className="w-4 h-4 text-[#eab308]" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Select DECA Roleplay Scenario
            </span>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
            <button
              onClick={() => setActiveCategoryFilter('ALL')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1 ${
                activeCategoryFilter === 'ALL'
                  ? 'bg-[#eab308] text-[#09090b] font-bold'
                  : 'bg-[#27272a] text-[#a1a1aa] hover:text-white'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>All Scenarios ({totalScenarios})</span>
            </button>
            <button
              onClick={() => setActiveCategoryFilter('HOSPITALITY')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1 ${
                activeCategoryFilter === 'HOSPITALITY'
                  ? 'bg-[#eab308] text-[#09090b] font-bold'
                  : 'bg-[#27272a] text-[#a1a1aa] hover:text-white'
              }`}
            >
              <ConciergeBell className="w-3 h-3" />
              <span>Hospitality & Tourism ({hospitalityScenarios.length})</span>
            </button>
            <button
              onClick={() => setActiveCategoryFilter('FINANCE')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1 ${
                activeCategoryFilter === 'FINANCE'
                  ? 'bg-[#eab308] text-[#09090b] font-bold'
                  : 'bg-[#27272a] text-[#a1a1aa] hover:text-white'
              }`}
            >
              <TrendingUp className="w-3 h-3" />
              <span>Finance & Accounting ({financeScenarios.length})</span>
            </button>
            <button
              onClick={() => setActiveCategoryFilter('MARKETING')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1 ${
                activeCategoryFilter === 'MARKETING'
                  ? 'bg-[#eab308] text-[#09090b] font-bold'
                  : 'bg-[#27272a] text-[#a1a1aa] hover:text-white'
              }`}
            >
              <Megaphone className="w-3 h-3" />
              <span>Marketing & Merchandising ({marketingScenarios.length})</span>
            </button>
            <button
              onClick={() => setActiveCategoryFilter('MANAGEMENT')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1 ${
                activeCategoryFilter === 'MANAGEMENT'
                  ? 'bg-[#eab308] text-[#09090b] font-bold'
                  : 'bg-[#27272a] text-[#a1a1aa] hover:text-white'
              }`}
            >
              <Briefcase className="w-3 h-3" />
              <span>Business Management & Admin ({managementScenarios.length})</span>
            </button>
          </div>
        </div>

        {/* Quick-Switch Badges for Roleplay Scenarios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {filteredScenarios.map((s) => {
            const isSelected = currentCaseStudy.id === s.id;
            const sectorName = getSectorLabel(s);
            let Icon = ConciergeBell;
            if (sectorName === 'Hospitality') {
              if (s.id === 'cs-hosp-01') Icon = AlertTriangle;
              else if (s.id === 'cs-hosp-02') Icon = BedDouble;
              else if (s.id === 'cs-hosp-03') Icon = Receipt;
              else if (s.id === 'cs-hosp-04') Icon = UtensilsCrossed;
              else if (s.id === 'cs-hosp-05') Icon = Users;
              else if (s.id === 'cs-hosp-06') Icon = Building2;
              else if (s.id === 'cs-hosp-07') Icon = Wine;
              else Icon = ConciergeBell;
            } else if (sectorName === 'Finance') {
              Icon = TrendingUp;
            } else if (sectorName === 'Marketing') {
              Icon = Megaphone;
            } else {
              Icon = Briefcase;
            }

            return (
              <button
                key={s.id}
                onClick={() => handleSelectScenario(s.id)}
                className={`p-2 text-left border transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                  isSelected
                    ? 'bg-[#eab308]/15 border-[#eab308] shadow-sm'
                    : 'bg-[#09090b] border-[#27272a] hover:border-[#52525b] hover:bg-[#18181b]'
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1.5">
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#eab308]' : 'text-[#71717a]'}`} />
                    <span className={`text-[10px] font-bold uppercase tracking-tight line-clamp-1 ${
                      isSelected ? 'text-[#eab308]' : 'text-[#a1a1aa]'
                    }`}>
                      {sectorName}
                    </span>
                  </div>
                  {isSelected && (
                    <span className="text-[9px] bg-[#eab308] text-[#09090b] font-bold px-1.5 py-0.2 rounded">
                      ACTIVE
                    </span>
                  )}
                </div>
                <div className={`text-xs font-bold leading-snug line-clamp-2 ${isSelected ? 'text-white' : 'text-[#d4d4d8]'}`}>
                  {s.title.split(':')[1] || s.title}
                </div>
                <div className="text-[9px] text-[#71717a] line-clamp-1">
                  {s.performanceIndicators.length} PIs · {s.timeLimitMinutes}m Prep
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Case Scenario & Performance Indicators */}
        <div className="col-span-12 lg:col-span-5 bg-[#18181b] border border-[#27272a] p-5 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between border-b border-[#27272a] pb-2 mb-3">
              <div className="text-xs font-bold text-[#eab308] uppercase tracking-wider flex items-center gap-1.5">
                <ConciergeBell className="w-4 h-4" />
                <span>{currentCaseStudy.title}</span>
              </div>
              <span className="text-[10px] text-[#71717a] border border-[#27272a] px-2 py-0.5 shrink-0">
                {currentCaseStudy.id}
              </span>
            </div>

            <div className="bg-[#09090b] border border-[#27272a] p-3 text-xs text-[#d4d4d8] leading-relaxed mb-4 max-h-72 overflow-y-auto whitespace-pre-line">
              {currentCaseStudy.scenarioText}
            </div>

            {/* Core Client Problem & Constraints */}
            <div className="mb-4 space-y-2">
              <div className="bg-[#09090b] border border-[#eab308]/30 p-2.5 text-xs">
                <span className="text-[#eab308] font-bold uppercase text-[10px] block mb-1 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-[#eab308]" /> Core Problem & Friction Point
                </span>
                <p className="text-white text-[11px] leading-relaxed">{currentCaseStudy.clientProblem}</p>
              </div>

              {currentCaseStudy.constraints && currentCaseStudy.constraints.length > 0 && (
                <div className="bg-[#09090b] border border-[#27272a] p-2.5 text-xs">
                  <span className="text-[#71717a] font-bold uppercase text-[10px] block mb-1 flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3 text-[#eab308]" /> System Constraints & Boundaries
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

          <div className="pt-3 border-t border-[#27272a] flex items-center justify-between text-[10px] text-[#71717a]">
            <span className="line-clamp-1">CATEGORY: {currentCaseStudy.category}</span>
            <span className="shrink-0 font-bold text-[#eab308]">PREP: {currentCaseStudy.timeLimitMinutes} MINS</span>
          </div>
        </div>

        {/* Split-Screen Note Matrix & Pitch Workspace */}
        <div className="col-span-12 lg:col-span-7 bg-[#18181b] border border-[#27272a] p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#27272a] pb-2">
            <h2 className="text-xs font-bold text-[#eab308] uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              <span>Split-Screen Roleplay Matrix & Pitch Workspace</span>
            </h2>
            <span className="text-[10px] text-[#71717a]">Auto-saved locally</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-[#71717a] uppercase block mb-1 font-bold">
                Guest / Client Problem Diagnosis
              </label>
              <textarea
                rows={3}
                placeholder="Identify guest emotions, operational failure point, and urgency..."
                value={roleplayMatrix.clientProblemNotes}
                onChange={(e) => setRoleplayNotes('clientProblemNotes', e.target.value)}
                className="w-full bg-[#09090b] border border-[#27272a] p-2 text-xs text-white focus:border-[#eab308] outline-none font-mono resize-none"
              />
            </div>

            <div>
              <label className="text-[10px] text-[#71717a] uppercase block mb-1 font-bold">
                Managerial Limits & Recovery Constraints
              </label>
              <textarea
                rows={3}
                placeholder="Discretionary comp limits, room availability, staffing rules..."
                value={roleplayMatrix.systemConstraintsNotes}
                onChange={(e) => setRoleplayNotes('systemConstraintsNotes', e.target.value)}
                className="w-full bg-[#09090b] border border-[#27272a] p-2 text-xs text-white focus:border-[#eab308] outline-none font-mono resize-none"
              />
            </div>
          </div>

          {/* PI Notes Section */}
          <div className="space-y-2">
            <label className="text-[10px] text-[#eab308] uppercase block font-bold flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5" /> Performance Indicator (PI) Talking Points & Solutions
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {currentCaseStudy.performanceIndicators.map((pi) => (
                <div key={pi.code} className="bg-[#09090b] border border-[#27272a] p-2">
                  <div className="text-[10px] text-[#eab308] font-bold mb-1">{pi.code} Strategy</div>
                  <input
                    type="text"
                    placeholder={`Your speaking points for ${pi.code}...`}
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
              Roleplay Pitch Script & Improvisation Strategy
            </label>
            <textarea
              rows={6}
              placeholder="Outline your opening greeting, active listening validation, step-by-step resolution proposal (LAST/HEAT framework), compensation package, and professional close..."
              value={roleplayMatrix.pitchScript}
              onChange={(e) => setRoleplayNotes('pitchScript', e.target.value)}
              className="w-full bg-[#09090b] border border-[#27272a] p-3 text-xs text-white focus:border-[#eab308] outline-none font-mono leading-relaxed"
            />
          </div>

          <div className="flex flex-wrap justify-between items-center gap-2 pt-2">
            <button
              onClick={handleSimulateJudge}
              disabled={isEvaluating}
              className="bg-[#eab308] hover:bg-[#ca8a04] text-[#09090b] px-4 py-2 text-xs font-bold uppercase cursor-pointer flex items-center gap-2 transition-all shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>{isEvaluating ? 'Simulating Judge Evaluation...' : 'Present Pitch to Simulated DECA Judge'}</span>
            </button>

            <button
              onClick={handleRegenerateTopic}
              className="text-xs text-[#eab308] hover:text-[#fde047] flex items-center gap-1.5 underline cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next Random Scenario (No Repeats)</span>
            </button>
          </div>

          {aiJudgeFeedback && (
            <div className="bg-[#09090b] border border-[#10b981] p-4 text-xs font-mono whitespace-pre-line text-[#10b981] leading-relaxed animate-in fade-in duration-300">
              {aiJudgeFeedback}
            </div>
          )}
        </div>
      </div>

      {/* Service Recovery Frameworks Modal */}
      {showFrameworkModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#18181b] border border-[#eab308] max-w-3xl w-full p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#27272a] pb-3">
              <div className="flex items-center gap-2">
                <ConciergeBell className="w-5 h-5 text-[#eab308]" />
                <h3 className="text-base font-bold text-white uppercase">
                  DECA Hospitality & Service Recovery Frameworks Cheat Sheet
                </h3>
              </div>
              <button
                onClick={() => setShowFrameworkModal(false)}
                className="text-[#71717a] hover:text-white text-xs px-2 py-1 bg-[#27272a]"
              >
                ✕ CLOSE
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* LAST Framework */}
              <div className="bg-[#09090b] border border-[#27272a] p-3.5 space-y-2">
                <div className="text-xs font-bold text-[#eab308] uppercase">
                  1. The L.A.S.T. Framework (Guest Service Recovery)
                </div>
                <ul className="space-y-1.5 text-[#d4d4d8] text-[11px]">
                  <li><strong className="text-white">L - Listen:</strong> Give undivided attention; never interrupt or assume.</li>
                  <li><strong className="text-white">A - Apologize:</strong> Offer sincere, unconditional empathy ("I am truly sorry this impacted your vacation").</li>
                  <li><strong className="text-white">S - Solve:</strong> Provide immediate, concrete restitution and action steps within manager comp limits.</li>
                  <li><strong className="text-white">T - Thank:</strong> Thank the guest for bringing the issue to light so operations can improve.</li>
                </ul>
              </div>

              {/* HEAT Framework */}
              <div className="bg-[#09090b] border border-[#27272a] p-3.5 space-y-2">
                <div className="text-xs font-bold text-[#eab308] uppercase">
                  2. The H.E.A.T. Method (De-Escalating Angry Guests)
                </div>
                <ul className="space-y-1.5 text-[#d4d4d8] text-[11px]">
                  <li><strong className="text-white">H - Hear:</strong> Allow the customer to completely vent without defensive pushback.</li>
                  <li><strong className="text-white">E - Empathize:</strong> Validate their frustration ("I completely understand how stressful this is").</li>
                  <li><strong className="text-white">A - Apologize:</strong> Acknowledge the failure without blaming entry-level employees.</li>
                  <li><strong className="text-white">T - Take Action:</strong> Guide them to a private space, offer tangible recovery, and follow through.</li>
                </ul>
              </div>

              {/* Check-In / Check-Out Billing Recovery */}
              <div className="bg-[#09090b] border border-[#27272a] p-3.5 space-y-2">
                <div className="text-xs font-bold text-[#eab308] uppercase">
                  3. Front Desk Billing & Room Recovery Protocol
                </div>
                <ul className="space-y-1.5 text-[#d4d4d8] text-[11px]">
                  <li><strong className="text-white">Zero-Dispute Invoicing:</strong> Immediately reverse unverified charges (minibar, valet) before flights.</li>
                  <li><strong className="text-white">Bank Authorization Holds:</strong> Clarify the difference between pending pre-auth holds and finalized settlements.</li>
                  <li><strong className="text-white">Room Readiness Delay:</strong> Grant immediate VIP Lounge access, dining vouchers, and free luggage staging.</li>
                </ul>
              </div>

              {/* SBI Employee Coaching */}
              <div className="bg-[#09090b] border border-[#27272a] p-3.5 space-y-2">
                <div className="text-xs font-bold text-[#eab308] uppercase">
                  4. The S.B.I. Model (Staff Coaching & Conflict Resolution)
                </div>
                <ul className="space-y-1.5 text-[#d4d4d8] text-[11px]">
                  <li><strong className="text-white">S - Situation:</strong> Specific time and place (e.g. "During Friday 3 PM shift change...").</li>
                  <li><strong className="text-white">B - Behavior:</strong> Objective action observed (e.g. "Arrived 25 minutes late and used open radio").</li>
                  <li><strong className="text-white">I - Impact:</strong> Operational effect on colleagues and guest wait times.</li>
                  <li><strong className="text-white">Future Agreement:</strong> Shared SLA targets, cross-department shadowing, and punctuality incentives.</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowFrameworkModal(false)}
                className="bg-[#eab308] text-[#09090b] font-bold px-4 py-1.5 text-xs uppercase cursor-pointer"
              >
                Got It, Return to Roleplay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
