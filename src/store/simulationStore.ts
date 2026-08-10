import { create } from 'zustand';
import { INITIAL_EXAM_QUESTIONS } from '../data/decaQuestions';
import {
  DoubleEntryLedgerRecord,
  Investment,
  MacroState,
  UserPortfolioState,
  ExamQuestion,
  DecaCaseStudy,
  RoleplayNoteMatrix,
  DecaRubricCriterion,
  StockCatalogItem,
  PricePoint,
  PaperOrder,
  PaperOrderSide,
  PaperOrderType,
  PaperOrderStatus,
  RealEstateCatalogItem,
  PropertyValuationHistoryPoint,
  RealEstatePropertyType,
} from '../types/financial';
import { calculateRealEstateDeal } from '../utils/financialMath';
import { INITIAL_REAL_ESTATE_CATALOG } from '../data/realEstateCatalog';
import { DECA_ROLEPLAY_SCENARIOS } from '../data/decaRoleplays';

export type NavTab =
  | 'bento'
  | 'stock_trading'
  | 'real_estate'
  | 'corporate_finance'
  | 'portfolio'
  | 'deca_exams'
  | 'deca_roleplay'
  | 'deca_reports'
  | 'sql_schema';

interface SimulationStore {
  // Navigation State
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;

  // Stock Trading Engine
  selectedStockTicker: string;
  setSelectedStockTicker: (ticker: string) => void;
  stockCatalog: StockCatalogItem[];
  buyStock: (ticker: string, shares: number) => void;
  sellStock: (ticker: string, shares: number) => void;
  pendingPaperOrders: PaperOrder[];
  paperOrderHistory: PaperOrder[];
  placePaperOrder: (ticker: string, side: PaperOrderSide, orderType: PaperOrderType, quantity: number, targetPrice?: number) => void;
  cancelPaperOrder: (orderId: string) => void;
  resetPaperBalance: () => void;

  // User & Portfolio
  portfolio: UserPortfolioState;
  investments: Investment[];
  ledgerRecords: DoubleEntryLedgerRecord[];
  
  // Real Estate Catalog Engine
  realEstateCatalog: RealEstateCatalogItem[];

  // Macro Engine
  macroState: MacroState;
  
  // DECA Data
  examQuestions: ExamQuestion[];
  currentCaseStudy: DecaCaseStudy;
  usedCaseStudyIds: string[];
  roleplayMatrix: RoleplayNoteMatrix;
  roleplayTimerSeconds: number;
  isTimerRunning: boolean;
  rubricCriteria: DecaRubricCriterion[];
  studentReportText: string;
  regenerateRoleplayTopic: () => void;

  // Engine Actions
  advanceTick: () => void;
  triggerMacroEvent: (eventType: 'INFLATION_SPIKE' | 'RECESSION' | 'TECH_BOOM' | 'FED_RATE_HIKE') => void;
  buyRealEstateProperty: (deal: {
    name: string;
    propertyType?: string;
    address?: string;
    unitsOrSqft?: string;
    purchasePrice: number;
    grossRent: number;
    vacancyRate: number;
    opEx?: number;
    propertyTax?: number;
    insurance?: number;
    maintenance?: number;
    managementFeePct?: number;
    utilities?: number;
    capexReserve?: number;
    ltvRatio: number;
    interestRate: number;
    interestType: 'FIXED' | 'FLOATING';
    projectedAppreciationRate?: number;
  }) => void;
  refinanceProperty: (investmentId: string, newRate: number, newLtv: number) => void;
  sellProperty: (investmentId: string) => void;
  reinvestCapExProperty: (investmentId: string, capexAmount: number) => void;
  payOffPropertyMortgagePrincipal: (investmentId: string, amount: number) => void;
  allocateCorporateCapital: (ticker: string, action: 'DIVIDEND' | 'BUYBACK' | 'CAPEX', amount: number) => void;
  
  // DECA Actions
  setRoleplayNotes: (field: keyof RoleplayNoteMatrix, value: string) => void;
  setPiNote: (piCode: string, text: string) => void;
  toggleTimer: () => void;
  resetTimer: () => void;
  decrementTimer: () => void;
  updateRubricScore: (id: string, score: number) => void;
  setStudentReportText: (text: string) => void;
  resetSimulation: () => void;
}

const INITIAL_PORTFOLIO: UserPortfolioState = {
  userId: '11111111-1111-1111-1111-111111111111',
  username: 'deca_trader_01',
  cashBalance: 412050.00,
  totalPortfolioValue: 2482901.44,
  currentYear: 3,
  currentQuarter: 2,
  currentTick: 42,
  sharpeRatio: 1.84,
  alphaScore: 0.12,
  betaScore: 0.92,
  diversificationIndex: 78,
  npvTotal: 342500,
  irrTotal: 0.168,
  equityMultiple: 1.85,
};

const INITIAL_MACRO: MacroState = {
  inflationRate: 0.0312,
  inflationDelta: 0.004,
  fedFundsRate: 0.0525,
  fedStatus: 'STABLE',
  gdpGrowthRate: 0.021,
  activeEvent: 'Supply Chain Shock',
  eventDescription: 'Logistics costs rising across retail sector. Equity valuations in sector-specific clusters dropping 12-15%.',
  sp500Value: 5120.40,
  sp500ChangePct: 0.024,
};

const INITIAL_INVESTMENTS: Investment[] = [
  {
    id: 'inv-re-1',
    assetClass: 'REAL_ESTATE',
    name: 'Midtown Commerce Plaza',
    ticker: 'RE-MIDTOWN',
    propertyType: 'OFFICE',
    address: '740 Midtown Way, Financial Core',
    unitsOrSqft: '18,500 Sq. Ft. Commercial Office',
    quantity: 1,
    entryPrice: 1850000,
    currentPrice: 2010000,
    marketValue: 2010000,
    initialPurchasePrice: 1850000,
    currentPropertyValue: 2010000,
    purchasePrice: 1850000,
    capRate: 0.062,
    noiAnnual: 124500,
    grossPotentialRent: 180000,
    vacancyRate: 0.05,
    propertyTaxAnnual: 22000,
    propertyInsuranceAnnual: 7500,
    maintenanceAndRepairsAnnual: 11000,
    propertyManagementFeePct: 0.05,
    propertyManagementFeeAnnual: 8550,
    utilitiesAndCommonAnnual: 3450,
    capexReserveAnnual: 3000,
    totalOpExBillsAnnual: 55500,
    operatingExpenses: 55500,
    projectedAppreciationRate: 0.04,
    ltvRatio: 0.65,
    mortgagePrincipal: 1180000,
    interestRate: 0.0525,
    interestType: 'FIXED',
    annualDebtService: 87600,
    dscr: 1.42,
    unleveredCocr: 0.0673,
    leveredCocr: 0.057,
    accumulatedCashFlow: 36900,
    valuationHistory: [
      { tick: 36, year: 3, quarter: 1, timestamp: '12:00:00', propertyValue: 1850000, mortgageBalance: 1202500, equityValue: 647500, grossRentAnnual: 180000, noiAnnual: 124500, accumulatedCashFlow: 0 },
      { tick: 38, year: 3, quarter: 2, timestamp: '13:00:00', propertyValue: 1910000, mortgageBalance: 1195000, equityValue: 715000, grossRentAnnual: 180000, noiAnnual: 124500, accumulatedCashFlow: 12300 },
      { tick: 40, year: 3, quarter: 3, timestamp: '14:00:00', propertyValue: 1960000, mortgageBalance: 1188000, equityValue: 772000, grossRentAnnual: 180000, noiAnnual: 124500, accumulatedCashFlow: 24600 },
      { tick: 42, year: 3, quarter: 4, timestamp: '15:00:00', propertyValue: 2010000, mortgageBalance: 1180000, equityValue: 830000, grossRentAnnual: 180000, noiAnnual: 124500, accumulatedCashFlow: 36900 },
    ],
  },
  {
    id: 'inv-eq-1',
    assetClass: 'EQUITY',
    name: 'S&P 500 Index ETF (SPY)',
    ticker: 'SPY',
    quantity: 850,
    entryPrice: 420.50,
    currentPrice: 512.20,
    marketValue: 435370,
    dividendYield: 0.014,
    peRatio: 22.4,
    debtToEquity: 0.45,
    netDebtToEbitda: 1.2,
    freeCashFlow: 85000,
    dcfIntrinsicValue: 545.00,
  },
  {
    id: 'inv-eq-2',
    assetClass: 'EQUITY',
    name: 'Apex Robotics & AI Corp',
    ticker: 'APEX',
    quantity: 1200,
    entryPrice: 110.00,
    currentPrice: 142.50,
    marketValue: 171000,
    dividendYield: 0.008,
    peRatio: 31.2,
    debtToEquity: 0.82,
    netDebtToEbitda: 2.1,
    freeCashFlow: 32000,
    dcfIntrinsicValue: 158.00,
    capexBudget: 45000,
  },
];

