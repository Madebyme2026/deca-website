import React from 'react';
import { useSimulationStore } from './store/simulationStore';
import { MarketTickerTape } from './components/MarketTickerTape';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { SplitHubOverview } from './components/bento/SplitHubOverview';
import { DecaHubModule } from './components/modules/deca/DecaHubModule';
import { DecaExamsModule } from './components/modules/deca/DecaExamsModule';
import { DecaRoleplayModule } from './components/modules/deca/DecaRoleplayModule';
import { DecaWrittenReportsModule } from './components/modules/deca/DecaWrittenReportsModule';
import { DecaRubricsModule } from './components/modules/deca/DecaRubricsModule';
import { FinanceHubModule } from './components/modules/FinanceHubModule';
import { StockTradingModule } from './components/modules/StockTradingModule';
import { RealEstateModule } from './components/modules/RealEstateModule';
import { CorporateFinanceModule } from './components/modules/CorporateFinanceModule';
import { PortfolioDashboardModule } from './components/modules/PortfolioDashboardModule';
import { SqlSchemaModal } from './components/modals/SqlSchemaModal';

export default function App() {
  const { activeTab } = useSimulationStore();

  return (
    <div className="bg-[#09090b] text-[#fafafa] font-sans min-h-screen w-full flex flex-col overflow-x-hidden selection:bg-[#eab308] selection:text-[#09090b]">
      {/* Real-time Top Web Ticker Tape */}
      <MarketTickerTape />

      {/* Main Website Navigation Header with 2-Way Dedicated Wing Switcher */}
      <Header />

      {/* Primary Sticky Wing-Aware Navigation Menu */}
      <Navigation />

      {/* Main Website Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-4 md:px-6 py-6 flex flex-col">
        {/* Split Hub 50/50 Overview */}
        {(activeTab === 'split_hub' || activeTab === 'bento') && <SplitHubOverview />}

        {/* 🏆 DECA Competition Wing Modules */}
        {activeTab === 'deca_hub' && <DecaHubModule />}
        {activeTab === 'deca_exams' && <DecaExamsModule />}
        {activeTab === 'deca_roleplay' && <DecaRoleplayModule />}
        {activeTab === 'deca_reports' && <DecaWrittenReportsModule />}
        {activeTab === 'deca_rubrics' && <DecaRubricsModule />}

        {/* 📈 Financial Simulation Wing Modules */}
        {activeTab === 'finance_hub' && <FinanceHubModule />}
        {activeTab === 'stock_trading' && <StockTradingModule />}
        {activeTab === 'real_estate' && <RealEstateModule />}
        {activeTab === 'corporate_finance' && <CorporateFinanceModule />}
        {activeTab === 'portfolio' && <PortfolioDashboardModule />}
        {activeTab === 'sql_schema' && <SqlSchemaModal />}
      </main>

      {/* Website Footer */}
      <Footer />
    </div>
  );
}
