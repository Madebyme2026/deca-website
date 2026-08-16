import React from 'react';
import { useSimulationStore } from '../../store/simulationStore';
import { formatCurrency, formatPercent } from '../../utils/financialMath';
import {
  Award,
  BookOpen,
  Clock,
  FileText,
  LineChart,
  Building2,
  TrendingUp,
  Briefcase,
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Users,
  Compass,
  AlertTriangle,
  Play,
  Layers,
  ChevronRight,
  Target,
  BarChart3,
  Flame,
  Coffee,
} from 'lucide-react';

export const SplitHubOverview: React.FC = () => {
  const {
    setActiveWing,
    setActiveTab,
    portfolio,
    macroState,
    investments,
    examQuestions,
    currentCaseStudy,
    roleplayTimerSeconds,
  } = useSimulationStore();

  const realEstateProperties = investments.filter((i) => i.assetClass === 'REAL_ESTATE');

  return (
    <div className="flex flex-col flex-1 gap-6 w-full animate-fadeIn">
      {/* Top Banner: Clear Dual-Domain Statement */}
      <div className="bg-[#121318] border border-[#27272a] p-4 sm:p-5 rounded-lg flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#eab308] via-[#eab308]/80 to-[#10b981] flex items-center justify-center text-[#09090b] font-black text-lg shadow-md">
            ⚖️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Two Dedicated Platforms in One
              </h1>
              <span className="text-[10px] bg-[#27272a] text-[#a1a1aa] px-2 py-0.5 rounded font-mono uppercase font-semibold">
                Split Architecture
              </span>
            </div>
            <p className="text-xs text-[#a1a1aa] mt-0.5 max-w-2xl">
              Choose your focus: Train for high school DECA competitive events with genuine case studies and 110 exam questions, or run live institutional financial simulations with real estate DCF, trading terminal, and corporate models.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={() => setActiveWing('DECA')}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-[#eab308] hover:bg-[#ca8a04] text-[#09090b] px-4 py-2 rounded text-xs font-bold font-mono uppercase tracking-wider transition-all shadow-md cursor-pointer"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Open DECA Wing</span>
          </button>
          <button
            onClick={() => setActiveWing('FINANCE')}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-[#10b981] hover:bg-[#059669] text-[#09090b] px-4 py-2 rounded text-xs font-bold font-mono uppercase tracking-wider transition-all shadow-md cursor-pointer"
          >
            <LineChart className="w-3.5 h-3.5" />
            <span>Open Finance Wing</span>
          </button>
        </div>
      </div>

      {/* 50 / 50 Split Wing Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* ========================================================= */}
        {/* LEFT HALF: 🏆 DECA COMPETITION WING                        */}
        {/* ========================================================= */}
        <div className="bg-[#121318] border-2 border-[#eab308]/40 hover:border-[#eab308]/80 transition-all rounded-xl p-5 sm:p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
          {/* Subtle Ambient Gold Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#eab308]/5 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"></div>

          <div>
            {/* Wing Header */}
            <div className="flex items-center justify-between mb-4 border-b border-[#27272a] pb-3">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 bg-[#eab308] text-[#09090b] font-black text-xs rounded uppercase tracking-wider font-mono shadow-sm">
                  WING 01
                </span>
                <span className="text-xs font-mono text-[#eab308] font-bold uppercase tracking-wider">
                  DECA Competition Suite
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#a1a1aa] bg-[#1c1917] px-2 py-0.5 rounded border border-[#eab308]/30">
                110 Questions · 21 Roleplays
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
              High School DECA Arena
            </h2>
            <p className="text-xs text-[#d4d4d8] leading-relaxed mb-5">
              Comprehensive competition preparation designed for high school business students. Master official cluster exams, adversarial customer service roleplays, and 5/11/30-page written business event proposals.
            </p>

            {/* DECA Feature Blocks */}
            <div className="space-y-3 mb-6">
              {/* Feature 1: Cluster Exams */}
              <div
                onClick={() => setActiveTab('deca_exams')}
                className="bg-[#18181b] hover:bg-[#202024] border border-[#27272a] hover:border-[#eab308]/50 p-3 rounded-lg cursor-pointer transition-all flex items-start justify-between group/card"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#eab308]/10 text-[#eab308] rounded mt-0.5">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <span>110-Question Cluster Exam Engine</span>
                      <span className="text-[9px] bg-[#eab308]/20 text-[#eab308] px-1.5 py-0.2 rounded font-mono font-bold">
                        5 Clusters
                      </span>
                    </div>
                    <p className="text-[11px] text-[#a1a1aa] mt-0.5">
                      Practice with full answer rationales, hint sheet, financial formula cheat sheet, and instant score calibration across BFS, HTDM, PFL, and Accounting.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#71717a] group-hover/card:text-[#eab308] transition-colors shrink-0 mt-2" />
              </div>

              {/* Feature 2: Hospitality & Finance Roleplays */}
              <div
                onClick={() => setActiveTab('deca_roleplay')}
                className="bg-[#18181b] hover:bg-[#202024] border border-[#27272a] hover:border-[#eab308]/50 p-3 rounded-lg cursor-pointer transition-all flex items-start justify-between group/card"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#f59e0b]/10 text-[#f59e0b] rounded mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <span>Timed Roleplay & Case Study Arena</span>
                      <span className="text-[9px] bg-[#f59e0b]/20 text-[#f59e0b] px-1.5 py-0.2 rounded font-mono font-bold">
                        21 Scenarios
                      </span>
                    </div>
                    <p className="text-[11px] text-[#a1a1aa] mt-0.5">
                      Tackle high-stakes cases across Hospitality, Corporate Finance, Marketing, and Business Management with AI judicial scoring.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#71717a] group-hover/card:text-[#eab308] transition-colors shrink-0 mt-2" />
              </div>

              {/* Feature 3: Written Events & Slide Decks */}
              <div
                onClick={() => setActiveTab('deca_reports')}
                className="bg-[#18181b] hover:bg-[#202024] border border-[#27272a] hover:border-[#eab308]/50 p-3 rounded-lg cursor-pointer transition-all flex items-start justify-between group/card"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#eab308]/10 text-[#eab308] rounded mt-0.5">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <span>Written Event & Slide Deck Builder</span>
                      <span className="text-[9px] bg-[#27272a] text-[#fafafa] px-1.5 py-0.2 rounded font-mono">
                        5/11/30 Pages
                      </span>
                    </div>
                    <p className="text-[11px] text-[#a1a1aa] mt-0.5">
                      Craft executive summaries, financial tables, risk mitigation plans, and generate interactive presentation slides with simulated judge defense questions.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#71717a] group-hover/card:text-[#eab308] transition-colors shrink-0 mt-2" />
              </div>

              {/* Feature 4: PI Rubric Scoring & Evaluation */}
              <div
                onClick={() => setActiveTab('deca_rubrics')}
                className="bg-[#18181b] hover:bg-[#202024] border border-[#27272a] hover:border-[#eab308]/50 p-3 rounded-lg cursor-pointer transition-all flex items-start justify-between group/card"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#eab308]/10 text-[#eab308] rounded mt-0.5">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <span>Performance Indicator (PI) Master Matrix</span>
                      <span className="text-[9px] bg-[#10b981]/20 text-[#10b981] px-1.5 py-0.2 rounded font-mono font-bold">
                        Rubric Engine
                      </span>
                    </div>
                    <p className="text-[11px] text-[#a1a1aa] mt-0.5">
                      Review DECA judge grading scales (CR:009, EI:015, HT:008, FI:064) and test your pitch with real-time rubric feedback and point calculations.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#71717a] group-hover/card:text-[#eab308] transition-colors shrink-0 mt-2" />
              </div>
            </div>
          </div>

          {/* Wing Action CTA */}
          <div className="border-t border-[#27272a] pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-[#a1a1aa] font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#eab308] animate-pulse"></span>
              <span>15 Scenarios Ready · 110 Exam Questions Loaded</span>
            </div>
            <button
              onClick={() => setActiveWing('DECA')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#eab308] hover:bg-[#ca8a04] text-[#09090b] px-5 py-2.5 rounded-lg text-xs font-bold font-mono uppercase tracking-wider transition-all shadow-lg cursor-pointer"
            >
              <span>Enter DECA Wing</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT HALF: 📈 FINANCIAL SIMULATION & PRACTICE WING        */}
        {/* ========================================================= */}
        <div className="bg-[#121318] border-2 border-[#10b981]/40 hover:border-[#10b981]/80 transition-all rounded-xl p-5 sm:p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
          {/* Subtle Ambient Emerald Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#10b981]/5 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"></div>

          <div>
            {/* Wing Header */}
            <div className="flex items-center justify-between mb-4 border-b border-[#27272a] pb-3">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 bg-[#10b981] text-[#09090b] font-black text-xs rounded uppercase tracking-wider font-mono shadow-sm">
                  WING 02
                </span>
                <span className="text-xs font-mono text-[#10b981] font-bold uppercase tracking-wider">
                  Financial Simulation Sandbox
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#a1a1aa] bg-[#064e3b]/30 px-2 py-0.5 rounded border border-[#10b981]/30">
                {formatCurrency(portfolio.totalPortfolioValue)} Net Worth
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
              Financial Practice & Simulation
            </h2>
            <p className="text-xs text-[#d4d4d8] leading-relaxed mb-5">
              Live quantitative modeling and interactive financial sandbox. Trade equities with candlestick charting, underwrite multi-tenant commercial real estate, model corporate DCF valuations, and balance double-entry ledgers.
            </p>

            {/* Finance Feature Blocks */}
            <div className="space-y-3 mb-6">
              {/* Feature 1: Stock Market Trading */}
              <div
                onClick={() => setActiveTab('stock_trading')}
                className="bg-[#18181b] hover:bg-[#202024] border border-[#27272a] hover:border-[#10b981]/50 p-3 rounded-lg cursor-pointer transition-all flex items-start justify-between group/card"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#10b981]/10 text-[#10b981] rounded mt-0.5">
                    <LineChart className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <span>Live Multi-Interval Day Trading Terminal</span>
                      <span className="text-[9px] bg-[#10b981]/20 text-[#10b981] px-1.5 py-0.2 rounded font-mono font-bold">
                        1m-ALL OHLCV
                      </span>
                    </div>
                    <p className="text-[11px] text-[#a1a1aa] mt-0.5">
                      Simulate real stock executions with candlestick wicks, EMA/SMA/Bollinger/RSI overlays, level-2 order book depth, and live limit/stop-loss paper orders.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#71717a] group-hover/card:text-[#10b981] transition-colors shrink-0 mt-2" />
              </div>

              {/* Feature 2: Commercial Real Estate DCF */}
              <div
                onClick={() => setActiveTab('real_estate')}
                className="bg-[#18181b] hover:bg-[#202024] border border-[#27272a] hover:border-[#10b981]/50 p-3 rounded-lg cursor-pointer transition-all flex items-start justify-between group/card"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#06b6d4]/10 text-[#06b6d4] rounded mt-0.5">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <span>Commercial Real Estate DCF Underwriting</span>
                      <span className="text-[9px] bg-[#06b6d4]/20 text-[#06b6d4] px-1.5 py-0.2 rounded font-mono font-bold">
                        Cap Rate & Rent Roll
                      </span>
                    </div>
                    <p className="text-[11px] text-[#a1a1aa] mt-0.5">
                      Acquire multifamily and logistics properties. Model rent rolls, property taxes, DSCR loan covenants, refinancing, and multi-year appreciation forecasts.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#71717a] group-hover/card:text-[#10b981] transition-colors shrink-0 mt-2" />
              </div>

              {/* Feature 3: Corporate Valuation & M&A */}
              <div
                onClick={() => setActiveTab('corporate_finance')}
                className="bg-[#18181b] hover:bg-[#202024] border border-[#27272a] hover:border-[#10b981]/50 p-3 rounded-lg cursor-pointer transition-all flex items-start justify-between group/card"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#3b82f6]/10 text-[#3b82f6] rounded mt-0.5">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <span>Corporate Valuation & Capital Allocation</span>
                      <span className="text-[9px] bg-[#3b82f6]/20 text-[#3b82f6] px-1.5 py-0.2 rounded font-mono font-bold">
                        DCF & WACC
                      </span>
                    </div>
                    <p className="text-[11px] text-[#a1a1aa] mt-0.5">
                      Calculate Enterprise Value, Free Cash Flow to Firm (FCFF), Cost of Equity (CAPM), and simulate capital allocation decisions (dividends, buybacks, CapEx).
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#71717a] group-hover/card:text-[#10b981] transition-colors shrink-0 mt-2" />
              </div>

              {/* Feature 4: Double-Entry Ledger & Macro Shocks */}
              <div
                onClick={() => setActiveTab('portfolio')}
                className="bg-[#18181b] hover:bg-[#202024] border border-[#27272a] hover:border-[#10b981]/50 p-3 rounded-lg cursor-pointer transition-all flex items-start justify-between group/card"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#a855f7]/10 text-[#a855f7] rounded mt-0.5">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <span>Portfolio Ledger & Macroeconomic Shocks</span>
                      <span className="text-[9px] bg-[#a855f7]/20 text-[#a855f7] px-1.5 py-0.2 rounded font-mono font-bold">
                        Double-Entry
                      </span>
                    </div>
                    <p className="text-[11px] text-[#a1a1aa] mt-0.5">
                      Audit journal debits/credits, simulate Fed interest rate hikes, inflation spikes, and test your balance sheet against simulated market recessions.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#71717a] group-hover/card:text-[#10b981] transition-colors shrink-0 mt-2" />
              </div>
            </div>
          </div>

          {/* Wing Action CTA */}
          <div className="border-t border-[#27272a] pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-[#a1a1aa] font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
              <span>Year {portfolio.currentYear} Q{portfolio.currentQuarter} · Inflation: {formatPercent(macroState.inflationRate, 1)}</span>
            </div>
            <button
              onClick={() => setActiveWing('FINANCE')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#10b981] hover:bg-[#059669] text-[#09090b] px-5 py-2.5 rounded-lg text-xs font-bold font-mono uppercase tracking-wider transition-all shadow-lg cursor-pointer"
            >
              <span>Enter Finance Wing</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Summary KPI Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#121318] border border-[#27272a] p-3 rounded-lg flex items-center gap-3">
          <div className="p-2 bg-[#eab308]/10 text-[#eab308] rounded">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-[#71717a] uppercase font-mono">DECA Exam Bank</div>
            <div className="text-sm font-bold font-mono text-white">110 Questions</div>
          </div>
        </div>

        <div className="bg-[#121318] border border-[#27272a] p-3 rounded-lg flex items-center gap-3">
          <div className="p-2 bg-[#f59e0b]/10 text-[#f59e0b] rounded">
            <Coffee className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-[#71717a] uppercase font-mono">Hospitality Cases</div>
            <div className="text-sm font-bold font-mono text-white">7 High-Stakes Scenarios</div>
          </div>
        </div>

        <div className="bg-[#121318] border border-[#27272a] p-3 rounded-lg flex items-center gap-3">
          <div className="p-2 bg-[#10b981]/10 text-[#10b981] rounded">
            <LineChart className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-[#71717a] uppercase font-mono">Paper Cash Balance</div>
            <div className="text-sm font-bold font-mono text-[#10b981]">{formatCurrency(portfolio.cashBalance)}</div>
          </div>
        </div>

        <div className="bg-[#121318] border border-[#27272a] p-3 rounded-lg flex items-center gap-3">
          <div className="p-2 bg-[#06b6d4]/10 text-[#06b6d4] rounded">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-[#71717a] uppercase font-mono">Real Estate Assets</div>
            <div className="text-sm font-bold font-mono text-white">{realEstateProperties.length} Properties</div>
          </div>
        </div>
      </div>
    </div>
  );
};
