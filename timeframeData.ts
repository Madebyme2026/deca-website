import { PricePoint, StockCatalogItem } from '../types/financial';

export type TimeFrameOption =
  | '1m'
  | '5m'
  | '15m'
  | '1h'
  | '1D'
  | '1W'
  | '1M'
  | '6M'
  | '1Y'
  | '5Y'
  | 'ALL';

export const TIMEFRAME_LABELS: Record<TimeFrameOption, string> = {
  '1m': '1 Minute',
  '5m': '5 Minutes',
  '15m': '15 Minutes',
  '1h': '1 Hour',
  '1D': '1 Day',
  '1W': '1 Week',
  '1M': '1 Month',
  '6M': '6 Months',
  '1Y': '1 Year',
  '5Y': '5 Years',
  ALL: 'Overall (All Time)',
};

export const TIMEFRAME_OPTIONS: TimeFrameOption[] = [
  '1m',
  '5m',
  '15m',
  '1h',
  '1D',
  '1W',
  '1M',
  '6M',
  '1Y',
  '5Y',
  'ALL',
];

// Seeded pseudo-random generator for deterministic, high-quality chart curves
function createSeededRandom(seedString: string) {
  let hash = 0;
  for (let i = 0; i < seedString.length; i++) {
    hash = (hash << 5) - hash + seedString.charCodeAt(i);
    hash |= 0;
  }
  return function () {
    const x = Math.sin(hash++) * 10000;
    return x - Math.floor(x);
  };
}

