// Trading Strategy Engine
// Implements Grid, RSI, and EMA strategies for forex/indices trading

export interface TradingSignal {
  instrument: string
  action: 'BUY' | 'SELL' | 'HOLD'
  confidence: number
  entryPrice: number
  stopLoss: number
  takeProfit: number
  reason: string
}

export interface StrategyConfig {
  maxLotSize: number
  stopLossUSD: number
  riskRewardMin: number
  riskRewardMax: number
}

export class TradingStrategyEngine {
  private config: StrategyConfig

  constructor(config: StrategyConfig) {
    this.config = config
  }

  // Grid Strategy - Buy low, sell high in a range
  gridStrategy(
    currentPrice: number,
    lowerBound: number,
    upperBound: number,
    gridLevels: number = 5
  ): TradingSignal | null {
    const gridSpacing = (upperBound - lowerBound) / gridLevels
    const currentLevel = Math.floor((currentPrice - lowerBound) / gridSpacing)

    if (currentLevel <= 1) {
      // Near lower bound - buy signal
      const stopLoss = currentPrice - this.config.stopLossUSD
      const takeProfit = currentPrice + (this.config.stopLossUSD * this.getRiskRewardRatio())
      
      return {
        instrument: 'GRID',
        action: 'BUY',
        confidence: 0.7,
        entryPrice: currentPrice,
        stopLoss,
        takeProfit,
        reason: 'Price near lower grid bound - buy signal'
      }
    } else if (currentLevel >= gridLevels - 1) {
      // Near upper bound - sell signal
      const stopLoss = currentPrice + this.config.stopLossUSD
      const takeProfit = currentPrice - (this.config.stopLossUSD * this.getRiskRewardRatio())
      
      return {
        instrument: 'GRID',
        action: 'SELL',
        confidence: 0.7,
        entryPrice: currentPrice,
        stopLoss,
        takeProfit,
        reason: 'Price near upper grid bound - sell signal'
      }
    }

    return null
  }

  // RSI Mean Reversion Strategy
  rsiStrategy(
    currentPrice: number,
    rsi: number,
    oversoldThreshold: number = 30,
    overboughtThreshold: number = 70
  ): TradingSignal | null {
    if (rsi < oversoldThreshold) {
      // Oversold - buy signal
      const stopLoss = currentPrice - this.config.stopLossUSD
      const takeProfit = currentPrice + (this.config.stopLossUSD * this.getRiskRewardRatio())
      
      return {
        instrument: 'RSI',
        action: 'BUY',
        confidence: Math.min(0.9, (oversoldThreshold - rsi) / 20),
        entryPrice: currentPrice,
        stopLoss,
        takeProfit,
        reason: `RSI oversold (${rsi.toFixed(2)}) - buy signal`
      }
    } else if (rsi > overboughtThreshold) {
      // Overbought - sell signal
      const stopLoss = currentPrice + this.config.stopLossUSD
      const takeProfit = currentPrice - (this.config.stopLossUSD * this.getRiskRewardRatio())
      
      return {
        instrument: 'RSI',
        action: 'SELL',
        confidence: Math.min(0.9, (rsi - overboughtThreshold) / 20),
        entryPrice: currentPrice,
        stopLoss,
        takeProfit,
        reason: `RSI overbought (${rsi.toFixed(2)}) - sell signal`
      }
    }

    return null
  }

  // EMA Crossover Strategy
  emaStrategy(
    currentPrice: number,
    shortEMA: number,
    longEMA: number,
    previousShortEMA: number,
    previousLongEMA: number
  ): TradingSignal | null {
    const previousCross = previousShortEMA > previousLongEMA
    const currentCross = shortEMA > longEMA

    if (!previousCross && currentCross) {
      // Golden cross - buy signal
      const stopLoss = currentPrice - this.config.stopLossUSD
      const takeProfit = currentPrice + (this.config.stopLossUSD * this.getRiskRewardRatio())
      
      return {
        instrument: 'EMA',
        action: 'BUY',
        confidence: 0.8,
        entryPrice: currentPrice,
        stopLoss,
        takeProfit,
        reason: 'EMA golden cross - buy signal'
      }
    } else if (previousCross && !currentCross) {
      // Death cross - sell signal
      const stopLoss = currentPrice + this.config.stopLossUSD
      const takeProfit = currentPrice - (this.config.stopLossUSD * this.getRiskRewardRatio())
      
      return {
        instrument: 'EMA',
        action: 'SELL',
        confidence: 0.8,
        entryPrice: currentPrice,
        stopLoss,
        takeProfit,
        reason: 'EMA death cross - sell signal'
      }
    }

    return null
  }

  // Calculate EMA
  calculateEMA(prices: number[], period: number): number {
    const k = 2 / (period + 1)
    let ema = prices[0]
    
    for (let i = 1; i < prices.length; i++) {
      ema = prices[i] * k + ema * (1 - k)
    }
    
    return ema
  }

  // Calculate RSI
  calculateRSI(prices: number[], period: number = 14): number {
    if (prices.length < period + 1) return 50

    let gains = 0
    let losses = 0

    for (let i = 1; i <= period; i++) {
      const change = prices[i] - prices[i - 1]
      if (change > 0) {
        gains += change
      } else {
        losses -= change
      }
    }

    const avgGain = gains / period
    const avgLoss = losses / period

    if (avgLoss === 0) return 100

    const rs = avgGain / avgLoss
    const rsi = 100 - (100 / (1 + rs))

    return rsi
  }

  // Get random risk/reward ratio between min and max
  private getRiskRewardRatio(): number {
    const min = this.config.riskRewardMin
    const max = this.config.riskRewardMax
    return Math.random() * (max - min) + min
  }

  // Validate order parameters
  validateOrder(lotSize: number): boolean {
    return lotSize <= this.config.maxLotSize
  }
}

export function createStrategyEngine(config: StrategyConfig): TradingStrategyEngine {
  return new TradingStrategyEngine(config)
}
