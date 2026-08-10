import React from 'react';
import { useSimulationStore } from '../store/simulationStore';
import { TrendingUp, TrendingDown, ShieldCheck } from 'lucide-react';

interface TickerItem {
  symbol: string;
  name: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export const MarketTickerTape: React.FC = () => {
  const { macroState, stockCatalog } = useSimulationStore();

  const sp500Change = (macroState.sp500ChangePct || 0.42).toFixed(2);
  const nasdaqChange = ((macroState.sp500ChangePct || 0.42) * 1.4).toFixed(2);
  const dowChange = ((macroState.sp500ChangePct || 0.42) * 0.7).toFixed(2);

  const isSpPositive = parseFloat(sp500Change) >= 0;
  const isNasdaqPositive = parseFloat(nasdaqChange) >= 0;
  const isDowPositive = parseFloat(dowChange) >= 0;

  // Get top stocks from stockCatalog for live ticker items
  const stockItems: TickerItem[] = stockCatalog.slice(0, 4).map((stock) => {
    const changeVal = stock.change24hPct || 0;
    return {
      symbol: stock.ticker,
      name: stock.name,
      value: `$${stock.price.toFixed(2)}`,
      change: `${changeVal >= 0 ? '+' : ''}${changeVal.toFixed(2)}%`,
      isPositive: changeVal >= 0,
    };
  });

  const tickerItems: TickerItem[] = [
    {
      symbol: 'S&P 500',
      name: 'INDEX',
      value: macroState.sp500Value ? macroState.sp500Value.toLocaleString('en-US', { maximumFractionDigits: 2 }) : '5,482.10',
      change: `${isSpPositive ? '+' : ''}${sp500Change}%`,
      isPositive: isSpPositive,
    },
    {
      symbol: 'NASDAQ',
      name: 'TECH',
      value: '17,890.40',
      change: `${isNasdaqPositive ? '+' : ''}${nasdaqChange}%`,
      isPositive: isNasdaqPositive,
    },
    {
      symbol: 'DOW',
      name: 'INDUS',
      value: '39,120.80',
      change: `${isDowPositive ? '+' : ''}${dowChange}%`,
      isPositive: isDowPositive,
    },
    {
      symbol: 'FED RATE',
      name: 'MACRO',
      value: `${(macroState.fedFundsRate * 100).toFixed(2)}%`,
      change: `${macroState.inflationRate > 0.03 ? '+0.25%' : '0.00%'}`,
      isPositive: false,
    },
    {
      symbol: '10Y TREAS',
      name: 'YIELD',
      value: `${((macroState.fedFundsRate - 0.01) * 100).toFixed(2)}%`,
      change: '-0.04%',
      isPositive: true,
    },
    ...stockItems,
  ];

  return (
    <div className="w-full bg-[#0d0e12] border-b border-[#27272a] text-[11px] font-mono py-1 px-3 flex items-center justify-between gap-4 overflow-hidden select-none">
      <div className="flex items-center gap-2 shrink-0">
        <span className="inline-flex items-center gap-1.5 bg-[#10b981]/15 text-[#10b981] px-2 py-0.5 rounded text-[10px] font-bold border border-[#10b981]/30">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
          NYSE / NASDAQ LIVE
        </span>
        <span className="hidden md:inline-block text-[#71717a] text-[10px]">
          REAL-TIME DECA MARKET FEED
        </span>
      </div>

      <div className="flex items-center gap-6 overflow-x-auto scrollbar-none py-0.5 whitespace-nowrap">
        {tickerItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 shrink-0">
            <span className="text-white font-bold">{item.symbol}</span>
            <span className="text-[#a1a1aa]">{item.value}</span>
            <span
              className={`flex items-center font-bold ${
                item.isPositive ? 'text-[#10b981]' : 'text-[#ef4444]'
              }`}
            >
              {item.isPositive ? (
                <TrendingUp className="w-3 h-3 inline mr-0.5" />
              ) : (
                <TrendingDown className="w-3 h-3 inline mr-0.5" />
              )}
              {item.change}
            </span>
            {idx < tickerItems.length - 1 && (
              <span className="text-[#27272a]">|</span>
            )}
          </div>
        ))}
      </div>

      <div className="hidden lg:flex items-center gap-2 text-[#71717a] text-[10px] shrink-0">
        <ShieldCheck className="w-3.5 h-3.5 text-[#eab308]" />
        <span>SEC Double-Entry Ledger Active</span>
      </div>
    </div>
  );
};
