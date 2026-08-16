import React, { useState } from 'react';
import { useSimulationStore } from '../../store/simulationStore';
import { CandlestickChart } from '../charts/CandlestickChart';
import { PaperOrderType, PaperOrderSide } from '../../types/financial';
import {
  getTimeframePriceHistory,
  TimeFrameOption,
  TIMEFRAME_LABELS,
  TIMEFRAME_OPTIONS,
} from '../../utils/timeframeData';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Line,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  BarChart2,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Briefcase,
  Zap,
  CheckCircle2,
  Clock,
  Layers,
  RotateCcw,
  Sliders,
  XCircle,
  FileText,
  ShieldAlert,
} from 'lucide-react';

export const StockTradingModule: React.FC = () => {
  const {
    stockCatalog,
    selectedStockTicker,
    setSelectedStockTicker,
    placePaperOrder,
    cancelPaperOrder,
    pendingPaperOrders,
    paperOrderHistory,
    resetPaperBalance,
    portfolio,
    investments,
    ledgerRecords,
    advanceTick,
  } = useSimulationStore();

  const [sharesInput, setSharesInput] = useState<number>(10);
  const [orderSide, setOrderSide] = useState<PaperOrderSide>('BUY');
  const [orderType, setOrderType] = useState<PaperOrderType>('MARKET');
  const [targetPriceInput, setTargetPriceInput] = useState<string>('');
  const [chartType, setChartType] = useState<'CANDLESTICK' | 'AREA' | 'TECHNICAL'>('CANDLESTICK');
  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeFrameOption>('1D');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'ALL' | 'EQUITY' | 'CRYPTO'>('ALL');
  const [lastExecutedMessage, setLastExecutedMessage] = useState<string | null>(null);
  const [bottomTab, setBottomTab] = useState<'POSITIONS' | 'PENDING' | 'HISTORY' | 'LEDGER'>('POSITIONS');

  const currentStock = stockCatalog.find((s) => s.ticker === selectedStockTicker) || stockCatalog[0];

  const activePriceHistory = React.useMemo(() => {
    return getTimeframePriceHistory(currentStock, selectedTimeframe);
  }, [currentStock, selectedTimeframe]);

  // Set default limit target price when current stock changes
  React.useEffect(() => {
    if (orderType !== 'MARKET' && !targetPriceInput) {
      setTargetPriceInput(currentStock.price.toFixed(2));
    }
  }, [selectedStockTicker, orderType]);

  // Filter stock catalog
  const filteredCatalog = stockCatalog.filter((s) => {
    const matchesSearch =
      s.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.sector.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || s.assetClass === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Calculate user position in selected stock
  const userPosition = investments.find((i) => i.ticker === currentStock.ticker);
  const userSharesHeld = userPosition ? userPosition.quantity : 0;
  const userAvgCost = userPosition ? userPosition.entryPrice : 0;
  const userMarketVal = userPosition ? userPosition.marketValue : 0;
  const userUnrealizedPnL = userPosition ? (currentStock.price - userAvgCost) * userSharesHeld : 0;
  const userUnrealizedPnLPct = userAvgCost > 0 ? ((currentStock.price - userAvgCost) / userAvgCost) * 100 : 0;

  const executionPrice = orderType === 'MARKET' ? currentStock.price : (parseFloat(targetPriceInput) || currentStock.price);
  const estimatedTotal = Math.round(executionPrice * sharesInput * 100) / 100;

  const handlePercentageClick = (pct: number) => {
    if (orderSide === 'BUY') {
      const maxCash = portfolio.cashBalance * pct;
      const shares = Math.floor(maxCash / currentStock.price);
      setSharesInput(Math.max(1, shares));
    } else {
      const shares = Math.floor(userSharesHeld * pct);
      setSharesInput(Math.max(1, shares));
    }
  };

  const handleExecutePaperTrade = () => {
    if (sharesInput <= 0) return;

    if (orderSide === 'SELL' && sharesInput > userSharesHeld) {
      alert(`Cannot sell more shares than currently held (${userSharesHeld} shares available).`);
      return;
    }

    const priceTargetVal = parseFloat(targetPriceInput) || currentStock.price;

    placePaperOrder(
      currentStock.ticker,
      orderSide,
      orderType,
      sharesInput,
      orderType !== 'MARKET' ? priceTargetVal : undefined
    );

    if (orderType === 'MARKET') {
      setLastExecutedMessage(
        `Paper ${orderSide} Executed: ${sharesInput} ${currentStock.ticker} @ $${currentStock.price.toFixed(2)}`
      );
    } else {
      setLastExecutedMessage(
        `Pending Paper Order Placed: ${orderType} ${orderSide} ${sharesInput} ${currentStock.ticker} @ $${priceTargetVal.toFixed(2)}`
      );
    }

    setTimeout(() => setLastExecutedMessage(null), 4000);
  };

  const isUp = currentStock.change24hPct >= 0;

  // Portfolio total stats
  const totalStockMarketValue = investments
    .filter((i) => i.assetClass === 'EQUITY' || i.assetClass === 'CRYPTO')
    .reduce((sum, i) => sum + i.marketValue, 0);

  const totalUnrealizedPnL = investments
    .filter((i) => i.assetClass === 'EQUITY' || i.assetClass === 'CRYPTO')
    .reduce((sum, i) => sum + (i.currentPrice - i.entryPrice) * i.quantity, 0);

  return (
    <div className="flex flex-col gap-4 text-[#fafafa] font-mono">
      {/* Paper Trading Account Top Banner */}
      <div className="bg-[#18181b] border border-[#27272a] p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#eab308]/10 text-[#eab308] border border-[#eab308]/30">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-white uppercase tracking-wider">
                Paper Trading Terminal & Candlestick Charts
              </h1>
              <span className="text-[9px] bg-[#10b981]/20 text-[#10b981] font-bold px-2 py-0.5 border border-[#10b981]/40">
                PRACTICE ENVIRONMENT
              </span>
            </div>
            <p className="text-xs text-[#71717a]">
              Simulated Market Engine • Candlestick Wicks & OHLC • Limit/Stop Orders • Order Book Depth
            </p>
          </div>
        </div>

        {/* Practice Account Metrics */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="bg-[#09090b] px-3 py-1.5 border border-[#27272a] text-right">
            <div className="text-[9px] text-[#71717a] uppercase">Paper Settled Cash</div>
            <div className="text-sm font-bold text-[#10b981]">
              ${portfolio.cashBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>

          <div className="bg-[#09090b] px-3 py-1.5 border border-[#27272a] text-right">
            <div className="text-[9px] text-[#71717a] uppercase">Stock Holdings Value</div>
            <div className="text-sm font-bold text-white">
              ${totalStockMarketValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>

          <div className="bg-[#09090b] px-3 py-1.5 border border-[#27272a] text-right">
            <div className="text-[9px] text-[#71717a] uppercase">Total Unrealized P&L</div>
            <div className={`text-sm font-bold ${totalUnrealizedPnL >= 0 ? 'text-[#10b981]' : 'text-[#f43f5e]'}`}>
              {totalUnrealizedPnL >= 0 ? '+' : ''}${totalUnrealizedPnL.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>

          <button
            onClick={resetPaperBalance}
            title="Reset practice cash balance to $500,000"
            className="flex items-center gap-1 bg-[#09090b] hover:bg-[#27272a] border border-[#27272a] text-[#71717a] hover:text-white px-2.5 py-2 text-xs font-bold uppercase transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Cash</span>
          </button>

          <button
            onClick={advanceTick}
            className="flex items-center gap-1.5 bg-[#eab308] hover:bg-[#ca8a04] text-[#09090b] font-bold px-3 py-2 text-xs uppercase transition-colors cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Simulate Market Tick</span>
          </button>
        </div>
      </div>

      {/* Asset Selector Ticker Strip */}
      <div className="bg-[#18181b] border border-[#27272a] p-3 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Search & Category Filter */}
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[#71717a]" />
              <input
                type="text"
                placeholder="Search ticker, company or sector..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#09090b] border border-[#27272a] pl-8 pr-3 py-1.5 text-xs text-white focus:border-[#eab308] outline-none font-mono"
              />
            </div>

            <div className="flex gap-1">
              {(['ALL', 'EQUITY', 'CRYPTO'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-2.5 py-1 text-[10px] font-bold uppercase border cursor-pointer ${
                    categoryFilter === cat
                      ? 'bg-[#eab308] text-[#09090b] border-[#eab308]'
                      : 'bg-[#09090b] text-[#71717a] border-[#27272a]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <span className="text-[10px] text-[#71717a] font-mono">
            SHOWING {filteredCatalog.length} OF {stockCatalog.length} ASSETS
          </span>
        </div>

        {/* Scrollable Ticker Cards */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {filteredCatalog.map((item) => {
            const isSelected = item.ticker === selectedStockTicker;
            const itemUp = item.change24hPct >= 0;

            return (
              <button
                key={item.ticker}
                onClick={() => setSelectedStockTicker(item.ticker)}
                className={`p-2.5 min-w-[130px] border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#eab308]/15 border-[#eab308] text-white'
                    : 'bg-[#09090b] border-[#27272a] text-[#71717a] hover:border-[#3f3f46] hover:text-white'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold font-mono text-white">{item.ticker}</span>
                  <span
                    className={`text-[9px] font-bold px-1 py-0.2 ${
                      itemUp ? 'bg-[#10b981]/20 text-[#10b981]' : 'bg-[#f43f5e]/20 text-[#f43f5e]'
                    }`}
                  >
                    {itemUp ? '+' : ''}
                    {item.change24hPct.toFixed(2)}%
                  </span>
                </div>
                <div className="text-xs font-bold text-white font-mono">
                  ${item.price < 10 ? item.price.toFixed(4) : item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-[9px] text-[#71717a] truncate mt-0.5">{item.name}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Primary Trading Workspace Grid */}
      <div className="grid grid-cols-12 gap-4">
        {/* Left Col: Chart & Asset Overview (8 cols) */}
        <div className="col-span-12 lg:col-span-8 space-y-4">
          {/* Asset Header Info */}
          <div className="bg-[#18181b] border border-[#27272a] p-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#27272a] pb-3 mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-white uppercase">{currentStock.ticker}</h2>
                  <span className="text-xs font-bold text-[#71717a] bg-[#09090b] px-2 py-0.5 border border-[#27272a]">
                    {currentStock.sector}
                  </span>
                </div>
                <div className="text-xs text-[#d4d4d8] font-mono mt-0.5">{currentStock.name}</div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-bold text-white font-mono">
                  ${currentStock.price < 10 ? currentStock.price.toFixed(4) : currentStock.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
                <div
                  className={`text-xs font-bold flex items-center justify-end gap-1 font-mono ${
                    isUp ? 'text-[#10b981]' : 'text-[#f43f5e]'
                  }`}
                >
                  {isUp ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                  <span>
                    {isUp ? '+' : ''}
                    ${currentStock.change24hDollar.toFixed(2)} ({isUp ? '+' : ''}
                    {currentStock.change24hPct.toFixed(2)}%) TODAY
                  </span>
                </div>
              </div>
            </div>

            {/* Key Fundamental Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-[10px]">
              <div className="bg-[#09090b] p-2 border border-[#27272a]">
                <span className="text-[#71717a] block">Market Cap</span>
                <span className="text-white font-bold">{currentStock.marketCap}</span>
              </div>
              <div className="bg-[#09090b] p-2 border border-[#27272a]">
                <span className="text-[#71717a] block">P/E Ratio</span>
                <span className="text-white font-bold">{currentStock.peRatio > 0 ? currentStock.peRatio : 'N/A'}</span>
              </div>
              <div className="bg-[#09090b] p-2 border border-[#27272a]">
                <span className="text-[#71717a] block">Beta Volatility</span>
                <span className="text-white font-bold">{currentStock.beta}</span>
              </div>
              <div className="bg-[#09090b] p-2 border border-[#27272a]">
                <span className="text-[#71717a] block">52w High</span>
                <span className="text-white font-bold">${currentStock.high52w.toLocaleString()}</span>
              </div>
              <div className="bg-[#09090b] p-2 border border-[#27272a]">
                <span className="text-[#71717a] block">52w Low</span>
                <span className="text-white font-bold">${currentStock.low52w.toLocaleString()}</span>
              </div>
              <div className="bg-[#09090b] p-2 border border-[#27272a]">
                <span className="text-[#71717a] block">24h Volume</span>
                <span className="text-white font-bold">{currentStock.volume24h}</span>
              </div>
            </div>
          </div>

          {/* Interactive Trading Chart Panel with Candlestick Wicks */}
          <div className="bg-[#18181b] border border-[#27272a] p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#27272a] pb-3 mb-3">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-[#eab308]" />
                <span className="text-xs font-bold text-white uppercase">Real-Time Price Chart</span>
              </div>

              {/* Chart Mode Toggle */}
              <div className="flex gap-1">
                {(['CANDLESTICK', 'AREA', 'TECHNICAL'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setChartType(mode)}
                    className={`px-2.5 py-1 text-[10px] font-bold uppercase border cursor-pointer ${
                      chartType === mode
                        ? 'bg-[#eab308] text-[#09090b] border-[#eab308]'
                        : 'bg-[#09090b] text-[#71717a] border-[#27272a]'
                    }`}
                  >
                    {mode === 'CANDLESTICK' ? 'Candlestick Wicks' : mode === 'AREA' ? 'Gradient' : '20/50 SMA'}
                  </button>
                ))}
              </div>
            </div>

            {/* Timeframe Selector Strip */}
            <div className="flex flex-wrap items-center justify-between gap-2 bg-[#09090b] border border-[#27272a] p-2 mb-3">
              <div className="flex items-center gap-1 overflow-x-auto scrollbar-thin py-0.5 max-w-full">
                {TIMEFRAME_OPTIONS.map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setSelectedTimeframe(tf)}
                    className={`px-2 py-1 text-[10px] font-bold font-mono transition-all cursor-pointer border whitespace-nowrap ${
                      selectedTimeframe === tf
                        ? 'bg-[#eab308] text-[#09090b] border-[#eab308] shadow-sm'
                        : 'bg-[#18181b] text-[#71717a] hover:text-white border-[#27272a] hover:border-[#3f3f46]'
                    }`}
                    title={`View ${TIMEFRAME_LABELS[tf]} chart`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
              <div className="text-[10px] text-[#eab308] font-mono hidden sm:block px-1">
                {TIMEFRAME_LABELS[selectedTimeframe]}
              </div>
            </div>

            {/* Chart Render Canvas */}
            {chartType === 'CANDLESTICK' || chartType === 'TECHNICAL' ? (
              <CandlestickChart
                data={activePriceHistory}
                height={280}
                showSma={chartType === 'TECHNICAL'}
              />
            ) : (
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activePriceHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="priceGradientGreen" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="priceGradientRed" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                    <XAxis dataKey="time" stroke="#71717a" fontSize={10} tickLine={false} />
                    <YAxis
                      domain={['auto', 'auto']}
                      stroke="#71717a"
                      fontSize={10}
                      tickLine={false}
                      tickFormatter={(val) => `$${val}`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#09090b',
                        borderColor: '#27272a',
                        borderRadius: '0px',
                        color: '#fafafa',
                        fontSize: '11px',
                        fontFamily: 'monospace',
                      }}
                      formatter={(val: any) => [`$${Number(val).toFixed(2)}`, 'Price']}
                    />
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke={isUp ? '#10b981' : '#f43f5e'}
                      strokeWidth={2}
                      fillOpacity={1}
                      fill={isUp ? 'url(#priceGradientGreen)' : 'url(#priceGradientRed)'}
                    />
                    {chartType === 'TECHNICAL' && (
                      <>
                        <Line type="monotone" dataKey="sma20" stroke="#eab308" strokeWidth={1.5} dot={false} name="20-SMA" />
                        <Line type="monotone" dataKey="sma50" stroke="#3b82f6" strokeWidth={1.5} dot={false} name="50-SMA" />
                      </>
                    )}
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Paper Trading Order Terminal & Level 2 Depth (4 cols) */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          {/* Paper Trading Execution Terminal */}
          <div className="bg-[#18181b] border border-[#27272a] p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-[#27272a] pb-2">
              <span className="text-xs font-bold text-white uppercase flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#eab308]" />
                Paper Execution Terminal
              </span>
              <span className="text-[10px] text-[#10b981] font-bold bg-[#10b981]/10 px-2 py-0.5 border border-[#10b981]/30">
                PAPER TRADING
              </span>
            </div>

            {/* Order Side Toggle (BUY vs SELL) */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setOrderSide('BUY')}
                className={`py-2 text-xs font-bold uppercase transition-all cursor-pointer ${
                  orderSide === 'BUY'
                    ? 'bg-[#10b981] text-[#09090b] border border-[#10b981]'
                    : 'bg-[#09090b] text-[#71717a] border border-[#27272a] hover:text-white'
                }`}
              >
                Paper Buy / Long
              </button>
              <button
                onClick={() => setOrderSide('SELL')}
                className={`py-2 text-xs font-bold uppercase transition-all cursor-pointer ${
                  orderSide === 'SELL'
                    ? 'bg-[#f43f5e] text-white border border-[#f43f5e]'
                    : 'bg-[#09090b] text-[#71717a] border border-[#27272a] hover:text-white'
                }`}
              >
                Paper Sell / Short
              </button>
            </div>

            {/* Order Type Tabs (MARKET, LIMIT, STOP_LOSS, TAKE_PROFIT) */}
            <div>
              <label className="text-[10px] text-[#71717a] uppercase block mb-1">Order Execution Type</label>
              <div className="grid grid-cols-2 gap-1 text-[10px]">
                {(['MARKET', 'LIMIT', 'STOP_LOSS', 'TAKE_PROFIT'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setOrderType(t);
                      if (t !== 'MARKET' && !targetPriceInput) {
                        setTargetPriceInput(currentStock.price.toFixed(2));
                      }
                    }}
                    className={`py-1.5 font-bold uppercase border cursor-pointer ${
                      orderType === t
                        ? 'bg-[#eab308] text-[#09090b] border-[#eab308]'
                        : 'bg-[#09090b] text-[#71717a] border-[#27272a] hover:text-white'
                    }`}
                  >
                    {t.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* User Position Summary Box */}
            <div className="bg-[#09090b] border border-[#27272a] p-2.5 text-xs space-y-1">
              <div className="flex justify-between text-[#71717a]">
                <span>Shares Currently Held:</span>
                <span className="text-white font-bold">{userSharesHeld} shares</span>
              </div>
              <div className="flex justify-between text-[#71717a]">
                <span>Avg Entry Cost:</span>
                <span className="text-white font-bold">${userAvgCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#71717a]">
                <span>Unrealized P&L:</span>
                <span className={`font-bold ${userUnrealizedPnL >= 0 ? 'text-[#10b981]' : 'text-[#f43f5e]'}`}>
                  {userUnrealizedPnL >= 0 ? '+' : ''}${userUnrealizedPnL.toFixed(2)} ({userUnrealizedPnLPct >= 0 ? '+' : ''}
                  {userUnrealizedPnLPct.toFixed(2)}%)
                </span>
              </div>
            </div>

            {/* Quantity Input */}
            <div>
              <label className="text-[10px] text-[#71717a] uppercase block mb-1">Number of Shares</label>
              <input
                type="number"
                min="1"
                value={sharesInput}
                onChange={(e) => setSharesInput(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full bg-[#09090b] border border-[#27272a] p-2 text-sm text-white font-bold focus:border-[#eab308] outline-none font-mono"
              />
            </div>

            {/* Limit / Stop Trigger Price Input if not Market */}
            {orderType !== 'MARKET' && (
              <div>
                <label className="text-[10px] text-[#eab308] uppercase font-bold block mb-1">
                  Target Price ($) for {orderType.replace('_', ' ')}
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={targetPriceInput}
                  onChange={(e) => setTargetPriceInput(e.target.value)}
                  className="w-full bg-[#09090b] border border-[#eab308] p-2 text-sm text-white font-bold focus:border-[#eab308] outline-none font-mono"
                />
              </div>
            )}

            {/* Quick Percentage Selectors */}
            <div className="grid grid-cols-4 gap-1">
              {[0.25, 0.5, 0.75, 1.0].map((pct) => (
                <button
                  key={pct}
                  onClick={() => handlePercentageClick(pct)}
                  className="bg-[#09090b] hover:bg-[#27272a] border border-[#27272a] text-[#71717a] hover:text-white py-1 text-[10px] font-bold cursor-pointer"
                >
                  {pct * 100}%
                </button>
              ))}
            </div>

            {/* Estimated Total Calculation */}
            <div className="bg-[#09090b] border border-[#eab308]/40 p-3 flex justify-between items-center text-xs">
              <span className="text-[#71717a] uppercase font-bold">Estimated Total:</span>
              <span className="text-sm font-bold text-[#eab308] font-mono">
                ${estimatedTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>

            {/* Submit Paper Order Button */}
            <button
              onClick={handleExecutePaperTrade}
              className={`w-full py-2.5 text-xs font-bold uppercase transition-all cursor-pointer flex items-center justify-center gap-2 ${
                orderSide === 'BUY'
                  ? 'bg-[#10b981] hover:bg-[#059669] text-[#09090b]'
                  : 'bg-[#f43f5e] hover:bg-[#e11d48] text-white'
              }`}
            >
              <span>
                {orderType === 'MARKET'
                  ? `SUBMIT MARKET ${orderSide}`
                  : `SUBMIT ${orderType.replace('_', ' ')} ${orderSide}`}
              </span>
            </button>

            {/* Execution Confirmation Alert */}
            {lastExecutedMessage && (
              <div className="bg-[#10b981]/20 border border-[#10b981] p-2.5 text-[10px] text-[#10b981] font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{lastExecutedMessage}</span>
              </div>
            )}
          </div>

          {/* Level 2 Order Book Depth */}
          <div className="bg-[#18181b] border border-[#27272a] p-4">
            <div className="flex justify-between items-center border-b border-[#27272a] pb-2 mb-3">
              <span className="text-xs font-bold text-white uppercase flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#eab308]" />
                Level 2 Order Book Depth
              </span>
              <span className="text-[10px] text-[#71717a]">REAL-TIME DEPTH</span>
            </div>

            <div className="space-y-3 text-[10px] font-mono">
              {/* Asks (Sells) */}
              <div>
                <div className="text-[#71717a] mb-1 uppercase font-bold">Asks (Sell Orders)</div>
                <div className="space-y-1">
                  {currentStock.asks.map((ask, i) => (
                    <div key={i} className="flex justify-between items-center bg-[#f43f5e]/10 p-1.5 border border-[#f43f5e]/20">
                      <span className="text-[#f43f5e] font-bold">${ask.price.toFixed(2)}</span>
                      <span className="text-[#d4d4d8]">{ask.amount} units</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mid Market Spread */}
              <div className="bg-[#09090b] border border-[#27272a] p-1.5 text-center text-[#eab308] font-bold">
                MID MARKET SPREAD: ${(currentStock.price * 0.002).toFixed(2)}
              </div>

              {/* Bids (Buys) */}
              <div>
                <div className="text-[#71717a] mb-1 uppercase font-bold">Bids (Buy Orders)</div>
                <div className="space-y-1">
                  {currentStock.bids.map((bid, i) => (
                    <div key={i} className="flex justify-between items-center bg-[#10b981]/10 p-1.5 border border-[#10b981]/20">
                      <span className="text-[#10b981] font-bold">${bid.price.toFixed(2)}</span>
                      <span className="text-[#d4d4d8]">{bid.amount} units</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Practice Workspace Tabs (Open Positions, Pending Orders, History, Ledger) */}
      <div className="bg-[#18181b] border border-[#27272a] p-5">
        <div className="flex flex-wrap items-center justify-between border-b border-[#27272a] pb-3 mb-4 gap-2">
          <div className="flex gap-2">
            {(['POSITIONS', 'PENDING', 'HISTORY', 'LEDGER'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setBottomTab(tab)}
                className={`px-3 py-1.5 text-xs font-bold uppercase transition-all cursor-pointer border ${
                  bottomTab === tab
                    ? 'bg-[#eab308] text-[#09090b] border-[#eab308]'
                    : 'bg-[#09090b] text-[#71717a] border-[#27272a] hover:text-white'
                }`}
              >
                {tab === 'POSITIONS' && `Open Positions (${investments.filter((i) => i.assetClass === 'EQUITY' || i.assetClass === 'CRYPTO').length})`}
                {tab === 'PENDING' && `Pending Orders (${pendingPaperOrders.length})`}
                {tab === 'HISTORY' && `Order History (${paperOrderHistory.length})`}
                {tab === 'LEDGER' && `Double-Entry Ledger`}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content: Open Positions */}
        {bottomTab === 'POSITIONS' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#27272a] text-[#71717a] uppercase text-[10px]">
                  <th className="pb-2">Ticker / Name</th>
                  <th className="pb-2">Asset Class</th>
                  <th className="pb-2">Shares Held</th>
                  <th className="pb-2">Avg Entry Cost</th>
                  <th className="pb-2">Current Price</th>
                  <th className="pb-2">Total Market Value</th>
                  <th className="pb-2">Unrealized P&L ($ / %)</th>
                  <th className="pb-2 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#27272a]">
                {investments
                  .filter((i) => i.assetClass === 'EQUITY' || i.assetClass === 'CRYPTO')
                  .map((pos) => {
                    const pnl = (pos.currentPrice - pos.entryPrice) * pos.quantity;
                    const pnlPct = pos.entryPrice > 0 ? ((pos.currentPrice - pos.entryPrice) / pos.entryPrice) * 100 : 0;
                    const posUp = pnl >= 0;

                    return (
                      <tr key={pos.id} className="hover:bg-[#09090b]/50">
                        <td className="py-3 font-bold text-white">
                          <div>{pos.ticker}</div>
                          <div className="text-[10px] text-[#71717a] font-normal">{pos.name}</div>
                        </td>
                        <td className="py-3">
                          <span className="text-[10px] bg-[#09090b] px-2 py-0.5 border border-[#27272a] text-[#eab308]">
                            {pos.assetClass}
                          </span>
                        </td>
                        <td className="py-3 text-white">{pos.quantity}</td>
                        <td className="py-3 text-[#d4d4d8]">${pos.entryPrice.toFixed(2)}</td>
                        <td className="py-3 font-bold text-white">${pos.currentPrice.toFixed(2)}</td>
                        <td className="py-3 font-bold text-white">${pos.marketValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                        <td className={`py-3 font-bold ${posUp ? 'text-[#10b981]' : 'text-[#f43f5e]'}`}>
                          {posUp ? '+' : ''}${pnl.toFixed(2)} ({posUp ? '+' : ''}{pnlPct.toFixed(2)}%)
                        </td>
                        <td className="py-3 text-right">
                          <button
                            onClick={() => {
                              setSelectedStockTicker(pos.ticker || '');
                              setOrderSide('SELL');
                              setSharesInput(pos.quantity);
                            }}
                            className="bg-[#f43f5e]/20 hover:bg-[#f43f5e] text-[#f43f5e] hover:text-white px-2.5 py-1 text-[10px] font-bold uppercase transition-colors cursor-pointer"
                          >
                            Trade / Sell
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab Content: Pending Orders */}
        {bottomTab === 'PENDING' && (
          <div className="overflow-x-auto">
            {pendingPaperOrders.length === 0 ? (
              <div className="p-6 text-center text-[#71717a] text-xs font-mono">
                No active pending orders. Submit a Limit or Stop Loss paper order to see it tracked here.
              </div>
            ) : (
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-[#27272a] text-[#71717a] uppercase text-[10px]">
                    <th className="pb-2">Order ID</th>
                    <th className="pb-2">Ticker</th>
                    <th className="pb-2">Side</th>
                    <th className="pb-2">Order Type</th>
                    <th className="pb-2">Quantity</th>
                    <th className="pb-2">Target Price Trigger</th>
                    <th className="pb-2">Created At</th>
                    <th className="pb-2 text-right">Cancel Order</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#27272a]">
                  {pendingPaperOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-[#09090b]/50">
                      <td className="py-3 text-[#71717a]">{order.id}</td>
                      <td className="py-3 font-bold text-white">{order.ticker}</td>
                      <td className="py-3">
                        <span className={`font-bold ${order.side === 'BUY' ? 'text-[#10b981]' : 'text-[#f43f5e]'}`}>
                          {order.side}
                        </span>
                      </td>
                      <td className="py-3 text-[#eab308] font-bold">{order.orderType}</td>
                      <td className="py-3 text-white">{order.quantity}</td>
                      <td className="py-3 font-bold text-white">${order.targetPrice?.toFixed(2)}</td>
                      <td className="py-3 text-[#71717a]">{order.createdAtTimestamp}</td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => cancelPaperOrder(order.id)}
                          className="bg-[#f43f5e]/20 hover:bg-[#f43f5e] text-[#f43f5e] hover:text-white px-2.5 py-1 text-[10px] font-bold uppercase transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Tab Content: Order History */}
        {bottomTab === 'HISTORY' && (
          <div className="overflow-x-auto">
            {paperOrderHistory.length === 0 ? (
              <div className="p-6 text-center text-[#71717a] text-xs font-mono">
                No past order execution history recorded yet.
              </div>
            ) : (
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-[#27272a] text-[#71717a] uppercase text-[10px]">
                    <th className="pb-2">Order ID</th>
                    <th className="pb-2">Ticker</th>
                    <th className="pb-2">Side</th>
                    <th className="pb-2">Order Type</th>
                    <th className="pb-2">Quantity</th>
                    <th className="pb-2">Executed Price</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#27272a]">
                  {paperOrderHistory.map((order) => (
                    <tr key={order.id} className="hover:bg-[#09090b]/50">
                      <td className="py-3 text-[#71717a]">{order.id}</td>
                      <td className="py-3 font-bold text-white">{order.ticker}</td>
                      <td className="py-3">
                        <span className={`font-bold ${order.side === 'BUY' ? 'text-[#10b981]' : 'text-[#f43f5e]'}`}>
                          {order.side}
                        </span>
                      </td>
                      <td className="py-3 text-[#d4d4d8]">{order.orderType}</td>
                      <td className="py-3 text-white">{order.quantity}</td>
                      <td className="py-3 font-bold text-white">${order.targetPrice?.toFixed(2)}</td>
                      <td className="py-3">
                        <span className={`text-[10px] px-2 py-0.5 border ${
                          order.status === 'FILLED'
                            ? 'bg-[#10b981]/20 border-[#10b981] text-[#10b981]'
                            : 'bg-[#f43f5e]/20 border-[#f43f5e] text-[#f43f5e]'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 text-[#71717a]">{order.createdAtTimestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Tab Content: Double-Entry Ledger */}
        {bottomTab === 'LEDGER' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#27272a] text-[#71717a] uppercase text-[10px]">
                  <th className="pb-2">Tick / Time</th>
                  <th className="pb-2">Entry Type</th>
                  <th className="pb-2">Debited Account</th>
                  <th className="pb-2">Credited Account</th>
                  <th className="pb-2">Amount ($)</th>
                  <th className="pb-2">Transaction Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#27272a]">
                {ledgerRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-[#09090b]/50">
                    <td className="py-3 text-[#71717a]">{record.formattedTime} Tick {record.turnNumber}</td>
                    <td className="py-3">
                      <span className="text-[10px] bg-[#09090b] px-2 py-0.5 border border-[#27272a] text-[#eab308]">
                        {record.entryType}
                      </span>
                    </td>
                    <td className="py-3 text-[#10b981]">{record.accountDebited}</td>
                    <td className="py-3 text-[#f43f5e]">{record.accountCredited}</td>
                    <td className="py-3 font-bold text-white">${record.debitAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td className="py-3 text-[#d4d4d8]">{record.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