export const getTimeframePriceHistory = (
  stock: StockCatalogItem,
  timeframe: TimeFrameOption
): PricePoint[] => {
  const currentPrice = stock.price;
  const high52 = stock.high52w || currentPrice * 1.25;
  const low52 = stock.low52w || currentPrice * 0.75;

  // If selecting '1m' and live price history exists, return live ticks enhanced with indicators
  if (timeframe === '1m' && stock.priceHistory && stock.priceHistory.length > 5) {
    return calculateTechnicalIndicators(stock.priceHistory);
  }

  const rand = createSeededRandom(`${stock.ticker}-${timeframe}`);

  let count = 60; // Higher density for detailed day-trading view
  let labelGenerator: (i: number, total: number) => string = (i) => `T-${i}`;
  let startPriceRatio = 0.95;
  let volatility = 0.008;

  switch (timeframe) {
    case '1m': {
      count = 60;
      volatility = 0.0025;
      startPriceRatio = 0.992;
      labelGenerator = (i) => {
        const totalSecs = i * 60;
        const hrs = 9 + Math.floor(totalSecs / 3600);
        const mins = Math.floor((totalSecs % 3600) / 60);
        const period = hrs >= 12 ? 'PM' : 'AM';
        const displayHrs = hrs > 12 ? hrs - 12 : hrs;
        return `${String(displayHrs).padStart(2, '0')}:${String(mins).padStart(2, '0')} ${period}`;
      };
      break;
    }
    case '5m': {
      count = 60;
      volatility = 0.005;
      startPriceRatio = 0.982;
      labelGenerator = (i) => {
        const totalMins = i * 5;
        const hrs = 9 + Math.floor(totalMins / 60);
        const mins = totalMins % 60;
        const period = hrs >= 12 ? 'PM' : 'AM';
        const displayHrs = hrs > 12 ? hrs - 12 : hrs;
        return `${String(displayHrs).padStart(2, '0')}:${String(mins).padStart(2, '0')} ${period}`;
      };
      break;
    }
    case '15m': {
      count = 55;
      volatility = 0.008;
      startPriceRatio = 0.97;
      labelGenerator = (i) => {
        const totalMins = i * 15;
        const hrs = 9 + Math.floor(totalMins / 60);
        const mins = totalMins % 60;
        const period = hrs >= 12 ? 'PM' : 'AM';
        const displayHrs = hrs > 12 ? hrs - 12 : hrs;
        return `${String(displayHrs).padStart(2, '0')}:${String(mins).padStart(2, '0')} ${period}`;
      };
      break;
    }
    case '1h': {
      count = 50;
      volatility = 0.012;
      startPriceRatio = 0.95;
      labelGenerator = (i) => {
        const hrs = (i * 2) % 24;
        return `${String(hrs).padStart(2, '0')}:00`;
      };
      break;
    }
    case '1D': {
      count = 60;
      volatility = 0.018;
      startPriceRatio = 0.91;
      const days = [
        'Jun 1', 'Jun 5', 'Jun 10', 'Jun 15', 'Jun 20', 'Jun 25', 'Jul 1', 'Jul 5',
        'Jul 10', 'Jul 15', 'Jul 20', 'Jul 25', 'Aug 1', 'Aug 5', 'Aug 9'
      ];
      labelGenerator = (i) => days[Math.floor((i / count) * days.length)] || `Day ${i + 1}`;
      break;
    }
    case '1W': {
      count = 52;
      volatility = 0.03;
      startPriceRatio = 0.86;
      labelGenerator = (i) => `Wk ${i + 1}`;
      break;
    }
    case '1M': {
      count = 48;
      volatility = 0.045;
      startPriceRatio = 0.80;
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      labelGenerator = (i) => {
        const mIndex = i % 12;
        const yr = 2023 + Math.floor(i / 12);
        return `${months[mIndex]} '${String(yr).slice(-2)}`;
      };
      break;
    }
    case '6M': {
      count = 50;
      volatility = 0.07;
      startPriceRatio = 0.72;
      labelGenerator = (i) => `M${(i % 12) + 1} '${String(2022 + Math.floor(i / 12)).slice(-2)}`;
      break;
    }
    case '1Y': {
      count = 52;
      volatility = 0.11;
      startPriceRatio = Math.max(0.35, low52 / currentPrice);
      labelGenerator = (i) => `Wk ${i + 1}`;
      break;
    }
    case '5Y': {
      count = 60;
      volatility = 0.15;
      startPriceRatio = Math.max(0.2, (low52 * 0.7) / currentPrice);
      labelGenerator = (i) => `${2021 + Math.floor(i / 12)}`;
      break;
    }
    case 'ALL': {
      count = 60;
      volatility = 0.20;
      startPriceRatio = Math.max(0.1, (low52 * 0.5) / currentPrice);
      labelGenerator = (i, total) => (i === 0 ? 'IPO' : i === total - 1 ? 'Now' : `'${String(1998 + Math.floor(i / 2)).slice(-2)}`);
      break;
    }
  }

  // Generate realistic price trajectory ending at currentPrice
  const rawPrices: number[] = [];
  let price = currentPrice * startPriceRatio;

  for (let i = 0; i < count; i++) {
    rawPrices.push(price);
    const progress = i / (count - 1);
    const targetTrend = price + (currentPrice - price) * (0.05 + progress * 0.25);
    const wave = Math.sin(i * 0.25) * volatility * currentPrice * 0.5;
    const delta = (rand() - 0.49) * volatility * currentPrice;
    price = Math.max(1, targetTrend + wave + delta);
  }

  // Ensure last candle closes exactly at current live stock price
  rawPrices[count - 1] = currentPrice;

  const points: PricePoint[] = rawPrices.map((p, idx) => {
    const isLast = idx === count - 1;
    const prevP = idx > 0 ? rawPrices[idx - 1] : p * 0.995;
    const delta = p - prevP;

    // Realistic Open / Close
    const open = Math.round((isLast ? currentPrice - delta * 0.2 : prevP) * 100) / 100;
    const close = Math.round(p * 100) / 100;
    const bodySpread = Math.abs(open - close);

    // Intrabar volatility for rich upper and lower wicks
    const baseWick = Math.max(0.15, currentPrice * volatility * 0.6);
    const randMultiplierUpper = rand();
    const randMultiplierLower = rand();

    // Occasional long wick patterns (pin bars, shooting stars, hammers)
    const isSpecialPattern = rand() > 0.85;
    const upperWickFactor = isSpecialPattern && rand() > 0.5 ? 3.2 : 1.2;
    const lowerWickFactor = isSpecialPattern && rand() <= 0.5 ? 3.2 : 1.2;

    const upperWick = (bodySpread * 0.6 + baseWick * randMultiplierUpper) * upperWickFactor;
    const lowerWick = (bodySpread * 0.6 + baseWick * randMultiplierLower) * lowerWickFactor;

    const high = Math.round(Math.min(high52 * 1.12, Math.max(open, close) + upperWick) * 100) / 100;
    const low = Math.round(Math.max(low52 * 0.4, Math.min(open, close) - lowerWick) * 100) / 100;
    const volume = Math.floor(15000 + rand() * 120000 + (isSpecialPattern ? 80000 : 0));

    return {
      time: labelGenerator(idx, count),
      tick: idx + 1,
      price: close,
      open,
      high,
      low,
      close,
      volume,
    };
  });

  return calculateTechnicalIndicators(points);
};

