// Financial Literacy & DECA Simulation Data Types

export type AssetClass = 'REAL_ESTATE' | 'EQUITY' | 'BOND' | 'CRYPTO' | 'CASH_EQUIVALENT';
export type InterestRateType = 'FIXED' | 'FLOATING';

export interface Investment {
  id: string;
  assetClass: AssetClass;
  name: string;
  ticker?: string;
  quantity: number;
  entryPrice: number;
  currentPrice: number;
  marketValue: number;
  
  // Real Estate detailed bills & valuation properties
  propertyType?: string;
  address?: string;
  unitsOrSqft?: string;
  propertyTaxAnnual?: number;
  propertyInsuranceAnnual?: number;
  maintenanceAndRepairsAnnual?: number;
  propertyManagementFeePct?: number;
  propertyManagementFeeAnnual?: number;
  utilitiesAndCommonAnnual?: number;
  capexReserveAnnual?: number;
  totalOpExBillsAnnual?: number;
  projectedAppreciationRate?: number; // e.g. 0.04 (4%/yr)
  initialPurchasePrice?: number;
  currentPropertyValue?: number;
  accumulatedCashFlow?: number;
  valuationHistory?: PropertyValuationHistoryPoint[];

  // Real Estate core financial metrics
  capRate?: number;            // e.g., 0.062 (6.2%)
  noiAnnual?: number;          // Net Operating Income
  grossPotentialRent?: number; // Gross Annual Rent
  vacancyRate?: number;        // e.g. 0.05 (5%)
  operatingExpenses?: number;  // Annual OpEx
  purchasePrice?: number;
  ltvRatio?: number;           // e.g. 0.65 (65% LTV)
  mortgagePrincipal?: number;
  interestRate?: number;       // e.g. 0.0525 (5.25%)
  interestType?: InterestRateType;
  annualDebtService?: number;
  dscr?: number;               // Debt Service Coverage Ratio
  unleveredCocr?: number;      // Unlevered Cash-on-Cash Return
  leveredCocr?: number;        // Levered Cash-on-Cash Return
  
  // Corporate Equity / Stocks
  dividendYield?: number;
  peRatio?: number;
  debtToEquity?: number;
  netDebtToEbitda?: number;
  freeCashFlow?: number;
  dcfIntrinsicValue?: number;
  capexBudget?: number;
}

export interface PricePoint {
  time: string;
  tick: number;
  price: number;
  volume: number;
  sma20?: number;
  sma50?: number;
  ema9?: number;
  rsi14?: number;
  bollingerUpper?: number;
  bollingerLower?: number;
  high?: number;
  low?: number;
  open?: number;
  close?: number;
}

export interface OrderBookLevel {
  price: number;
  amount: number;
  total: number;
}

export type PaperOrderType = 'MARKET' | 'LIMIT' | 'STOP_LOSS' | 'TAKE_PROFIT';
export type PaperOrderSide = 'BUY' | 'SELL';
export type PaperOrderStatus = 'PENDING' | 'FILLED' | 'CANCELLED';

export interface PaperOrder {
  id: string;
  ticker: string;
  side: PaperOrderSide;
  orderType: PaperOrderType;
  quantity: number;
  targetPrice?: number;
  status: PaperOrderStatus;
  createdAtTick: number;
  createdAtTimestamp: string;
}

export interface StockCatalogItem {
  ticker: string;
  name: string;
  sector: string;
  assetClass: AssetClass;
  price: number;
  change24hPct: number;
  change24hDollar: number;
  high52w: number;
  low52w: number;
  volume24h: string;
  marketCap: string;
  peRatio: number;
  beta: number;
  dividendYield: number;
  description: string;
  priceHistory: PricePoint[];
  bids: OrderBookLevel[];
  asks: OrderBookLevel[];
}

export type LedgerEntryType =
  | 'ASSET_PURCHASE'
  | 'ASSET_SALE'
  | 'DIVIDEND_PAYOUT'
  | 'MORTGAGE_AMORTIZATION'
  | 'INTEREST_SPIKE_EXPENSE'
  | 'CAPEX_REINVESTMENT'
  | 'PROPERTY_TAX'
  | 'REBALANCING_TRADE'
  | 'REFINANCE_DEBT';

