import React from 'react';
import { useSimulationStore } from '../../store/simulationStore';
import { formatCurrency, formatPercent, calculateNPV, calculateIRR } from '../../utils/financialMath';
import { Briefcase, Play, ArrowRightLeft, ShieldAlert, Award, PieChart, Layers } from 'lucide-react';

export const PortfolioDashboardModule: React.FC = () => {
  const { portfolio, investments, advanceTick, sellProperty, refinanceProperty } = useSimulationStore();

  // Portfolio Cash Flows for NPV / IRR calculation
  const projectCashFlows = [120000, 145000, 180000, 210000, 260000];
  const npv = calculateNPV(0.08, 500000, projectCashFlows);
  const irr = calculateIRR(500000, projectCashFlows);

  const realEstateVal = investments
    .filter((i) => i.assetClass === 'REAL_ESTATE')
    .reduce((s, i) => s + i.marketValue, 0);

  const equityVal = investments
    .filter((i) => i.assetClass === 'EQUITY')
    .reduce((s, i) => s + i.marketValue, 0);

  const totalVal = portfolio.cashBalance + realEstateVal + equityVal;

  const rePct = totalVal > 0 ? realEstateVal / totalVal : 0;
  const eqPct = totalVal > 0 ? equityVal / totalVal : 0;
  const cashPct = totalVal > 0 ? portfolio.cashBalance / totalVal : 0;

  return (
    <div className="flex flex-col gap-4 text-[#fafafa] font-mono">
      {/* Banner */}
      <div className="bg-[#18181b] border border-[#27272a] p-4 flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#eab308]/10 text-[#eab308] border border-[#eab308]/30">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white uppercase tracking-wider">
              Module C: Multi-Year Timeline & Risk-Adjusted Portfolio Engine
            </h1>
            <p className="text-xs text-[#71717a]">
              Double-Entry Asset Rebalancing, Net Present Value (NPV), IRR Yields, & Equity Multiples (MoIC)
            </p>
          </div>
        </div>

        <button
          onClick={advanceTick}
          className="flex items-center gap-2 bg-[#eab308] hover:bg-[#ca8a04] text-[#09090b] px-4 py-2 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Advance Timeline (+1 Quarter)</span>
        </button>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Core Risk Metrics Grid */}
        <div className="col-span-12 lg:col-span-4 bg-[#18181b] border border-[#27272a] p-5 space-y-4">
          <h2 className="text-xs font-bold text-[#eab308] uppercase tracking-wider border-b border-[#27272a] pb-2">
            Portfolio Yield & Risk Metrics
          </h2>

          <div className="bg-[#09090b] p-3 border border-[#27272a]">
            <div className="text-[10px] text-[#71717a] uppercase">Net Present Value (NPV)</div>
            <div className="text-xl font-bold text-[#10b981]">{formatCurrency(npv)}</div>
            <div className="text-[9px] text-[#71717a] mt-1">NPV &gt; $0 (Project adds firm value at 8.0% hurdle rate)</div>
          </div>

          <div className="bg-[#09090b] p-3 border border-[#27272a]">
            <div className="text-[10px] text-[#71717a] uppercase">Internal Rate of Return (IRR)</div>
            <div className="text-xl font-bold text-[#eab308]">{formatPercent(irr, 2)}</div>
            <div className="text-[9px] text-[#71717a] mt-1">Discount rate solving NPV = 0</div>
          </div>

          <div className="bg-[#09090b] p-3 border border-[#27272a]">
            <div className="text-[10px] text-[#71717a] uppercase">Equity Multiple (MoIC)</div>
            <div className="text-xl font-bold text-white">{portfolio.equityMultiple.toFixed(2)}x</div>
            <div className="text-[9px] text-[#71717a] mt-1">Multiple on Invested Capital</div>
          </div>

          <div className="bg-[#09090b] p-3 border border-[#27272a]">
            <div className="text-[10px] text-[#71717a] uppercase">Sharpe Ratio</div>
            <div className="text-xl font-bold text-[#10b981]">{portfolio.sharpeRatio.toFixed(2)}</div>
            <div className="text-[9px] text-[#71717a] mt-1">Risk-adjusted return vs volatility</div>
          </div>
        </div>

        {/* Allocation Breakout & Rebalance Controller */}
        <div className="col-span-12 lg:col-span-8 bg-[#18181b] border border-[#27272a] p-5 flex flex-col justify-between">
          <div>
            <h2 className="text-xs font-bold text-[#71717a] uppercase tracking-wider mb-4 border-b border-[#27272a] pb-2">
              Asset Allocation & Rebalancing Matrix
            </h2>

            {/* Asset Allocation Progress Stack */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-xs font-mono">
                <span>Real Estate ({formatPercent(rePct, 1)})</span>
                <span>Equities ({formatPercent(eqPct, 1)})</span>
                <span>Settled Cash ({formatPercent(cashPct, 1)})</span>
              </div>

              <div className="h-4 w-full bg-[#09090b] border border-[#27272a] flex overflow-hidden rounded-none">
                <div style={{ width: `${rePct * 100}%` }} className="bg-[#eab308] h-full" title="Real Estate"></div>
                <div style={{ width: `${eqPct * 100}%` }} className="bg-[#10b981] h-full" title="Equities"></div>
                <div style={{ width: `${cashPct * 100}%` }} className="bg-[#3b82f6] h-full" title="Cash"></div>
              </div>
            </div>

            {/* Active Position Management Table */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-white uppercase mb-2">Active Positions & Equity Harvest Controls</div>

              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {investments.map((inv) => (
                  <div key={inv.id} className="bg-[#09090b] border border-[#27272a] p-3 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">{inv.name}</div>
                      <div className="text-[10px] text-[#71717a]">
                        CLASS: {inv.assetClass} | VALUE: {formatCurrency(inv.marketValue)}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {inv.assetClass === 'REAL_ESTATE' && (
                        <>
                          <button
                            onClick={() => refinanceProperty(inv.id, 0.049, 0.60)}
                            className="bg-[#27272a] hover:bg-[#3f3f46] text-white px-2.5 py-1 text-[10px] font-bold"
                          >
                            Refinance
                          </button>
                          <button
                            onClick={() => sellProperty(inv.id)}
                            className="bg-[#f43f5e]/20 hover:bg-[#f43f5e] text-[#f43f5e] hover:text-white border border-[#f43f5e] px-2.5 py-1 text-[10px] font-bold transition-colors"
                          >
                            Liquidate Equity
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#27272a] flex justify-between items-center text-xs text-[#71717a]">
            <span>MULTI-YEAR SIMULATION TIMELINE: ACTIVE</span>
            <span className="text-[#10b981] font-bold">ALLOY LEDGER SYNCED</span>
          </div>
        </div>
      </div>
    </div>
  );
};
