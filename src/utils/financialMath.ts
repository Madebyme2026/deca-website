// Financial Literacy & DECA Competition Core Formulas

export interface RealEstateInput {
  purchasePrice: number;
  grossPotentialRent: number;
  vacancyRate: number; // e.g. 0.05
  operatingExpenses?: number;
  
  // Itemized property bills
  propertyTax?: number;
  propertyInsurance?: number;
  maintenanceAndRepairs?: number;
  propertyManagementFeePct?: number; // e.g. 0.05 (5%)
  utilitiesAndCommon?: number;
  capexReserve?: number;

  ltvRatio: number; // e.g. 0.70
  interestRate: number; // e.g. 0.055
  amortizationYears: number; // e.g. 30
  projectedAppreciationRate?: number; // e.g. 0.035 (3.5%/yr)
}

export interface RealEstateAnalysisResult {
  effectiveGrossIncome: number;
  vacancyLoss: number;
  propertyTax: number;
  propertyInsurance: number;
  maintenanceAndRepairs: number;
  propertyManagementFee: number;
  utilitiesAndCommon: number;
  capexReserve: number;
  totalOperatingExpenses: number;
  noi: number;
  loanAmount: number;
  equityInvested: number;
  monthlyMortgage: number;
  annualDebtService: number;
  cashFlowAfterDebt: number;
  dscr: number;
  capRate: number;
  debtYield: number;
  unleveredCocr: number;
  leveredCocr: number;
  tenYearIrr: number;
  tenYearProjections: {
    year: number;
    propertyValue: number;
    mortgageBalance: number;
    equityValue: number;
    annualCashFlow: number;
  }[];
}

/**
 * Real Estate Deal Formulas
 */
export function calculateRealEstateDeal(input: RealEstateInput): RealEstateAnalysisResult {
  const vacancyLoss = input.grossPotentialRent * input.vacancyRate;
  const effectiveGrossIncome = input.grossPotentialRent - vacancyLoss;

  // Itemized Property Bills
  const propertyTax = input.propertyTax ?? 0;
  const propertyInsurance = input.propertyInsurance ?? 0;
  const maintenanceAndRepairs = input.maintenanceAndRepairs ?? 0;
  const propertyManagementFee = (input.propertyManagementFeePct ?? 0.05) * effectiveGrossIncome;
  const utilitiesAndCommon = input.utilitiesAndCommon ?? 0;
  const capexReserve = input.capexReserve ?? 0;

  const calculatedItemizedOpEx =
    propertyTax + propertyInsurance + maintenanceAndRepairs + propertyManagementFee + utilitiesAndCommon + capexReserve;

  const totalOperatingExpenses =
    calculatedItemizedOpEx > 0 ? calculatedItemizedOpEx : (input.operatingExpenses ?? 0);

  const noi = effectiveGrossIncome - totalOperatingExpenses;
  
  const loanAmount = input.purchasePrice * input.ltvRatio;
  const equityInvested = input.purchasePrice - loanAmount;
  
  // Mortgage payment formula: P * (r * (1 + r)^n) / ((1 + r)^n - 1)
  let monthlyMortgage = 0;
  if (loanAmount > 0 && input.interestRate > 0) {
    const r = input.interestRate / 12;
    const n = input.amortizationYears * 12;
    monthlyMortgage = loanAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }
  
  const annualDebtService = monthlyMortgage * 12;
  const cashFlowAfterDebt = noi - annualDebtService;
  
  const dscr = annualDebtService > 0 ? noi / annualDebtService : 99.0;
  const capRate = input.purchasePrice > 0 ? noi / input.purchasePrice : 0;
  const debtYield = loanAmount > 0 ? noi / loanAmount : 0;
  const unleveredCocr = input.purchasePrice > 0 ? noi / input.purchasePrice : 0;
  const leveredCocr = equityInvested > 0 ? cashFlowAfterDebt / equityInvested : 0;

  // 10-Year Projections & IRR
  const appreciationRate = input.projectedAppreciationRate ?? 0.035;
  const rentGrowthRate = 0.03;
  const tenYearProjections = [];
  const irrCashFlows = [];

  let currentVal = input.purchasePrice;
  let currentRent = input.grossPotentialRent;
  let currentLoanBal = loanAmount;
  const r = (input.interestRate || 0.05) / 12;

  for (let yr = 1; yr <= 10; yr++) {
    currentVal *= (1 + appreciationRate);
    currentRent *= (1 + rentGrowthRate);

    // Amortize loan for 12 months
    for (let m = 0; m < 12; m++) {
      if (currentLoanBal > 0) {
        const intPayment = currentLoanBal * r;
        const prinPayment = Math.min(currentLoanBal, monthlyMortgage - intPayment);
        currentLoanBal = Math.max(0, currentLoanBal - prinPayment);
      }
    }

    const yrEffectiveRent = currentRent * (1 - input.vacancyRate);
    const yrOpEx = totalOperatingExpenses * Math.pow(1.025, yr);
    const yrNoi = yrEffectiveRent - yrOpEx;
    const yrCashFlow = yrNoi - annualDebtService;

    tenYearProjections.push({
      year: yr,
      propertyValue: Math.round(currentVal),
      mortgageBalance: Math.round(currentLoanBal),
      equityValue: Math.round(currentVal - currentLoanBal),
      annualCashFlow: Math.round(yrCashFlow),
    });

    // Cash flow stream for IRR
    if (yr < 10) {
      irrCashFlows.push(yrCashFlow);
    } else {
      // Year 10 exit sale proceeds minus remaining debt
      const exitSaleProceeds = currentVal * 0.96 - currentLoanBal; // 4% closing cost
      irrCashFlows.push(yrCashFlow + exitSaleProceeds);
    }
  }

  const tenYearIrr = calculateIRR(equityInvested, irrCashFlows);

  return {
    effectiveGrossIncome,
    vacancyLoss,
    propertyTax,
    propertyInsurance,
    maintenanceAndRepairs,
    propertyManagementFee,
    utilitiesAndCommon,
    capexReserve,
    totalOperatingExpenses,
    noi,
    loanAmount,
    equityInvested,
    monthlyMortgage,
    annualDebtService,
    cashFlowAfterDebt,
    dscr,
    capRate,
    debtYield,
    unleveredCocr,
    leveredCocr,
    tenYearIrr,
    tenYearProjections,
  };
}

