import React, { useState } from 'react';
import { useSimulationStore } from '../../store/simulationStore';
import { calculateDCFModel, calculateNPV, calculateIRR, formatCurrency, formatPercent } from '../../utils/financialMath';
import {
  TrendingUp,
  FileText,
  PieChart,
  DollarSign,
  AlertCircle,
  ArrowUpRight,
  HelpCircle,
  BookOpen,
  X,
  Search,
  Lightbulb,
  ChevronRight,
  Sparkles,
  Layers,
  BarChart2,
  CheckCircle2,
  Calculator,
  Grid,
  Percent,
  Sliders,
  ShieldAlert,
  Building2,
  ArrowRight,
  RefreshCw,
  Award,
} from 'lucide-react';

export const CorporateFinanceModule: React.FC = () => {
  const { allocateCorporateCapital, triggerMacroEvent, macroState } = useSimulationStore();

  // Navigation Tab
  const [activeTab, setActiveTab] = useState<'SUMMARY' | 'MODEL' | 'DCF' | 'WACC' | 'BUDGETING' | 'RATIOS'>('SUMMARY');
  const [selectedStatement, setSelectedStatement] = useState<'IS' | 'BS' | 'CF'>('IS');

  // Help Modal State
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [activeHelpCategory, setActiveHelpCategory] = useState<'ALL' | 'STATEMENTS' | 'DCF' | 'CAPITAL' | 'RATIOS'>('ALL');
  const [helpSearchQuery, setHelpSearchQuery] = useState('');

  // Corporate Financial Model Inputs
  const [revenue, setRevenue] = useState(12500000); // $12.5M
  const [ebitda, setEbitda] = useState(3200000);   // $3.2M
  const [capex, setCapex] = useState(850000);      // $850k
  const [totalDebt, setTotalDebt] = useState(4500000); // $4.5M
  const [cashEquiv, setCashEquiv] = useState(1200000); // $1.2M
  const [shares, setShares] = useState(1000000);    // 1M shares
  const [taxRate, setTaxRate] = useState(0.21);     // 21% tax rate
  const [wacc, setWacc] = useState(0.085);          // 8.5% WACC
  const [terminalGrowth, setTerminalGrowth] = useState(0.025); // 2.5%
  const [revenueGrowth, setRevenueGrowth] = useState(0.08);    // 8%

  // CAPM Calculator State
  const [riskFreeRate, setRiskFreeRate] = useState(0.0425); // 4.25%
  const [beta, setBeta] = useState(1.20);                 // 1.20 Beta
  const [equityRiskPremium, setEquityRiskPremium] = useState(0.055); // 5.5%
  const [costOfDebtPreTax, setCostOfDebtPreTax] = useState(0.062); // 6.2%
  const [equityWeight, setEquityWeight] = useState(0.70); // 70% Equity / 30% Debt

  // Capital Budgeting State (Project Evaluator)
  const [projInitialOutlay, setProjInitialOutlay] = useState(1200000);
  const [projDiscountRate, setProjDiscountRate] = useState(0.085);
  const [projCashFlows, setProjCashFlows] = useState<number[]>([320000, 380000, 420000, 480000, 550000]);

  // Derived CAPM & WACC Calculations
  const calculatedCostOfEquity = riskFreeRate + beta * equityRiskPremium;
  const calculatedCostOfDebtAfterTax = costOfDebtPreTax * (1 - taxRate);
  const debtWeight = 1 - equityWeight;
  const blendedWacc = equityWeight * calculatedCostOfEquity + debtWeight * calculatedCostOfDebtAfterTax;

  // Sync CAPM WACC to model WACC if requested
  const handleApplyCapmWacc = () => {
    setWacc(Number(blendedWacc.toFixed(4)));
  };

  // Run DCF Valuation Model
  const dcf = calculateDCFModel({
    revenue,
    operatingExpenses: revenue - ebitda,
    ebitda,
    capex,
    totalDebt,
    cashAndEquivalents: cashEquiv,
    sharesOutstanding: shares,
    taxRate,
    wacc,
    terminalGrowthRate: terminalGrowth,
    projectionYears: 5,
    revenueGrowthRate: revenueGrowth,
  });

  // Calculate Capital Budgeting Metrics
  const projNPV = calculateNPV(projDiscountRate, projInitialOutlay, projCashFlows);
  const projIRR = calculateIRR(projInitialOutlay, projCashFlows);

  // Cumulative cash flow for Payback Period
  let cumulative = -projInitialOutlay;
  let paybackYears = 0;
  for (let i = 0; i < projCashFlows.length; i++) {
    cumulative += projCashFlows[i];
    if (cumulative >= 0 && paybackYears === 0) {
      const prevCum = cumulative - projCashFlows[i];
      paybackYears = i + Math.abs(prevCum) / projCashFlows[i];
    }
  }
  if (paybackYears === 0 && cumulative < 0) paybackYears = 99; // Never pays back

  const presentValueOfInflows = projCashFlows.reduce(
    (sum, cf, t) => sum + cf / Math.pow(1 + projDiscountRate, t + 1),
    0
  );
  const profitabilityIndex = projInitialOutlay > 0 ? presentValueOfInflows / projInitialOutlay : 0;

  // Additional Ratios
  const grossMargin = (revenue - (revenue - ebitda) * 0.6) / revenue;
  const ebitdaMargin = ebitda / revenue;
  const cogs = (revenue - ebitda) * 0.6;
  const ebit = ebitda - capex * 0.5; // Approx Depreciation
  const netIncome = (ebit - totalDebt * 0.05) * (1 - taxRate);
  const netMargin = netIncome / revenue;
  const roe = dcf.equityValue > 0 ? netIncome / dcf.equityValue : 0;
  const roa = netIncome / (cashEquiv + capex * 4.2);
  const currentRatio = (cashEquiv + revenue * 0.15) / (totalDebt * 0.2);
  const quickRatio = cashEquiv / (totalDebt * 0.2);

  // 2D DCF Sensitivity Matrix Data (WACC vs Terminal Growth Rate)
  const sensitivityWaccs = [0.070, 0.075, 0.080, 0.085, 0.090, 0.095, 0.100];
  const sensitivityGrowths = [0.015, 0.020, 0.025, 0.030, 0.035];

  // Knowledge Base Articles
  const helpArticles = [
    {
      id: 'dcf-intro',
      category: 'DCF',
      title: 'What is a Discounted Cash Flow (DCF) Model?',
      summary: 'A fundamental valuation methodology that estimates the intrinsic value of an asset based on present value of future cash flows.',
      details:
        'DCF works by projecting a company’s Unlevered Free Cash Flows (FCFF) over a 5-year forecast period and discounting them back to present-day dollars using WACC. Money in the future is worth less today due to time value of money, inflation, and capital risk.',
      keyTakeaway: 'Higher projected cash flow = Higher intrinsic stock value. Higher discount rate (WACC) = Lower intrinsic stock value.',
    },
    {
      id: 'wacc-concept',
      category: 'DCF',
      title: 'Weighted Average Cost of Capital (WACC) & CAPM',
      summary: 'The blended hurdle rate representing the minimum required return expected by debt lenders and equity shareholders.',
      details:
        'Cost of Equity is calculated using the Capital Asset Pricing Model: Cost of Equity = Risk-Free Rate + (Beta * Equity Risk Premium). Cost of Debt is tax-shielded: Cost of Debt * (1 - Tax Rate). WACC blends both by their weights in the capital structure.',
      keyTakeaway: 'When benchmark rates rise or risk spikes, WACC increases and compresses DCF equity valuation.',
    },
    {
      id: '3-statement-link',
      category: 'STATEMENTS',
      title: '3-Statement Financial Model Integration',
      summary: 'How the Income Statement, Balance Sheet, and Statement of Cash Flows tie together dynamically.',
      details:
        'Net Income from the Income Statement flows into Retained Equity on the Balance Sheet and starts the Cash Flow Statement. CapEx on the Cash Flow Statement increases Property, Plant & Equipment (PP&E) on the Balance Sheet.',
      keyTakeaway: 'An accurate corporate model maintains full accounting balance across all three statements.',
    },
    {
      id: 'capital-budgeting',
      category: 'CAPITAL',
      title: 'Capital Budgeting Decision Rules (NPV, IRR, Payback)',
      summary: 'Methods used by financial analysts and CFOs to evaluate corporate investment projects.',
      details:
        '1. Net Present Value (NPV): Absolute dollar value created for shareholders. Accept if NPV > $0.\n2. Internal Rate of Return (IRR): The discount rate where NPV = $0. Accept if IRR > WACC.\n3. Profitability Index (PI): Ratio of present value of inflows to initial outlay. Accept if PI > 1.0.',
      keyTakeaway: 'When projects are mutually exclusive, always select the project with the highest positive NPV.',
    },
    {
      id: 'ratios-mastery',
      category: 'RATIOS',
      title: 'Key Financial Ratios & Credit Coverage Metrics',
      summary: 'Ratios used by credit rating agencies (S&P, Moody’s) and equity analysts to measure solvency and efficiency.',
      details:
        '• Interest Coverage Ratio = EBIT / Interest Expense (Target: > 3.0x)\n• Net Debt / EBITDA = (Total Debt - Cash) / EBITDA (Target: < 3.0x)\n• Debt-to-Equity = Total Debt / Shareholders Equity (Target: < 1.5x)\n• Current Ratio = Current Assets / Current Liabilities (Target: > 1.2x)',
      keyTakeaway: 'Ratios reveal liquidity bottlenecks and covenant breach risks before cash reserves run dry.',
    },
  ];

  const filteredArticles = helpArticles.filter((art) => {
    const matchesCat = activeHelpCategory === 'ALL' || art.category === activeHelpCategory;
    const matchesQuery =
      art.title.toLowerCase().includes(helpSearchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(helpSearchQuery.toLowerCase()) ||
      art.details.toLowerCase().includes(helpSearchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="flex flex-col gap-4 text-[#fafafa] font-mono">
      {/* Header Banner */}
      <div className="bg-[#18181b] border border-[#27272a] p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#eab308]/10 text-[#eab308] border border-[#eab308]/30">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-white uppercase tracking-wider">
                Corporate Finance & DCF Valuation Terminal
              </h1>
              <span className="bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/40 px-2 py-0.5 text-[10px] font-bold uppercase">
                INSTITUTIONAL GRADE
              </span>
            </div>
            <p className="text-xs text-[#71717a]">
              3-Statement Accounting, DCF Intrinsic Modeling, WACC/CAPM Calculator, Capital Budgeting (NPV/IRR) & Solvency Ratios
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Stress Test Controls */}
          <button
            onClick={() => triggerMacroEvent('FED_RATE_HIKE')}
            className="bg-[#27272a] hover:bg-[#3f3f46] text-[#eab308] border border-[#eab308]/30 px-3 py-1.5 text-xs font-bold uppercase transition-colors cursor-pointer flex items-center gap-1.5"
            title="Simulate Central Bank Fed Rate Hike (+150 bps WACC)"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Rate Hike (+150 bps)</span>
          </button>
          <button
            onClick={() => triggerMacroEvent('RECESSION')}
            className="bg-[#27272a] hover:bg-[#3f3f46] text-[#f43f5e] border border-[#f43f5e]/30 px-3 py-1.5 text-xs font-bold uppercase transition-colors cursor-pointer flex items-center gap-1.5"
            title="Simulate Macro Economic Recession (-20% Revenue drop)"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Recession (-20% Rev)</span>
          </button>

          {/* Help Button */}
          <button
            onClick={() => setShowHelpModal(true)}
            className="bg-[#eab308] hover:bg-[#ca8a04] text-[#09090b] px-3.5 py-1.5 text-xs font-bold uppercase transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Finance Guide & Help</span>
          </button>
        </div>
      </div>

      {/* Primary Sub-Navigation Tabs */}
      <div className="bg-[#18181b] border border-[#27272a] p-2 flex items-center gap-1 overflow-x-auto">
        {[
          { id: 'SUMMARY', label: 'Overview & Key Metrics', icon: Layers },
          { id: 'MODEL', label: '3-Statement Financial Model', icon: FileText },
          { id: 'DCF', label: 'DCF Valuation & Sensitivity Matrix', icon: Grid },
          { id: 'WACC', label: 'WACC & CAPM Calculator', icon: Calculator },
          { id: 'BUDGETING', label: 'Capital Budgeting (NPV & IRR)', icon: Percent },
          { id: 'RATIOS', label: 'Credit & Financial Ratios', icon: BarChart2 },
        ].map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 text-xs font-bold uppercase transition-all flex items-center gap-2 cursor-pointer shrink-0 border ${
                isActive
                  ? 'bg-[#eab308] text-[#09090b] border-[#eab308]'
                  : 'bg-[#09090b] text-[#71717a] border-[#27272a] hover:border-[#71717a] hover:text-white'
              }`}
            >
              <IconComponent className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ================= TAB 1: OVERVIEW & KEY METRICS ================= */}
      {activeTab === 'SUMMARY' && (
        <div className="grid grid-cols-12 gap-4">
          {/* Corporate Financial Input Sliders */}
          <div className="col-span-12 lg:col-span-4 bg-[#18181b] border border-[#27272a] p-4">
            <h2 className="text-xs font-bold text-[#eab308] uppercase tracking-wider mb-3 border-b border-[#27272a] pb-2 flex items-center gap-1.5">
              <Sliders className="w-4 h-4" />
              <span>Corporate Financial Model Inputs</span>
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-[11px] text-[#71717a] mb-1">
                  <span>Annual Revenue</span>
                  <span className="font-bold text-white">{formatCurrency(revenue)}</span>
                </div>
                <input
                  type="range"
                  min="2000000"
                  max="50000000"
                  step="500000"
                  value={revenue}
                  onChange={(e) => setRevenue(Number(e.target.value))}
                  className="w-full accent-[#eab308] bg-[#09090b] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-[#71717a] mb-1">
                  <span>EBITDA Margin ({formatPercent(ebitda / revenue, 1)})</span>
                  <span className="font-bold text-[#10b981]">{formatCurrency(ebitda)}</span>
                </div>
                <input
                  type="range"
                  min={revenue * 0.05}
                  max={revenue * 0.5}
                  step="100000"
                  value={ebitda}
                  onChange={(e) => setEbitda(Number(e.target.value))}
                  className="w-full accent-[#10b981] bg-[#09090b] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-[#71717a] mb-1">
                  <span>Annual CapEx Outlay</span>
                  <span className="font-bold text-[#f43f5e]">{formatCurrency(capex)}</span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="3000000"
                  step="50000"
                  value={capex}
                  onChange={(e) => setCapex(Number(e.target.value))}
                  className="w-full accent-[#f43f5e] bg-[#09090b] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-[#71717a] mb-1">
                  <span>Total Long-Term Debt</span>
                  <span className="font-bold text-white">{formatCurrency(totalDebt)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20000000"
                  step="500000"
                  value={totalDebt}
                  onChange={(e) => setTotalDebt(Number(e.target.value))}
                  className="w-full accent-[#eab308] bg-[#09090b] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-[#71717a] mb-1">
                  <span>Cash & Cash Equivalents</span>
                  <span className="font-bold text-[#10b981]">{formatCurrency(cashEquiv)}</span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="10000000"
                  step="250000"
                  value={cashEquiv}
                  onChange={(e) => setCashEquiv(Number(e.target.value))}
                  className="w-full accent-[#10b981] bg-[#09090b] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-[#71717a] mb-1">
                  <span>WACC Discount Rate</span>
                  <span className="font-bold text-[#eab308]">{formatPercent(wacc, 2)}</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.15"
                  step="0.0025"
                  value={wacc}
                  onChange={(e) => setWacc(Number(e.target.value))}
                  className="w-full accent-[#eab308] bg-[#09090b] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-[#71717a] mb-1">
                  <span>Revenue Growth Rate</span>
                  <span className="font-bold text-[#10b981]">{formatPercent(revenueGrowth, 1)}</span>
                </div>
                <input
                  type="range"
                  min="0.01"
                  max="0.25"
                  step="0.005"
                  value={revenueGrowth}
                  onChange={(e) => setRevenueGrowth(Number(e.target.value))}
                  className="w-full accent-[#10b981] bg-[#09090b] cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Intrinsic DCF Valuation Summary Panel */}
          <div className="col-span-12 lg:col-span-8 space-y-4">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-[#18181b] border border-[#27272a] p-3">
                <div className="text-[10px] text-[#71717a] uppercase mb-1">DCF Value / Share</div>
                <div className="text-xl font-bold text-[#eab308]">{formatCurrency(dcf.intrinsicValuePerShare)}</div>
                <div className="text-[10px] text-[#10b981] mt-1 font-sans">
                  Target Price Valuation
                </div>
              </div>

              <div className="bg-[#18181b] border border-[#27272a] p-3">
                <div className="text-[10px] text-[#71717a] uppercase mb-1">Enterprise Value (EV)</div>
                <div className="text-xl font-bold text-white">{formatCurrency(dcf.enterpriseValue)}</div>
                <div className="text-[10px] text-[#71717a] mt-1 font-sans">
                  PV Cash Flow + TV
                </div>
              </div>

              <div className="bg-[#18181b] border border-[#27272a] p-3">
                <div className="text-[10px] text-[#71717a] uppercase mb-1">Equity Value</div>
                <div className="text-xl font-bold text-white">{formatCurrency(dcf.equityValue)}</div>
                <div className="text-[10px] text-[#71717a] mt-1 font-sans">
                  EV + Cash - Debt
                </div>
              </div>

              <div className="bg-[#18181b] border border-[#27272a] p-3">
                <div className="text-[10px] text-[#71717a] uppercase mb-1">Interest Coverage</div>
                <div className={`text-xl font-bold ${dcf.interestCoverageRatio >= 3.0 ? 'text-[#10b981]' : 'text-[#f43f5e]'}`}>
                  {dcf.interestCoverageRatio.toFixed(2)}x
                </div>
                <div className="text-[10px] text-[#71717a] mt-1 font-sans">
                  Target: &gt; 3.0x
                </div>
              </div>
            </div>

            {/* Quick Capital Allocation Actions */}
            <div className="bg-[#18181b] border border-[#27272a] p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-white uppercase flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-[#eab308]" />
                  <span>Execute Corporate Capital Allocation Actions</span>
                </h3>
                <span className="text-[11px] text-[#71717a]">
                  Deploy surplus cash into shareholder returns or PP&E
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                <button
                  onClick={() => allocateCorporateCapital('APEX', 'DIVIDEND', 150000)}
                  className="bg-[#09090b] hover:bg-[#27272a] border border-[#27272a] text-white p-3 text-left transition-all cursor-pointer group"
                >
                  <div className="text-xs font-bold text-[#eab308] group-hover:underline">Pay Cash Dividends ($150k)</div>
                  <div className="text-[10px] text-[#71717a] mt-1 font-sans">
                    Direct cash distribution to shareholders; lowers cash balance.
                  </div>
                </button>

                <button
                  onClick={() => allocateCorporateCapital('APEX', 'BUYBACK', 300000)}
                  className="bg-[#09090b] hover:bg-[#27272a] border border-[#27272a] text-white p-3 text-left transition-all cursor-pointer group"
                >
                  <div className="text-xs font-bold text-[#10b981] group-hover:underline">Share Repurchases ($300k)</div>
                  <div className="text-[10px] text-[#71717a] mt-1 font-sans">
                    Retires shares from market; boosts EPS & ROE metrics.
                  </div>
                </button>

                <button
                  onClick={() => allocateCorporateCapital('APEX', 'CAPEX', 500000)}
                  className="bg-[#09090b] hover:bg-[#27272a] border border-[#27272a] text-white p-3 text-left transition-all cursor-pointer group"
                >
                  <div className="text-xs font-bold text-[#3b82f6] group-hover:underline">CapEx Reinvestment ($500k)</div>
                  <div className="text-[10px] text-[#71717a] mt-1 font-sans">
                    Expands PP&E asset base; drives long-term revenue growth.
                  </div>
                </button>
              </div>
            </div>

            {/* Financial Health & Solvency Gauges */}
            <div className="bg-[#18181b] border border-[#27272a] p-4">
              <h3 className="text-xs font-bold text-[#eab308] uppercase tracking-wider mb-3 flex items-center justify-between border-b border-[#27272a] pb-2">
                <span>Solvency & Credit Health Benchmarks</span>
                <button
                  onClick={() => {
                    setActiveTab('RATIOS');
                  }}
                  className="text-[10px] text-[#71717a] hover:text-[#eab308] flex items-center gap-1 uppercase"
                >
                  <span>View All Ratios</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-[#09090b] p-3 border border-[#27272a]">
                  <div className="text-[10px] text-[#71717a] uppercase mb-1">Debt-To-Equity</div>
                  <div className="text-base font-bold text-white">{dcf.debtToEquity.toFixed(2)}x</div>
                  <div className="mt-1">
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 border uppercase ${
                      dcf.debtToEquity <= 1.5
                        ? 'bg-[#10b981]/20 text-[#10b981] border-[#10b981]'
                        : 'bg-[#f43f5e]/20 text-[#f43f5e] border-[#f43f5e]'
                    }`}>
                      {dcf.debtToEquity <= 1.5 ? 'HEALTHY' : 'LEVERAGED'}
                    </span>
                  </div>
                </div>

                <div className="bg-[#09090b] p-3 border border-[#27272a]">
                  <div className="text-[10px] text-[#71717a] uppercase mb-1">Net Debt / EBITDA</div>
                  <div className="text-base font-bold text-white">{dcf.netDebtToEbitda.toFixed(2)}x</div>
                  <div className="mt-1">
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 border uppercase ${
                      dcf.netDebtToEbitda <= 3.0
                        ? 'bg-[#10b981]/20 text-[#10b981] border-[#10b981]'
                        : 'bg-[#f43f5e]/20 text-[#f43f5e] border-[#f43f5e]'
                    }`}>
                      {dcf.netDebtToEbitda <= 3.0 ? 'LOW RISK' : 'HIGH RISK'}
                    </span>
                  </div>
                </div>

                <div className="bg-[#09090b] p-3 border border-[#27272a]">
                  <div className="text-[10px] text-[#71717a] uppercase mb-1">Current Ratio</div>
                  <div className="text-base font-bold text-white">{currentRatio.toFixed(2)}x</div>
                  <div className="mt-1">
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 border uppercase ${
                      currentRatio >= 1.2
                        ? 'bg-[#10b981]/20 text-[#10b981] border-[#10b981]'
                        : 'bg-[#f43f5e]/20 text-[#f43f5e] border-[#f43f5e]'
                    }`}>
                      {currentRatio >= 1.2 ? 'LIQUID' : 'CRITICAL'}
                    </span>
                  </div>
                </div>

                <div className="bg-[#09090b] p-3 border border-[#27272a]">
                  <div className="text-[10px] text-[#71717a] uppercase mb-1">Return on Equity</div>
                  <div className="text-base font-bold text-[#10b981]">{formatPercent(roe, 1)}</div>
                  <div className="mt-1">
                    <span className="text-[9px] text-[#71717a]">Net Profit / Equity</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: 3-STATEMENT FINANCIAL MODEL ================= */}
      {activeTab === 'MODEL' && (
        <div className="bg-[#18181b] border border-[#27272a] p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-[#27272a] pb-3">
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#eab308]" />
                <span>3-Statement Financial Model & Unlevered FCF Bridge</span>
              </h2>
              <p className="text-xs text-[#71717a] font-sans">
                Linked Income Statement, Balance Sheet, and Statement of Cash Flows with real-time operational calculations
              </p>
            </div>

            {/* Statement View Toggles */}
            <div className="flex bg-[#09090b] border border-[#27272a] p-1">
              {(['IS', 'BS', 'CF'] as const).map((stmt) => (
                <button
                  key={stmt}
                  onClick={() => setSelectedStatement(stmt)}
                  className={`px-3 py-1 text-xs font-bold transition-colors cursor-pointer ${
                    selectedStatement === stmt
                      ? 'bg-[#eab308] text-[#09090b]'
                      : 'text-[#71717a] hover:text-white'
                  }`}
                >
                  {stmt === 'IS' ? 'Income Statement (P&L)' : stmt === 'BS' ? 'Balance Sheet' : 'Cash Flow Statement'}
                </button>
              ))}
            </div>
          </div>

          {/* Statement Render */}
          <div className="bg-[#09090b] border border-[#27272a] p-4 text-xs font-mono space-y-2">
            {selectedStatement === 'IS' && (
              <>
                <div className="text-[10px] text-[#eab308] uppercase font-bold mb-2">INCOME STATEMENT (ANNUAL REVENUE & PROFITABILITY)</div>
                <div className="flex justify-between border-b border-[#27272a] pb-1.5">
                  <span className="text-[#a1a1aa]">Gross Revenues</span>
                  <span className="font-bold text-white">{formatCurrency(revenue)}</span>
                </div>
                <div className="flex justify-between border-b border-[#27272a] pb-1.5">
                  <span className="text-[#71717a]">Cost of Goods Sold (COGS approx 60%)</span>
                  <span className="text-[#f43f5e]">-{formatCurrency(cogs)}</span>
                </div>
                <div className="flex justify-between border-b border-[#27272a] pb-1.5 bg-[#18181b] px-2 py-1">
                  <span className="font-bold text-white">Gross Profit</span>
                  <span className="font-bold text-[#10b981]">{formatCurrency(revenue - cogs)}</span>
                </div>
                <div className="flex justify-between border-b border-[#27272a] pb-1.5">
                  <span className="text-[#71717a]">Operating Expenses (SG&A, R&D)</span>
                  <span className="text-[#f43f5e]">-{formatCurrency(revenue - cogs - ebitda)}</span>
                </div>
                <div className="flex justify-between border-b border-[#27272a] pb-1.5 bg-[#eab308]/10 p-2 border border-[#eab308]/30">
                  <span className="font-bold text-white">EBITDA (Operational Cash Earnings)</span>
                  <span className="font-bold text-[#eab308]">{formatCurrency(ebitda)}</span>
                </div>
                <div className="flex justify-between border-b border-[#27272a] pb-1.5">
                  <span className="text-[#71717a]">Depreciation & Amortization (D&A)</span>
                  <span className="text-[#f43f5e]">-{formatCurrency(capex * 0.5)}</span>
                </div>
                <div className="flex justify-between border-b border-[#27272a] pb-1.5">
                  <span className="text-[#a1a1aa]">EBIT (Operating Income)</span>
                  <span className="font-bold text-white">{formatCurrency(ebit)}</span>
                </div>
                <div className="flex justify-between border-b border-[#27272a] pb-1.5">
                  <span className="text-[#71717a]">Interest Expense (Debt Service)</span>
                  <span className="text-[#f43f5e]">-{formatCurrency(totalDebt * 0.05)}</span>
                </div>
                <div className="flex justify-between border-b border-[#27272a] pb-1.5">
                  <span className="text-[#71717a]">Corporate Income Tax ({formatPercent(taxRate, 0)})</span>
                  <span className="text-[#f43f5e]">-{formatCurrency(Math.max(0, ebit - totalDebt * 0.05) * taxRate)}</span>
                </div>
                <div className="flex justify-between pt-2 text-sm bg-[#10b981]/10 p-2 border border-[#10b981]/30">
                  <span className="font-bold text-white">Net Income (Bottom Line Profit)</span>
                  <span className="font-bold text-[#10b981]">{formatCurrency(netIncome)}</span>
                </div>
              </>
            )}

            {selectedStatement === 'BS' && (
              <>
                <div className="text-[10px] text-[#eab308] uppercase font-bold mb-2">BALANCE SHEET (ASSETS vs LIABILITIES & EQUITY)</div>
                <div className="text-[10px] text-[#10b981] uppercase font-bold mt-2">ASSETS</div>
                <div className="flex justify-between border-b border-[#27272a] pb-1.5">
                  <span className="text-[#71717a]">Cash & Cash Equivalents</span>
                  <span className="font-bold text-white">{formatCurrency(cashEquiv)}</span>
                </div>
                <div className="flex justify-between border-b border-[#27272a] pb-1.5">
                  <span className="text-[#71717a]">Accounts Receivable (15% rev)</span>
                  <span className="font-bold text-white">{formatCurrency(revenue * 0.15)}</span>
                </div>
                <div className="flex justify-between border-b border-[#27272a] pb-1.5">
                  <span className="text-[#71717a]">Property, Plant & Equipment (Net PP&E)</span>
                  <span className="font-bold text-white">{formatCurrency(capex * 4.2)}</span>
                </div>
                <div className="flex justify-between border-b border-[#27272a] pb-1.5 bg-[#18181b] px-2 py-1">
                  <span className="font-bold text-white">TOTAL ASSETS</span>
                  <span className="font-bold text-[#10b981]">{formatCurrency(cashEquiv + revenue * 0.15 + capex * 4.2)}</span>
                </div>

                <div className="text-[10px] text-[#f43f5e] uppercase font-bold mt-3 mb-1">LIABILITIES & EQUITY</div>
                <div className="flex justify-between border-b border-[#27272a] pb-1.5">
                  <span className="text-[#71717a]">Short-Term Accounts Payable</span>
                  <span className="text-[#f43f5e] font-bold">{formatCurrency(totalDebt * 0.2)}</span>
                </div>
                <div className="flex justify-between border-b border-[#27272a] pb-1.5">
                  <span className="text-[#71717a]">Total Long-Term Debt</span>
                  <span className="text-[#f43f5e] font-bold">{formatCurrency(totalDebt)}</span>
                </div>
                <div className="flex justify-between border-b border-[#27272a] pb-1.5">
                  <span className="text-[#71717a]">Shareholders Equity</span>
                  <span className="text-[#10b981] font-bold">{formatCurrency(dcf.equityValue)}</span>
                </div>
                <div className="flex justify-between pt-2 text-xs bg-[#27272a] p-2 border border-[#3f3f46]">
                  <span className="font-bold text-white">TOTAL LIABILITIES & EQUITY</span>
                  <span className="font-bold text-[#eab308]">{formatCurrency(totalDebt * 1.2 + dcf.equityValue)}</span>
                </div>
              </>
            )}

            {selectedStatement === 'CF' && (
              <>
                <div className="text-[10px] text-[#eab308] uppercase font-bold mb-2">CASH FLOW STATEMENT (FREE CASH FLOW BRIDGE)</div>
                <div className="flex justify-between border-b border-[#27272a] pb-1.5">
                  <span className="text-[#a1a1aa]">EBITDA (Operating Earnings)</span>
                  <span className="font-bold text-white">{formatCurrency(ebitda)}</span>
                </div>
                <div className="flex justify-between border-b border-[#27272a] pb-1.5">
                  <span className="text-[#71717a]">Less: Taxes on EBIT [EBIT * TaxRate]</span>
                  <span className="text-[#f43f5e]">-{formatCurrency(ebit * taxRate)}</span>
                </div>
                <div className="flex justify-between border-b border-[#27272a] pb-1.5">
                  <span className="text-[#71717a]">Capital Expenditures (CapEx Outflow)</span>
                  <span className="text-[#f43f5e]">-{formatCurrency(capex)}</span>
                </div>
                <div className="flex justify-between pt-2 text-sm bg-[#eab308]/10 p-2.5 border border-[#eab308]/30">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <span>Unlevered Free Cash Flow (FCFF)</span>
                    <button
                      onClick={() => {
                        setActiveHelpCategory('STATEMENTS');
                        setShowHelpModal(true);
                      }}
                      className="text-[#71717a] hover:text-[#eab308]"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                    </button>
                  </span>
                  <span className="font-bold text-[#eab308]">{formatCurrency(ebit * (1 - taxRate) + capex * 0.5 - capex)}</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ================= TAB 3: DCF VALUATION & SENSITIVITY MATRIX ================= */}
      {activeTab === 'DCF' && (
        <div className="space-y-4">
          {/* 5-Year Cash Flow Projection Table */}
          <div className="bg-[#18181b] border border-[#27272a] p-5">
            <h2 className="text-xs font-bold text-[#eab308] uppercase tracking-wider mb-3 flex items-center justify-between border-b border-[#27272a] pb-2">
              <span className="flex items-center gap-2">
                <Grid className="w-4 h-4" />
                <span>5-Year Projected Unlevered Free Cash Flow (FCFF) Schedule</span>
              </span>
              <span className="text-[11px] text-[#71717a] font-normal">
                WACC: <strong className="text-[#eab308]">{formatPercent(wacc, 2)}</strong> | Terminal Growth: <strong className="text-[#10b981]">{formatPercent(terminalGrowth, 2)}</strong>
              </span>
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="bg-[#09090b] text-[#71717a] border-b border-[#27272a]">
                    <th className="p-2.5">Line Item</th>
                    <th className="p-2.5 text-right">Year 1</th>
                    <th className="p-2.5 text-right">Year 2</th>
                    <th className="p-2.5 text-right">Year 3</th>
                    <th className="p-2.5 text-right">Year 4</th>
                    <th className="p-2.5 text-right">Year 5 (Terminal)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#27272a]">
                  <tr>
                    <td className="p-2.5 text-white font-bold">Projected Revenue</td>
                    {dcf.projectedFCFs.map((_, i) => {
                      const projRev = revenue * Math.pow(1 + revenueGrowth, i + 1);
                      return (
                        <td key={i} className="p-2.5 text-right text-white">
                          {formatCurrency(projRev)}
                        </td>
                      );
                    })}
                  </tr>
                  <tr>
                    <td className="p-2.5 text-[#71717a]">EBITDA</td>
                    {dcf.projectedFCFs.map((_, i) => {
                      const projRev = revenue * Math.pow(1 + revenueGrowth, i + 1);
                      const projEbitda = projRev * (ebitda / revenue);
                      return (
                        <td key={i} className="p-2.5 text-right text-[#10b981]">
                          {formatCurrency(projEbitda)}
                        </td>
                      );
                    })}
                  </tr>
                  <tr>
                    <td className="p-2.5 text-[#71717a]">Unlevered Free Cash Flow (FCF)</td>
                    {dcf.projectedFCFs.map((fcfVal, i) => (
                      <td key={i} className="p-2.5 text-right text-[#eab308] font-bold">
                        {formatCurrency(fcfVal)}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-[#09090b]">
                    <td className="p-2.5 text-[#71717a]">Discount Factor [1 / (1 + WACC)^t]</td>
                    {dcf.projectedFCFs.map((_, i) => (
                      <td key={i} className="p-2.5 text-right text-[#71717a]">
                        {(1 / Math.pow(1 + wacc, i + 1)).toFixed(4)}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-[#eab308]/10 font-bold border-t border-[#eab308]/30">
                    <td className="p-2.5 text-white">Present Value (PV of FCF)</td>
                    {dcf.projectedFCFs.map((fcfVal, i) => (
                      <td key={i} className="p-2.5 text-right text-[#eab308]">
                        {formatCurrency(fcfVal / Math.pow(1 + wacc, i + 1))}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 pt-3 border-t border-[#27272a] text-xs">
              <div className="bg-[#09090b] p-3 border border-[#27272a]">
                <div className="text-[10px] text-[#71717a] uppercase">PV of 5-Year Cash Flows</div>
                <div className="text-sm font-bold text-white mt-1">{formatCurrency(dcf.pvProjectedFCFs)}</div>
              </div>
              <div className="bg-[#09090b] p-3 border border-[#27272a]">
                <div className="text-[10px] text-[#71717a] uppercase">PV of Terminal Value</div>
                <div className="text-sm font-bold text-white mt-1">{formatCurrency(dcf.pvTerminalValue)}</div>
              </div>
              <div className="bg-[#09090b] p-3 border border-[#eab308]/40">
                <div className="text-[10px] text-[#eab308] uppercase font-bold">Enterprise Value (EV)</div>
                <div className="text-base font-bold text-[#eab308] mt-1">{formatCurrency(dcf.enterpriseValue)}</div>
              </div>
            </div>
          </div>

          {/* 2D DCF Sensitivity Matrix Grid */}
          <div className="bg-[#18181b] border border-[#27272a] p-5">
            <div className="flex items-center justify-between mb-3 border-b border-[#27272a] pb-2">
              <div>
                <h3 className="text-xs font-bold text-[#eab308] uppercase tracking-wider flex items-center gap-1.5">
                  <Grid className="w-4 h-4" />
                  <span>DCF Valuation Sensitivity Table (WACC vs. Terminal Growth Rate)</span>
                </h3>
                <p className="text-[11px] text-[#71717a] font-sans">
                  Intrinsic Stock Price per Share ($) across varying discount rates and perpetual growth assumptions
                </p>
              </div>

              <span className="text-[10px] bg-[#eab308]/20 text-[#eab308] border border-[#eab308]/40 px-2.5 py-1 font-bold">
                Active Valuation: {formatCurrency(dcf.intrinsicValuePerShare)} / share
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-center text-xs font-mono border-collapse">
                <thead>
                  <tr className="bg-[#09090b] text-[#71717a] border-b border-[#27272a]">
                    <th className="p-2 text-left text-white border-r border-[#27272a]">WACC \ Terminal Growth</th>
                    {sensitivityGrowths.map((g) => (
                      <th key={g} className="p-2 border-r border-[#27272a]">
                        {formatPercent(g, 1)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#27272a]">
                  {sensitivityWaccs.map((w) => (
                    <tr key={w}>
                      <td className="p-2 text-left font-bold text-[#eab308] bg-[#09090b] border-r border-[#27272a]">
                        {formatPercent(w, 1)}
                      </td>
                      {sensitivityGrowths.map((g) => {
                        // Calculate matrix cell value
                        const cellDcf = calculateDCFModel({
                          revenue,
                          operatingExpenses: revenue - ebitda,
                          ebitda,
                          capex,
                          totalDebt,
                          cashAndEquivalents: cashEquiv,
                          sharesOutstanding: shares,
                          taxRate,
                          wacc: w,
                          terminalGrowthRate: g,
                          projectionYears: 5,
                          revenueGrowthRate: revenueGrowth,
                        });

                        const isCurrentActiveCell =
                          Math.abs(w - wacc) < 0.003 && Math.abs(g - terminalGrowth) < 0.003;

                        return (
                          <td
                            key={g}
                            className={`p-2 border-r border-[#27272a] transition-colors ${
                              isCurrentActiveCell
                                ? 'bg-[#eab308] text-[#09090b] font-bold shadow-lg scale-105'
                                : cellDcf.intrinsicValuePerShare >= dcf.intrinsicValuePerShare
                                ? 'bg-[#10b981]/10 text-[#10b981]'
                                : 'bg-[#09090b] text-[#a1a1aa]'
                            }`}
                          >
                            {formatCurrency(cellDcf.intrinsicValuePerShare)}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 4: WACC & CAPM CALCULATOR ================= */}
      {activeTab === 'WACC' && (
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-6 bg-[#18181b] border border-[#27272a] p-5 space-y-4">
            <h2 className="text-xs font-bold text-[#eab308] uppercase tracking-wider border-b border-[#27272a] pb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Calculator className="w-4 h-4" />
                <span>CAPM Cost of Equity ($R_e$) Calculator</span>
              </span>
              <button
                onClick={() => {
                  setActiveHelpCategory('DCF');
                  setShowHelpModal(true);
                }}
                className="text-[#71717a] hover:text-[#eab308]"
              >
                <HelpCircle className="w-3.5 h-3.5" />
              </button>
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-[11px] text-[#71717a] mb-1">
                  <span>Risk-Free Rate ($R_f$ e.g. 10-Yr US Treasury)</span>
                  <span className="font-bold text-white">{formatPercent(riskFreeRate, 2)}</span>
                </div>
                <input
                  type="range"
                  min="0.01"
                  max="0.08"
                  step="0.0025"
                  value={riskFreeRate}
                  onChange={(e) => setRiskFreeRate(Number(e.target.value))}
                  className="w-full accent-[#eab308] bg-[#09090b] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-[#71717a] mb-1">
                  <span>Stock Beta ($\beta$ Market Volatility Risk)</span>
                  <span className="font-bold text-[#10b981]">{beta.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.5"
                  step="0.05"
                  value={beta}
                  onChange={(e) => setBeta(Number(e.target.value))}
                  className="w-full accent-[#10b981] bg-[#09090b] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-[#71717a] mb-1">
                  <span>Equity Risk Premium ($ERP$)</span>
                  <span className="font-bold text-white">{formatPercent(equityRiskPremium, 2)}</span>
                </div>
                <input
                  type="range"
                  min="0.03"
                  max="0.09"
                  step="0.005"
                  value={equityRiskPremium}
                  onChange={(e) => setEquityRiskPremium(Number(e.target.value))}
                  className="w-full accent-[#eab308] bg-[#09090b] cursor-pointer"
                />
              </div>
            </div>

            <div className="bg-[#09090b] border border-[#27272a] p-4 text-xs space-y-2">
              <div className="text-[10px] text-[#eab308] font-bold uppercase">CAPM Cost of Equity Formula:</div>
              <div className="text-white font-mono bg-[#18181b] p-2 border border-[#27272a]">
                $R_e = R_f + \beta \times ERP = {formatPercent(riskFreeRate, 2)} + ({beta.toFixed(2)} \times {formatPercent(equityRiskPremium, 2)}) = $
                <strong className="text-[#10b981] font-bold text-sm ml-1">{formatPercent(calculatedCostOfEquity, 2)}</strong>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6 bg-[#18181b] border border-[#27272a] p-5 space-y-4">
            <h2 className="text-xs font-bold text-[#eab308] uppercase tracking-wider border-b border-[#27272a] pb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Percent className="w-4 h-4" />
                <span>Weighted Capital Structure & WACC Blending</span>
              </span>
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-[11px] text-[#71717a] mb-1">
                  <span>Pre-Tax Corporate Debt Interest Rate</span>
                  <span className="font-bold text-[#f43f5e]">{formatPercent(costOfDebtPreTax, 2)}</span>
                </div>
                <input
                  type="range"
                  min="0.03"
                  max="0.12"
                  step="0.0025"
                  value={costOfDebtPreTax}
                  onChange={(e) => setCostOfDebtPreTax(Number(e.target.value))}
                  className="w-full accent-[#f43f5e] bg-[#09090b] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-[#71717a] mb-1">
                  <span>Capital Weight: Equity ({formatPercent(equityWeight, 0)}) vs Debt ({formatPercent(debtWeight, 0)})</span>
                  <span className="font-bold text-white">{formatPercent(equityWeight, 0)} Equity</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="0.95"
                  step="0.05"
                  value={equityWeight}
                  onChange={(e) => setEquityWeight(Number(e.target.value))}
                  className="w-full accent-[#eab308] bg-[#09090b] cursor-pointer"
                />
              </div>
            </div>

            <div className="bg-[#09090b] border border-[#eab308]/40 p-4 text-xs space-y-2">
              <div className="flex justify-between text-xs border-b border-[#27272a] pb-1.5">
                <span className="text-[#71717a]">After-Tax Cost of Debt [Rd * (1 - T)]:</span>
                <span className="font-bold text-[#10b981]">{formatPercent(calculatedCostOfDebtAfterTax, 2)}</span>
              </div>
              <div className="flex justify-between text-sm border-t border-[#27272a] pt-2">
                <span className="font-bold text-[#eab308]">Calculated Blended WACC:</span>
                <span className="font-bold text-[#eab308] text-base">{formatPercent(blendedWacc, 2)}</span>
              </div>

              <button
                onClick={handleApplyCapmWacc}
                className="w-full mt-3 bg-[#eab308] hover:bg-[#ca8a04] text-[#09090b] py-2 text-xs font-bold uppercase transition-colors cursor-pointer flex items-center justify-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Apply Calculated WACC ({formatPercent(blendedWacc, 2)}) to DCF Model</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 5: CAPITAL BUDGETING (NPV & IRR) ================= */}
      {activeTab === 'BUDGETING' && (
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-5 bg-[#18181b] border border-[#27272a] p-5 space-y-4">
            <h2 className="text-xs font-bold text-[#eab308] uppercase tracking-wider border-b border-[#27272a] pb-2 flex items-center gap-1.5">
              <Building2 className="w-4 h-4" />
              <span>Project Evaluation Parameters</span>
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-[11px] text-[#71717a] mb-1">
                  <span>Initial Capital Outlay (CapEx)</span>
                  <span className="font-bold text-[#f43f5e]">{formatCurrency(projInitialOutlay)}</span>
                </div>
                <input
                  type="range"
                  min="200000"
                  max="5000000"
                  step="100000"
                  value={projInitialOutlay}
                  onChange={(e) => setProjInitialOutlay(Number(e.target.value))}
                  className="w-full accent-[#f43f5e] bg-[#09090b] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-[#71717a] mb-1">
                  <span>Discount / Hurdle Rate</span>
                  <span className="font-bold text-[#eab308]">{formatPercent(projDiscountRate, 2)}</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.18"
                  step="0.005"
                  value={projDiscountRate}
                  onChange={(e) => setProjDiscountRate(Number(e.target.value))}
                  className="w-full accent-[#eab308] bg-[#09090b] cursor-pointer"
                />
              </div>

              <div className="pt-2 border-t border-[#27272a]">
                <div className="text-[11px] font-bold text-white mb-2">Projected 5-Year Cash Inflows ($):</div>
                {projCashFlows.map((cf, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] text-[#71717a]">Year {idx + 1}:</span>
                    <input
                      type="number"
                      value={cf}
                      onChange={(e) => {
                        const newCfs = [...projCashFlows];
                        newCfs[idx] = Number(e.target.value);
                        setProjCashFlows(newCfs);
                      }}
                      className="bg-[#09090b] border border-[#27272a] px-2 py-1 text-xs text-white text-right w-32 focus:border-[#eab308] outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7 bg-[#18181b] border border-[#27272a] p-5 space-y-4 flex flex-col justify-between">
            <div>
              <h2 className="text-xs font-bold text-[#eab308] uppercase tracking-wider border-b border-[#27272a] pb-2 flex items-center justify-between">
                <span>Capital Budgeting Output Metrics</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 border uppercase ${
                  projNPV > 0
                    ? 'bg-[#10b981]/20 text-[#10b981] border-[#10b981]'
                    : 'bg-[#f43f5e]/20 text-[#f43f5e] border-[#f43f5e]'
                }`}>
                  {projNPV > 0 ? 'RECOMMENDATION: ACCEPT PROJECT' : 'RECOMMENDATION: REJECT PROJECT'}
                </span>
              </h2>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-[#09090b] border border-[#27272a] p-4">
                  <div className="text-[10px] text-[#71717a] uppercase mb-1">Net Present Value (NPV)</div>
                  <div className={`text-xl font-bold ${projNPV >= 0 ? 'text-[#10b981]' : 'text-[#f43f5e]'}`}>
                    {formatCurrency(projNPV)}
                  </div>
                  <div className="text-[10px] text-[#71717a] mt-1 font-sans">
                    Absolute value added to firm wealth
                  </div>
                </div>

                <div className="bg-[#09090b] border border-[#27272a] p-4">
                  <div className="text-[10px] text-[#71717a] uppercase mb-1">Internal Rate of Return (IRR)</div>
                  <div className={`text-xl font-bold ${projIRR >= projDiscountRate ? 'text-[#10b981]' : 'text-[#f43f5e]'}`}>
                    {formatPercent(projIRR, 2)}
                  </div>
                  <div className="text-[10px] text-[#71717a] mt-1 font-sans">
                    Hurdle Rate Benchmark: {formatPercent(projDiscountRate, 2)}
                  </div>
                </div>

                <div className="bg-[#09090b] border border-[#27272a] p-4">
                  <div className="text-[10px] text-[#71717a] uppercase mb-1">Simple Payback Period</div>
                  <div className="text-xl font-bold text-white">
                    {paybackYears < 90 ? `${paybackYears.toFixed(2)} Years` : 'Never Payback'}
                  </div>
                  <div className="text-[10px] text-[#71717a] mt-1 font-sans">
                    Time to recover initial capital outlay
                  </div>
                </div>

                <div className="bg-[#09090b] border border-[#27272a] p-4">
                  <div className="text-[10px] text-[#71717a] uppercase mb-1">Profitability Index (PI)</div>
                  <div className={`text-xl font-bold ${profitabilityIndex >= 1.0 ? 'text-[#10b981]' : 'text-[#f43f5e]'}`}>
                    {profitabilityIndex.toFixed(2)}x
                  </div>
                  <div className="text-[10px] text-[#71717a] mt-1 font-sans">
                    Target: &gt; 1.0x (PV Inflows / Outlay)
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#09090b] border border-[#27272a] p-3 text-xs text-[#a1a1aa]">
              <strong className="text-white">Corporate Decision Rule:</strong> An investment project is economically viable if Net Present Value (NPV) &gt; $0 and Internal Rate of Return (IRR) exceeds the corporate WACC hurdle rate ({formatPercent(projDiscountRate, 2)}).
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 6: CREDIT & FINANCIAL RATIOS ================= */}
      {activeTab === 'RATIOS' && (
        <div className="bg-[#18181b] border border-[#27272a] p-5 space-y-4">
          <h2 className="text-xs font-bold text-[#eab308] uppercase tracking-wider border-b border-[#27272a] pb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <BarChart2 className="w-4 h-4" />
              <span>Comprehensive Corporate Financial Ratio Suite</span>
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Liquidity Ratios */}
            <div className="bg-[#09090b] border border-[#27272a] p-4 space-y-3">
              <h3 className="text-xs font-bold text-white uppercase border-b border-[#27272a] pb-1.5">
                Liquidity Ratios
              </h3>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#71717a]">Current Ratio</span>
                <span className="font-bold text-white">{currentRatio.toFixed(2)}x</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#71717a]">Quick (Acid-Test) Ratio</span>
                <span className="font-bold text-white">{quickRatio.toFixed(2)}x</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#71717a]">Cash Ratio</span>
                <span className="font-bold text-white">{(cashEquiv / (totalDebt * 0.2)).toFixed(2)}x</span>
              </div>
            </div>

            {/* Solvency & Debt Ratios */}
            <div className="bg-[#09090b] border border-[#27272a] p-4 space-y-3">
              <h3 className="text-xs font-bold text-white uppercase border-b border-[#27272a] pb-1.5">
                Solvency & Leverage Ratios
              </h3>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#71717a]">Debt-to-Equity (D/E)</span>
                <span className="font-bold text-white">{dcf.debtToEquity.toFixed(2)}x</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#71717a]">Net Debt / EBITDA</span>
                <span className="font-bold text-white">{dcf.netDebtToEbitda.toFixed(2)}x</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#71717a]">Interest Coverage Ratio</span>
                <span className="font-bold text-[#10b981]">{dcf.interestCoverageRatio.toFixed(2)}x</span>
              </div>
            </div>

            {/* Profitability Ratios */}
            <div className="bg-[#09090b] border border-[#27272a] p-4 space-y-3">
              <h3 className="text-xs font-bold text-white uppercase border-b border-[#27272a] pb-1.5">
                Profitability & Returns
              </h3>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#71717a]">Gross Margin %</span>
                <span className="font-bold text-[#10b981]">{formatPercent(grossMargin, 1)}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#71717a]">EBITDA Margin %</span>
                <span className="font-bold text-[#10b981]">{formatPercent(ebitdaMargin, 1)}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#71717a]">Return on Equity (ROE)</span>
                <span className="font-bold text-[#10b981]">{formatPercent(roe, 1)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= INTERACTIVE HELP & KNOWLEDGE BASE MODAL ================= */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#18181b] border border-[#27272a] w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-white font-mono">
            {/* Modal Header */}
            <div className="bg-[#09090b] border-b border-[#27272a] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#eab308]/10 text-[#eab308] border border-[#eab308]/30">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold uppercase text-white tracking-wider flex items-center gap-2">
                    Corporate Finance & DCF Knowledge Base
                  </h2>
                  <p className="text-[11px] text-[#71717a]">
                    Master DCF valuation, 3-statement modeling, CAPM/WACC, capital budgeting, and credit risk
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowHelpModal(false)}
                className="p-1.5 text-[#71717a] hover:text-white hover:bg-[#27272a] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category Filter & Search Bar */}
            <div className="p-4 border-b border-[#27272a] bg-[#121215] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1 overflow-x-auto py-1">
                {(['ALL', 'DCF', 'STATEMENTS', 'CAPITAL', 'RATIOS'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveHelpCategory(cat)}
                    className={`px-3 py-1 text-[11px] font-bold uppercase border transition-colors cursor-pointer ${
                      activeHelpCategory === cat
                        ? 'bg-[#eab308] text-[#09090b] border-[#eab308]'
                        : 'bg-[#09090b] text-[#71717a] border-[#27272a] hover:border-[#71717a]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative flex-1 min-w-[200px] max-w-xs">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#71717a]" />
                <input
                  type="text"
                  placeholder="Search terms (e.g. WACC, FCF, NPV)..."
                  value={helpSearchQuery}
                  onChange={(e) => setHelpSearchQuery(e.target.value)}
                  className="w-full bg-[#09090b] border border-[#27272a] pl-8 pr-3 py-1.5 text-xs text-white focus:border-[#eab308] outline-none"
                />
              </div>
            </div>

            {/* Content Area */}
            <div className="p-5 overflow-y-auto space-y-4 max-h-[60vh]">
              {filteredArticles.length === 0 ? (
                <div className="text-center py-10 text-[#71717a]">
                  <HelpCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-xs uppercase">No topics matched query "{helpSearchQuery}"</p>
                </div>
              ) : (
                filteredArticles.map((art) => (
                  <div key={art.id} className="bg-[#09090b] border border-[#27272a] p-4 hover:border-[#eab308]/50 transition-colors">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-[10px] bg-[#eab308]/10 text-[#eab308] border border-[#eab308]/30 px-2 py-0.5 font-bold uppercase">
                        {art.category}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white mb-1.5 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#eab308] shrink-0" />
                      <span>{art.title}</span>
                    </h3>

                    <p className="text-xs text-[#a1a1aa] mb-2 font-sans leading-relaxed">{art.summary}</p>

                    <div className="bg-[#18181b] border border-[#27272a] p-3 text-xs text-[#e4e4e7] space-y-2 font-mono whitespace-pre-line mb-2">
                      {art.details}
                    </div>

                    <div className="flex items-center gap-2 text-[11px] bg-[#10b981]/10 border border-[#10b981]/30 text-[#10b981] p-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>
                        <strong>Key Takeaway:</strong> {art.keyTakeaway}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-[#09090b] border-t border-[#27272a] p-3 flex justify-end">
              <button
                onClick={() => setShowHelpModal(false)}
                className="bg-[#eab308] hover:bg-[#ca8a04] text-[#09090b] px-4 py-1.5 text-xs font-bold uppercase transition-colors cursor-pointer"
              >
                Close & Return to Terminal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
