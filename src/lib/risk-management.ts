// Risk Management System
// Handles position sizing, stop-loss, take-profit, and emergency stops

export interface RiskParameters {
  maxLotSize: number
  stopLossUSD: number
  riskRewardMin: number
  riskRewardMax: number
  dailyLossLimit: number
  maxOpenPositions: number
}

export interface Position {
  id: string
  instrument: string
  entryPrice: number
  currentPrice: number
  lotSize: number
  stopLoss: number
  takeProfit: number
  pnl: number
  side: 'BUY' | 'SELL'
}

export class RiskManager {
  private params: RiskParameters
  private dailyPnL: number = 0
  private openPositions: Map<string, Position> = new Map()
  private emergencyStopActive: boolean = false

  constructor(params: RiskParameters) {
    this.params = params
  }

  // Check if trading is allowed based on risk parameters
  canOpenPosition(): boolean {
    if (this.emergencyStopActive) {
      return false
    }

    if (this.dailyPnL <= -this.params.dailyLossLimit) {
      console.warn('Daily loss limit reached - trading halted')
      return false
    }

    if (this.openPositions.size >= this.params.maxOpenPositions) {
      console.warn('Maximum open positions reached')
      return false
    }

    return true
  }

  // Validate order before execution
  validateOrder(lotSize: number, stopLoss: number, takeProfit: number): boolean {
    if (lotSize > this.params.maxLotSize) {
      console.error(`Lot size ${lotSize} exceeds maximum ${this.params.maxLotSize}`)
      return false
    }

    const riskRewardRatio = Math.abs(takeProfit - stopLoss) / this.params.stopLossUSD
    if (riskRewardRatio < this.params.riskRewardMin || riskRewardRatio > this.params.riskRewardMax) {
      console.error(`Risk/reward ratio ${riskRewardRatio.toFixed(2)} outside allowed range`)
      return false
    }

    return true
  }

  // Calculate position size based on risk
  calculatePositionSize(entryPrice: number, stopLoss: number): number {
    const riskPerLot = Math.abs(entryPrice - stopLoss)
    const maxRisk = this.params.stopLossUSD
    
    if (riskPerLot === 0) return this.params.maxLotSize
    
    const lotSize = Math.min(maxRisk / riskPerLot, this.params.maxLotSize)
    return Math.max(0.01, Math.floor(lotSize * 100) / 100) // Round to 2 decimal places, minimum 0.01
  }

  // Calculate stop-loss price
  calculateStopLoss(entryPrice: number, side: 'BUY' | 'SELL'): number {
    if (side === 'BUY') {
      return entryPrice - this.params.stopLossUSD
    } else {
      return entryPrice + this.params.stopLossUSD
    }
  }

  // Calculate take-profit price
  calculateTakeProfit(entryPrice: number, side: 'BUY' | 'SELL'): number {
    const riskRewardRatio = this.params.riskRewardMin + Math.random() * (this.params.riskRewardMax - this.params.riskRewardMin)
    
    if (side === 'BUY') {
      return entryPrice + (this.params.stopLossUSD * riskRewardRatio)
    } else {
      return entryPrice - (this.params.stopLossUSD * riskRewardRatio)
    }
  }

  // Track position
  addPosition(position: Position): void {
    this.openPositions.set(position.id, position)
  }

  // Remove position
  removePosition(positionId: string): void {
    const position = this.openPositions.get(positionId)
    if (position) {
      this.dailyPnL += position.pnl
      this.openPositions.delete(positionId)
    }
  }

  // Update position P&L
  updatePositionPnL(positionId: string, currentPrice: number): void {
    const position = this.openPositions.get(positionId)
    if (position) {
      position.currentPrice = currentPrice
      
      if (position.side === 'BUY') {
        position.pnl = (currentPrice - position.entryPrice) * position.lotSize
      } else {
        position.pnl = (position.entryPrice - currentPrice) * position.lotSize
      }
    }
  }

  // Check if any position hit stop-loss or take-profit
  checkExitSignals(positionId: string): { shouldExit: boolean; reason: string } {
    const position = this.openPositions.get(positionId)
    if (!position) {
      return { shouldExit: false, reason: '' }
    }

    if (position.side === 'BUY') {
      if (position.currentPrice <= position.stopLoss) {
        return { shouldExit: true, reason: 'Stop-loss hit' }
      }
      if (position.currentPrice >= position.takeProfit) {
        return { shouldExit: true, reason: 'Take-profit hit' }
      }
    } else {
      if (position.currentPrice >= position.stopLoss) {
        return { shouldExit: true, reason: 'Stop-loss hit' }
      }
      if (position.currentPrice <= position.takeProfit) {
        return { shouldExit: true, reason: 'Take-profit hit' }
      }
    }

    return { shouldExit: false, reason: '' }
  }

  // Activate emergency stop
  activateEmergencyStop(): void {
    this.emergencyStopActive = true
    console.warn('EMERGENCY STOP ACTIVATED - All trading halted')
  }

  // Deactivate emergency stop
  deactivateEmergencyStop(): void {
    this.emergencyStopActive = false
    console.info('Emergency stop deactivated - trading resumed')
  }

  // Get current risk status
  getRiskStatus(): {
    canTrade: boolean
    dailyPnL: number
    openPositions: number
    emergencyStop: boolean
  } {
    return {
      canTrade: this.canOpenPosition(),
      dailyPnL: this.dailyPnL,
      openPositions: this.openPositions.size,
      emergencyStop: this.emergencyStopActive
    }
  }

  // Get all open positions
  getOpenPositions(): Position[] {
    return Array.from(this.openPositions.values())
  }

  // Reset daily P&L (call at start of new trading day)
  resetDailyPnL(): void {
    this.dailyPnL = 0
  }
}

export function createRiskManager(params: RiskParameters): RiskManager {
  return new RiskManager(params)
}
