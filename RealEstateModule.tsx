import React, { useState } from 'react';
import { useSimulationStore } from '../../store/simulationStore';
import { calculateRealEstateDeal, formatCurrency, formatPercent } from '../../utils/financialMath';
import { RealEstateCatalogItem, RealEstatePropertyType, Investment } from '../../types/financial';
import {
  Building2,
  AlertTriangle,
  Calculator,
  Zap,
  Plus,
  Check,
  TrendingUp,
  Receipt,
  PieChart as PieIcon,
  Search,
  Filter,
  DollarSign,
  Briefcase,
  ArrowUpRight,
  ShieldAlert,
  BarChart3,
  RefreshCw,
  Trash2,
  Layers,
  Sparkles,
  ArrowDownRight,
  Home,
  CheckCircle2,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from 'recharts';

export const RealEstateModule: React.FC = () => {
  const {
    investments,
    realEstateCatalog,
    buyRealEstateProperty,
    reinvestCapExProperty,
    payOffPropertyMortgagePrincipal,
    refinanceProperty,
    sellProperty,
    triggerMacroEvent,
    macroState,
    portfolio,
  } = useSimulationStore();

  // Primary Module Tab State
  const [activeTab, setActiveTab] = useState<'catalog' | 'calculator' | 'portfolio' | 'stresstest'>('catalog');

  // Filter State for Catalog
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<RealEstatePropertyType | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Underwriting Calculator Input State
  const [propertyName, setPropertyName] = useState('Apex Residential Tower');
  const [propertyType, setPropertyType] = useState<RealEstatePropertyType>('MULTIFAMILY');
  const [propertyAddress, setPropertyAddress] = useState('482 Metro Parkway, Sector 4');
  const [unitsOrSqft, setUnitsOrSqft] = useState('48 Units');
  const [purchasePrice, setPurchasePrice] = useState(4200000);
  const [grossRent, setGrossRent] = useState(410000);
  const [vacancyRate, setVacancyRate] = useState(0.05);
  const [propertyTax, setPropertyTax] = useState(52000);
  const [propertyInsurance, setPropertyInsurance] = useState(18000);
  const [maintenance, setMaintenance] = useState(36000);
  const [managementFeePct, setManagementFeePct] = useState(0.05);
  const [utilities, setUtilities] = useState(22000);
  const [capexReserve, setCapexReserve] = useState(15000);
  const [ltvRatio, setLtvRatio] = useState(0.70);
  const [interestRate, setInterestRate] = useState(0.055);
  const [interestType, setInterestType] = useState<'FIXED' | 'FLOATING'>('FIXED');
  const [appreciationRate, setAppreciationRate] = useState(0.042);

  // Property Action Modal State
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [actionType, setActionType] = useState<'CAPEX' | 'PAYDOWN' | 'REFI' | null>(null);
  const [actionAmount, setActionAmount] = useState<number>(50000);
  const [newRefiRate, setNewRefiRate] = useState<number>(0.0525);
  const [newRefiLtv, setNewRefiLtv] = useState<number>(0.65);

  // Calculate Underwriting
  const analysis = calculateRealEstateDeal({
    purchasePrice,
    grossPotentialRent: grossRent,
    vacancyRate,
    propertyTax,
    propertyInsurance,
    maintenanceAndRepairs: maintenance,
    propertyManagementFeePct: managementFeePct,
    utilitiesAndCommon: utilities,
    capexReserve,
    ltvRatio,
    interestRate,
    amortizationYears: 30,
    projectedAppreciationRate: appreciationRate,
  });

  // Filter Catalog Items
  const filteredCatalog = realEstateCatalog.filter((item) => {
    const matchesType = selectedTypeFilter === 'ALL' || item.propertyType === selectedTypeFilter;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Load Catalog Item into Calculator
  const handleLoadCatalogItem = (item: RealEstateCatalogItem) => {
    setPropertyName(item.name);
    setPropertyType(item.propertyType);
    setPropertyAddress(item.address);
    setUnitsOrSqft(item.unitsOrSqft);
    setPurchasePrice(item.purchasePrice);
    setGrossRent(item.grossRent);
    setVacancyRate(item.vacancyRate);
    setPropertyTax(item.propertyTax);
    setPropertyInsurance(item.insurance);
    setMaintenance(item.maintenance);
    setManagementFeePct(item.managementFeePct);
    setUtilities(item.utilities);
    setCapexReserve(item.capexReserve);
    setLtvRatio(item.ltvRatio);
    setInterestRate(item.interestRate);
    setInterestType(item.interestType);
    setAppreciationRate(item.projectedAppreciationRate);
    setActiveTab('calculator');
  };

  // Handle Acquire
  const handleAcquireCurrentUnderwritten = () => {
    buyRealEstateProperty({
      name: propertyName,
      propertyType,
      address: propertyAddress,
      unitsOrSqft,
      purchasePrice,
      grossRent,
      vacancyRate,
      propertyTax,
      insurance: propertyInsurance,
      maintenance,
      managementFeePct,
      utilities,
      capexReserve,
      ltvRatio,
      interestRate,
      interestType,
      projectedAppreciationRate: appreciationRate,
    });
  };

  const reInvestments = investments.filter((i) => i.assetClass === 'REAL_ESTATE');

  // Chart Data: Itemized Bills Stack
  const billStackData = [
    { name: 'Property Taxes', value: analysis.propertyTax, color: '#f43f5e' },
    { name: 'Property Insurance', value: analysis.propertyInsurance, color: '#fb923c' },
    { name: 'Maintenance & Repairs', value: analysis.maintenanceAndRepairs, color: '#eab308' },
    { name: 'Property Mgmt Fee', value: analysis.propertyManagementFee, color: '#a855f7' },
    { name: 'Utilities & Common Area', value: analysis.utilitiesAndCommon, color: '#3b82f6' },
    { name: 'CapEx Reserve Fund', value: analysis.capexReserve, color: '#06b6d4' },
  ];

  return (
    <div className="flex flex-col gap-4 text-[#fafafa] font-mono">
      {/* Module Title Banner */}
      <div className="bg-[#18181b] border border-[#27272a] p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#eab308]/10 text-[#eab308] border border-[#eab308]/30 rounded-none">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-white uppercase tracking-wider">
                Real Estate Investment & Property Bills Analysis Engine
              </h1>
              <span className="bg-[#eab308]/20 text-[#eab308] border border-[#eab308]/40 px-2 py-0.5 text-[10px] font-bold uppercase">
                Institutional Terminal
              </span>
            </div>
            <p className="text-xs text-[#71717a]">
              Commercial Property Marketplace, Itemized Bills Ledger, 10-Year Equity Projections & DSCR Stress Testing
            </p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 bg-[#09090b] border border-[#27272a] p-1">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-3 py-1.5 text-xs font-bold uppercase flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'catalog' ? 'bg-[#eab308] text-[#09090b]' : 'text-[#71717a] hover:text-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Property Deals ({realEstateCatalog.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-3 py-1.5 text-xs font-bold uppercase flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'calculator' ? 'bg-[#eab308] text-[#09090b]' : 'text-[#71717a] hover:text-white'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Underwriting & Bills</span>
          </button>

          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-3 py-1.5 text-xs font-bold uppercase flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'portfolio' ? 'bg-[#eab308] text-[#09090b]' : 'text-[#71717a] hover:text-white'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Active Portfolio ({reInvestments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('stresstest')}
            className={`px-3 py-1.5 text-xs font-bold uppercase flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'stresstest' ? 'bg-[#f43f5e] text-white' : 'text-[#71717a] hover:text-white'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Macro Stress Test</span>
          </button>
        </div>
      </div>

      {/* TAB 1: PROPERTY DEALS CATALOG */}
      {activeTab === 'catalog' && (
        <div className="flex flex-col gap-4">
          {/* Filter Bar */}
          <div className="bg-[#18181b] border border-[#27272a] p-4 flex flex-wrap items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#71717a]" />
              <input
                type="text"
                placeholder="Search by property title, location, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#09090b] border border-[#27272a] pl-9 pr-3 py-1.5 text-xs text-white focus:border-[#eab308] outline-none"
              />
            </div>

            {/* Asset Type Filter Pills */}
            <div className="flex items-center gap-1 overflow-x-auto py-1">
              {(['ALL', 'MULTIFAMILY', 'OFFICE', 'INDUSTRIAL', 'RETAIL', 'MIXED_USE', 'RESIDENTIAL', 'MEDICAL', 'HOTEL'] as const).map(
                (type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedTypeFilter(type)}
                    className={`px-2.5 py-1 text-[11px] font-bold uppercase border cursor-pointer whitespace-nowrap ${
                      selectedTypeFilter === type
                        ? 'bg-[#eab308] text-[#09090b] border-[#eab308]'
                        : 'bg-[#09090b] text-[#71717a] border-[#27272a] hover:border-[#71717a]'
                    }`}
                  >
                    {type}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Property Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCatalog.map((item) => {
              const itemAnalysis = calculateRealEstateDeal({
                purchasePrice: item.purchasePrice,
                grossPotentialRent: item.grossRent,
                vacancyRate: item.vacancyRate,
                propertyTax: item.propertyTax,
                propertyInsurance: item.insurance,
                maintenanceAndRepairs: item.maintenance,
                propertyManagementFeePct: item.managementFeePct,
                utilitiesAndCommon: item.utilities,
                capexReserve: item.capexReserve,
                ltvRatio: item.ltvRatio,
                interestRate: item.interestRate,
                amortizationYears: 30,
              });

              return (
                <div
                  key={item.id}
                  className="bg-[#18181b] border border-[#27272a] hover:border-[#eab308]/60 transition-all flex flex-col justify-between p-4"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <span className="text-[10px] bg-[#eab308]/10 text-[#eab308] border border-[#eab308]/30 px-2 py-0.5 font-bold uppercase">
                          {item.propertyType}
                        </span>
                        <h3 className="text-sm font-bold text-white mt-1.5">{item.name}</h3>
                        <p className="text-[10px] text-[#71717a]">{item.address}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-[#eab308]">{formatCurrency(item.purchasePrice)}</div>
                        <div className="text-[9px] text-[#71717a]">{item.unitsOrSqft}</div>
                      </div>
                    </div>

                    <p className="text-xs text-[#a1a1aa] mb-3 line-clamp-2">{item.description}</p>

                    {/* Highlights Badges */}
                    <div className="space-y-1 mb-3">
                      {item.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[10px] text-[#10b981]">
                          <CheckCircle2 className="w-3 h-3 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-3 gap-2 bg-[#09090b] border border-[#27272a] p-2 text-[10px] mb-4">
                      <div>
                        <span className="text-[#71717a] block">Gross Rent</span>
                        <span className="font-bold text-white">{formatCurrency(item.grossRent)}/yr</span>
                      </div>
                      <div>
                        <span className="text-[#71717a] block">Cap Rate</span>
                        <span className="font-bold text-[#eab308]">{formatPercent(item.capRate, 2)}</span>
                      </div>
                      <div>
                        <span className="text-[#71717a] block">Levered COCR</span>
                        <span className="font-bold text-[#10b981]">{formatPercent(itemAnalysis.leveredCocr, 2)}</span>
                      </div>
                      <div>
                        <span className="text-[#71717a] block">Annual Bills</span>
                        <span className="font-bold text-[#f43f5e]">{formatCurrency(itemAnalysis.totalOperatingExpenses)}</span>
                      </div>
                      <div>
                        <span className="text-[#71717a] block">DSCR</span>
                        <span className={`font-bold ${itemAnalysis.dscr >= 1.25 ? 'text-[#10b981]' : 'text-[#f43f5e]'}`}>
                          {itemAnalysis.dscr.toFixed(2)}x
                        </span>
                      </div>
                      <div>
                        <span className="text-[#71717a] block">Down Payment</span>
                        <span className="font-bold text-white">{formatCurrency(itemAnalysis.equityInvested)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleLoadCatalogItem(item)}
                      className="bg-[#09090b] hover:bg-[#27272a] text-[#71717a] hover:text-white border border-[#27272a] py-2 text-xs font-bold uppercase transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Calculator className="w-3.5 h-3.5" />
                      <span>Underwrite</span>
                    </button>

                    <button
                      onClick={() => {
                        handleLoadCatalogItem(item);
                        buyRealEstateProperty({
                          name: item.name,
                          propertyType: item.propertyType,
                          address: item.address,
                          unitsOrSqft: item.unitsOrSqft,
                          purchasePrice: item.purchasePrice,
                          grossRent: item.grossRent,
                          vacancyRate: item.vacancyRate,
                          propertyTax: item.propertyTax,
                          insurance: item.insurance,
                          maintenance: item.maintenance,
                          managementFeePct: item.managementFeePct,
                          utilities: item.utilities,
                          capexReserve: item.capexReserve,
                          ltvRatio: item.ltvRatio,
                          interestRate: item.interestRate,
                          interestType: item.interestType,
                          projectedAppreciationRate: item.projectedAppreciationRate,
                        });
                      }}
                      className="bg-[#10b981] hover:bg-[#059669] text-white py-2 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Acquire Now</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: UNDERWRITING CALCULATOR & ITEMIZE PROPERTY BILLS */}
      {activeTab === 'calculator' && (
        <div className="grid grid-cols-12 gap-4">
          {/* Left Column: Underwriting Input Form */}
          <div className="col-span-12 lg:col-span-6 bg-[#18181b] border border-[#27272a] p-5">
            <div className="flex items-center justify-between mb-4 border-b border-[#27272a] pb-2">
              <h2 className="text-xs font-bold text-[#eab308] uppercase tracking-wider flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                <span>Commercial Property Underwriting Parameters</span>
              </h2>
              <span className="text-[10px] text-[#71717a]">30-YR AMORTIZATION</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <div>
                <label className="text-[10px] text-[#71717a] uppercase block mb-1">Property Name</label>
                <input
                  type="text"
                  value={propertyName}
                  onChange={(e) => setPropertyName(e.target.value)}
                  className="w-full bg-[#09090b] border border-[#27272a] px-3 py-1.5 text-xs text-white focus:border-[#eab308] outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#71717a] uppercase block mb-1">Asset Class</label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value as RealEstatePropertyType)}
                  className="w-full bg-[#09090b] border border-[#27272a] px-3 py-1.5 text-xs text-white focus:border-[#eab308] outline-none font-mono"
                >
                  <option value="MULTIFAMILY">MULTIFAMILY</option>
                  <option value="OFFICE">OFFICE</option>
                  <option value="INDUSTRIAL">INDUSTRIAL</option>
                  <option value="RETAIL">RETAIL</option>
                  <option value="MIXED_USE">MIXED_USE</option>
                  <option value="RESIDENTIAL">RESIDENTIAL</option>
                  <option value="MEDICAL">MEDICAL</option>
                  <option value="HOTEL">HOTEL</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-[#71717a] uppercase block mb-1">Purchase Price ($)</label>
                <input
                  type="number"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(Number(e.target.value))}
                  className="w-full bg-[#09090b] border border-[#27272a] px-3 py-1.5 text-xs text-white focus:border-[#eab308] outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#71717a] uppercase block mb-1">Gross Annual Rent ($)</label>
                <input
                  type="number"
                  value={grossRent}
                  onChange={(e) => setGrossRent(Number(e.target.value))}
                  className="w-full bg-[#09090b] border border-[#27272a] px-3 py-1.5 text-xs text-white focus:border-[#eab308] outline-none font-mono"
                />
              </div>
            </div>

            {/* Itemized Property Bills Sub-Header */}
            <div className="border-t border-[#27272a] pt-3 mb-3">
              <h3 className="text-[11px] font-bold text-[#a1a1aa] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Receipt className="w-3.5 h-3.5 text-[#eab308]" />
                <span>Itemized Property Bills & Operating Expenses</span>
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div>
                  <label className="text-[9px] text-[#71717a] uppercase block mb-1">Property Tax ($/yr)</label>
                  <input
                    type="number"
                    value={propertyTax}
                    onChange={(e) => setPropertyTax(Number(e.target.value))}
                    className="w-full bg-[#09090b] border border-[#27272a] px-2.5 py-1 text-xs text-white focus:border-[#eab308] outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-[9px] text-[#71717a] uppercase block mb-1">Property Insurance ($/yr)</label>
                  <input
                    type="number"
                    value={propertyInsurance}
                    onChange={(e) => setPropertyInsurance(Number(e.target.value))}
                    className="w-full bg-[#09090b] border border-[#27272a] px-2.5 py-1 text-xs text-white focus:border-[#eab308] outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-[9px] text-[#71717a] uppercase block mb-1">Maintenance & Repairs ($/yr)</label>
                  <input
                    type="number"
                    value={maintenance}
                    onChange={(e) => setMaintenance(Number(e.target.value))}
                    className="w-full bg-[#09090b] border border-[#27272a] px-2.5 py-1 text-xs text-white focus:border-[#eab308] outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-[9px] text-[#71717a] uppercase block mb-1">Property Mgmt Fee (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={managementFeePct}
                    onChange={(e) => setManagementFeePct(Number(e.target.value))}
                    className="w-full bg-[#09090b] border border-[#27272a] px-2.5 py-1 text-xs text-white focus:border-[#eab308] outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-[9px] text-[#71717a] uppercase block mb-1">Utilities & Common ($/yr)</label>
                  <input
                    type="number"
                    value={utilities}
                    onChange={(e) => setUtilities(Number(e.target.value))}
                    className="w-full bg-[#09090b] border border-[#27272a] px-2.5 py-1 text-xs text-white focus:border-[#eab308] outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-[9px] text-[#71717a] uppercase block mb-1">CapEx Reserve ($/yr)</label>
                  <input
                    type="number"
                    value={capexReserve}
                    onChange={(e) => setCapexReserve(Number(e.target.value))}
                    className="w-full bg-[#09090b] border border-[#27272a] px-2.5 py-1 text-xs text-white focus:border-[#eab308] outline-none font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Debt Financing & Strategy */}
            <div className="border-t border-[#27272a] pt-3 mb-4">
              <h3 className="text-[11px] font-bold text-[#a1a1aa] uppercase tracking-wider mb-2">
                Mortgage Debt Financing Structure
              </h3>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <div className="flex justify-between text-[10px] text-[#71717a] uppercase mb-1">
                    <span>LTV Ratio</span>
                    <span className="text-[#eab308] font-bold">{(ltvRatio * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="0.85"
                    step="0.05"
                    value={ltvRatio}
                    onChange={(e) => setLtvRatio(Number(e.target.value))}
                    className="w-full accent-[#eab308] bg-[#09090b] cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-[9px] text-[#71717a] uppercase block mb-1">Interest Rate (%)</label>
                  <input
                    type="number"
                    step="0.0025"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full bg-[#09090b] border border-[#27272a] px-2.5 py-1 text-xs text-white focus:border-[#eab308] outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[9px] text-[#71717a] uppercase block mb-1">Rate Structure</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setInterestType('FIXED')}
                      className={`flex-1 py-1 text-xs border cursor-pointer ${
                        interestType === 'FIXED'
                          ? 'bg-[#eab308] text-[#09090b] font-bold border-[#eab308]'
                          : 'bg-[#09090b] text-[#71717a] border-[#27272a]'
                      }`}
                    >
                      FIXED
                    </button>
                    <button
                      type="button"
                      onClick={() => setInterestType('FLOATING')}
                      className={`flex-1 py-1 text-xs border cursor-pointer ${
                        interestType === 'FLOATING'
                          ? 'bg-[#f43f5e] text-white font-bold border-[#f43f5e]'
                          : 'bg-[#09090b] text-[#71717a] border-[#27272a]'
                      }`}
                    >
                      FLOATING
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-[9px] text-[#71717a] uppercase block mb-1">Projected Appreciation (%/yr)</label>
                  <input
                    type="number"
                    step="0.005"
                    value={appreciationRate}
                    onChange={(e) => setAppreciationRate(Number(e.target.value))}
                    className="w-full bg-[#09090b] border border-[#27272a] px-2.5 py-1 text-xs text-white focus:border-[#eab308] outline-none font-mono"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleAcquireCurrentUnderwritten}
              className="w-full bg-[#10b981] hover:bg-[#059669] text-white py-2.5 font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Acquire Property & Log Double-Entry Ledger</span>
            </button>
          </div>

          {/* Right Column: Underwriting Financial Results & Visual Charts */}
          <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
            {/* KPI Cards Grid */}
            <div className="bg-[#18181b] border border-[#27272a] p-4 grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-[#09090b] border border-[#27272a] p-3">
                <span className="text-[10px] text-[#71717a] uppercase block">Net Operating Income</span>
                <span className="text-base font-bold text-white block">{formatCurrency(analysis.noi)}</span>
                <span className="text-[9px] text-[#71717a]">Annual Rent - OpEx Bills</span>
              </div>

              <div className="bg-[#09090b] border border-[#27272a] p-3">
                <span className="text-[10px] text-[#71717a] uppercase block">Annual Debt Service</span>
                <span className="text-base font-bold text-[#f43f5e] block">{formatCurrency(analysis.annualDebtService)}</span>
                <span className="text-[9px] text-[#71717a]">{formatCurrency(analysis.monthlyMortgage)}/mo</span>
              </div>

              <div className="bg-[#09090b] border border-[#27272a] p-3">
                <span className="text-[10px] text-[#71717a] uppercase block">DSCR Coverage</span>
                <span
                  className={`text-base font-bold block ${
                    analysis.dscr >= 1.25 ? 'text-[#10b981]' : 'text-[#f43f5e]'
                  }`}
                >
                  {analysis.dscr.toFixed(2)}x
                </span>
                <span className="text-[9px] text-[#71717a]">Min Covenant: 1.25x</span>
              </div>

              <div className="bg-[#09090b] border border-[#27272a] p-3">
                <span className="text-[10px] text-[#71717a] uppercase block">10-Year IRR</span>
                <span className="text-base font-bold text-[#eab308] block">{formatPercent(analysis.tenYearIrr, 2)}</span>
                <span className="text-[9px] text-[#71717a]">Levered Exit Return</span>
              </div>
            </div>

            {/* Property Bills Stack Chart */}
            <div className="bg-[#18181b] border border-[#27272a] p-4">
              <div className="flex items-center justify-between mb-3 border-b border-[#27272a] pb-2">
                <h3 className="text-xs font-bold text-[#eab308] uppercase tracking-wider flex items-center gap-1.5">
                  <PieIcon className="w-4 h-4" />
                  <span>Property Bills Breakdown (${formatCurrency(analysis.totalOperatingExpenses)}/yr)</span>
                </h3>
                <span className="text-[10px] text-[#71717a]">
                  Monthly Bills: {formatCurrency(analysis.totalOperatingExpenses / 12)}
                </span>
              </div>

              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={billStackData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={65}
                      innerRadius={35}
                      paddingAngle={3}
                    >
                      {billStackData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val: number) => formatCurrency(val)}
                      contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', color: '#fff', fontSize: '11px' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '10px', color: '#a1a1aa' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 10-Year Equity Build-Up Chart */}
            <div className="bg-[#18181b] border border-[#27272a] p-4">
              <div className="flex items-center justify-between mb-3 border-b border-[#27272a] pb-2">
                <h3 className="text-xs font-bold text-[#10b981] uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  <span>10-Year Property Value vs Debt Paydown</span>
                </h3>
                <span className="text-[10px] text-[#71717a]">APPRECIATION + PRINCIPAL AMORTIZATION</span>
              </div>

              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analysis.tenYearProjections}>
                    <XAxis dataKey="year" stroke="#71717a" fontSize={10} tickFormatter={(y) => `Yr ${y}`} />
                    <YAxis stroke="#71717a" fontSize={10} tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} />
                    <Tooltip
                      formatter={(val: number) => formatCurrency(val)}
                      contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', color: '#fff', fontSize: '11px' }}
                    />
                    <Area type="monotone" dataKey="propertyValue" name="Property Value" stroke="#eab308" fill="#eab308" fillOpacity={0.15} />
                    <Area type="monotone" dataKey="equityValue" name="Equity Value" stroke="#10b981" fill="#10b981" fillOpacity={0.25} />
                    <Area type="monotone" dataKey="mortgageBalance" name="Debt Balance" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.15} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ACTIVE PORTFOLIO & PROPERTY BILLS TRACKER */}
      {activeTab === 'portfolio' && (
        <div className="flex flex-col gap-4">
          {reInvestments.length === 0 ? (
            <div className="bg-[#18181b] border border-[#27272a] p-8 text-center flex flex-col items-center justify-center gap-3">
              <Building2 className="w-10 h-10 text-[#71717a]" />
              <div className="text-sm font-bold text-white uppercase">No Active Real Estate Properties Acquired</div>
              <p className="text-xs text-[#71717a] max-w-md">
                Acquire commercial assets from the Property Deals tab or underwrite custom deals to build your real estate portfolio.
              </p>
              <button
                onClick={() => setActiveTab('catalog')}
                className="bg-[#eab308] hover:bg-[#ca8a04] text-[#09090b] px-4 py-2 text-xs font-bold uppercase transition-colors cursor-pointer mt-2"
              >
                Browse Property Marketplace
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {reInvestments.map((property) => {
                const initialCost = property.initialPurchasePrice || property.purchasePrice || 1850000;
                const currentVal = property.currentPropertyValue || property.marketValue;
                const appreciationDollar = currentVal - initialCost;
                const appreciationPct = initialCost > 0 ? appreciationDollar / initialCost : 0;
                const remainingDebt = property.mortgagePrincipal || 0;
                const equityBuilt = currentVal - remainingDebt;

                const annualBillsTotal = property.totalOpExBillsAnnual || property.operatingExpenses || 55500;
                const monthlyBills = annualBillsTotal / 12;
                const annualDebt = property.annualDebtService || 87600;
                const monthlyDebt = annualDebt / 12;

                return (
                  <div key={property.id} className="bg-[#18181b] border border-[#27272a] p-5 flex flex-col gap-4">
                    {/* Header Banner */}
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#27272a] pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] bg-[#eab308]/10 text-[#eab308] border border-[#eab308]/30 px-2 py-0.5 font-bold uppercase">
                            {property.propertyType || 'COMMERCIAL'}
                          </span>
                          <h2 className="text-base font-bold text-white">{property.name}</h2>
                        </div>
                        <p className="text-xs text-[#71717a] mt-0.5">{property.address || 'Commercial Real Estate Location'}</p>
                      </div>

                      {/* Management Quick Actions */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedPropertyId(property.id);
                            setActionType('CAPEX');
                            setActionAmount(50000);
                          }}
                          className="bg-[#09090b] hover:bg-[#27272a] border border-[#27272a] text-[#eab308] px-3 py-1.5 text-xs font-bold uppercase flex items-center gap-1.5 cursor-pointer"
                        >
                          <Zap className="w-3.5 h-3.5" />
                          <span>CapEx Reinvest</span>
                        </button>

                        <button
                          onClick={() => {
                            setSelectedPropertyId(property.id);
                            setActionType('PAYDOWN');
                            setActionAmount(100000);
                          }}
                          className="bg-[#09090b] hover:bg-[#27272a] border border-[#27272a] text-[#10b981] px-3 py-1.5 text-xs font-bold uppercase flex items-center gap-1.5 cursor-pointer"
                        >
                          <DollarSign className="w-3.5 h-3.5" />
                          <span>Payoff Principal</span>
                        </button>

                        <button
                          onClick={() => {
                            setSelectedPropertyId(property.id);
                            setActionType('REFI');
                            setNewRefiRate(property.interestRate || 0.0525);
                            setNewRefiLtv(property.ltvRatio || 0.65);
                          }}
                          className="bg-[#09090b] hover:bg-[#27272a] border border-[#27272a] text-[#3b82f6] px-3 py-1.5 text-xs font-bold uppercase flex items-center gap-1.5 cursor-pointer"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Refinance</span>
                        </button>

                        <button
                          onClick={() => sellProperty(property.id)}
                          className="bg-[#f43f5e]/10 hover:bg-[#f43f5e]/20 border border-[#f43f5e]/40 text-[#f43f5e] px-3 py-1.5 text-xs font-bold uppercase flex items-center gap-1.5 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Sell Asset</span>
                        </button>
                      </div>
                    </div>

                    {/* Property Valuation & Financial Health Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      <div className="bg-[#09090b] border border-[#27272a] p-3">
                        <span className="text-[10px] text-[#71717a] uppercase block">Current Market Value</span>
                        <span className="text-base font-bold text-[#eab308] block">{formatCurrency(currentVal)}</span>
                        <span className={`text-[10px] font-bold ${appreciationDollar >= 0 ? 'text-[#10b981]' : 'text-[#f43f5e]'}`}>
                          {appreciationDollar >= 0 ? '+' : ''}{formatCurrency(appreciationDollar)} ({formatPercent(appreciationPct, 2)})
                        </span>
                      </div>

                      <div className="bg-[#09090b] border border-[#27272a] p-3">
                        <span className="text-[10px] text-[#71717a] uppercase block">Mortgage Loan Debt</span>
                        <span className="text-base font-bold text-[#f43f5e] block">{formatCurrency(remainingDebt)}</span>
                        <span className="text-[10px] text-[#71717a]">LTV: {((remainingDebt / currentVal) * 100).toFixed(1)}%</span>
                      </div>

                      <div className="bg-[#09090b] border border-[#27272a] p-3">
                        <span className="text-[10px] text-[#71717a] uppercase block">Net Equity Built</span>
                        <span className="text-base font-bold text-[#10b981] block">{formatCurrency(equityBuilt)}</span>
                        <span className="text-[10px] text-[#71717a]">Cost: {formatCurrency(initialCost)}</span>
                      </div>

                      <div className="bg-[#09090b] border border-[#27272a] p-3">
                        <span className="text-[10px] text-[#71717a] uppercase block">Annual NOI</span>
                        <span className="text-base font-bold text-white block">{formatCurrency(property.noiAnnual || 0)}</span>
                        <span className="text-[10px] text-[#71717a]">Cap Rate: {formatPercent(property.capRate || 0, 2)}</span>
                      </div>

                      <div className="bg-[#09090b] border border-[#27272a] p-3">
                        <span className="text-[10px] text-[#71717a] uppercase block">DSCR Coverage</span>
                        <span className={`text-base font-bold block ${(property.dscr || 1) >= 1.25 ? 'text-[#10b981]' : 'text-[#f43f5e]'}`}>
                          {(property.dscr || 0).toFixed(2)}x
                        </span>
                        <span className="text-[10px] text-[#71717a]">COCR: {formatPercent(property.leveredCocr || 0, 2)}</span>
                      </div>
                    </div>

                    {/* Itemized Monthly & Annual Property Bills Ledger */}
                    <div className="bg-[#09090b] border border-[#27272a] p-4">
                      <h3 className="text-xs font-bold text-[#eab308] uppercase tracking-wider mb-3 flex items-center gap-2 border-b border-[#27272a] pb-2">
                        <Receipt className="w-4 h-4" />
                        <span>Itemized Property Bills & Expense Schedule</span>
                      </h3>

                      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-xs mb-3">
                        <div className="bg-[#18181b] p-2.5 border border-[#27272a]">
                          <span className="text-[10px] text-[#71717a] uppercase block">Property Taxes</span>
                          <span className="font-bold text-[#f43f5e]">{formatCurrency(property.propertyTaxAnnual || 0)}/yr</span>
                          <span className="text-[9px] text-[#71717a] block">{formatCurrency((property.propertyTaxAnnual || 0) / 12)}/mo</span>
                        </div>

                        <div className="bg-[#18181b] p-2.5 border border-[#27272a]">
                          <span className="text-[10px] text-[#71717a] uppercase block">Property Insurance</span>
                          <span className="font-bold text-[#fb923c]">{formatCurrency(property.propertyInsuranceAnnual || 0)}/yr</span>
                          <span className="text-[9px] text-[#71717a] block">{formatCurrency((property.propertyInsuranceAnnual || 0) / 12)}/mo</span>
                        </div>

                        <div className="bg-[#18181b] p-2.5 border border-[#27272a]">
                          <span className="text-[10px] text-[#71717a] uppercase block">Maintenance & Repairs</span>
                          <span className="font-bold text-[#eab308]">{formatCurrency(property.maintenanceAndRepairsAnnual || 0)}/yr</span>
                          <span className="text-[9px] text-[#71717a] block">{formatCurrency((property.maintenanceAndRepairsAnnual || 0) / 12)}/mo</span>
                        </div>

                        <div className="bg-[#18181b] p-2.5 border border-[#27272a]">
                          <span className="text-[10px] text-[#71717a] uppercase block">Property Management</span>
                          <span className="font-bold text-[#a855f7]">{formatCurrency(property.propertyManagementFeeAnnual || 0)}/yr</span>
                          <span className="text-[9px] text-[#71717a] block">{(property.propertyManagementFeePct || 0.05) * 100}% of rent</span>
                        </div>

                        <div className="bg-[#18181b] p-2.5 border border-[#27272a]">
                          <span className="text-[10px] text-[#71717a] uppercase block">Utilities & Common</span>
                          <span className="font-bold text-[#3b82f6]">{formatCurrency(property.utilitiesAndCommonAnnual || 0)}/yr</span>
                          <span className="text-[9px] text-[#71717a] block">{formatCurrency((property.utilitiesAndCommonAnnual || 0) / 12)}/mo</span>
                        </div>

                        <div className="bg-[#18181b] p-2.5 border border-[#27272a]">
                          <span className="text-[10px] text-[#71717a] uppercase block">CapEx Reserve Fund</span>
                          <span className="font-bold text-[#06b6d4]">{formatCurrency(property.capexReserveAnnual || 0)}/yr</span>
                          <span className="text-[9px] text-[#71717a] block">{formatCurrency((property.capexReserveAnnual || 0) / 12)}/mo</span>
                        </div>
                      </div>

                      {/* Cash Flow Summary Line */}
                      <div className="flex flex-wrap items-center justify-between bg-[#18181b] border border-[#27272a] p-3 text-xs">
                        <div className="flex items-center gap-4">
                          <div>
                            <span className="text-[#71717a] text-[10px] uppercase">Gross Potential Rent: </span>
                            <span className="font-bold text-white">{formatCurrency(property.grossPotentialRent || 0)}/yr</span>
                          </div>

                          <div>
                            <span className="text-[#71717a] text-[10px] uppercase">Total Non-Debt Bills: </span>
                            <span className="font-bold text-[#f43f5e]">- {formatCurrency(annualBillsTotal)}/yr</span>
                          </div>

                          <div>
                            <span className="text-[#71717a] text-[10px] uppercase">Annual Mortgage Debt: </span>
                            <span className="font-bold text-[#f43f5e]">- {formatCurrency(annualDebt)}/yr</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-[#71717a] text-[10px] uppercase block">Net Quarterly Cash Flow Settled</span>
                          <span className="text-sm font-bold text-[#10b981]">
                            + {formatCurrency(((property.noiAnnual || 0) - annualDebt) / 4)} / quarter
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Historical Valuation Chart */}
                    {property.valuationHistory && property.valuationHistory.length > 0 && (
                      <div className="bg-[#09090b] border border-[#27272a] p-4">
                        <h4 className="text-xs font-bold text-[#71717a] uppercase tracking-wider mb-2">
                          Property Market Valuation & Equity Trend Over Ticks
                        </h4>
                        <div className="h-40 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={property.valuationHistory}>
                              <XAxis dataKey="tick" stroke="#71717a" fontSize={10} tickFormatter={(t) => `Tick ${t}`} />
                              <YAxis stroke="#71717a" fontSize={10} tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} />
                              <Tooltip
                                formatter={(val: number) => formatCurrency(val)}
                                contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', color: '#fff', fontSize: '11px' }}
                              />
                              <Area type="monotone" dataKey="propertyValue" name="Property Value" stroke="#eab308" fill="#eab308" fillOpacity={0.15} />
                              <Area type="monotone" dataKey="equityValue" name="Equity Value" stroke="#10b981" fill="#10b981" fillOpacity={0.25} />
                              <Area type="monotone" dataKey="mortgageBalance" name="Debt Balance" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.15} />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: MACRO STRESS TESTING */}
      {activeTab === 'stresstest' && (
        <div className="bg-[#18181b] border border-[#27272a] p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-[#27272a] pb-3">
            <div>
              <h2 className="text-sm font-bold text-[#f43f5e] uppercase tracking-wider flex items-center gap-2">
                <ShieldAlert className="w-5 h-5" />
                <span>Macroeconomic Stress Testing Engine</span>
              </h2>
              <p className="text-xs text-[#71717a]">
                Simulate Federal Reserve rate shocks, inflation spikes on property bills, and vacancy surges across active portfolio holdings.
              </p>
            </div>

            <div className="bg-[#09090b] border border-[#27272a] px-3 py-1.5 text-xs">
              <span className="text-[#71717a] uppercase">Current Fed Funds Rate: </span>
              <span className="font-bold text-[#eab308]">{formatPercent(macroState.fedFundsRate, 2)}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button
              onClick={() => triggerMacroEvent('FED_RATE_HIKE')}
              className="bg-[#09090b] hover:bg-[#f43f5e]/10 border border-[#27272a] hover:border-[#f43f5e] p-4 text-left transition-colors cursor-pointer"
            >
              <Zap className="w-5 h-5 text-[#f43f5e] mb-2" />
              <div className="text-xs font-bold text-white uppercase">+200 bps Fed Rate Spike</div>
              <p className="text-[10px] text-[#71717a] mt-1">
                Compresses DSCR on floating mortgage debt and increases annual interest expense.
              </p>
            </button>

            <button
              onClick={() => triggerMacroEvent('INFLATION_SPIKE')}
              className="bg-[#09090b] hover:bg-[#eab308]/10 border border-[#27272a] hover:border-[#eab308] p-4 text-left transition-colors cursor-pointer"
            >
              <TrendingUp className="w-5 h-5 text-[#eab308] mb-2" />
              <div className="text-xs font-bold text-white uppercase">+15% Property Bills Inflation</div>
              <p className="text-[10px] text-[#71717a] mt-1">
                Drives property taxes, insurance, and utility bills higher, lowering NOI.
              </p>
            </button>

            <button
              onClick={() => triggerMacroEvent('RECESSION')}
              className="bg-[#09090b] hover:bg-[#fb923c]/10 border border-[#27272a] hover:border-[#fb923c] p-4 text-left transition-colors cursor-pointer"
            >
              <AlertTriangle className="w-5 h-5 text-[#fb923c] mb-2" />
              <div className="text-xs font-bold text-white uppercase">Commercial Vacancy Surge</div>
              <p className="text-[10px] text-[#71717a] mt-1">
                Increases vacancy loss to 12%, reducing effective rental income.
              </p>
            </button>

            <button
              onClick={() => triggerMacroEvent('TECH_BOOM')}
              className="bg-[#09090b] hover:bg-[#10b981]/10 border border-[#27272a] hover:border-[#10b981] p-4 text-left transition-colors cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-[#10b981] mb-2" />
              <div className="text-xs font-bold text-white uppercase">Urban Rental Boom</div>
              <p className="text-[10px] text-[#71717a] mt-1">
                Boosts commercial rents by +8% and lowers cap rates across submarkets.
              </p>
            </button>
          </div>

          {/* Active Event Banner */}
          <div className="bg-[#09090b] border border-[#27272a] p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#71717a] uppercase block">Active Environment Condition</span>
              <span className="text-xs font-bold text-white">{macroState.activeEvent}</span>
              <p className="text-[11px] text-[#a1a1aa] mt-0.5">{macroState.eventDescription}</p>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-[#71717a] uppercase block">Inflation Benchmark</span>
              <span className="text-xs font-bold text-[#eab308]">{formatPercent(macroState.inflationRate, 2)}</span>
            </div>
          </div>
        </div>
      )}

      {/* PROPERTY ACTION MODAL */}
      {selectedPropertyId && actionType && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-mono">
          <div className="bg-[#18181b] border border-[#27272a] max-w-md w-full p-5 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-[#27272a] pb-2">
              <h3 className="text-xs font-bold text-[#eab308] uppercase tracking-wider">
                {actionType === 'CAPEX' && 'CapEx Improvement Reinvestment'}
                {actionType === 'PAYDOWN' && 'Pay Off Mortgage Debt Principal'}
                {actionType === 'REFI' && 'Refinance Mortgage Structure'}
              </h3>
              <button onClick={() => setActionType(null)} className="text-[#71717a] hover:text-white cursor-pointer">
                ✕
              </button>
            </div>

            {actionType === 'CAPEX' && (
              <div>
                <p className="text-xs text-[#a1a1aa] mb-3">
                  Reinvest cash reserves into property modernization. Every $1.00 injected generates $1.25 in added property valuation and 10% rent upside.
                </p>
                <label className="text-[10px] text-[#71717a] uppercase block mb-1">CapEx Injected ($)</label>
                <input
                  type="number"
                  step="10000"
                  value={actionAmount}
                  onChange={(e) => setActionAmount(Number(e.target.value))}
                  className="w-full bg-[#09090b] border border-[#27272a] px-3 py-2 text-xs text-white focus:border-[#eab308] outline-none"
                />
              </div>
            )}

            {actionType === 'PAYDOWN' && (
              <div>
                <p className="text-xs text-[#a1a1aa] mb-3">
                  Directly pay down mortgage loan principal to increase equity built, reduce annual debt service, and boost DSCR.
                </p>
                <label className="text-[10px] text-[#71717a] uppercase block mb-1">Principal Payoff Amount ($)</label>
                <input
                  type="number"
                  step="25000"
                  value={actionAmount}
                  onChange={(e) => setActionAmount(Number(e.target.value))}
                  className="w-full bg-[#09090b] border border-[#27272a] px-3 py-2 text-xs text-white focus:border-[#eab308] outline-none"
                />
              </div>
            )}

            {actionType === 'REFI' && (
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] text-[#71717a] uppercase block mb-1">New LTV Ratio (%)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={newRefiLtv}
                    onChange={(e) => setNewRefiLtv(Number(e.target.value))}
                    className="w-full bg-[#09090b] border border-[#27272a] px-3 py-2 text-xs text-white focus:border-[#eab308] outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-[#71717a] uppercase block mb-1">New Refinance Interest Rate (%)</label>
                  <input
                    type="number"
                    step="0.0025"
                    value={newRefiRate}
                    onChange={(e) => setNewRefiRate(Number(e.target.value))}
                    className="w-full bg-[#09090b] border border-[#27272a] px-3 py-2 text-xs text-white focus:border-[#eab308] outline-none"
                  />
                </div>
              </div>
            )}

            <div className="flex gap-2 justify-end pt-2">
              <button
                onClick={() => setActionType(null)}
                className="bg-[#09090b] border border-[#27272a] px-4 py-2 text-xs text-[#71717a] hover:text-white uppercase cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  if (actionType === 'CAPEX') {
                    reinvestCapExProperty(selectedPropertyId, actionAmount);
                  } else if (actionType === 'PAYDOWN') {
                    payOffPropertyMortgagePrincipal(selectedPropertyId, actionAmount);
                  } else if (actionType === 'REFI') {
                    refinanceProperty(selectedPropertyId, newRefiRate, newRefiLtv);
                  }
                  setActionType(null);
                }}
                className="bg-[#10b981] hover:bg-[#059669] text-white px-4 py-2 text-xs font-bold uppercase cursor-pointer"
              >
                Execute Action
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