export interface DoubleEntryLedgerRecord {
  id: string;
  turnNumber: number;
  year: number;
  quarter: number;
  timestamp: string;
  entryType: LedgerEntryType;
  accountDebited: string;  // e.g., 'DR CASH_ACC', 'DR REAL_ESTATE_ASSET'
  accountCredited: string; // e.g., 'CR EQUITY_POS', 'CR MORTGAGE_LIABILITY'
  debitAmount: number;
  creditAmount: number;
  description: string;
  formattedTime: string;
}

export interface MacroState {
  inflationRate: number;        // e.g. 0.0312 (3.12%)
  inflationDelta: number;       // e.g. +0.004 (+0.4%)
  fedFundsRate: number;         // e.g. 0.0525 (5.25%)
  fedStatus: 'STABLE' | 'HIKING' | 'CUTTING';
  gdpGrowthRate: number;        // e.g. 0.021 (2.1%)
  activeEvent: string;          // e.g. 'Supply Chain Shock'
  eventDescription: string;
  sp500Value: number;
  sp500ChangePct: number;
}

export interface UserPortfolioState {
  userId: string;
  username: string;
  cashBalance: number;
  totalPortfolioValue: number;
  currentYear: number;
  currentQuarter: number;
  currentTick: number;
  sharpeRatio: number;
  alphaScore: number;
  betaScore: number;
  diversificationIndex: number; // 0 - 100
  npvTotal: number;
  irrTotal: number;
  equityMultiple: number; // MoIC
}

// DECA Competition Types
export type DecaClusterType =
  | 'Financial Analysis'
  | 'Economic Principles'
  | 'Corporate Finance'
  | 'Accounting & Governance'
  | 'Investments & Risk'
  | 'Business Law & Ethics'
  | 'Business Law'
  | 'Emotional Intelligence';

export interface ExamQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  decaCluster: DecaClusterType;
  performanceIndicator: string;
  hint?: string;
  difficulty?: 'High School Level' | 'Intermediate' | 'Advanced';
}

export interface DecaCaseStudy {
  id: string;
  title: string;
  category: string;
  timeLimitMinutes: number;
  scenarioText: string;
  clientProblem: string;
  constraints: string[];
  performanceIndicators: {
    code: string;
    description: string;
    guidelines: string;
  }[];
}

export interface RoleplayNoteMatrix {
  clientProblemNotes: string;
  systemConstraintsNotes: string;
  piNotes: Record<string, string>; // PI code -> student response note
  pitchScript: string;
}

export interface DecaReportSection {
  title: string;
  prompt: string;
  content: string;
}

export interface DecaRubricCriterion {
  id: string;
  indicator: string;
  maxPoints: number;
  earnedPoints: number;
  feedback: string;
}

export type RealEstatePropertyType =
  | 'MULTIFAMILY'
  | 'OFFICE'
  | 'INDUSTRIAL'
  | 'RETAIL'
  | 'MIXED_USE'
  | 'RESIDENTIAL'
  | 'MEDICAL'
  | 'HOTEL';

export interface PropertyValuationHistoryPoint {
  tick: number;
  year: number;
  quarter: number;
  timestamp: string;
  propertyValue: number;
  mortgageBalance: number;
  equityValue: number;
  grossRentAnnual: number;
  noiAnnual: number;
  accumulatedCashFlow: number;
}

export interface PropertyBillBreakdown {
  propertyTaxAnnual: number;
  propertyInsuranceAnnual: number;
  maintenanceAndRepairsAnnual: number;
  propertyManagementFeeAnnual: number;
  utilitiesAndCommonAnnual: number;
  capexReserveAnnual: number;
  totalAnnualBills: number;
  monthlyBillsTotal: number;
  annualDebtService: number;
  netQuarterlyCashFlow: number;
}

export interface RealEstateCatalogItem {
  id: string;
  name: string;
  propertyType: RealEstatePropertyType;
  address: string;
  unitsOrSqft: string;
  purchasePrice: number;
  grossRent: number;
  vacancyRate: number;
  propertyTax: number;
  insurance: number;
  maintenance: number;
  managementFeePct: number;
  utilities: number;
  capexReserve: number;
  ltvRatio: number;
  interestRate: number;
  interestType: InterestRateType;
  projectedAppreciationRate: number; // e.g., 0.04 (4% / yr)
  capRate: number;
  description: string;
  highlights: string[];
}

