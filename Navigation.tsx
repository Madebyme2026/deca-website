import React from 'react';
import { useSimulationStore, NavTab, PlatformWing } from '../store/simulationStore';
import {
  LayoutGrid,
  Building2,
  TrendingUp,
  Briefcase,
  Award,
  Clock,
  FileText,
  Database,
  LineChart,
  Target,
  Columns,
  Sparkles,
  ChevronRight,
  ArrowLeftRight,
  BookOpen,
} from 'lucide-react';

export const Navigation: React.FC = () => {
  const { activeTab, setActiveTab, activeWing, setActiveWing } = useSimulationStore();

  // DECA dedicated tabs
  const decaTabs: { id: NavTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'deca_hub', label: 'DECA Command Hub', icon: <LayoutGrid className="w-3.5 h-3.5" /> },
    { id: 'deca_exams', label: '110-Question Exams', icon: <Award className="w-3.5 h-3.5" />, badge: '110 Qs' },
    { id: 'deca_roleplay', label: 'Roleplays', icon: <Clock className="w-3.5 h-3.5" />, badge: '21 Scenarios' },
    { id: 'deca_reports', label: 'Written Reports & Slides', icon: <FileText className="w-3.5 h-3.5" />, badge: '5/11/30 Pgs' },
    { id: 'deca_rubrics', label: 'PI Scoring Rubrics', icon: <Target className="w-3.5 h-3.5" />, badge: '100 Pts' },
  ];

  // Finance dedicated tabs
  const financeTabs: { id: NavTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'finance_hub', label: 'Finance Sandbox Hub', icon: <LayoutGrid className="w-3.5 h-3.5" /> },
    { id: 'stock_trading', label: 'Markets & Day Trading', icon: <LineChart className="w-3.5 h-3.5" />, badge: 'LIVE OHLCV' },
    { id: 'real_estate', label: 'Real Estate DCF', icon: <Building2 className="w-3.5 h-3.5" />, badge: 'Cap Rates' },
    { id: 'corporate_finance', label: 'Corporate Valuation', icon: <TrendingUp className="w-3.5 h-3.5" />, badge: 'M&A / WACC' },
    { id: 'portfolio', label: 'Portfolio Ledger', icon: <Briefcase className="w-3.5 h-3.5" />, badge: 'Double-Entry' },
    { id: 'sql_schema', label: 'SQL DB & Shocks', icon: <Database className="w-3.5 h-3.5" /> },
  ];

  // Split view tabs
  const splitTabs: { id: NavTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'split_hub', label: '50/50 Split Hub', icon: <Columns className="w-3.5 h-3.5" />, badge: 'DUAL' },
    { id: 'deca_hub', label: 'DECA Suite', icon: <Award className="w-3.5 h-3.5" /> },
    { id: 'deca_exams', label: '110 Exam Qs', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'deca_roleplay', label: 'Roleplays', icon: <Clock className="w-3.5 h-3.5" /> },
    { id: 'stock_trading', label: 'Live Day Trading', icon: <LineChart className="w-3.5 h-3.5" /> },
    { id: 'real_estate', label: 'Real Estate DCF', icon: <Building2 className="w-3.5 h-3.5" /> },
    { id: 'corporate_finance', label: 'Corp Valuation', icon: <TrendingUp className="w-3.5 h-3.5" /> },
    { id: 'portfolio', label: 'Ledger & Shocks', icon: <Briefcase className="w-3.5 h-3.5" /> },
  ];

  const currentTabs =
    activeWing === 'DECA'
      ? decaTabs
      : activeWing === 'FINANCE'
      ? financeTabs
      : splitTabs;

  const accentColor =
    activeWing === 'DECA'
      ? 'text-[#eab308]'
      : activeWing === 'FINANCE'
      ? 'text-[#10b981]'
      : 'text-[#eab308]';

  const badgeBg =
    activeWing === 'DECA'
      ? 'bg-[#eab308] text-[#09090b]'
      : activeWing === 'FINANCE'
      ? 'bg-[#10b981] text-[#09090b]'
      : 'bg-[#eab308] text-[#09090b]';

  return (
    <nav className="w-full bg-[#0d0e12] border-b border-[#27272a] sticky top-0 z-40 shadow-xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 flex items-center justify-between overflow-x-auto scrollbar-none py-1.5 gap-2">
        {/* Navigation Tabs List */}
        <div className="flex items-center gap-1 min-w-max">
          {/* Wing Indicator Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 bg-[#18181b] border border-[#27272a] rounded mr-1">
            <span
              className={`w-2 h-2 rounded-full ${
                activeWing === 'DECA'
                  ? 'bg-[#eab308]'
                  : activeWing === 'FINANCE'
                  ? 'bg-[#10b981]'
                  : 'bg-gradient-to-r from-[#eab308] to-[#10b981]'
              }`}
            ></span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white">
              {activeWing === 'DECA'
                ? 'DECA WING'
                : activeWing === 'FINANCE'
                ? 'FINANCE WING'
                : 'SPLIT MODE'}
            </span>
          </div>

          {currentTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-mono whitespace-nowrap transition-all rounded cursor-pointer ${
                  isActive
                    ? `bg-[#18181b] ${accentColor} font-bold border border-[#27272a] shadow-inner`
                    : 'text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#18181b]/60'
                }`}
              >
                <span className={isActive ? accentColor : 'text-[#71717a]'}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 uppercase font-bold rounded ${
                      isActive ? badgeBg : 'bg-[#27272a] text-[#a1a1aa]'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Wing Switcher Action */}
        <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-[#27272a] shrink-0">
          <button
            onClick={() => setActiveWing(activeWing === 'DECA' ? 'FINANCE' : 'DECA')}
            className="flex items-center gap-1.5 text-[11px] font-mono text-[#a1a1aa] hover:text-white bg-[#18181b] hover:bg-[#27272a] border border-[#27272a] px-2.5 py-1 rounded transition-colors cursor-pointer"
            title="Switch to opposite platform wing"
          >
            <ArrowLeftRight className="w-3 h-3 text-[#eab308]" />
            <span>Switch to {activeWing === 'DECA' ? 'Finance Wing' : 'DECA Wing'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