const INITIAL_LEDGER: DoubleEntryLedgerRecord[] = [
  {
    id: 'leg-1',
    turnNumber: 42,
    year: 3,
    quarter: 2,
    timestamp: '14:02:12',
    entryType: 'REBALANCING_TRADE',
    accountDebited: 'DR CASH_ACC',
    accountCredited: 'CR EQUITY_POS',
    debitAmount: 48400,
    creditAmount: 48400,
    description: 'REBAL: LIQUIDATED 200 TSLA @ $242.00',
    formattedTime: '[14:02:12]',
  },
  {
    id: 'leg-2',
    turnNumber: 41,
    year: 3,
    quarter: 2,
    timestamp: '13:58:45',
    entryType: 'DIVIDEND_PAYOUT',
    accountDebited: 'DR CASH_ACC',
    accountCredited: 'CR DIV_PAYOUT',
    debitAmount: 412,
    creditAmount: 412,
    description: 'MSFT DISTRIBUTED $0.68/SHARE DIVIDEND',
    formattedTime: '[13:58:45]',
  },
  {
    id: 'leg-3',
    turnNumber: 40,
    year: 3,
    quarter: 2,
    timestamp: '13:45:10',
    entryType: 'MORTGAGE_AMORTIZATION',
    accountDebited: 'DR MORTGAGE_LIAB',
    accountCredited: 'CR CASH_ACC',
    debitAmount: 7300,
    creditAmount: 7300,
    description: 'MONTHLY AMORTIZATION APPLIED TO MIDTOWN COMMERCE',
    formattedTime: '[13:45:10]',
  },
  {
    id: 'leg-4',
    turnNumber: 39,
    year: 3,
    quarter: 1,
    timestamp: '13:30:00',
    entryType: 'PROPERTY_TAX',
    accountDebited: 'DR TAX_EXPENSE',
    accountCredited: 'CR CASH_ACC',
    debitAmount: 12400,
    creditAmount: 12400,
    description: 'PROPERTY TAX ASSESSMENT: MIDTOWN COMMERCE PLAZA',
    formattedTime: '[13:30:00]',
  },
];

const INITIAL_CASE_STUDY: DecaCaseStudy = {
  id: 'cs-01',
  title: 'Highland Hospitality REIT: Floating Rate Liquidity Crisis',
  category: 'Financial Services & Real Estate Role Play',
  timeLimitMinutes: 15,
  scenarioText: `You are acting as Senior Capital Markets Director at Highland Hospitality REIT. The firm owns a $45M portfolio of boutique hotels. Currently, $25M of debt is structured under a Floating-Rate Commercial Mortgage at SOFR + 3.5%. Recent macroeconomic supply chain bottlenecks pushed inflation up to 4.8%, prompting the Federal Reserve to aggressively hike interest rates by 225 basis points. Your property Debt Service Coverage Ratio (DSCR) has compressed from 1.45x down to 0.94x, causing an immediate cash flow deficit of $85,000 per month.

The REIT Board of Directors is demanding an immediate strategic action plan to resolve this liquidity crisis before loan covenants are breached next quarter.`,
  clientProblem: 'DSCR fell below 1.0x (0.94x) due to floating interest rate spike, causing $85k/mo cash deficit and potential loan default.',
  constraints: [
    'Cash reserves limited to $1.2M.',
    'Bank demands DSCR restoration above 1.25x within 60 days.',
    'Property sale takes 120 days minimum in current illiquid market.',
  ],
  performanceIndicators: [
    { code: 'FI:085', description: 'Explain financial metrics used in commercial debt restructuring.', guidelines: 'Discuss DSCR, LTV, interest rate caps, and interest coverage.' },
    { code: 'FI:092', description: 'Formulate liquidity preservation and cash-flow recovery strategies.', guidelines: 'Propose mezzanine financing, rate caps, or equity injection.' },
    { code: 'EC:003', description: 'Analyze macroeconomic impacts on debt service obligations.', guidelines: 'Explain central bank monetary policy tightening and benchmark rate spikes.' },
    { code: 'SM:001', description: 'Present a executive problem-solving proposal to corporate stakeholders.', guidelines: 'Structure a clear pitch with timeline, risk mitigation, and ROI.' },
  ],
};

const generateHistory = (basePrice: number): PricePoint[] => {
  const points: PricePoint[] = [];
  let price = basePrice * 0.92;
  for (let i = 1; i <= 20; i++) {
    const delta = (Math.sin(i * 0.5) * 0.015 + (Math.random() - 0.48) * 0.02) * price;
    price = Math.max(1, price + delta);
    const sma20 = Math.round((price * (0.98 + (i % 5) * 0.008)) * 100) / 100;
    const sma50 = Math.round((price * (0.95 + (i % 8) * 0.006)) * 100) / 100;
    points.push({
      time: `Tick ${i}`,
      tick: i,
      price: Math.round(price * 100) / 100,
      open: Math.round((price - delta * 0.5) * 100) / 100,
      high: Math.round((price + Math.abs(delta) * 1.2) * 100) / 100,
      low: Math.round((price - Math.abs(delta) * 1.2) * 100) / 100,
      close: Math.round(price * 100) / 100,
      volume: Math.floor(15000 + Math.random() * 85000),
      sma20,
      sma50,
    });
  }
  return points;
};

const generateOrderBook = (currentPrice: number) => {
  const bids = [
    { price: Math.round((currentPrice * 0.998) * 100) / 100, amount: 450, total: 450 },
    { price: Math.round((currentPrice * 0.995) * 100) / 100, amount: 1200, total: 1650 },
    { price: Math.round((currentPrice * 0.991) * 100) / 100, amount: 3100, total: 4750 },
    { price: Math.round((currentPrice * 0.985) * 100) / 100, amount: 8400, total: 13150 },
  ];
  const asks = [
    { price: Math.round((currentPrice * 1.002) * 100) / 100, amount: 520, total: 520 },
    { price: Math.round((currentPrice * 1.005) * 100) / 100, amount: 1450, total: 1970 },
    { price: Math.round((currentPrice * 1.009) * 100) / 100, amount: 2800, total: 4770 },
    { price: Math.round((currentPrice * 1.015) * 100) / 100, amount: 7200, total: 11970 },
  ];
  return { bids, asks };
};

