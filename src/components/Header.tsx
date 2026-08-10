import React, { useState } from 'react';
import { useSimulationStore } from '../store/simulationStore';
import { formatCurrency } from '../utils/financialMath';
import { Play, Zap, Database, RotateCcw, Search, Globe, UserCheck, Terminal } from 'lucide-react';

export const Header: React.FC = () => {
  const { portfolio, advanceTick, triggerMacroEvent, setActiveTab, resetSimulation, stockCatalog } =
    useSimulationStore();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStocks = stockCatalog.filter(
    (s) =>
      s.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <header className="w-full bg-[#09090b] border-b border-[#27272a] text-[#fafafa] pt-3 pb-3 px-4 md:px-6">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Brand Logo & Website Title */}
        <div className="flex items-center gap-4">
          <div
            onClick={() => setActiveTab('bento')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="bg-[#eab308] text-[#09090b] px-3 py-1 font-black text-base tracking-tighter shadow-md group-hover:bg-[#fde047] transition-colors">
              DECA.FIN
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-white font-mono group-hover:text-[#eab308] transition-colors">
                FINANCIAL TERMINAL WEB
              </span>
              <span className="text-[10px] text-[#71717a] font-mono tracking-widest uppercase">
                Interactive Competition Platform
              </span>
            </div>
          </div>

          <div className="h-8 w-[1px] bg-[#27272a] hidden lg:block"></div>

          {/* Simulation State Counter Pill */}
          <div className="hidden lg:flex flex-col bg-[#18181b] border border-[#27272a] px-3 py-1 rounded">
            <span className="text-[9px] text-[#71717a] font-mono uppercase tracking-wider">
              Simulation Time Clock
            </span>
            <span className="text-xs font-bold font-mono text-[#eab308]">
              YEAR {String(portfolio.currentYear).padStart(2, '0')} · Q
              {portfolio.currentQuarter} · TICK #{String(portfolio.currentTick).padStart(3, '0')}
            </span>
          </div>
        </div>

        {/* Center/Right Section: Quick Search & Live Portfolio Balances */}
        <div className="flex flex-wrap items-center gap-4 ml-auto">
          {/* Quick Stock/Asset Search Modal Trigger */}
          <div className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex items-center gap-2 bg-[#18181b] hover:bg-[#27272a] text-[#a1a1aa] hover:text-white border border-[#27272a] px-3 py-1.5 rounded text-xs font-mono transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-[#eab308]" />
              <span className="hidden sm:inline">Search Assets...</span>
              <kbd className="hidden sm:inline bg-[#27272a] text-[#71717a] px-1.5 py-0.2 text-[9px] rounded font-mono">
                ⌘K
              </kbd>
            </button>

            {searchOpen && (
              <div className="absolute top-10 right-0 w-72 bg-[#0d0e12] border border-[#27272a] shadow-2xl rounded p-2 z-50">
                <input
                  type="text"
                  placeholder="Type ticker or name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                  className="w-full bg-[#18181b] border border-[#27272a] px-2.5 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-[#eab308] rounded mb-2"
                />
                <div className="max-h-48 overflow-y-auto scrollbar-thin space-y-1">
                  {filteredStocks.map((stock) => (
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
                            stock.change24hPct >= 0
                              ? 'text-[#10b981]'
                              : 'text-[#ef4444]'
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

          {/* Live Net Worth (Double-Entry Ledger) */}
          <div className="text-right hidden sm:block">
            <div className="text-[9px] text-[#71717a] uppercase font-mono tracking-wider">
              Total Portfolio Net Worth
            </div>
            <div className="text-base font-bold text-[#10b981] leading-none font-mono">
              {formatCurrency(portfolio.totalPortfolioValue)}
            </div>
          </div>

          <div className="h-7 w-[1px] bg-[#27272a] hidden sm:block"></div>

          {/* Settled Cash */}
          <div className="text-right hidden sm:block">
            <div className="text-[9px] text-[#71717a] uppercase font-mono tracking-wider">
              Settled Cash
            </div>
            <div className="text-base font-bold leading-none font-mono text-white">
              {formatCurrency(portfolio.cashBalance)}
            </div>
          </div>

          <div className="h-7 w-[1px] bg-[#27272a] hidden sm:block"></div>

          {/* Simulation Action Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={advanceTick}
              className="flex items-center gap-1.5 bg-[#eab308] hover:bg-[#ca8a04] text-[#09090b] px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
              title="Advance 1 Tick / Quarter in simulation"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Next Tick</span>
            </button>

            <button
              onClick={() => triggerMacroEvent('INFLATION_SPIKE')}
              className="flex items-center gap-1 bg-[#27272a] hover:bg-[#3f3f46] text-[#f43f5e] border border-[#f43f5e]/40 px-2.5 py-1.5 rounded text-xs font-mono font-semibold transition-colors cursor-pointer"
              title="Simulate Rate Hike Inflation Shock"
            >
              <Zap className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Shock Test</span>
            </button>

            <button
              onClick={() => setActiveTab('sql_schema')}
              className="flex items-center gap-1 bg-[#18181b] hover:bg-[#27272a] text-[#71717a] hover:text-white border border-[#27272a] px-2.5 py-1.5 rounded text-xs font-mono transition-colors cursor-pointer"
              title="View PostgreSQL Database Schema & Queries"
            >
              <Database className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">SQL DB</span>
            </button>

            <button
              onClick={resetSimulation}
              className="p-1.5 text-[#71717a] hover:text-white hover:bg-[#27272a] border border-[#27272a] rounded transition-colors cursor-pointer"
              title="Reset Simulation State"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
