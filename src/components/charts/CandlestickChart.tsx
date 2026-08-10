import React, { useState, useRef } from 'react';
import { PricePoint } from '../../types/financial';
import { Maximize2, Minimize2 } from 'lucide-react';

interface CandlestickChartProps {
  data: PricePoint[];
  height?: number;
  showSma?: boolean;
}

export const CandlestickChart: React.FC<CandlestickChartProps> = ({
  data,
  height = 360,
  showSma = true,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Indicator Toggles for Day-Trading View
  const [enableEma9, setEnableEma9] = useState<boolean>(true);
  const [enableSma20, setEnableSma20] = useState<boolean>(showSma);
  const [enableSma50, setEnableSma50] = useState<boolean>(showSma);
  const [enableBollinger, setEnableBollinger] = useState<boolean>(true);
  const [enableRsi, setEnableRsi] = useState<boolean>(true);
  const [enableVolume, setEnableVolume] = useState<boolean>(true);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-[#71717a] text-xs font-mono bg-[#09090b] border border-[#27272a]">
        No Price History Available
      </div>
    );
  }

  // Calculate Bounds for Price Axis
  const highs = data.map((d) => d.high ?? d.price);
  const lows = data.map((d) => d.low ?? d.price);
  const bollingerHighs = enableBollinger
    ? data.map((d) => d.bollingerUpper ?? d.high ?? d.price)
    : [];
  const bollingerLows = enableBollinger
    ? data.map((d) => d.bollingerLower ?? d.low ?? d.price)
    : [];

  const allY = [...highs, ...lows, ...bollingerHighs, ...bollingerLows];
  let minPrice = Math.min(...allY);
  let maxPrice = Math.max(...allY);

  if (minPrice === maxPrice) {
    minPrice *= 0.95;
    maxPrice *= 1.05;
  }

  const pricePadding = (maxPrice - minPrice) * 0.06;
  minPrice = Math.max(0, minPrice - pricePadding);
  maxPrice = maxPrice + pricePadding;

  const actualChartHeight = isExpanded ? height + 160 : height;
  const rsiHeight = enableRsi ? 60 : 0;
  const mainChartHeight = actualChartHeight - rsiHeight - 50;

  const chartWidth = 800; // SVG viewBox coordinate width
  const paddingLeft = 10;
  const paddingRight = 65; // Room for right-hand Y-axis labels & price badge
  const paddingTop = 20;
  const paddingBottom = 25;

  const drawableWidth = chartWidth - paddingLeft - paddingRight;
  const drawableHeight = mainChartHeight - paddingTop - paddingBottom;

  const getY = (price: number) => {
    const ratio = (price - minPrice) / (maxPrice - minPrice);
    return mainChartHeight - paddingBottom - ratio * drawableHeight;
  };

  const getPriceFromY = (yPixel: number) => {
    const ratio = (mainChartHeight - paddingBottom - yPixel) / drawableHeight;
    return minPrice + ratio * (maxPrice - minPrice);
  };

  const candleCount = data.length;
  const slotWidth = drawableWidth / candleCount;
  const candleWidth = Math.max(2.5, Math.min(12, slotWidth * 0.72));

  // Grid lines
  const gridLineCount = 6;
  const gridPrices = Array.from({ length: gridLineCount }).map((_, i) => {
    return minPrice + ((maxPrice - minPrice) / (gridLineCount - 1)) * i;
  });

  // Calculate Indicator Path Strings
  const getLinePath = (key: 'sma20' | 'sma50' | 'ema9' | 'bollingerUpper' | 'bollingerLower') => {
    const points = data
      .map((d, idx) => {
        const val = d[key];
        if (val === undefined) return null;
        const x = paddingLeft + idx * slotWidth + slotWidth / 2;
        const y = getY(val);
        return `${x},${y}`;
      })
      .filter(Boolean);

    return points.length > 0 ? `M ${points.join(' L ')}` : '';
  };

  // Bollinger Cloud Polygon Path
  const getBollingerCloud = () => {
    if (!enableBollinger) return '';
    const topPoints: string[] = [];
    const bottomPoints: string[] = [];

    data.forEach((d, idx) => {
      if (d.bollingerUpper !== undefined && d.bollingerLower !== undefined) {
        const x = paddingLeft + idx * slotWidth + slotWidth / 2;
        topPoints.push(`${x},${getY(d.bollingerUpper)}`);
        bottomPoints.unshift(`${x},${getY(d.bollingerLower)}`);
      }
    });

    if (topPoints.length === 0) return '';
    return `M ${topPoints.join(' L ')} L ${bottomPoints.join(' L ')} Z`;
  };

  // RSI Path String
  const getRsiPath = () => {
    if (!enableRsi) return '';
    const rsiTop = mainChartHeight + 10;
    const rsiBottom = actualChartHeight - 15;
    const rsiDrawHeight = rsiBottom - rsiTop;

    const points = data
      .map((d, idx) => {
        const rsi = d.rsi14 ?? 50;
        const x = paddingLeft + idx * slotWidth + slotWidth / 2;
        const y = rsiBottom - (rsi / 100) * rsiDrawHeight;
        return `${x},${y}`;
      })
      .filter(Boolean);

    return points.length > 0 ? `M ${points.join(' L ')}` : '';
  };

  const hoveredCandle = hoveredIndex !== null ? data[hoveredIndex] : data[data.length - 1];
  const lastCandle = data[data.length - 1];
  const firstCandle = data[0];
  const netChange = (lastCandle?.close ?? lastCandle?.price) - (firstCandle?.open ?? firstCandle?.price);
  const netChangePercent = ((netChange / (firstCandle?.open ?? 1)) * 100).toFixed(2);
  const isOverallPositive = netChange >= 0;

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Convert mouseX from DOM pixel to viewBox scale
    const svgX = (mouseX / rect.width) * chartWidth;
    const svgY = (mouseY / rect.height) * actualChartHeight;

    setMousePos({ x: svgX, y: svgY });

    // Map X to candle index
    const relativeX = svgX - paddingLeft;
    const idx = Math.floor(relativeX / slotWidth);
    if (idx >= 0 && idx < candleCount) {
      setHoveredIndex(idx);
    } else {
      setHoveredIndex(null);
    }
  };

  const currentPrice = lastCandle.close ?? lastCandle.price;
  const currentY = getY(currentPrice);

  return (
    <div className="w-full flex flex-col font-mono text-xs select-none bg-[#09090b] border border-[#27272a] rounded p-2">
      {/* Real-time Day-Trading HUD Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#27272a] pb-2 mb-2">
        <div className="flex flex-wrap items-center gap-3 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="text-white font-bold text-xs uppercase tracking-wide">
              {hoveredCandle.time}
            </span>
            <span
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                isOverallPositive
                  ? 'bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30'
                  : 'bg-[#ef4444]/15 text-[#ef4444] border border-[#ef4444]/30'
              }`}
            >
              {isOverallPositive ? '+' : ''}
              {netChange.toFixed(2)} ({isOverallPositive ? '+' : ''}
              {netChangePercent}%)
            </span>
          </div>

          <div className="flex items-center gap-2 text-[#a1a1aa]">
            <span>
              O: <strong className="text-white">${(hoveredCandle.open ?? hoveredCandle.price).toFixed(2)}</strong>
            </span>
            <span>
              H: <strong className="text-[#10b981]">${(hoveredCandle.high ?? hoveredCandle.price).toFixed(2)}</strong>
            </span>
            <span>
              L: <strong className="text-[#ef4444]">${(hoveredCandle.low ?? hoveredCandle.price).toFixed(2)}</strong>
            </span>
            <span>
              C: <strong className="text-white">${(hoveredCandle.close ?? hoveredCandle.price).toFixed(2)}</strong>
            </span>
            <span className="hidden sm:inline text-[#71717a]">
              Vol: {(hoveredCandle.volume ?? 0).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Technical Indicator Toggles */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin py-0.5">
          <button
            onClick={() => setEnableEma9(!enableEma9)}
            className={`px-1.5 py-0.5 text-[9px] font-bold border transition-colors cursor-pointer ${
              enableEma9
                ? 'bg-[#a855f7]/20 text-[#c084fc] border-[#a855f7]'
                : 'bg-[#18181b] text-[#71717a] border-[#27272a]'
            }`}
          >
            EMA(9)
          </button>
          <button
            onClick={() => setEnableSma20(!enableSma20)}
            className={`px-1.5 py-0.5 text-[9px] font-bold border transition-colors cursor-pointer ${
              enableSma20
                ? 'bg-[#eab308]/20 text-[#fde047] border-[#eab308]'
                : 'bg-[#18181b] text-[#71717a] border-[#27272a]'
            }`}
          >
            SMA(20)
          </button>
          <button
            onClick={() => setEnableSma50(!enableSma50)}
            className={`px-1.5 py-0.5 text-[9px] font-bold border transition-colors cursor-pointer ${
              enableSma50
                ? 'bg-[#3b82f6]/20 text-[#60a5fa] border-[#3b82f6]'
                : 'bg-[#18181b] text-[#71717a] border-[#27272a]'
            }`}
          >
            SMA(50)
          </button>
          <button
            onClick={() => setEnableBollinger(!enableBollinger)}
            className={`px-1.5 py-0.5 text-[9px] font-bold border transition-colors cursor-pointer ${
              enableBollinger
                ? 'bg-[#06b6d4]/20 text-[#22d3ee] border-[#06b6d4]'
                : 'bg-[#18181b] text-[#71717a] border-[#27272a]'
            }`}
          >
            BOLL
          </button>
          <button
            onClick={() => setEnableRsi(!enableRsi)}
            className={`px-1.5 py-0.5 text-[9px] font-bold border transition-colors cursor-pointer ${
              enableRsi
                ? 'bg-[#f43f5e]/20 text-[#fb7185] border-[#f43f5e]'
                : 'bg-[#18181b] text-[#71717a] border-[#27272a]'
            }`}
          >
            RSI(14)
          </button>
          <button
            onClick={() => setEnableVolume(!enableVolume)}
            className={`px-1.5 py-0.5 text-[9px] font-bold border transition-colors cursor-pointer ${
              enableVolume
                ? 'bg-[#10b981]/20 text-[#34d399] border-[#10b981]'
                : 'bg-[#18181b] text-[#71717a] border-[#27272a]'
            }`}
          >
            VOL
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-[#71717a] hover:text-white transition-colors cursor-pointer"
            title={isExpanded ? 'Collapse Chart' : 'Expand Chart'}
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Indicator Reading Strip */}
      <div className="flex flex-wrap items-center gap-3 text-[10px] text-[#71717a] mb-1 px-1 font-mono">
        {enableEma9 && hoveredCandle.ema9 && (
          <span className="flex items-center gap-1 text-[#c084fc]">
            <span className="w-2 h-0.5 bg-[#a855f7] inline-block"></span> EMA(9): ${hoveredCandle.ema9.toFixed(2)}
          </span>
        )}
        {enableSma20 && hoveredCandle.sma20 && (
          <span className="flex items-center gap-1 text-[#fde047]">
            <span className="w-2 h-0.5 bg-[#eab308] inline-block"></span> SMA(20): ${hoveredCandle.sma20.toFixed(2)}
          </span>
        )}
        {enableSma50 && hoveredCandle.sma50 && (
          <span className="flex items-center gap-1 text-[#60a5fa]">
            <span className="w-2 h-0.5 bg-[#3b82f6] inline-block"></span> SMA(50): ${hoveredCandle.sma50.toFixed(2)}
          </span>
        )}
        {enableBollinger && hoveredCandle.bollingerUpper && (
          <span className="flex items-center gap-1 text-[#22d3ee]">
            BOLL: U[${hoveredCandle.bollingerUpper.toFixed(2)}] L[${(hoveredCandle.bollingerLower ?? 0).toFixed(2)}]
          </span>
        )}
        {enableRsi && hoveredCandle.rsi14 !== undefined && (
          <span className={`flex items-center gap-1 font-bold ${
            hoveredCandle.rsi14 >= 70 ? 'text-[#ef4444]' : hoveredCandle.rsi14 <= 30 ? 'text-[#10b981]' : 'text-[#a1a1aa]'
          }`}>
            RSI(14): {hoveredCandle.rsi14.toFixed(1)}
          </span>
        )}
      </div>

      {/* Main SVG Day Trading Canvas */}
      <div
        className="relative w-full bg-[#0d0e12] border border-[#27272a] rounded overflow-hidden"
        style={{ minHeight: `${actualChartHeight}px`, height: `${actualChartHeight}px` }}
      >
        <svg
          ref={svgRef}
          viewBox={`0 0 ${chartWidth} ${actualChartHeight}`}
          preserveAspectRatio="none"
          className="w-full h-full block cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            setHoveredIndex(null);
            setMousePos(null);
          }}
        >
          {/* Horizontal Grid Lines & Y-Axis Labels */}
          {gridPrices.map((price, i) => {
            const y = getY(price);
            return (
              <g key={`grid-${i}`}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={chartWidth - paddingRight}
                  y2={y}
                  stroke="#1e222d"
                  strokeDasharray="2 2"
                />
                <text
                  x={chartWidth - paddingRight + 8}
                  y={y + 3}
                  fill="#71717a"
                  fontSize={9}
                  textAnchor="start"
                  fontFamily="monospace"
                >
                  ${price.toFixed(2)}
                </text>
              </g>
            );
          })}

          {/* Bollinger Bands Cloud Overlay */}
          {enableBollinger && (
            <path
              d={getBollingerCloud()}
              fill="#06b6d4"
              fillOpacity={0.07}
              stroke="none"
            />
          )}

          {/* Bollinger Upper & Lower Lines */}
          {enableBollinger && (
            <>
              <path
                d={getLinePath('bollingerUpper')}
                fill="none"
                stroke="#06b6d4"
                strokeWidth={1}
                strokeDasharray="3 3"
                opacity={0.7}
              />
              <path
                d={getLinePath('bollingerLower')}
                fill="none"
                stroke="#06b6d4"
                strokeWidth={1}
                strokeDasharray="3 3"
                opacity={0.7}
              />
            </>
          )}

          {/* Render Candlesticks (Detailed Wicks + Bodies) */}
          {data.map((d, idx) => {
            const open = d.open ?? d.price;
            const high = d.high ?? Math.max(open, d.price);
            const low = d.low ?? Math.min(open, d.price);
            const close = d.close ?? d.price;

            const isBullish = close >= open;
            const candleColor = isBullish ? '#10b981' : '#ef4444';

            const cx = paddingLeft + idx * slotWidth + slotWidth / 2;
            const yHigh = getY(high);
            const yLow = getY(low);
            const yOpen = getY(open);
            const yClose = getY(close);

            const bodyTop = Math.min(yOpen, yClose);
            const bodyHeight = Math.max(1.5, Math.abs(yOpen - yClose));
            const isDoji = Math.abs(open - close) <= 0.05;

            return (
              <g key={`candle-${idx}`}>
                {/* Upper and Lower Wick Line (Full High to Low Range) */}
                <line
                  x1={cx}
                  y1={yHigh}
                  x2={cx}
                  y2={yLow}
                  stroke={candleColor}
                  strokeWidth={1.2}
                />

                {/* Candle Body Rect or Doji Cross */}
                {isDoji ? (
                  <line
                    x1={cx - candleWidth / 2}
                    y1={yOpen}
                    x2={cx + candleWidth / 2}
                    y2={yOpen}
                    stroke={candleColor}
                    strokeWidth={1.5}
                  />
                ) : (
                  <rect
                    x={cx - candleWidth / 2}
                    y={bodyTop}
                    width={candleWidth}
                    height={bodyHeight}
                    fill={isBullish ? '#10b981' : '#ef4444'}
                    stroke={candleColor}
                    strokeWidth={0.5}
                    rx={0.5}
                  />
                )}

                {/* Time X-Axis Stamp for select interval candles */}
                {idx % Math.ceil(candleCount / 7) === 0 && (
                  <g key={`time-${idx}`}>
                    <line
                      x1={cx}
                      y1={mainChartHeight - paddingBottom}
                      x2={cx}
                      y2={mainChartHeight - paddingBottom + 4}
                      stroke="#3f3f46"
                    />
                    <text
                      x={cx}
                      y={mainChartHeight - 8}
                      fill="#71717a"
                      fontSize={8}
                      textAnchor="middle"
                      fontFamily="monospace"
                    >
                      {d.time}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Technical Moving Average Overlays */}
          {enableEma9 && (
            <path
              d={getLinePath('ema9')}
              fill="none"
              stroke="#a855f7"
              strokeWidth={1.5}
              strokeLinecap="round"
            />
          )}

          {enableSma20 && (
            <path
              d={getLinePath('sma20')}
              fill="none"
              stroke="#eab308"
              strokeWidth={1.5}
              strokeLinecap="round"
            />
          )}

          {enableSma50 && (
            <path
              d={getLinePath('sma50')}
              fill="none"
              stroke="#3b82f6"
              strokeWidth={1.5}
              strokeLinecap="round"
            />
          )}

          {/* Volume Histogram Panel at Bottom of Main Chart */}
          {enableVolume &&
            data.map((d, idx) => {
              const open = d.open ?? d.price;
              const close = d.close ?? d.price;
              const isBullish = close >= open;
              const volColor = isBullish ? '#10b981' : '#ef4444';

              const maxVol = Math.max(...data.map((v) => v.volume ?? 10000));
              const volMaxHeight = 35;
              const volHeight = Math.max(2, ((d.volume ?? 5000) / maxVol) * volMaxHeight);
              const cx = paddingLeft + idx * slotWidth + slotWidth / 2;
              const yVol = mainChartHeight - paddingBottom - volHeight;

              return (
                <rect
                  key={`vol-${idx}`}
                  x={cx - candleWidth / 2}
                  y={yVol}
                  width={candleWidth}
                  height={volHeight}
                  fill={volColor}
                  opacity={0.35}
                />
              );
            })}

          {/* Live Current Price Horizontal Dashed Line & Badge */}
          <line
            x1={paddingLeft}
            y1={currentY}
            x2={chartWidth - paddingRight}
            y2={currentY}
            stroke={isOverallPositive ? '#10b981' : '#ef4444'}
            strokeDasharray="3 3"
            strokeWidth={1}
            opacity={0.8}
          />

          {/* Live Price Tag Badge on Y-Axis */}
          <g transform={`translate(${chartWidth - paddingRight}, ${currentY - 8})`}>
            <rect
              x={0}
              y={0}
              width={60}
              height={16}
              fill={isOverallPositive ? '#10b981' : '#ef4444'}
              rx={2}
            />
            <text
              x={30}
              y={11}
              fill="#09090b"
              fontSize={9}
              fontWeight="bold"
              textAnchor="middle"
              fontFamily="monospace"
            >
              ${currentPrice.toFixed(2)}
            </text>
          </g>

          {/* RSI Oscillator Sub-Chart Panel */}
          {enableRsi && (
            <g transform={`translate(0, ${mainChartHeight})`}>
              {/* Divider Line */}
              <line
                x1={paddingLeft}
                y1={0}
                x2={chartWidth - paddingRight}
                y2={0}
                stroke="#27272a"
              />

              {/* Sub-chart Label */}
              <text x={paddingLeft + 4} y={12} fill="#71717a" fontSize={8} fontFamily="monospace">
                RSI (14)
              </text>

              {/* 70 Overbought Line */}
              <line
                x1={paddingLeft}
                y1={10 + (1 - 0.7) * 40}
                x2={chartWidth - paddingRight}
                y2={10 + (1 - 0.7) * 40}
                stroke="#ef4444"
                strokeDasharray="2 2"
                opacity={0.5}
              />
              <text
                x={chartWidth - paddingRight + 4}
                y={10 + (1 - 0.7) * 40 + 3}
                fill="#ef4444"
                fontSize={8}
              >
                70
              </text>

              {/* 30 Oversold Line */}
              <line
                x1={paddingLeft}
                y1={10 + (1 - 0.3) * 40}
                x2={chartWidth - paddingRight}
                y2={10 + (1 - 0.3) * 40}
                stroke="#10b981"
                strokeDasharray="2 2"
                opacity={0.5}
              />
              <text
                x={chartWidth - paddingRight + 4}
                y={10 + (1 - 0.3) * 40 + 3}
                fill="#10b981"
                fontSize={8}
              >
                30
              </text>

              {/* RSI Curve */}
              <path
                d={getRsiPath()}
                fill="none"
                stroke="#f43f5e"
                strokeWidth={1.2}
              />
            </g>
          )}

          {/* Dynamic 2D Day Trading Crosshair Cursor */}
          {mousePos && mousePos.x >= paddingLeft && mousePos.x <= chartWidth - paddingRight && (
            <g key="crosshair">
              {/* Vertical Crosshair Line */}
              <line
                x1={mousePos.x}
                y1={paddingTop}
                x2={mousePos.x}
                y2={actualChartHeight - 15}
                stroke="#eab308"
                strokeWidth={0.8}
                strokeDasharray="3 3"
              />

              {/* Horizontal Crosshair Line */}
              {mousePos.y >= paddingTop && mousePos.y <= mainChartHeight - paddingBottom && (
                <>
                  <line
                    x1={paddingLeft}
                    y1={mousePos.y}
                    x2={chartWidth - paddingRight}
                    y2={mousePos.y}
                    stroke="#eab308"
                    strokeWidth={0.8}
                    strokeDasharray="3 3"
                  />

                  {/* Cursor Price Badge on Y-Axis */}
                  <g transform={`translate(${chartWidth - paddingRight}, ${mousePos.y - 8})`}>
                    <rect x={0} y={0} width={58} height={16} fill="#eab308" rx={2} />
                    <text
                      x={29}
                      y={11}
                      fill="#09090b"
                      fontSize={9}
                      fontWeight="bold"
                      textAnchor="middle"
                      fontFamily="monospace"
                    >
                      ${getPriceFromY(mousePos.y).toFixed(2)}
                    </text>
                  </g>
                </>
              )}

              {/* Cursor Time Badge on X-Axis */}
              {hoveredCandle && (
                <g transform={`translate(${mousePos.x - 25}, ${mainChartHeight - paddingBottom})`}>
                  <rect x={0} y={0} width={50} height={14} fill="#27272a" rx={2} />
                  <text
                    x={25}
                    y={10}
                    fill="#eab308"
                    fontSize={8}
                    fontWeight="bold"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    {hoveredCandle.time}
                  </text>
                </g>
              )}
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};
