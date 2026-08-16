import React, { useState } from 'react';
import { useSimulationStore } from '../store/simulationStore';
import { formatCurrency, formatPercent } from '../utils/financialMath';
import {
  Play,
  Zap,
  Database,
  RotateCcw,
  Search,
  Award,
  LineChart,
  Layers,
  Clock,
  BookOpen,
  Sparkles,
  Columns,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeWing,
    setActiveWing,
    activeTab,
    setActiveTab,
    portfolio,
    macroState,
    advanceTick,
    triggerMacroEvent,
    resetSimulation,
    stockCatalog,
    examQuestions,
    currentCaseStudy,
    roleplayTimerSeconds,
  } = useSimulationStore();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStocks = stockCatalog.filter(
    (s) =>
      s.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <header className="w-full bg-[#09090b] border-b border-[#27272a] text-[#fafafa] pt-3 pb-3 px-3 sm:px-4 md:px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-3">
        {/* Top / Left Section: Brand Logo & Website Title */}
        <div className="flex items-center justify-between w-full lg:w-auto gap-3">
          <div
            onClick={() => setActiveWing('SPLIT')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="bg-gradient-to-br from-[#eab308] to-[#ca8a04] text-[#09090b] px-3 py-1 font-black text-base tracking-tighter shadow-md group-hover:brightness-110 transition-all rounded">
              DECA.FIN
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-white font-mono group-hover:text-[#eab308] transition-colors flex items-center gap-1.5">
                <span>COMPETITION & FIN-SIM</span>
                <span className="text-[9px] bg-[#27272a] text-[#a1a1aa] px-1.5 py-0.2 rounded uppercase font-semibold">
                  DUAL WING
                </span>
              </span>
              <span className="text-[10px] text-[#71717a] font-mono tracking-widest uppercase">
                DECA Arena · Market Terminal
              </span>
            </div>
          </div>

          {/* Quick Split / 50-50 shortcut button */}
          <button
            onClick={() => setActiveWing('SPLIT')}
            className={`lg:hidden flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded border transition-colors cursor-pointer ${
              activeWing === 'SPLIT'
                ? 'bg-[#27272a] text-white border-[#3f3f46]'
                : 'text-[#71717a] border-[#27272a] hover:text-white'
            }`}
          >
            <Columns className="w-3 h-3" />
            <span>Split Hub</span>
          </button>
        </div>

        {/* Center: THE TWO DEDICATED HALVES TOGGLE */}
        <div className="flex items-center bg-[#121318] border-2 border-[#27272a] p-1 rounded-xl shadow-inner w-full lg:w-auto justify-center">
          {/* HALF 1: DECA Competition Suite */}
          <button
            onClick={() => setActiveWing('DECA')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              activeWing === 'DECA'
                ? 'bg-[#eab308] text-[#09090b] shadow-md scale-[1.02]'
                : 'text-[#d4d4d8] hover:text-white hover:bg-[#18181b]'
            }`}
          >
            <Award className="w-4 h-4 shrink-0" />
            <span className="tracking-tight">DECA Competition Suite</span>
            <span
              className={`text-[9px] px-1.5 py-0.2 rounded font-mono uppercase font-black ${
                activeWing === 'DECA'
                  ? 'bg-[#09090b] text-[#eab308]'
                  : 'bg-[#27272a] text-[#a1a1aa]'
              }`}
            >
              110 Qs · Roleplays
            </span>
          </button>

          {/* SPLIT HUB BUTTON */}
          <button
            onClick={() => setActiveWing('SPLIT')}
            className={`hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer mx-0.5 ${
              activeWing === 'SPLIT'
                ? 'bg-[#27272a] text-[#fafafa] font-bold shadow-inner'
                : 'text-[#71717a] hover:text-white hover:bg-[#18181b]'
            }`}
            title="View Both Halves 50/50 Side-by-Side"
          >
            <Columns className="w-3.5 h-3.5" />
            <span>50/50 Split</span>
          </button>

          {/* HALF 2: Financial Simulation Sandbox */}
          <button
            onClick={() => setActiveWing('FINANCE')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              activeWing === 'FINANCE'
                ? 'bg-[#10b981] text-[#09090b] shadow-md scale-[1.02]'
                : 'text-[#d4d4d8] hover:text-white hover:bg-[#18181b]'
            }`}
          >
            <LineChart className="w-4 h-4 shrink-0" />
            <span className="tracking-tight">Financial Simulation Wing</span>
            <span
              className={`text-[9px] px-1.5 py-0.2 rounded font-mono uppercase font-black ${
                activeWing === 'FINANCE'
                  ? 'bg-[#09090b] text-[#10b981]'
                  : 'bg-[#27272a] text-[#a1a1aa]'
              }`}
            >
              Trading & DCF
            </span>
          </button>
        </div>

        {/* Right Section: Contextual KPIs and Action Buttons */}
        <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
          {/* Contextual KPIs based on Active Wing */}
          {activeWing === 'DECA' ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-[9px] text-[#71717a] uppercase font-mono tracking-wider">
                  DECA Prep Timer
                </span>
                <span className="text-xs font-bold font-mono text-[#eab308] flex items-center justify-end gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{formatTimer(roleplayTimerSeconds)}</span>
                </span>
              </div>

              <div className="h-6 w-[1px] bg-[#27272a] hidden sm:block"></div>

              <div className="hidden md:flex flex-col text-right">
                <span className="text-[9px] text-[#71717a] uppercase font-mono tracking-wider">
                  Active Scenario
                </span>
                <span className="text-xs font-bold font-mono text-white max-w-[140px] truncate">
                  {currentCaseStudy.title.split(':')[0]}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-[9px] text-[#71717a] uppercase font-mono tracking-wider">
                  Net Worth
                </span>
                <span className="text-xs font-bold font-mono text-[#10b981]">
                  {formatCurrency(portfolio.totalPortfolioValue)}
                </span>
              </div>

              <div className="h-6 w-[1px] bg-[#27272a] hidden sm:block"></div>

              <div className="hidden sm:flex flex-col text-right">
                <span className="text-[9px] text-[#71717a] uppercase font-mono tracking-wider">
                  Settled Cash
                </span>
                <span className="text-xs font-bold font-mono text-white">
                  {formatCurrency(portfolio.cashBalance)}
                </span>
              </div>

              <div className="h-6 w-[1px] bg-[#27272a] hidden sm:block"></div>

              {/* Simulation Advance Tick */}
              <button
                onClick={advanceTick}
                className="flex items-center gap-1.5 bg-[#10b981] hover:bg-[#059669] text-[#09090b] px-3 py-1.5 rounded text-xs font-bold font-mono uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
                title="Advance 1 Tick in Financial Simulation"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span className="hidden sm:inline">Tick #</span>
                <span>{portfolio.currentTick}</span>
              </button>
            </div>
          )}

          {/* Search Trigger */}
          <div className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex items-center gap-1.5 bg-[#18181b] hover:bg-[#27272a] text-[#a1a1aa] hover:text-white border border-[#27272a] px-2.5 py-1.5 rounded text-xs font-mono transition-colors cursor-pointer"
              title="Search Assets, Tickers or Scenarios"
            >
              <Search className="w-3.5 h-3.5 text-[#eab308]" />
              <span className="hidden xl:inline">Search</span>
            </button>

            {searchOpen && (
              <div className="absolute top-10 right-0 w-72 bg-[#0d0e12] border border-[#27272a] shadow-2xl rounded-lg p-2 z-50">
                <input
                  type="text"
                  placeholder="Type ticker, exam cluster, or scenario..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                  className="w-full bg-[#18181b] border border-[#27272a] px-2.5 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-[#eab308] rounded mb-2"
                />
                <div className="max-h-52 overflow-y-auto scrollbar-thin space-y-1">
                  <div className="text-[9px] font-mono text-[#71717a] uppercase px-1">Stocks & Assets</div>
                  {filteredStocks.slice(0, 5).map((stock) => (
                    <div
                      key={stock.ticker}
                      onClick={() => {
                        setActiveTab('stock_trading');
                        setSearchOpen(false);
                      }}
                      className="flex items-center justify-between p-1.5 hover:bg-[#18181b] rounded cursor-pointer text-xs font-mono"
                    >
                      <div>
                        <div className="text-white font-bold">{stock.ticker}</div>
                        <div className="text-[10px] text-[#71717a]">{stock.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white">${stock.price.toFixed(2)}</div>
                        <div
                          className={`text-[10px] ${
                            stock.change24hPct >= 0 ? 'text-[#10b981]' : 'text-[#ef4444]'
                          }`}
                        >
                          {stock.change24hPct >= 0 ? '+' : ''}
                          {stock.change24hPct.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Reset State Button */}
          <button
            onClick={resetSimulation}
            className="p-1.5 text-[#71717a] hover:text-white hover:bg-[#27272a] border border-[#27272a] rounded transition-colors cursor-pointer"
            title="Reset Simulation State"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
