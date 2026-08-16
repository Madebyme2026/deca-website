import React from 'react';
import { useSimulationStore } from '../store/simulationStore';
import {
  TrendingUp,
  Award,
  BookOpen,
  Database,
  Building2,
  Terminal,
  ExternalLink,
  ShieldAlert,
  Zap,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useSimulationStore();

  return (
    <footer className="w-full bg-[#09090b] border-t border-[#27272a] text-[#71717a] font-mono text-xs mt-12 pt-8 pb-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        {/* Brand Column */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="bg-[#eab308] text-[#09090b] font-bold px-2 py-0.5 text-sm tracking-tighter">
              DECA.FIN
            </span>
            <span className="text-white font-bold text-sm tracking-wide">
              FINANCIAL TERMINAL
            </span>
          </div>
          <p className="text-[#a1a1aa] text-[11px] leading-relaxed">
            High-Performance Financial Literacy & DECA Competition Platform.
            Simulates Wall Street trading desks, commercial real estate underwriting,
            discounted cash flow (DCF) models, double-entry general ledgers, and
            AI-powered DECA roleplays.
          </p>
          <div className="flex items-center gap-2 text-[10px] text-[#eab308] mt-1">
            <Zap className="w-3.5 h-3.5" />
            <span>Built for High School & Collegiate DECA Competitors</span>
          </div>
        </div>

        {/* Column 2: Terminal Modules */}
        <div className="flex flex-col gap-2">
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-[#eab308]" />
            <span>Terminal Modules</span>
          </h4>
          <button
            onClick={() => setActiveTab('bento')}
            className="text-left hover:text-white transition-colors cursor-pointer text-[11px]"
          >
            • Bento Command Hub
          </button>
          <button
            onClick={() => setActiveTab('stock_trading')}
            className="text-left hover:text-white transition-colors cursor-pointer text-[11px]"
          >
            • Day Trading & Candlestick Charts
          </button>
          <button
            onClick={() => setActiveTab('real_estate')}
            className="text-left hover:text-white transition-colors cursor-pointer text-[11px]"
          >
            • Real Estate Cap Rate & Cash Flow
          </button>
          <button
            onClick={() => setActiveTab('corporate_finance')}
            className="text-left hover:text-white transition-colors cursor-pointer text-[11px]"
          >
            • Corporate DCF & WACC Valuation
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className="text-left hover:text-white transition-colors cursor-pointer text-[11px]"
          >
            • General Ledger & Portfolio Audit
          </button>
        </div>

        {/* Column 3: DECA Competition Suite */}
        <div className="flex flex-col gap-2">
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[#eab308]" />
            <span>DECA Competition Hub</span>
          </h4>
          <button
            onClick={() => setActiveTab('deca_exams')}
            className="text-left hover:text-white transition-colors cursor-pointer text-[11px]"
          >
            • Finance Cluster Exams (100 Qs)
          </button>
          <button
            onClick={() => setActiveTab('deca_roleplay')}
            className="text-left hover:text-white transition-colors cursor-pointer text-[11px]"
          >
            • 15-Minute Role-Play AI Judge
          </button>
          <button
            onClick={() => setActiveTab('deca_reports')}
            className="text-left hover:text-white transition-colors cursor-pointer text-[11px]"
          >
            • Written Business Plans & Rubrics
          </button>
          <button
            onClick={() => setActiveTab('sql_schema')}
            className="text-left hover:text-white transition-colors cursor-pointer text-[11px]"
          >
            • PostgreSQL Ledger Database Schema
          </button>
        </div>

        {/* Column 4: Platform Engine Specs */}
        <div className="flex flex-col gap-2">
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-[#eab308]" />
            <span>Engine & Architecture</span>
          </h4>
          <div className="bg-[#18181b] border border-[#27272a] p-2.5 rounded text-[10px] space-y-1.5 text-[#a1a1aa]">
            <div className="flex justify-between">
              <span>Accounting Standard:</span>
              <strong className="text-white">GAAP Double-Entry</strong>
            </div>
            <div className="flex justify-between">
              <span>Database Architecture:</span>
              <strong className="text-white">Cloud SQL PostgreSQL</strong>
            </div>
            <div className="flex justify-between">
              <span>Financial Math Engine:</span>
              <strong className="text-white">Black-Scholes & DCF</strong>
            </div>
            <div className="flex justify-between">
              <span>Market Data Latency:</span>
              <strong className="text-[#10b981]">&lt; 1ms Real-Time</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Disclaimer Row */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-[#27272a] flex flex-col md:flex-row items-center justify-between gap-4 text-[10px]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#10b981] inline-block animate-pulse"></span>
          <span className="text-[#a1a1aa]">
            System Status: <strong>All Simulation Servers Operational</strong>
          </span>
        </div>

        <div className="text-[#71717a] text-center md:text-right">
          © 2026 DECA.FIN Web Terminal Platform. Built for educational & financial literacy simulation.
        </div>
      </div>
    </footer>
  );
};