// Compute Moving Averages, Exponential Moving Averages, Bollinger Bands, and RSI
function calculateTechnicalIndicators(points: PricePoint[]): PricePoint[] {
  const periodSMA20 = 20;
  const periodSMA50 = 50;
  const periodEMA9 = 9;
  const periodRSI = 14;

  const emaK = 2 / (periodEMA9 + 1);
  let previousEMA9: number | null = null;

  return points.map((pt, idx) => {
    const close = pt.close ?? pt.price;

    // 20-period SMA & Bollinger Bands
    const start20 = Math.max(0, idx - (periodSMA20 - 1));
    const slice20 = points.slice(start20, idx + 1);
    const sum20 = slice20.reduce((s, p) => s + (p.close ?? p.price), 0);
    const sma20 = Math.round((sum20 / slice20.length) * 100) / 100;

    // Standard deviation for Bollinger Bands
    const variance20 =
      slice20.reduce((s, p) => s + Math.pow((p.close ?? p.price) - sma20, 2), 0) /
      slice20.length;
    const stdDev20 = Math.sqrt(variance20);
    const bollingerUpper = Math.round((sma20 + stdDev20 * 2) * 100) / 100;
    const bollingerLower = Math.round((sma20 - stdDev20 * 2) * 100) / 100;

    // 50-period SMA
    const start50 = Math.max(0, idx - (periodSMA50 - 1));
    const slice50 = points.slice(start50, idx + 1);
    const sum50 = slice50.reduce((s, p) => s + (p.close ?? p.price), 0);
    const sma50 = Math.round((sum50 / slice50.length) * 100) / 100;

    // 9-period EMA
    let ema9: number;
    if (previousEMA9 === null) {
      ema9 = close;
    } else {
      ema9 = close * emaK + previousEMA9 * (1 - emaK);
    }
    previousEMA9 = ema9;
    ema9 = Math.round(ema9 * 100) / 100;

    // 14-period RSI
    let rsi14 = 50;
    if (idx >= periodRSI) {
      const rsiSlice = points.slice(idx - periodRSI, idx + 1);
      let gains = 0;
      let losses = 0;
      for (let i = 1; i < rsiSlice.length; i++) {
        const change = (rsiSlice[i].close ?? rsiSlice[i].price) - (rsiSlice[i - 1].close ?? rsiSlice[i - 1].price);
        if (change >= 0) gains += change;
        else losses += Math.abs(change);
      }
      const avgGain = gains / periodRSI;
      const avgLoss = losses / periodRSI;
      if (avgLoss === 0) {
        rsi14 = 100;
      } else {
        const rs = avgGain / avgLoss;
        rsi14 = Math.round((100 - 100 / (1 + rs)) * 10) / 10;
      }
    }

    return {
      ...pt,
      sma20,
      sma50,
      ema9,
      rsi14,
      bollingerUpper,
      bollingerLower,
    };
  });
}
