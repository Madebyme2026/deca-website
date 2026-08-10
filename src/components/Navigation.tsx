import React from 'react';
import { useSimulationStore, NavTab } from '../store/simulationStore';
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
  Compass,
} from 'lucide-react';

export const Navigation: React.FC = () => {
  const { activeTab, setActiveTab } = useSimulationStore();

  const primaryTabs: { id: NavTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'bento', label: 'Terminal Hub', icon: <LayoutGrid className="w-3.5 h-3.5" /> },
    { id: 'stock_trading', label: 'Markets & Trading', icon: <LineChart className="w-3.5 h-3.5" />, badge: 'LIVE' },
    { id: 'real_estate', label: 'Real Estate DCF', icon: <Building2 className="w-3.5 h-3.5" /> },
    { id: 'corporate_finance', label: 'Corporate Valuation', icon: <TrendingUp className="w-3.5 h-3.5" /> },
    { id: 'portfolio', label: 'Portfolio Ledger', icon: <Briefcase className="w-3.5 h-3.5" /> },
    { id: 'deca_exams', label: 'DECA Exams', icon: <Award className="w-3.5 h-3.5" />, badge: '100 Qs' },
    { id: 'deca_roleplay', label: 'DECA Role-Play', icon: <Clock className="w-3.5 h-3.5" />, badge: '15:00' },
    { id: 'deca_reports', label: 'Written Reports', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'sql_schema', label: 'SQL DB Schema', icon: <Database className="w-3.5 h-3.5" /> },
  ];

  return (
    <nav className="w-full bg-[#0d0e12] border-b border-[#27272a] sticky top-0 z-40 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between overflow-x-auto scrollbar-none py-1.5">
        <div className="flex items-center gap-1 min-w-max">
          {primaryTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 text-xs font-mono whitespace-nowrap transition-all rounded cursor-pointer ${
                  isActive
                    ? 'bg-[#18181b] text-[#eab308] font-bold border border-[#27272a] shadow-inner'
                    : 'text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#18181b]/60'
                }`}
              >
                <span className={isActive ? 'text-[#eab308]' : 'text-[#71717a]'}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 uppercase font-bold rounded ${
                      isActive
                        ? 'bg-[#eab308] text-[#09090b]'
                        : 'bg-[#27272a] text-[#a1a1aa]'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="hidden xl:flex items-center gap-2 text-[10px] font-mono text-[#71717a] border-l border-[#27272a] pl-4">
          <Compass className="w-3.5 h-3.5 text-[#eab308]" />
          <span>DECA FIN-SIM v3.4</span>
        </div>
      </div>
    </nav>
  );
};