/**
 * Corporate Finance & DCF Valuation Formulas
 */
export interface CorporateDCFInput {
  revenue: number;
  operatingExpenses: number;
  ebitda: number;
  capex: number;
  totalDebt: number;
  cashAndEquivalents: number;
  sharesOutstanding: number;
  taxRate: number; // e.g. 0.21
  wacc: number; // e.g. 0.085 (8.5%)
  terminalGrowthRate: number; // e.g. 0.025 (2.5%)
  projectionYears: number; // e.g. 5
  revenueGrowthRate: number; // e.g. 0.08 (8%)
}

export interface DCFResult {
  projectedFCFs: number[];
  pvProjectedFCFs: number;
  terminalValue: number;
  pvTerminalValue: number;
  enterpriseValue: number;
  equityValue: number;
  intrinsicValuePerShare: number;
  debtToEquity: number;
  netDebtToEbitda: number;
  interestCoverageRatio: number;
}

export function calculateDCFModel(input: CorporateDCFInput): DCFResult {
  const projectedFCFs: number[] = [];
  let currentRev = input.revenue;
  let pvProjectedFCFs = 0;

  for (let i = 1; i <= input.projectionYears; i++) {
    currentRev *= (1 + input.revenueGrowthRate);
    const projectedEbitda = currentRev * (input.ebitda / input.revenue);
    const ebit = projectedEbitda - (input.capex * 0.5); // Depr approx
    const ebitAfterTax = ebit * (1 - input.taxRate);
    const fcf = ebitAfterTax + (input.capex * 0.5) - input.capex;
    
    projectedFCFs.push(fcf);
    pvProjectedFCFs += fcf / Math.pow(1 + input.wacc, i);
  }

  const lastFCF = projectedFCFs[projectedFCFs.length - 1] || 10000;
  // Terminal Value = (FCF_n * (1 + g)) / (WACC - g)
  const terminalValue = (lastFCF * (1 + input.terminalGrowthRate)) / (input.wacc - input.terminalGrowthRate);
  const pvTerminalValue = terminalValue / Math.pow(1 + input.wacc, input.projectionYears);

  const enterpriseValue = pvProjectedFCFs + pvTerminalValue;
  const equityValue = enterpriseValue + input.cashAndEquivalents - input.totalDebt;
  const intrinsicValuePerShare = input.sharesOutstanding > 0 ? equityValue / input.sharesOutstanding : 0;

  const debtToEquity = equityValue > 0 ? input.totalDebt / equityValue : 0;
  const netDebt = input.totalDebt - input.cashAndEquivalents;
  const netDebtToEbitda = input.ebitda > 0 ? netDebt / input.ebitda : 0;
  const interestCoverageRatio = input.totalDebt > 0 ? input.ebitda / (input.totalDebt * input.wacc) : 99.0;

  return {
    projectedFCFs,
    pvProjectedFCFs,
    terminalValue,
    pvTerminalValue,
    enterpriseValue,
    equityValue,
    intrinsicValuePerShare,
    debtToEquity,
    netDebtToEbitda,
    interestCoverageRatio,
  };
}

/**
 * Net Present Value (NPV)
 */
export function calculateNPV(discountRate: number, initialInvestment: number, cashFlows: number[]): number {
  let npv = -initialInvestment;
  for (let t = 0; t < cashFlows.length; t++) {
    npv += cashFlows[t] / Math.pow(1 + discountRate, t + 1);
  }
  return npv;
}

/**
 * Internal Rate of Return (IRR) estimation using Bisection Method
 */
export function calculateIRR(initialInvestment: number, cashFlows: number[]): number {
  let low = -0.5;
  let high = 2.0;
  let rate = 0.1;
  const maxIterations = 100;
  const precision = 0.0001;

  for (let i = 0; i < maxIterations; i++) {
    rate = (low + high) / 2;
    const npv = calculateNPV(rate, initialInvestment, cashFlows);
    if (Math.abs(npv) < precision) return rate;
    if (npv > 0) {
      low = rate;
    } else {
      high = rate;
    }
  }
  return rate;
}

/**
 * Formatting Utility Functions
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(value);
}

export function formatPercent(value: number, decimals: number = 2): string {
  return `${(value * 100).toFixed(decimals)}%`;
}
