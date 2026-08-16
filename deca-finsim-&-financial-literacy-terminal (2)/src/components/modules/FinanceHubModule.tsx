import React from 'react';
import { useSimulationStore } from '../../store/simulationStore';
import { formatCurrency, formatPercent } from '../../utils/financialMath';
import {
  LineChart,
  Building2,
  TrendingUp,
  Briefcase,
  Play,
  Zap,
  RotateCcw,
  Database,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  AlertTriangle,
  Layers,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Compass,
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export const FinanceHubModule: React.FC = () => {
  const {
    macroState,
    portfolio,
    investments,
    ledgerRecords,
    stockCatalog,
    setActiveTab,
    advanceTick,
    triggerMacroEvent,
  } = useSimulationStore();

  const realEstateProps = investments.filter((i) => i.assetClass === 'REAL_ESTATE');
  const equityHoldings = investments.filter((i) => i.assetClass === 'EQUITY');

  // Chart data
  const chartData = [
    { time: 'Q1', portfolio: 2100000 },
    { time: 'Q2', portfolio: 2150000 },
    { time: 'Q3', portfolio: 2120000 },
    { time: 'Q4', portfolio: 2240000 },
    { time: 'Q5', portfolio: 2310000 },
    { time: 'Q6', portfolio: 2380000 },
    { time: 'Q7', portfolio: portfolio.totalPortfolioValue },
  ];

  return (
    <div className="flex flex-col flex-1 gap-5 w-full animate-fadeIn">
      {/* Finance Hero Banner */}
      <div className="bg-[#121318] border-2 border-[#10b981]/40 p-5 sm:p-6 rounded-xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#10b981]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-[#10b981] text-[#09090b] px-2.5 py-0.5 rounded font-black text-xs font-mono uppercase tracking-wider">
              FINANCE WING
            </span>
            <span className="text-xs font-mono text-[#10b981] font-bold">
              INSTITUTIONAL QUANTITATIVE SIMULATION SANDBOX
            </span>
          </div>
          <h1 className="text-xl sm:text-3xl font-black text-white tracking-tight">
            Financial Simulation & Trading Sandbox
          </h1>
          <p className="text-xs sm:text-sm text-[#d4d4d8] mt-1 leading-relaxed">
            Welcome to the dedicated Financial Simulation Wing. Practice equity day trading with candlestick charting, analyze multi-family real estate rent rolls and debt coverage (DSCR), run corporate DCF valuations, and stress-test double-entry balance sheets.
          </p>
        </div>

        {/* Quick Launch Buttons */}
        <div className="flex flex-wrap md:flex-col gap-2 w-full md:w-auto shrink-0 relative z-10">
          <button
            onClick={() => setActiveTab('stock_trading')}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#10b981] hover:bg-[#059669] text-[#09090b] px-4 py-2.5 rounded-lg text-xs font-bold font-mono uppercase tracking-wider transition-all shadow-md cursor-pointer"
          >
            <LineChart className="w-4 h-4" />
            <span>Open Day Trading</span>
          </button>
          <button
            onClick={() => setActiveTab('real_estate')}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#18181b] hover:bg-[#27272a] text-[#fafafa] border border-[#10b981]/40 hover:border-[#10b981] px-4 py-2.5 rounded-lg text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer"
          >
            <Building2 className="w-4 h-4 text-[#10b981]" />
            <span>Underwrite Real Estate</span>
          </button>
        </div>
      </div>

      {/* 4 Financial Modules Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Stock Day Trading */}
        <div
          onClick={() => setActiveTab('stock_trading')}
          className="bg-[#18181b] hover:bg-[#202024] border border-[#27272a] hover:border-[#10b981]/60 p-4 rounded-xl cursor-pointer transition-all flex flex-col justify-between group shadow-lg"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 bg-[#10b981]/10 text-[#10b981] rounded-lg">
                <LineChart className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded font-bold">
                CANDLESTICK OHLCV
              </span>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-[#10b981] transition-colors mb-1">
              Markets & Day Trading
            </h3>
            <p className="text-xs text-[#a1a1aa] leading-relaxed">
              Multi-timeframe charting (1m to ALL), EMA/SMA/Bollinger overlays, order book depth, and limit/stop-loss paper execution.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#27272a] flex items-center justify-between text-xs font-mono text-[#10b981]">
            <span>Launch Terminal</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 2: Commercial Real Estate DCF */}
        <div
          onClick={() => setActiveTab('real_estate')}
          className="bg-[#18181b] hover:bg-[#202024] border border-[#27272a] hover:border-[#06b6d4]/60 p-4 rounded-xl cursor-pointer transition-all flex flex-col justify-between group shadow-lg"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 bg-[#06b6d4]/10 text-[#06b6d4] rounded-lg">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-[#06b6d4] bg-[#06b6d4]/10 px-2 py-0.5 rounded font-bold">
                CAP RATE & DSCR
              </span>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-[#06b6d4] transition-colors mb-1">
              Real Estate Underwriting
            </h3>
            <p className="text-xs text-[#a1a1aa] leading-relaxed">
              Model rent rolls, operating expenses, cash-on-cash yields, mortgage amortization, property appreciation, and refinancing.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#27272a] flex items-center justify-between text-xs font-mono text-[#06b6d4]">
            <span>Analyze Properties</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 3: Corporate Finance Valuation */}
        <div
          onClick={() => setActiveTab('corporate_finance')}
          className="bg-[#18181b] hover:bg-[#202024] border border-[#27272a] hover:border-[#3b82f6]/60 p-4 rounded-xl cursor-pointer transition-all flex flex-col justify-between group shadow-lg"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 bg-[#3b82f6]/10 text-[#3b82f6] rounded-lg">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-[#3b82f6] bg-[#3b82f6]/10 px-2 py-0.5 rounded font-bold">
                DCF & WACC
              </span>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-[#3b82f6] transition-colors mb-1">
              Corporate Valuation & M&A
            </h3>
            <p className="text-xs text-[#a1a1aa] leading-relaxed">
              Model Free Cash Flow to Firm (FCFF), Weighted Average Cost of Capital, and optimize capital allocation across dividends and buybacks.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#27272a] flex items-center justify-between text-xs font-mono text-[#3b82f6]">
            <span>Value Companies</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 4: Portfolio Ledger & Shocks */}
        <div
          onClick={() => setActiveTab('portfolio')}
          className="bg-[#18181b] hover:bg-[#202024] border border-[#27272a] hover:border-[#a855f7]/60 p-4 rounded-xl cursor-pointer transition-all flex flex-col justify-between group shadow-lg"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 bg-[#a855f7]/10 text-[#a855f7] rounded-lg">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-[#a855f7] bg-[#a855f7]/10 px-2 py-0.5 rounded font-bold">
                DOUBLE-ENTRY
              </span>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-[#a855f7] transition-colors mb-1">
              Portfolio Ledger & Balance Sheet
            </h3>
            <p className="text-xs text-[#a1a1aa] leading-relaxed">
              Review double-entry accounting records, trigger macro inflation/rate shocks, and inspect your balance sheet and cash flows.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#27272a] flex items-center justify-between text-xs font-mono text-[#a855f7]">
            <span>View Ledger</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Mid Section: Portfolio Value Chart + Macroeconomic Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Net Worth Trajectory Chart (col-span-7) */}
        <div className="lg:col-span-7 bg-[#18181b] border border-[#27272a] p-4 sm:p-5 rounded-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-[#27272a] pb-2">
              <div>
                <span className="text-[10px] font-mono text-[#71717a] uppercase">Double-Entry Net Worth</span>
                <div className="text-xl font-bold font-mono text-[#10b981]">
                  {formatCurrency(portfolio.totalPortfolioValue)}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={advanceTick}
                  className="flex items-center gap-1 bg-[#10b981] hover:bg-[#059669] text-[#09090b] px-3 py-1.5 rounded text-xs font-bold font-mono uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Next Tick</span>
                </button>
              </div>
            </div>

            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="finGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#71717a" fontSize={10} fontStyle="mono" />
                  <YAxis
                    stroke="#71717a"
                    fontSize={10}
                    fontStyle="mono"
                    tickFormatter={(val) => `$${(val / 1000000).toFixed(1)}M`}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '6px', fontSize: '11px', fontFamily: 'monospace' }}
                    formatter={(value: any) => [formatCurrency(Number(value)), 'Net Worth']}
                  />
                  <Area type="monotone" dataKey="portfolio" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#finGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-[#27272a] flex items-center justify-between text-xs font-mono text-[#71717a]">
            <span>Year {portfolio.currentYear} · Quarter {portfolio.currentQuarter} · Tick #{portfolio.currentTick}</span>
            <span className="text-[#10b981] font-bold">Settled Cash: {formatCurrency(portfolio.cashBalance)}</span>
          </div>
        </div>

        {/* Right: Macroeconomic Indicators & Shock Triggers (col-span-5) */}
        <div className="lg:col-span-5 bg-[#18181b] border border-[#27272a] p-4 sm:p-5 rounded-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-[#27272a] pb-2">
              <h2 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Macroeconomic Engine
              </h2>
              <span className="text-[10px] text-[#eab308] font-mono font-bold">ACTIVE</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-[#09090b] border border-[#27272a] p-3 rounded-lg">
                <div className="text-[10px] text-[#71717a] font-mono uppercase">Inflation Rate</div>
                <div className="text-base font-bold font-mono text-white flex items-center justify-between mt-0.5">
                  <span>{formatPercent(macroState.inflationRate, 2)}</span>
                  <span className="text-[#f43f5e] text-xs font-normal">+{formatPercent(macroState.inflationDelta, 1)}</span>
                </div>
              </div>

              <div className="bg-[#09090b] border border-[#27272a] p-3 rounded-lg">
                <div className="text-[10px] text-[#71717a] font-mono uppercase">Fed Funds Rate</div>
                <div className="text-base font-bold font-mono text-white mt-0.5">
                  {formatPercent(macroState.fedFundsRate, 2)}
                </div>
              </div>
            </div>

            <div className="text-[11px] font-mono text-[#71717a] uppercase tracking-wider mb-2">
              Stress Test Macro Shocks
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => triggerMacroEvent('INFLATION_SPIKE')}
                className="bg-[#09090b] hover:bg-[#18181b] border border-[#f43f5e]/40 hover:border-[#f43f5e] p-2 rounded text-left transition-colors cursor-pointer"
              >
                <div className="text-xs font-bold text-[#f43f5e] flex items-center gap-1 font-mono">
                  <Zap className="w-3 h-3" />
                  <span>Inflation Shock</span>
                </div>
                <div className="text-[10px] text-[#71717a]">+1.8% CPI jump</div>
              </button>

              <button
                onClick={() => triggerMacroEvent('RECESSION')}
                className="bg-[#09090b] hover:bg-[#18181b] border border-[#eab308]/40 hover:border-[#eab308] p-2 rounded text-left transition-colors cursor-pointer"
              >
                <div className="text-xs font-bold text-[#eab308] flex items-center gap-1 font-mono">
                  <AlertTriangle className="w-3 h-3" />
                  <span>Recession Test</span>
                </div>
                <div className="text-[10px] text-[#71717a]">Demand contraction</div>
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#27272a] flex items-center justify-between">
            <button
              onClick={() => setActiveTab('sql_schema')}
              className="text-xs font-bold font-mono text-[#71717a] hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <Database className="w-3.5 h-3.5" />
              <span>SQL PostgreSQL Schema</span>
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className="text-xs font-bold font-mono text-[#10b981] hover:text-[#34d399] flex items-center gap-1 cursor-pointer"
            >
              <span>Full Ledger</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
