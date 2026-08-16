import React, { useEffect, useState } from 'react';
import { useSimulationStore } from '../../store/simulationStore';
import { formatCurrency, formatPercent } from '../../utils/financialMath';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { AlertTriangle, Clock, ArrowUpRight, ArrowDownRight, CheckCircle2 } from 'lucide-react';

export const MainBentoGrid: React.FC = () => {
  const {
    macroState,
    portfolio,
    investments,
    ledgerRecords,
    roleplayTimerSeconds,
    isTimerRunning,
    toggleTimer,
    decrementTimer,
    setActiveTab,
    sellProperty,
    refinanceProperty,
  } = useSimulationStore();

  const [timeRange, setTimeRange] = useState<'1D' | '1W' | '1Y'>('1Y');

  // Timer countdown hook for DECA roleplay widget
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        decrementTimer();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, decrementTimer]);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.00`;
  };

  // Chart dataset for Equity Portfolio
  const chartData = [
    { time: 'M1', spy: 480, portfolio: 2100000 },
    { time: 'M2', spy: 485, portfolio: 2150000 },
    { time: 'M3', spy: 478, portfolio: 2120000 },
    { time: 'M4', spy: 492, portfolio: 2240000 },
    { time: 'M5', spy: 498, portfolio: 2310000 },
    { time: 'M6', spy: 504, portfolio: 2380000 },
    { time: 'M7', spy: 512, portfolio: portfolio.totalPortfolioValue },
  ];

  const midtownProp = investments.find((i) => i.assetClass === 'REAL_ESTATE') || investments[0];

  return (
    <div className="flex flex-col flex-1 gap-3 overflow-y-auto pr-1">
      <div className="grid grid-cols-12 gap-3 min-h-[580px]">
        {/* CARD 1: Macro Engine Output (col-span-3) */}
        <div className="col-span-12 md:col-span-3 bg-[#18181b] border border-[#27272a] p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-[11px] font-bold text-[#71717a] uppercase tracking-wider mb-3 border-b border-[#27272a] pb-1">
              Macro Engine Output
            </h2>
            <div className="space-y-3">
              <div className="bg-[#09090b] p-3 border border-[#27272a]">
                <div className="text-[10px] text-[#71717a] uppercase font-mono">
                  Inflation Index
                </div>
                <div className="text-lg font-bold font-mono text-white flex items-center justify-between">
                  <span>{formatPercent(macroState.inflationRate, 2)}</span>
                  <span className="text-[#f43f5e] text-xs font-normal flex items-center">
                    <ArrowUpRight className="w-3 h-3" />
                    +{formatPercent(macroState.inflationDelta, 1)}
                  </span>
                </div>
                <div className="h-1 w-full bg-[#27272a] mt-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#f43f5e] h-full transition-all"
                    style={{ width: `${Math.min(100, macroState.inflationRate * 1200)}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-[#09090b] p-3 border border-[#27272a]">
                <div className="text-[10px] text-[#71717a] uppercase font-mono">
                  Fed Funds Rate
                </div>
                <div className="text-lg font-bold font-mono text-white flex items-center justify-between">
                  <span>{formatPercent(macroState.fedFundsRate, 2)}</span>
                  <span className="text-[#71717a] text-xs font-mono">
                    {macroState.fedStatus}
                  </span>
                </div>
                <div className="text-[9px] text-[#71717a] mt-2 italic font-mono leading-tight">
                  Impact: Fixed-rate debt constant; floating debt service expense scales dynamically.
                </div>
              </div>

              <div className="bg-[#09090b] p-3 border border-[#eab308]/30 border-dashed">
                <div className="text-[10px] text-[#eab308] uppercase font-mono font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-[#eab308]" />
                  <span>Market Event</span>
                </div>
                <div className="text-xs font-bold text-white mt-1">
                  {macroState.activeEvent}
                </div>
                <p className="text-[10px] leading-tight text-[#d4d4d8] mt-1 font-mono">
                  {macroState.eventDescription}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-[#27272a] text-[10px] text-[#71717a] font-mono flex justify-between">
            <span>GDP GROWTH: {formatPercent(macroState.gdpGrowthRate, 1)}</span>
            <span>TICK RATE: 1.0s</span>
          </div>
        </div>

        {/* CARD 2: Equity Portfolio Analysis (col-span-6) */}
        <div className="col-span-12 md:col-span-6 bg-[#18181b] border border-[#27272a] p-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-end mb-3">
              <div>
                <h2 className="text-[11px] font-bold text-[#71717a] uppercase tracking-wider">
                  Equity Portfolio Analysis
                </h2>
                <p className="text-2xl font-bold font-mono text-white flex items-center gap-2">
                  <span>S&P 500 Index</span>
                  <span className="text-xs text-[#10b981] font-normal flex items-center">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    +{formatPercent(macroState.sp500ChangePct, 1)} (Session)
                  </span>
                </p>
              </div>
              <div className="flex gap-1 mb-1">
                {(['1D', '1W', '1Y'] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-2 py-0.5 text-[9px] font-mono transition-colors cursor-pointer ${
                      timeRange === range
                        ? 'bg-[#eab308] text-[#09090b] font-bold'
                        : 'bg-[#27272a] text-[#71717a] hover:text-white'
                    }`}
                  >
                    {range} {range === '1Y' ? '(SIM)' : ''}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-44 bg-[#09090b] border border-[#27272a] relative p-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#71717a" fontSize={10} tickLine={false} />
                  <YAxis stroke="#71717a" fontSize={10} tickLine={false} hide />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff', fontSize: '11px', fontFamily: 'monospace' }}
                    formatter={(val: number) => [formatCurrency(val), 'Portfolio']}
                  />
                  <Area type="monotone" dataKey="portfolio" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>

              <div className="absolute top-2 right-2 bg-[#18181b]/90 border border-[#27272a] p-2 flex flex-col gap-1 backdrop-blur-sm">
                <div className="flex justify-between gap-6 text-[10px]">
                  <span className="text-[#71717a] font-mono">SHARPE RATIO</span>
                  <span className="font-bold font-mono text-white">{portfolio.sharpeRatio.toFixed(2)}</span>
                </div>
                <div className="flex justify-between gap-6 text-[10px]">
                  <span className="text-[#71717a] font-mono">ALPHA</span>
                  <span className="font-bold font-mono text-[#10b981]">+{(portfolio.alphaScore * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between gap-6 text-[10px]">
                  <span className="text-[#71717a] font-mono">BETA</span>
                  <span className="font-bold font-mono text-white">{portfolio.betaScore.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-[10px] text-[#71717a] font-mono border-t border-[#27272a] pt-2">
            <span>UNTESTED DRAWDOWN: -4.2%</span>
            <span>DIVERSIFICATION SCORE: {portfolio.diversificationIndex}/100</span>
          </div>
        </div>

        {/* CARD 3: DECA Case Study Role Play (col-span-3) */}
        <div className="col-span-12 md:col-span-3 bg-[#18181b] border border-[#27272a] p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-[11px] font-bold text-[#71717a] uppercase tracking-wider mb-2">
              DECA Case Study: Role Play
            </h2>

            <div className="bg-[#09090b] border-l-2 border-[#eab308] p-3 mb-3 flex items-center justify-between">
              <div>
                <div className="text-[9px] text-[#eab308] font-bold uppercase font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Countdown Timer</span>
                </div>
                <div className="text-2xl font-mono font-bold tabular-nums text-white">
                  {formatTimer(roleplayTimerSeconds)}
                </div>
              </div>
              <button
                onClick={toggleTimer}
                className="bg-[#27272a] hover:bg-[#3f3f46] text-white px-2.5 py-1 text-[10px] font-mono font-bold uppercase cursor-pointer"
              >
                {isTimerRunning ? 'PAUSE' : 'START'}
              </button>
            </div>

            <div className="space-y-1.5 mb-3">
              <div className="text-[10px] uppercase text-[#71717a] font-mono">
                Performance Indicators (PIs)
              </div>
              <div className="text-[10px] p-2 border border-[#27272a] bg-[#09090b] rounded text-[#d4d4d8] font-mono">
                1. Explain nature of commercial debt restructuring.
              </div>
              <div className="text-[10px] p-2 border border-[#27272a] bg-[#09090b] rounded text-[#d4d4d8] font-mono">
                2. Calculate DSCR & Cash Flow deficits.
              </div>
              <div className="text-[10px] p-2 border border-[#27272a] bg-[#09090b] rounded text-[#d4d4d8] font-mono opacity-60">
                3. Formulate liquidity preservation plan.
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('deca_roleplay')}
            className="w-full bg-[#eab308] hover:bg-[#ca8a04] text-[#09090b] py-2 font-bold text-xs uppercase tracking-widest font-mono transition-colors cursor-pointer"
          >
            Submit Pitch Prep
          </button>
        </div>

        {/* CARD 4: Real Estate Quick Analysis (col-span-3) */}
        <div className="col-span-12 md:col-span-3 bg-[#18181b] border border-[#27272a] p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-[11px] font-bold text-[#71717a] uppercase tracking-wider mb-2">
              Real Estate Analysis
            </h2>
            <div className="text-xs font-bold text-white truncate mb-2 uppercase font-mono border-b border-[#27272a] pb-1">
              {midtownProp ? midtownProp.name : 'MIDTOWN COMMERCE PLAZA'}
            </div>

            <div className="space-y-1 text-[11px] font-mono">
              <div className="flex justify-between items-center">
                <span className="text-[#71717a]">NOI:</span>
                <span className="font-bold text-white">
                  {formatCurrency(midtownProp?.noiAnnual || 124500)}/yr
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#71717a]">DSCR:</span>
                <span
                  className={`font-bold ${
                    (midtownProp?.dscr || 1.42) >= 1.25 ? 'text-[#10b981]' : 'text-[#f43f5e]'
                  }`}
                >
                  {(midtownProp?.dscr || 1.42).toFixed(2)}x
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#71717a]">Cap Rate:</span>
                <span className="font-bold text-white">
                  {formatPercent(midtownProp?.capRate || 0.062, 1)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#71717a]">Levered Yield:</span>
                <span className="font-bold text-[#10b981]">
                  {formatPercent(midtownProp?.leveredCocr || 0.057, 1)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-3">
            <button
              onClick={() =>
                midtownProp && refinanceProperty(midtownProp.id, 0.048, 0.60)
              }
              className="flex-1 bg-[#27272a] hover:bg-[#3f3f46] text-white border border-[#27272a] py-1.5 text-[10px] font-bold font-mono transition-colors cursor-pointer"
            >
              REFY
            </button>
            <button
              onClick={() => midtownProp && sellProperty(midtownProp.id)}
              className="flex-1 bg-[#27272a] hover:bg-[#3f3f46] text-[#f43f5e] border border-[#27272a] py-1.5 text-[10px] font-bold font-mono transition-colors cursor-pointer"
            >
              SELL
            </button>
          </div>
        </div>

        {/* CARD 5: Transaction History (PostgreSQL Double-Entry Ledger) (col-span-6) */}
        <div className="col-span-12 md:col-span-6 bg-[#18181b] border border-[#27272a] p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-[11px] font-bold text-[#71717a] uppercase tracking-wider">
                Transaction History (PostgreSQL Ledger)
              </h2>
              <span className="text-[9px] font-mono text-[#10b981] bg-[#10b981]/10 px-1.5 py-0.5 rounded">
                DOUBLE-ENTRY VERIFIED
              </span>
            </div>

            <div className="text-[10px] font-mono space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {ledgerRecords.map((rec) => (
                <div
                  key={rec.id}
                  className="flex items-center gap-2 py-1 border-b border-[#27272a] text-[#fafafa] flex-wrap sm:flex-nowrap"
                >
                  <span className="text-[#71717a]">{rec.formattedTime}</span>
                  <span className="text-[#10b981] font-bold px-1 bg-[#10b981]/10">
                    {rec.accountDebited}
                  </span>
                  <span className="text-[#f43f5e] font-bold px-1 bg-[#f43f5e]/10">
                    {rec.accountCredited}
                  </span>
                  <span className="truncate text-xs text-[#d4d4d8]">
                    {rec.description}
                  </span>
                  <span className="ml-auto font-bold text-[#10b981]">
                    +{formatCurrency(rec.debitAmount)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-2 pt-1 border-t border-[#27272a] flex justify-between text-[9px] text-[#71717a] font-mono">
            <span>TABLE: ledger_entries</span>
            <span>AUDIT CHECKSUM: PASSED</span>
          </div>
        </div>

        {/* CARD 6: Exam Score Badge (col-span-3) */}
        <div className="col-span-12 md:col-span-3 bg-[#18181b] border border-[#27272a] p-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-[#71717a] uppercase font-mono">
              DECA Exam Score
            </span>
            <span className="text-2xl font-bold font-mono text-white">84/100</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-[#10b981] bg-[#10b981]/10 border border-[#10b981]/30 px-2 py-1 font-bold uppercase font-mono">
              Top 5% State
            </span>
            <button
              onClick={() => setActiveTab('deca_exams')}
              className="text-[9px] text-[#eab308] hover:underline mt-1 font-mono cursor-pointer"
            >
              Take Practice Exam →
            </button>
          </div>
        </div>
      </div>

      {/* Terminal Footer Bar */}
      <footer className="mt-2 flex flex-wrap items-center justify-between text-[10px] text-[#71717a] font-mono border-t border-[#27272a] pt-2">
        <div className="flex gap-4">
          <span>SESSION_ID: FJ82-99L1-P002</span>
          <span>DB_CONNECTION: REDIS_ACTIVE</span>
          <span>SIM_ENGINE: V3.4.1-STABLE</span>
        </div>
        <div className="flex gap-2 items-center">
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
          <span>LIVE MARKET FEED</span>
        </div>
      </footer>
    </div>
  );
};