const INITIAL_STOCK_CATALOG: StockCatalogItem[] = [
  {
    ticker: 'NVDA',
    name: 'NVIDIA Corporation',
    sector: 'Semiconductors & AI Hardware',
    assetClass: 'EQUITY',
    price: 128.50,
    change24hPct: 3.42,
    change24hDollar: 4.25,
    high52w: 140.76,
    low52w: 39.23,
    volume24h: '$48.2B',
    marketCap: '$3.15T',
    peRatio: 68.4,
    beta: 1.85,
    dividendYield: 0.0003,
    description: 'Dominant designer of AI GPUs, Blackwell architecture chips, and CUDA software platform.',
    priceHistory: generateHistory(128.50),
    ...generateOrderBook(128.50),
  },
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    sector: 'Consumer Electronics & Services',
    assetClass: 'EQUITY',
    price: 224.30,
    change24hPct: 1.15,
    change24hDollar: 2.55,
    high52w: 237.23,
    low52w: 164.08,
    volume24h: '$12.8B',
    marketCap: '$3.42T',
    peRatio: 33.1,
    beta: 1.02,
    dividendYield: 0.0045,
    description: 'Global consumer ecosystem featuring iPhone, Mac, Vision Pro, and Apple Intelligence OS.',
    priceHistory: generateHistory(224.30),
    ...generateOrderBook(224.30),
  },
  {
    ticker: 'TSLA',
    name: 'Tesla, Inc.',
    sector: 'Automotive & Clean Energy',
    assetClass: 'EQUITY',
    price: 218.40,
    change24hPct: -2.10,
    change24hDollar: -4.68,
    high52w: 271.00,
    low52w: 138.80,
    volume24h: '$18.4B',
    marketCap: '$698B',
    peRatio: 58.2,
    beta: 2.31,
    dividendYield: 0,
    description: 'Electric vehicles, Full Self-Driving AI neural nets, Robotaxi, and Megapack energy storage.',
    priceHistory: generateHistory(218.40),
    ...generateOrderBook(218.40),
  },
  {
    ticker: 'MSFT',
    name: 'Microsoft Corporation',
    sector: 'Enterprise Cloud & AI',
    assetClass: 'EQUITY',
    price: 442.10,
    change24hPct: 0.85,
    change24hDollar: 3.72,
    high52w: 468.35,
    low52w: 309.45,
    volume24h: '$9.6B',
    marketCap: '$3.28T',
    peRatio: 36.2,
    beta: 0.89,
    dividendYield: 0.0068,
    description: 'Azure Cloud, OpenAI partnership, Copilot integration across Office 365, and Windows ecosystem.',
    priceHistory: generateHistory(442.10),
    ...generateOrderBook(442.10),
  },
  {
    ticker: 'AMZN',
    name: 'Amazon.com, Inc.',
    sector: 'E-Commerce & AWS Cloud',
    assetClass: 'EQUITY',
    price: 186.20,
    change24hPct: 1.40,
    change24hDollar: 2.57,
    high52w: 201.20,
    low52w: 118.35,
    volume24h: '$11.2B',
    marketCap: '$1.94T',
    peRatio: 42.8,
    beta: 1.18,
    dividendYield: 0,
    description: 'Global e-commerce fulfillment infrastructure, AWS cloud platform, and digital advertising.',
    priceHistory: generateHistory(186.20),
    ...generateOrderBook(186.20),
  },
  {
    ticker: 'GOOGL',
    name: 'Alphabet Inc.',
    sector: 'Internet & Search AI',
    assetClass: 'EQUITY',
    price: 175.60,
    change24hPct: 0.45,
    change24hDollar: 0.78,
    high52w: 191.75,
    low52w: 120.21,
    volume24h: '$8.1B',
    marketCap: '$2.18T',
    peRatio: 24.5,
    beta: 1.05,
    dividendYield: 0.0045,
    description: 'Google Search, Gemini multimodal AI models, YouTube streaming, and Google Cloud Platform.',
    priceHistory: generateHistory(175.60),
    ...generateOrderBook(175.60),
  },
  {
    ticker: 'AMD',
    name: 'Advanced Micro Devices',
    sector: 'Semiconductors & Processors',
    assetClass: 'EQUITY',
    price: 134.80,
    change24hPct: 2.15,
    change24hDollar: 2.84,
    high52w: 227.30,
    low52w: 94.04,
    volume24h: '$6.8B',
    marketCap: '$218B',
    peRatio: 48.6,
    beta: 1.68,
    dividendYield: 0,
    description: 'MI300X AI accelerators, EPYC server CPUs, and Ryzen consumer microprocessors.',
    priceHistory: generateHistory(134.80),
    ...generateOrderBook(134.80),
  },
  {
    ticker: 'SPY',
    name: 'SPDR S&P 500 ETF Trust',
    sector: 'Large-Cap Index ETF',
    assetClass: 'EQUITY',
    price: 542.20,
    change24hPct: 0.62,
    change24hDollar: 3.34,
    high52w: 565.16,
    low52w: 409.22,
    volume24h: '$28.4B',
    marketCap: '$560B',
    peRatio: 26.1,
    beta: 1.00,
    dividendYield: 0.0125,
    description: 'Benchmark ETF tracking 500 largest US market cap publicly traded enterprises.',
    priceHistory: generateHistory(542.20),
    ...generateOrderBook(542.20),
  },
  {
    ticker: 'BTC',
    name: 'Bitcoin / USD',
    sector: 'Digital Store of Value',
    assetClass: 'CRYPTO',
    price: 61450.00,
    change24hPct: 4.80,
    change24hDollar: 2810.00,
    high52w: 73750.00,
    low52w: 24800.00,
    volume24h: '$32.1B',
    marketCap: '$1.21T',
    peRatio: 0,
    beta: 2.85,
    dividendYield: 0,
    description: 'Decentralized cryptographic ledger protocol, fixed 21M hard supply cap digital store of value.',
    priceHistory: generateHistory(61450.00),
    ...generateOrderBook(61450.00),
  },
  {
    ticker: 'ETH',
    name: 'Ethereum / USD',
    sector: 'Smart Contract Layer 1',
    assetClass: 'CRYPTO',
    price: 2680.00,
    change24hPct: 3.12,
    change24hDollar: 81.10,
    high52w: 4090.00,
    low52w: 1520.00,
    volume24h: '$16.4B',
    marketCap: '$322B',
    peRatio: 0,
    beta: 3.10,
    dividendYield: 0.032,
    description: 'Proof-of-Stake smart contract computing network powering decentralized finance & tokenization.',
    priceHistory: generateHistory(2680.00),
    ...generateOrderBook(2680.00),
  },
];

const INITIAL_RUBRIC: DecaRubricCriterion[] = [
  { id: 'rub-1', indicator: 'FI:085 - Commercial Debt Analysis & DSCR Calculation', maxPoints: 25, earnedPoints: 22, feedback: 'Accurately calculated debt service shortfall and explained impact of floating rate benchmark benchmark rate hikes.' },
  { id: 'rub-2', indicator: 'FI:092 - Liquidity & Financial Risk Mitigation Plan', maxPoints: 25, earnedPoints: 24, feedback: 'Strong proposal including rate cap derivative overlay and selective capital reallocation.' },
  { id: 'rub-3', indicator: 'EC:003 - Macroeconomic Environment Integration', maxPoints: 25, earnedPoints: 21, feedback: 'Clear understanding of Federal Reserve monetary policy transmission.' },
  { id: 'rub-4', indicator: 'SM:001 - Executive Communication & Composure', maxPoints: 25, earnedPoints: 23, feedback: 'Professional presentation with structured matrix and confident defense.' },
];

