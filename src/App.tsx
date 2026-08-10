import React from 'react';
import { useSimulationStore } from './store/simulationStore';
import { MarketTickerTape } from './components/MarketTickerTape';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { MainBentoGrid } from './components/bento/MainBentoGrid';
import { RealEstateModule } from './components/modules/RealEstateModule';
import { CorporateFinanceModule } from './components/modules/CorporateFinanceModule';
import { StockTradingModule } from './components/modules/StockTradingModule';
import { PortfolioDashboardModule } from './components/modules/PortfolioDashboardModule';
import { DecaExamsModule } from './components/modules/deca/DecaExamsModule';
import { DecaRoleplayModule } from './components/modules/deca/DecaRoleplayModule';
import { DecaWrittenReportsModule } from './components/modules/deca/DecaWrittenReportsModule';
import { SqlSchemaModal } from './components/modals/SqlSchemaModal';

export default function App() {
  const { activeTab } = useSimulationStore();

  return (
    <div className="bg-[#09090b] text-[#fafafa] font-sans min-h-screen w-full flex flex-col overflow-x-hidden selection:bg-[#eab308] selection:text-[#09090b]">
      {/* Real-time Top Web Ticker Tape */}
      <MarketTickerTape />

      {/* Main Website Navigation Header */}
      <Header />

      {/* Primary Sticky Web Navigation Menu */}
      <Navigation />

      {/* Main Website Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-4 md:px-6 py-6 flex flex-col">
        {activeTab === 'bento' && <MainBentoGrid />}
        {activeTab === 'stock_trading' && <StockTradingModule />}
        {activeTab === 'real_estate' && <RealEstateModule />}
        {activeTab === 'corporate_finance' && <CorporateFinanceModule />}
        {activeTab === 'portfolio' && <PortfolioDashboardModule />}
        {activeTab === 'deca_exams' && <DecaExamsModule />}
        {activeTab === 'deca_roleplay' && <DecaRoleplayModule />}
        {activeTab === 'deca_reports' && <DecaWrittenReportsModule />}
        {activeTab === 'sql_schema' && <SqlSchemaModal />}
      </main>

      {/* Website Footer */}
      <Footer />
    </div>
  );
}