export const useSimulationStore = create<SimulationStore>((set, get) => ({
  activeTab: 'bento',
  setActiveTab: (tab) => set({ activeTab: tab }),

  // Stock Trading Engine
  selectedStockTicker: 'NVDA',
  setSelectedStockTicker: (ticker) => set({ selectedStockTicker: ticker }),
  stockCatalog: INITIAL_STOCK_CATALOG,
  realEstateCatalog: INITIAL_REAL_ESTATE_CATALOG,
  pendingPaperOrders: [],
  paperOrderHistory: [],

  resetPaperBalance: () => {
    const { portfolio } = get();
    set({
      portfolio: {
        ...portfolio,
        cashBalance: 500000.00,
      },
    });
  },

  placePaperOrder: (ticker, side, orderType, quantity, targetPrice) => {
    const { portfolio, stockCatalog, pendingPaperOrders, paperOrderHistory, buyStock, sellStock } = get();
    const targetStock = stockCatalog.find((s) => s.ticker === ticker);
    if (!targetStock || quantity <= 0) return;

    if (orderType === 'MARKET') {
      if (side === 'BUY') {
        buyStock(ticker, quantity);
      } else {
        sellStock(ticker, quantity);
      }
      const newFilledOrder: PaperOrder = {
        id: `po-${Date.now()}`,
        ticker,
        side,
        orderType,
        quantity,
        targetPrice: targetStock.price,
        status: 'FILLED',
        createdAtTick: portfolio.currentTick,
        createdAtTimestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      };
      set({ paperOrderHistory: [newFilledOrder, ...paperOrderHistory] });
      return;
    }

    // Pending Limit or Stop Loss / Take Profit Order
    const newPendingOrder: PaperOrder = {
      id: `po-${Date.now()}`,
      ticker,
      side,
      orderType,
      quantity,
      targetPrice: targetPrice || targetStock.price,
      status: 'PENDING',
      createdAtTick: portfolio.currentTick,
      createdAtTimestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
    };

    set({ pendingPaperOrders: [...pendingPaperOrders, newPendingOrder] });
  },

  cancelPaperOrder: (orderId) => {
    const { pendingPaperOrders, paperOrderHistory } = get();
    const target = pendingPaperOrders.find((o) => o.id === orderId);
    if (!target) return;

    const cancelled: PaperOrder = { ...target, status: 'CANCELLED' };
    set({
      pendingPaperOrders: pendingPaperOrders.filter((o) => o.id !== orderId),
      paperOrderHistory: [cancelled, ...paperOrderHistory],
    });
  },

  buyStock: (ticker, shares) => {
    const { portfolio, stockCatalog, investments, ledgerRecords } = get();
    const target = stockCatalog.find((s) => s.ticker === ticker);
    if (!target || shares <= 0) return;

    const totalCost = target.price * shares;
    if (portfolio.cashBalance < totalCost) {
      alert(`Insufficient cash balance! Required: $${totalCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}, Cash Available: $${portfolio.cashBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`);
      return;
    }

    const existingIndex = investments.findIndex((i) => i.ticker === ticker);
    let updatedInvestments: Investment[];

    if (existingIndex >= 0) {
      const existing = investments[existingIndex];
      const newQty = existing.quantity + shares;
      const newEntryPrice = ((existing.entryPrice * existing.quantity) + totalCost) / newQty;
      const updatedInv: Investment = {
        ...existing,
        quantity: newQty,
        entryPrice: newEntryPrice,
        currentPrice: target.price,
        marketValue: newQty * target.price,
      };
      updatedInvestments = [...investments];
      updatedInvestments[existingIndex] = updatedInv;
    } else {
      const newInv: Investment = {
        id: `inv-stock-${Date.now()}`,
        assetClass: target.assetClass,
        name: target.name,
        ticker: target.ticker,
        quantity: shares,
        entryPrice: target.price,
        currentPrice: target.price,
        marketValue: shares * target.price,
        peRatio: target.peRatio,
        dividendYield: target.dividendYield,
      };
      updatedInvestments = [...investments, newInv];
    }

    const newCash = portfolio.cashBalance - totalCost;
    const timestampStr = new Date().toLocaleTimeString('en-US', { hour12: false });
    const buyLedger: DoubleEntryLedgerRecord = {
      id: `leg-buy-stock-${Date.now()}`,
      turnNumber: portfolio.currentTick,
      year: portfolio.currentYear,
      quarter: portfolio.currentQuarter,
      timestamp: timestampStr,
      entryType: 'ASSET_PURCHASE',
      accountDebited: 'DR EQUITY_PORTFOLIO',
      accountCredited: 'CR SETTLED_CASH',
      debitAmount: Math.round(totalCost * 100) / 100,
      creditAmount: Math.round(totalCost * 100) / 100,
      description: `EXECUTED MARKET BUY: ${shares} ${ticker} @ $${target.price.toFixed(2)}`,
      formattedTime: `[${timestampStr}]`,
    };

    set({
      portfolio: {
        ...portfolio,
        cashBalance: newCash,
        totalPortfolioValue: newCash + updatedInvestments.reduce((sum, i) => sum + i.marketValue, 0),
      },
      investments: updatedInvestments,
      ledgerRecords: [buyLedger, ...ledgerRecords.slice(0, 15)],
    });
  },

  sellStock: (ticker, shares) => {
    const { portfolio, stockCatalog, investments, ledgerRecords } = get();
    const existingIndex = investments.findIndex((i) => i.ticker === ticker);
    if (existingIndex < 0) return;

    const existing = investments[existingIndex];
    if (shares <= 0 || shares > existing.quantity) {
      alert(`Invalid quantity! You hold ${existing.quantity} shares of ${ticker}.`);
      return;
    }

    const target = stockCatalog.find((s) => s.ticker === ticker);
    const currentPrice = target ? target.price : existing.currentPrice;
    const totalProceeds = currentPrice * shares;

    let updatedInvestments: Investment[];
    if (shares === existing.quantity) {
      updatedInvestments = investments.filter((_, idx) => idx !== existingIndex);
    } else {
      const remainingQty = existing.quantity - shares;
      const updatedInv: Investment = {
        ...existing,
        quantity: remainingQty,
        marketValue: remainingQty * currentPrice,
      };
      updatedInvestments = [...investments];
      updatedInvestments[existingIndex] = updatedInv;
    }

    const newCash = portfolio.cashBalance + totalProceeds;
    const timestampStr = new Date().toLocaleTimeString('en-US', { hour12: false });
    const sellLedger: DoubleEntryLedgerRecord = {
      id: `leg-sell-stock-${Date.now()}`,
      turnNumber: portfolio.currentTick,
      year: portfolio.currentYear,
      quarter: portfolio.currentQuarter,
      timestamp: timestampStr,
      entryType: 'ASSET_SALE',
      accountDebited: 'DR SETTLED_CASH',
      accountCredited: 'CR EQUITY_PORTFOLIO',
      debitAmount: Math.round(totalProceeds * 100) / 100,
      creditAmount: Math.round(totalProceeds * 100) / 100,
      description: `EXECUTED MARKET SELL: ${shares} ${ticker} @ $${currentPrice.toFixed(2)}`,
      formattedTime: `[${timestampStr}]`,
    };

    set({
      portfolio: {
        ...portfolio,
        cashBalance: newCash,
        totalPortfolioValue: newCash + updatedInvestments.reduce((sum, i) => sum + i.marketValue, 0),
      },
      investments: updatedInvestments,
      ledgerRecords: [sellLedger, ...ledgerRecords.slice(0, 15)],
    });
  },

  portfolio: INITIAL_PORTFOLIO,
  investments: INITIAL_INVESTMENTS,
  ledgerRecords: INITIAL_LEDGER,
  macroState: INITIAL_MACRO,

  examQuestions: INITIAL_EXAM_QUESTIONS,
  currentCaseStudy: INITIAL_CASE_STUDY,
  usedCaseStudyIds: ['cs-01'],
  roleplayMatrix: {
    clientProblemNotes: 'Highland REIT floating debt DSCR compressed from 1.45x to 0.94x due to 225 bps Fed rate hike. Monthly deficit: $85,000.',
    systemConstraintsNotes: 'Must restore DSCR > 1.25x in 60 days. Cash reserves capped at $1.2M. Asset sales require 120+ days.',
    piNotes: {
      'FI:085': 'Calculate interest expense increase: SOFR + 3.5% moved from 4.5% to 6.75%. DSCR = $235k NOI / $250k Debt Service = 0.94x.',
      'FI:092': 'Proposal: Purchase 1-year Interest Rate Cap at 5.50% strike for $180k premium; inject $250k cash reserve to pay down principal.',
      'EC:003': 'Inflation spike driven by supply chain bottlenecks forced aggressive Fed rate hikes; floating borrowers bear full rate risk.',
      'SM:001': 'Present 3-step timeline: Immediate Cash Injection, Rate Cap Execution, Mid-term Debt Refinancing into fixed coupon bond.',
    },
    pitchScript: `Good morning, Board of Directors. I am presenting Highland REIT’s strategic debt restructuring plan to address our DSCR compression. 

First, the root cause: The Federal Reserve’s recent 225 bps rate hike pushed our floating mortgage cost from 4.50% to 6.75%, driving our DSCR from 1.45x down to 0.94x and creating an $85k monthly cash deficit.

To resolve this within 30 days and satisfy lender covenants:
1. Immediate Capital Injection: Utilize $250,000 from cash reserves for a targeted principal paydown, bringing monthly debt service down to $210,000.
2. Interest Rate Cap Protection: Execute an immediate derivative rate cap at 5.50% SOFR for an upfront $180k premium. This caps our max interest expense and guarantees a baseline DSCR of 1.28x.
3. Fixed-Rate Refinancing: Begin negotiations for a 10-year fixed CMBS loan once rate volatility stabilizes next quarter.

This plan restores compliance within 14 days, protects liquidity, and maintains equity upside for our REIT shareholders.`,
  },
  roleplayTimerSeconds: 892, // 14m 52s
  isTimerRunning: false,
  rubricCriteria: INITIAL_RUBRIC,
  studentReportText: `# STRATEGIC BUSINESS & CAPITAL ALLOCATION PLAN
## EXECUTIVE SUMMARY
This 11-page strategic proposal outlines a structured financial management framework for optimizing multi-asset commercial portfolios across dynamic macroeconomic cycles. By leveraging strict double-entry ledger database architectures, active real estate deal analysis (NOI, DSCR, Cap Rates), and discounted cash flow corporate valuations (DCF, WACC), the enterprise establishes a resilient capital structure capable of navigating inflationary benchmark shocks and credit compression.

## 1. MACROECONOMIC & MARKET ENVIRONMENT
Recent central bank monetary policy adjustments have introduced interest rate volatility into commercial debt markets.
- **Fed Funds Rate**: 5.25% (Benchmark)
- **Inflation Index**: 3.12% YoY
- **Implications**: Floating-rate debt instruments face expanding interest expense risks, requiring proactive derivative hedging or fixed-rate debt conversion.

## 2. COMMERCIAL REAL ESTATE PORTFOLIO ANALYSIS
Our primary asset, Midtown Commerce Plaza, demonstrates strong core operational fundamentals:
- **Net Operating Income (NOI)**: $124,500 / year
- **Debt Service Coverage Ratio (DSCR)**: 1.42x (Above lender covenant threshold of 1.25x)
- **Cap Rate**: 6.20%
- **Capital Improvement Strategy**: Implement energy-efficiency CapEx projects to reduce operating expenses by 8%, expanding NOI to $134,460.

## 3. CORPORATE EQUITY & DISCOUNTED CASH FLOW VALUATION
Corporate equity holdings were subjected to multi-scenario DCF modeling:
- **WACC Discount Rate**: 8.50%
- **Terminal Growth Rate**: 2.50%
- **Intrinsic Value Calculation**: Current market price ($512.20) trades at a 6% discount to DCF intrinsic value ($545.00), signaling an accretive buyback opportunity.

## 4. RISK MANAGEMENT & DEBT STRUCTURE
To guard against adverse macro shocks:
- Maintain minimum unencumbered cash buffer of $400,000.
- Cap overall portfolio Debt-to-Equity ratio at 0.65x.
- Enforce strict double-entry ledger audits every quarter.`,

  toggleTimer: () => set((state) => ({ isTimerRunning: !state.isTimerRunning })),
  resetTimer: () => set({ roleplayTimerSeconds: 900, isTimerRunning: false }),
  decrementTimer: () =>
    set((state) => ({
      roleplayTimerSeconds: Math.max(0, state.roleplayTimerSeconds - 1),
    })),

  setRoleplayNotes: (field, value) =>
    set((state) => ({
      roleplayMatrix: { ...state.roleplayMatrix, [field]: value },
    })),

  setPiNote: (piCode, text) =>
    set((state) => ({
      roleplayMatrix: {
        ...state.roleplayMatrix,
        piNotes: { ...state.roleplayMatrix.piNotes, [piCode]: text },
      },
    })),

  updateRubricScore: (id, score) =>
    set((state) => ({
      rubricCriteria: state.rubricCriteria.map((c) =>
        c.id === id ? { ...c, earnedPoints: score } : c
      ),
    })),

  setStudentReportText: (text) => set({ studentReportText: text }),

  regenerateRoleplayTopic: () => {
    const { usedCaseStudyIds, currentCaseStudy } = get();
    // Filter scenarios that have NOT been presented yet
    let availableScenarios = DECA_ROLEPLAY_SCENARIOS.filter(
      (s) => !usedCaseStudyIds.includes(s.id)
    );

    // If all scenarios have been completed once, reset pool but exclude current scenario to prevent immediate repetition
    if (availableScenarios.length === 0) {
      availableScenarios = DECA_ROLEPLAY_SCENARIOS.filter(
        (s) => s.id !== currentCaseStudy.id
      );
      if (availableScenarios.length === 0) {
        availableScenarios = DECA_ROLEPLAY_SCENARIOS;
      }
    }

    // Pick a random unplayed scenario
    const randomIndex = Math.floor(Math.random() * availableScenarios.length);
    const nextScenario = availableScenarios[randomIndex];

    const updatedUsedIds = usedCaseStudyIds.includes(nextScenario.id)
      ? usedCaseStudyIds
      : [...usedCaseStudyIds, nextScenario.id];

    // Build fresh PI notes structure
    const freshPiNotes: Record<string, string> = {};
    nextScenario.performanceIndicators.forEach((pi) => {
      freshPiNotes[pi.code] = '';
    });

    set({
      currentCaseStudy: nextScenario,
      usedCaseStudyIds: updatedUsedIds,
      roleplayMatrix: {
        clientProblemNotes: '',
        systemConstraintsNotes: '',
        piNotes: freshPiNotes,
        pitchScript: '',
      },
      roleplayTimerSeconds: (nextScenario.timeLimitMinutes || 15) * 60,
      isTimerRunning: false,
    });
  },

  advanceTick: () => {
    const { portfolio, investments, macroState, ledgerRecords, stockCatalog } = get();

    // Advance tick counter
    const newTick = portfolio.currentTick + 1;
    let newQuarter = portfolio.currentQuarter;
    let newYear = portfolio.currentYear;

    if (newTick % 4 === 0) {
      newQuarter = (newQuarter % 4) + 1;
      if (newQuarter === 1) {
        newYear += 1;
      }
    }

    // Small macro fluctuation
    const inflationChange = (Math.random() - 0.48) * 0.002;
    const newInflation = Math.max(0.01, macroState.inflationRate + inflationChange);
    const spChange = (Math.random() - 0.45) * 0.015;
    const newSpVal = Math.max(2000, macroState.sp500Value * (1 + spChange));

    // Update Stock Catalog prices and price histories
    const newStockCatalog = stockCatalog.map((stock) => {
      const pctDelta = (Math.random() - 0.48) * (stock.assetClass === 'CRYPTO' ? 0.035 : 0.018);
      const priceDelta = stock.price * pctDelta;
      const newPrice = Math.max(0.01, Math.round((stock.price + priceDelta) * 100) / 100);
      const new24hDollar = Math.round((stock.change24hDollar + priceDelta) * 100) / 100;
      const new24hPct = Math.round(((newPrice - (newPrice - new24hDollar)) / (newPrice - new24hDollar)) * 10000) / 100;

      const lastPoint = stock.priceHistory[stock.priceHistory.length - 1] || { price: stock.price };
      const sma20 = Math.round((newPrice * 0.99) * 100) / 100;
      const sma50 = Math.round((newPrice * 0.97) * 100) / 100;

      const newPoint: PricePoint = {
        time: `Tick ${newTick}`,
        tick: newTick,
        price: newPrice,
        open: lastPoint.price,
        high: Math.max(lastPoint.price, newPrice) + Math.abs(priceDelta) * 0.5,
        low: Math.min(lastPoint.price, newPrice) - Math.abs(priceDelta) * 0.5,
        close: newPrice,
        volume: Math.floor(20000 + Math.random() * 80000),
        sma20,
        sma50,
      };

      const newHistory = [...stock.priceHistory.slice(-25), newPoint];

      // Update bids & asks
      const bids = [
        { price: Math.round((newPrice * 0.998) * 100) / 100, amount: 450 + Math.floor(Math.random() * 200), total: 450 },
        { price: Math.round((newPrice * 0.995) * 100) / 100, amount: 1200 + Math.floor(Math.random() * 500), total: 1650 },
        { price: Math.round((newPrice * 0.991) * 100) / 100, amount: 3100 + Math.floor(Math.random() * 800), total: 4750 },
      ];
      const asks = [
        { price: Math.round((newPrice * 1.002) * 100) / 100, amount: 520 + Math.floor(Math.random() * 200), total: 520 },
        { price: Math.round((newPrice * 1.005) * 100) / 100, amount: 1450 + Math.floor(Math.random() * 500), total: 1970 },
        { price: Math.round((newPrice * 1.009) * 100) / 100, amount: 2800 + Math.floor(Math.random() * 800), total: 4770 },
      ];

      return {
        ...stock,
        price: newPrice,
        change24hPct: new24hPct,
        change24hDollar: new24hDollar,
        high52w: Math.max(stock.high52w, newPrice),
        low52w: Math.min(stock.low52w, newPrice),
        priceHistory: newHistory,
        bids,
        asks,
      };
    });

    // Update investments current prices & floating rate costs
    let newInvestments = investments.map((inv) => {
      const stockMatch = newStockCatalog.find((s) => s.ticker === inv.ticker);
      if (stockMatch) {
        return {
          ...inv,
          currentPrice: stockMatch.price,
          marketValue: inv.quantity * stockMatch.price,
        };
      } else if (inv.assetClass === 'EQUITY') {
        const stockGrowth = (Math.random() - 0.46) * 0.02;
        const newPrice = Math.max(1, inv.currentPrice * (1 + stockGrowth));
        return {
          ...inv,
          currentPrice: newPrice,
          marketValue: inv.quantity * newPrice,
        };
      } else if (inv.assetClass === 'REAL_ESTATE') {
        let updatedInterest = inv.interestRate || 0.0525;
        if (inv.interestType === 'FLOATING') {
          updatedInterest = macroState.fedFundsRate + 0.025;
        }

        const purchasePrice = inv.purchasePrice || inv.initialPurchasePrice || 1850000;
        const currentVal = inv.currentPropertyValue || inv.marketValue || purchasePrice;
        const appreciationRate = inv.projectedAppreciationRate ?? 0.04;
        
        // Quarterly appreciation increment
        const quarterlyAppreciation = currentVal * (appreciationRate / 4);
        const newVal = Math.round(currentVal + quarterlyAppreciation);

        // Amortize mortgage principal (3 months of principal paydown)
        let currentMortgage = inv.mortgagePrincipal ?? (purchasePrice * (inv.ltvRatio || 0.65));
        const r = updatedInterest / 12;
        const annualDebtService = inv.annualDebtService || 87600;
        const monthlyPayment = annualDebtService / 12;
        
        let principalPaidThisQuarter = 0;
        for (let m = 0; m < 3; m++) {
          if (currentMortgage > 0) {
            const interestComp = currentMortgage * r;
            const prinComp = Math.min(currentMortgage, monthlyPayment - interestComp);
            currentMortgage = Math.max(0, currentMortgage - prinComp);
            principalPaidThisQuarter += prinComp;
          }
        }

        const dealRes = calculateRealEstateDeal({
          purchasePrice: newVal,
          grossPotentialRent: inv.grossPotentialRent || 180000,
          vacancyRate: inv.vacancyRate || 0.05,
          propertyTax: inv.propertyTaxAnnual,
          propertyInsurance: inv.propertyInsuranceAnnual,
          maintenanceAndRepairs: inv.maintenanceAndRepairsAnnual,
          propertyManagementFeePct: inv.propertyManagementFeePct || 0.05,
          utilitiesAndCommon: inv.utilitiesAndCommonAnnual,
          capexReserve: inv.capexReserveAnnual,
          operatingExpenses: inv.operatingExpenses || 55500,
          ltvRatio: inv.ltvRatio || 0.65,
          interestRate: updatedInterest,
          amortizationYears: 30,
        });

        const quarterlyNetCashFlow = dealRes.cashFlowAfterDebt / 4;
        const newAccumulatedCash = (inv.accumulatedCashFlow || 0) + quarterlyNetCashFlow;

        const newHistoryPoint: PropertyValuationHistoryPoint = {
          tick: newTick,
          year: newYear,
          quarter: newQuarter,
          timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
          propertyValue: newVal,
          mortgageBalance: Math.round(currentMortgage),
          equityValue: Math.round(newVal - currentMortgage),
          grossRentAnnual: inv.grossPotentialRent || 180000,
          noiAnnual: Math.round(dealRes.noi),
          accumulatedCashFlow: Math.round(newAccumulatedCash),
        };

        const updatedHistory = [...(inv.valuationHistory || []).slice(-15), newHistoryPoint];

        return {
          ...inv,
          currentPrice: newVal,
          marketValue: newVal,
          currentPropertyValue: newVal,
          mortgagePrincipal: Math.round(currentMortgage),
          noiAnnual: Math.round(dealRes.noi),
          annualDebtService: Math.round(dealRes.annualDebtService),
          dscr: Math.round(dealRes.dscr * 100) / 100,
          interestRate: updatedInterest,
          leveredCocr: dealRes.leveredCocr,
          unleveredCocr: dealRes.unleveredCocr,
          accumulatedCashFlow: Math.round(newAccumulatedCash),
          valuationHistory: updatedHistory,
        };
      }
      return inv;
    });

    // Calculate NOI Cash Flow and Dividends
    let totalIncomeThisTick = 0;
    newInvestments.forEach((inv) => {
      if (inv.assetClass === 'REAL_ESTATE' && inv.noiAnnual && inv.annualDebtService) {
        const quarterlyCashFlow = (inv.noiAnnual - inv.annualDebtService) / 4;
        totalIncomeThisTick += quarterlyCashFlow;
      } else if (inv.assetClass === 'EQUITY' && inv.dividendYield) {
        const quarterlyDiv = (inv.marketValue * inv.dividendYield) / 4;
        totalIncomeThisTick += quarterlyDiv;
      }
    });

    const newCash = portfolio.cashBalance + totalIncomeThisTick;
    const investmentsValue = newInvestments.reduce((sum, i) => sum + i.marketValue, 0);
    const newTotalPortfolio = newCash + investmentsValue;

    // Generate Double Entry Ledger Record
    const timestampStr = new Date().toLocaleTimeString('en-US', { hour12: false });
    const newLedgerRecord: DoubleEntryLedgerRecord = {
      id: `leg-${Date.now()}`,
      turnNumber: newTick,
      year: newYear,
      quarter: newQuarter,
      timestamp: timestampStr,
      entryType: 'DIVIDEND_PAYOUT',
      accountDebited: 'DR CASH_ACC',
      accountCredited: 'CR PORTFOLIO_YIELD',
      debitAmount: Math.round(totalIncomeThisTick * 100) / 100,
      creditAmount: Math.round(totalIncomeThisTick * 100) / 100,
      description: `TICK #${newTick} SETTLEMENT: RENT & YIELD COLLECTED`,
      formattedTime: `[${timestampStr}]`,
    };

    set({
      stockCatalog: newStockCatalog,
      portfolio: {
        ...portfolio,
        cashBalance: newCash,
        totalPortfolioValue: newTotalPortfolio,
        currentYear: newYear,
        currentQuarter: newQuarter,
        currentTick: newTick,
      },
      investments: newInvestments,
      macroState: {
        ...macroState,
        inflationRate: newInflation,
        sp500Value: newSpVal,
        sp500ChangePct: spChange,
      },
      ledgerRecords: [newLedgerRecord, ...ledgerRecords.slice(0, 15)],
    });

    // Check & Trigger Pending Paper Orders
    const { pendingPaperOrders, paperOrderHistory, buyStock, sellStock } = get();
    if (pendingPaperOrders.length > 0) {
      const remainingPending: PaperOrder[] = [];
      const newlyFilled: PaperOrder[] = [];

      pendingPaperOrders.forEach((order) => {
        const stock = newStockCatalog.find((s) => s.ticker === order.ticker);
        if (!stock) {
          remainingPending.push(order);
          return;
        }

        let isTriggered = false;
        const target = order.targetPrice ?? stock.price;

        if (order.side === 'BUY') {
          if (order.orderType === 'LIMIT' && stock.price <= target) isTriggered = true;
        } else {
          if (order.orderType === 'LIMIT' && stock.price >= target) isTriggered = true;
          if (order.orderType === 'STOP_LOSS' && stock.price <= target) isTriggered = true;
          if (order.orderType === 'TAKE_PROFIT' && stock.price >= target) isTriggered = true;
        }

        if (isTriggered) {
          if (order.side === 'BUY') {
            buyStock(order.ticker, order.quantity);
          } else {
            sellStock(order.ticker, order.quantity);
          }
          newlyFilled.push({ ...order, status: 'FILLED' });
        } else {
          remainingPending.push(order);
        }
      });

      if (newlyFilled.length > 0) {
        set({
          pendingPaperOrders: remainingPending,
          paperOrderHistory: [...newlyFilled, ...paperOrderHistory],
        });
      }
    }
  },

  triggerMacroEvent: (eventType) => {
    const { macroState, investments, portfolio, ledgerRecords } = get();

    let newFedRate = macroState.fedFundsRate;
    let newInflation = macroState.inflationRate;
    let eventTitle = '';
    let eventDesc = '';

    if (eventType === 'INFLATION_SPIKE') {
      newInflation += 0.025;
      newFedRate += 0.020;
      eventTitle = 'MACRO SPIKE: Aggressive Inflation Shock';
      eventDesc = 'Central bank hiked benchmark rates by +200bps. Floating debt interest expenses exploded!';
    } else if (eventType === 'RECESSION') {
      newFedRate -= 0.015;
      newInflation -= 0.010;
      eventTitle = 'ECONOMIC DOWNTURN: Credit & CapEx Crisis';
      eventDesc = 'GDP contracted 1.8%. Corporate revenues dropped across heavy CapEx firms.';
    } else if (eventType === 'TECH_BOOM') {
      eventTitle = 'BULL RALLY: Technology & Productivity Boom';
      eventDesc = 'Equity valuations expanded 18%. Venture capital inflows driving high CapEx returns.';
    } else if (eventType === 'FED_RATE_HIKE') {
      newFedRate += 0.015;
      eventTitle = 'FED MONETARY TIGHTENING: Rate Hike';
      eventDesc = 'Fed Funds rate pushed higher to cool consumer demand. Commercial cap rates expanding.';
    }

    // Stress test floating rate real estate!
    const updatedInvestments = investments.map((inv) => {
      if (inv.assetClass === 'REAL_ESTATE') {
        const rate = inv.interestType === 'FLOATING' ? newFedRate + 0.025 : (inv.interestRate || 0.0525);
        const dealRes = calculateRealEstateDeal({
          purchasePrice: inv.purchasePrice || 1850000,
          grossPotentialRent: inv.grossPotentialRent || 180000,
          vacancyRate: inv.vacancyRate || 0.05,
          operatingExpenses: inv.operatingExpenses || 46500,
          ltvRatio: inv.ltvRatio || 0.65,
          interestRate: rate,
          amortizationYears: 30,
        });

        return {
          ...inv,
          interestRate: rate,
          noiAnnual: dealRes.noi,
          annualDebtService: dealRes.annualDebtService,
          dscr: dealRes.dscr,
          leveredCocr: dealRes.leveredCocr,
        };
      }
      return inv;
    });

    const timestampStr = new Date().toLocaleTimeString('en-US', { hour12: false });
    const macroLedgerRecord: DoubleEntryLedgerRecord = {
      id: `leg-macro-${Date.now()}`,
      turnNumber: portfolio.currentTick,
      year: portfolio.currentYear,
      quarter: portfolio.currentQuarter,
      timestamp: timestampStr,
      entryType: 'INTEREST_SPIKE_EXPENSE',
      accountDebited: 'DR INT_EXPENSE_ACCOUNT',
      accountCredited: 'CR CASH_RESERVE',
      debitAmount: 15400,
      creditAmount: 15400,
      description: `EVENT LOG: ${eventTitle}`,
      formattedTime: `[${timestampStr}]`,
    };

    set({
      macroState: {
        ...macroState,
        fedFundsRate: newFedRate,
        inflationRate: newInflation,
        activeEvent: eventTitle,
        eventDescription: eventDesc,
      },
      investments: updatedInvestments,
      ledgerRecords: [macroLedgerRecord, ...ledgerRecords.slice(0, 15)],
    });
  },

  buyRealEstateProperty: (deal) => {
    const { portfolio, investments, ledgerRecords } = get();
    const dealRes = calculateRealEstateDeal({
      purchasePrice: deal.purchasePrice,
      grossPotentialRent: deal.grossRent,
      vacancyRate: deal.vacancyRate,
      propertyTax: deal.propertyTax,
      propertyInsurance: deal.insurance,
      maintenanceAndRepairs: deal.maintenance,
      propertyManagementFeePct: deal.managementFeePct,
      utilitiesAndCommon: deal.utilities,
      capexReserve: deal.capexReserve,
      operatingExpenses: deal.opEx,
      ltvRatio: deal.ltvRatio,
      interestRate: deal.interestRate,
      amortizationYears: 30,
      projectedAppreciationRate: deal.projectedAppreciationRate,
    });

    if (portfolio.cashBalance < dealRes.equityInvested) {
      alert(`Insufficient settled cash ($${portfolio.cashBalance.toLocaleString()}) for down payment equity ($${Math.round(dealRes.equityInvested).toLocaleString()})!`);
      return;
    }

    const timestampStr = new Date().toLocaleTimeString('en-US', { hour12: false });
    const initialHistPoint: PropertyValuationHistoryPoint = {
      tick: portfolio.currentTick,
      year: portfolio.currentYear,
      quarter: portfolio.currentQuarter,
      timestamp: timestampStr,
      propertyValue: deal.purchasePrice,
      mortgageBalance: Math.round(dealRes.loanAmount),
      equityValue: Math.round(dealRes.equityInvested),
      grossRentAnnual: deal.grossRent,
      noiAnnual: Math.round(dealRes.noi),
      accumulatedCashFlow: 0,
    };

    const newInv: Investment = {
      id: `inv-re-${Date.now()}`,
      assetClass: 'REAL_ESTATE',
      name: deal.name,
      propertyType: deal.propertyType || 'MULTIFAMILY',
      address: deal.address || 'Commercial Real Estate Location',
      unitsOrSqft: deal.unitsOrSqft || 'Single Property Asset',
      ticker: `RE-${deal.name.substring(0, 4).toUpperCase()}`,
      quantity: 1,
      entryPrice: deal.purchasePrice,
      currentPrice: deal.purchasePrice,
      marketValue: deal.purchasePrice,
      initialPurchasePrice: deal.purchasePrice,
      currentPropertyValue: deal.purchasePrice,
      purchasePrice: deal.purchasePrice,
      capRate: dealRes.capRate,
      noiAnnual: Math.round(dealRes.noi),
      grossPotentialRent: deal.grossRent,
      vacancyRate: deal.vacancyRate,
      propertyTaxAnnual: dealRes.propertyTax,
      propertyInsuranceAnnual: dealRes.propertyInsurance,
      maintenanceAndRepairsAnnual: dealRes.maintenanceAndRepairs,
      propertyManagementFeePct: deal.managementFeePct || 0.05,
      propertyManagementFeeAnnual: dealRes.propertyManagementFee,
      utilitiesAndCommonAnnual: dealRes.utilitiesAndCommon,
      capexReserveAnnual: dealRes.capexReserve,
      totalOpExBillsAnnual: dealRes.totalOperatingExpenses,
      operatingExpenses: dealRes.totalOperatingExpenses,
      projectedAppreciationRate: deal.projectedAppreciationRate || 0.04,
      ltvRatio: deal.ltvRatio,
      mortgagePrincipal: Math.round(dealRes.loanAmount),
      interestRate: deal.interestRate,
      interestType: deal.interestType,
      annualDebtService: Math.round(dealRes.annualDebtService),
      dscr: Math.round(dealRes.dscr * 100) / 100,
      unleveredCocr: dealRes.unleveredCocr,
      leveredCocr: dealRes.leveredCocr,
      accumulatedCashFlow: 0,
      valuationHistory: [initialHistPoint],
    };

    const newCash = portfolio.cashBalance - dealRes.equityInvested;
    
    const doubleEntry: DoubleEntryLedgerRecord = {
      id: `leg-buy-${Date.now()}`,
      turnNumber: portfolio.currentTick,
      year: portfolio.currentYear,
      quarter: portfolio.currentQuarter,
      timestamp: timestampStr,
      entryType: 'ASSET_PURCHASE',
      accountDebited: 'DR REAL_ESTATE_ASSETS',
      accountCredited: 'CR SETTLED_CASH / CR MORTGAGE_LIABILITY',
      debitAmount: deal.purchasePrice,
      creditAmount: deal.purchasePrice,
      description: `ACQUIRED REAL ESTATE: ${deal.name} ($${Math.round(dealRes.equityInvested).toLocaleString()} Equity Down + $${Math.round(dealRes.loanAmount).toLocaleString()} Debt)`,
      formattedTime: `[${timestampStr}]`,
    };

    set({
      portfolio: {
        ...portfolio,
        cashBalance: newCash,
        totalPortfolioValue: newCash + [...investments, newInv].reduce((sum, i) => sum + i.marketValue, 0),
      },
      investments: [...investments, newInv],
      ledgerRecords: [doubleEntry, ...ledgerRecords.slice(0, 15)],
    });
  },

  reinvestCapExProperty: (investmentId, capexAmount) => {
    const { investments, portfolio, ledgerRecords } = get();
    if (portfolio.cashBalance < capexAmount) {
      alert(`Insufficient cash balance ($${portfolio.cashBalance.toLocaleString()}) for CapEx reinvestment ($${capexAmount.toLocaleString()})!`);
      return;
    }

    const updated = investments.map((inv) => {
      if (inv.id === investmentId && inv.assetClass === 'REAL_ESTATE') {
        const valIncrease = Math.round(capexAmount * 1.25);
        const rentIncrease = Math.round(capexAmount * 0.10);
        const newVal = (inv.currentPropertyValue || inv.marketValue) + valIncrease;
        const newGrossRent = (inv.grossPotentialRent || 0) + rentIncrease;

        const dealRes = calculateRealEstateDeal({
          purchasePrice: newVal,
          grossPotentialRent: newGrossRent,
          vacancyRate: inv.vacancyRate || 0.05,
          propertyTax: inv.propertyTaxAnnual,
          propertyInsurance: inv.propertyInsuranceAnnual,
          maintenanceAndRepairs: inv.maintenanceAndRepairsAnnual,
          propertyManagementFeePct: inv.propertyManagementFeePct || 0.05,
          utilitiesAndCommon: inv.utilitiesAndCommonAnnual,
          capexReserve: inv.capexReserveAnnual,
          operatingExpenses: inv.operatingExpenses || 55500,
          ltvRatio: inv.ltvRatio || 0.65,
          interestRate: inv.interestRate || 0.0525,
          amortizationYears: 30,
        });

        return {
          ...inv,
          currentPrice: newVal,
          marketValue: newVal,
          currentPropertyValue: newVal,
          grossPotentialRent: newGrossRent,
          noiAnnual: Math.round(dealRes.noi),
          dscr: Math.round(dealRes.dscr * 100) / 100,
          leveredCocr: dealRes.leveredCocr,
        };
      }
      return inv;
    });

    const newCash = portfolio.cashBalance - capexAmount;
    const timestampStr = new Date().toLocaleTimeString('en-US', { hour12: false });
    const capexLedger: DoubleEntryLedgerRecord = {
      id: `leg-capex-${Date.now()}`,
      turnNumber: portfolio.currentTick,
      year: portfolio.currentYear,
      quarter: portfolio.currentQuarter,
      timestamp: timestampStr,
      entryType: 'CAPEX_REINVESTMENT',
      accountDebited: 'DR PROPERTY_IMPROVEMENTS',
      accountCredited: 'CR SETTLED_CASH',
      debitAmount: capexAmount,
      creditAmount: capexAmount,
      description: `CAPEX REINVESTMENT: Injected $${capexAmount.toLocaleString()} capital improvement into property asset`,
      formattedTime: `[${timestampStr}]`,
    };

    set({
      portfolio: {
        ...portfolio,
        cashBalance: newCash,
        totalPortfolioValue: newCash + updated.reduce((sum, i) => sum + i.marketValue, 0),
      },
      investments: updated,
      ledgerRecords: [capexLedger, ...ledgerRecords.slice(0, 15)],
    });
  },

  payOffPropertyMortgagePrincipal: (investmentId, amount) => {
    const { investments, portfolio, ledgerRecords } = get();
    if (portfolio.cashBalance < amount) {
      alert(`Insufficient cash balance ($${portfolio.cashBalance.toLocaleString()}) for principal paydown ($${amount.toLocaleString()})!`);
      return;
    }

    const updated = investments.map((inv) => {
      if (inv.id === investmentId && inv.assetClass === 'REAL_ESTATE') {
        const currentDebt = inv.mortgagePrincipal || 0;
        const newDebt = Math.max(0, currentDebt - amount);
        const propVal = inv.currentPropertyValue || inv.marketValue;
        const newLtv = propVal > 0 ? newDebt / propVal : 0;

        const dealRes = calculateRealEstateDeal({
          purchasePrice: propVal,
          grossPotentialRent: inv.grossPotentialRent || 180000,
          vacancyRate: inv.vacancyRate || 0.05,
          propertyTax: inv.propertyTaxAnnual,
          propertyInsurance: inv.propertyInsuranceAnnual,
          maintenanceAndRepairs: inv.maintenanceAndRepairsAnnual,
          propertyManagementFeePct: inv.propertyManagementFeePct || 0.05,
          utilitiesAndCommon: inv.utilitiesAndCommonAnnual,
          capexReserve: inv.capexReserveAnnual,
          ltvRatio: newLtv,
          interestRate: inv.interestRate || 0.0525,
          amortizationYears: 30,
        });

        return {
          ...inv,
          mortgagePrincipal: Math.round(newDebt),
          ltvRatio: newLtv,
          annualDebtService: Math.round(dealRes.annualDebtService),
          dscr: Math.round(dealRes.dscr * 100) / 100,
          leveredCocr: dealRes.leveredCocr,
        };
      }
      return inv;
    });

    const newCash = portfolio.cashBalance - amount;
    const timestampStr = new Date().toLocaleTimeString('en-US', { hour12: false });
    const paydownLedger: DoubleEntryLedgerRecord = {
      id: `leg-paydown-${Date.now()}`,
      turnNumber: portfolio.currentTick,
      year: portfolio.currentYear,
      quarter: portfolio.currentQuarter,
      timestamp: timestampStr,
      entryType: 'MORTGAGE_AMORTIZATION',
      accountDebited: 'DR MORTGAGE_LIABILITY',
      accountCredited: 'CR SETTLED_CASH',
      debitAmount: amount,
      creditAmount: amount,
      description: `MORTGAGE PAYDOWN: Paid $${amount.toLocaleString()} directly against mortgage loan principal`,
      formattedTime: `[${timestampStr}]`,
    };

    set({
      portfolio: {
        ...portfolio,
        cashBalance: newCash,
        totalPortfolioValue: newCash + updated.reduce((sum, i) => sum + i.marketValue, 0),
      },
      investments: updated,
      ledgerRecords: [paydownLedger, ...ledgerRecords.slice(0, 15)],
    });
  },

  refinanceProperty: (investmentId, newRate, newLtv) => {
    const { investments, portfolio, ledgerRecords } = get();
    const updated = investments.map((inv) => {
      if (inv.id === investmentId && inv.assetClass === 'REAL_ESTATE') {
        const propVal = inv.currentPropertyValue || inv.marketValue;
        const newMortgage = Math.round(propVal * newLtv);

        const dealRes = calculateRealEstateDeal({
          purchasePrice: propVal,
          grossPotentialRent: inv.grossPotentialRent || 180000,
          vacancyRate: inv.vacancyRate || 0.05,
          propertyTax: inv.propertyTaxAnnual,
          propertyInsurance: inv.propertyInsuranceAnnual,
          maintenanceAndRepairs: inv.maintenanceAndRepairsAnnual,
          propertyManagementFeePct: inv.propertyManagementFeePct || 0.05,
          utilitiesAndCommon: inv.utilitiesAndCommonAnnual,
          capexReserve: inv.capexReserveAnnual,
          operatingExpenses: inv.operatingExpenses || 55500,
          ltvRatio: newLtv,
          interestRate: newRate,
          amortizationYears: 30,
        });

        return {
          ...inv,
          ltvRatio: newLtv,
          interestRate: newRate,
          mortgagePrincipal: newMortgage,
          annualDebtService: Math.round(dealRes.annualDebtService),
          dscr: Math.round(dealRes.dscr * 100) / 100,
          leveredCocr: dealRes.leveredCocr,
        };
      }
      return inv;
    });

    const timestampStr = new Date().toLocaleTimeString('en-US', { hour12: false });
    const refiLedger: DoubleEntryLedgerRecord = {
      id: `leg-refi-${Date.now()}`,
      turnNumber: portfolio.currentTick,
      year: portfolio.currentYear,
      quarter: portfolio.currentQuarter,
      timestamp: timestampStr,
      entryType: 'REFINANCE_DEBT',
      accountDebited: 'DR MORTGAGE_REFINANCE',
      accountCredited: 'CR MORTGAGE_LIABILITY',
      debitAmount: 0,
      creditAmount: 0,
      description: `REFINANCED DEBT: Loan adjusted to ${(newLtv * 100).toFixed(0)}% LTV @ ${(newRate * 100).toFixed(2)}% interest rate`,
      formattedTime: `[${timestampStr}]`,
    };

    set({
      investments: updated,
      ledgerRecords: [refiLedger, ...ledgerRecords.slice(0, 15)],
    });
  },

  sellProperty: (investmentId) => {
    const { investments, portfolio, ledgerRecords } = get();
    const target = investments.find((i) => i.id === investmentId);
    if (!target) return;

    const currentVal = target.currentPropertyValue || target.marketValue;
    const mortgageBal = target.mortgagePrincipal || 0;
    const netEquityHarvested = Math.max(0, currentVal - mortgageBal);
    const filtered = investments.filter((i) => i.id !== investmentId);
    const newCash = portfolio.cashBalance + netEquityHarvested;

    const timestampStr = new Date().toLocaleTimeString('en-US', { hour12: false });
    const saleLedger: DoubleEntryLedgerRecord = {
      id: `leg-sell-${Date.now()}`,
      turnNumber: portfolio.currentTick,
      year: portfolio.currentYear,
      quarter: portfolio.currentQuarter,
      timestamp: timestampStr,
      entryType: 'ASSET_SALE',
      accountDebited: 'DR SETTLED_CASH',
      accountCredited: 'CR REAL_ESTATE_ASSET',
      debitAmount: Math.round(netEquityHarvested),
      creditAmount: Math.round(netEquityHarvested),
      description: `SOLD REAL ESTATE: ${target.name} ($${Math.round(currentVal).toLocaleString()} Market Value - $${Math.round(mortgageBal).toLocaleString()} Debt Payoff = $${Math.round(netEquityHarvested).toLocaleString()} Net Equity Settled)`,
      formattedTime: `[${timestampStr}]`,
    };

    set({
      portfolio: {
        ...portfolio,
        cashBalance: newCash,
        totalPortfolioValue: newCash + filtered.reduce((sum, i) => sum + i.marketValue, 0),
      },
      investments: filtered,
      ledgerRecords: [saleLedger, ...ledgerRecords.slice(0, 15)],
    });
  },

  allocateCorporateCapital: (ticker, action, amount) => {
    const { investments, portfolio, ledgerRecords } = get();
    const timestampStr = new Date().toLocaleTimeString('en-US', { hour12: false });

    let actionDesc = '';
    if (action === 'DIVIDEND') actionDesc = `CORPORATE ACTION: $${amount.toLocaleString()} Dividend Payout`;
    else if (action === 'BUYBACK') actionDesc = `CORPORATE ACTION: $${amount.toLocaleString()} Share Buyback Executed`;
    else if (action === 'CAPEX') actionDesc = `CORPORATE ACTION: $${amount.toLocaleString()} CapEx Facility Reinvestment`;

    const capLedger: DoubleEntryLedgerRecord = {
      id: `leg-cap-${Date.now()}`,
      turnNumber: portfolio.currentTick,
      year: portfolio.currentYear,
      quarter: portfolio.currentQuarter,
      timestamp: timestampStr,
      entryType: 'CAPEX_REINVESTMENT',
      accountDebited: 'DR TREASURY_ALLOCATION',
      accountCredited: 'CR CAPITAL_RESERVES',
      debitAmount: amount,
      creditAmount: amount,
      description: `${ticker}: ${actionDesc}`,
      formattedTime: `[${timestampStr}]`,
    };

    set({
      ledgerRecords: [capLedger, ...ledgerRecords.slice(0, 15)],
    });
  },

  resetSimulation: () =>
    set({
      portfolio: INITIAL_PORTFOLIO,
      investments: INITIAL_INVESTMENTS,
      ledgerRecords: INITIAL_LEDGER,
      macroState: INITIAL_MACRO,
    }),
}));
