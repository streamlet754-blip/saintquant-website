"use client"

import { useState, useEffect } from "react"
import { Play, Pause, AlertTriangle, TrendingUp, TrendingDown, Activity, DollarSign } from "lucide-react"

interface PriceData {
  instrument: string
  bid: number
  ask: number
  change: number
  changePercent: number
}

interface Position {
  id: string
  instrument: string
  side: 'BUY' | 'SELL'
  entryPrice: number
  currentPrice: number
  lotSize: number
  pnl: number
  stopLoss: number
  takeProfit: number
}

interface TradingSignal {
  instrument: string
  action: 'BUY' | 'SELL' | 'HOLD'
  confidence: number
  entryPrice: number
  stopLoss: number
  takeProfit: number
  reason: string
}

export default function TradingDashboard() {
  const [isConnected, setIsConnected] = useState(false)
  const [isBotRunning, setIsBotRunning] = useState(false)
  const [prices, setPrices] = useState<PriceData[]>([])
  const [positions, setPositions] = useState<Position[]>([])
  const [signals, setSignals] = useState<TradingSignal[]>([])
  const [dailyPnL, setDailyPnL] = useState(0)
  const [emergencyStop, setEmergencyStop] = useState(false)

  // Simulated price updates (replace with real TradeLocker WebSocket)
  useEffect(() => {
    const instruments = ['NAS100', 'WAVES', 'NKJPY']
    const simulatedPrices: PriceData[] = instruments.map(inst => ({
      instrument: inst,
      bid: 15000 + Math.random() * 1000,
      ask: 15000 + Math.random() * 1000 + 10,
      change: (Math.random() - 0.5) * 100,
      changePercent: (Math.random() - 0.5) * 2
    }))
    setPrices(simulatedPrices)

    const interval = setInterval(() => {
      setPrices(prev => prev.map(p => ({
        ...p,
        bid: p.bid + (Math.random() - 0.5) * 5,
        ask: p.ask + (Math.random() - 0.5) * 5,
        change: p.change + (Math.random() - 0.5) * 2,
        changePercent: p.changePercent + (Math.random() - 0.5) * 0.1
      })))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleConnect = async () => {
    // Implement TradeLocker authentication
    setIsConnected(true)
  }

  const handleToggleBot = () => {
    if (emergencyStop) {
      alert('Emergency stop is active. Cannot start bot.')
      return
    }
    setIsBotRunning(!isBotRunning)
  }

  const handleEmergencyStop = () => {
    setEmergencyStop(true)
    setIsBotRunning(false)
    // Implement emergency stop logic
  }

  const handleResetEmergency = () => {
    setEmergencyStop(false)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              SaintQuant Trading Bot
            </h1>
            <p className="text-gray-400 mt-1">Account: L#826884 | Server: CRUC</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className={`px-4 py-2 rounded-lg ${isConnected ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
              {isConnected ? '● Connected' : '○ Disconnected'}
            </div>
            
            {!isConnected ? (
              <button
                onClick={handleConnect}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
              >
                Connect
              </button>
            ) : (
              <>
                <button
                  onClick={handleToggleBot}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    isBotRunning
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  {isBotRunning ? (
                    <>
                      <Pause className="inline w-4 h-4 mr-2" />
                      Stop Bot
                    </>
                  ) : (
                    <>
                      <Play className="inline w-4 h-4 mr-2" />
                      Start Bot
                    </>
                  )}
                </button>
                
                <button
                  onClick={handleEmergencyStop}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
                >
                  <AlertTriangle className="inline w-4 h-4 mr-2" />
                  Emergency Stop
                </button>
              </>
            )}
          </div>
        </div>

        {/* Emergency Stop Alert */}
        {emergencyStop && (
          <div className="bg-red-500/20 border border-red-500 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                <div>
                  <p className="font-semibold text-red-400">EMERGENCY STOP ACTIVE</p>
                  <p className="text-sm text-gray-400">All trading has been halted</p>
                </div>
              </div>
              <button
                onClick={handleResetEmergency}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors"
              >
                Reset Emergency Stop
              </button>
            </div>
          </div>
        )}

        {/* Risk Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <DollarSign className="w-4 h-4" />
              <span>Daily P&L</span>
            </div>
            <p className={`text-2xl font-bold mt-2 ${dailyPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ${dailyPnL.toFixed(2)}
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <Activity className="w-4 h-4" />
              <span>Open Positions</span>
            </div>
            <p className="text-2xl font-bold mt-2">{positions.length}</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>Max Lot Size</span>
            </div>
            <p className="text-2xl font-bold mt-2">0.01</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>Stop Loss</span>
            </div>
            <p className="text-2xl font-bold mt-2">$1.50</p>
          </div>
        </div>

        {/* Price Grid */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Live Prices</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {prices.map((price) => (
              <div key={price.instrument} className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{price.instrument}</h3>
                  <span className={`text-sm ${price.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {price.change >= 0 ? '+' : ''}{price.change.toFixed(2)}
                    ({price.changePercent >= 0 ? '+' : ''}{price.changePercent.toFixed(2)}%)
                  </span>
                </div>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Bid:</span>
                    <span>{price.bid.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Ask:</span>
                    <span>{price.ask.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trading Signals */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Trading Signals</h2>
          <div className="space-y-3">
            {signals.length === 0 ? (
              <p className="text-gray-400 text-center py-4">No active signals</p>
            ) : (
              signals.map((signal, index) => (
                <div key={index} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {signal.action === 'BUY' ? (
                        <TrendingUp className="w-5 h-5 text-green-400" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-400" />
                      )}
                      <div>
                        <p className="font-semibold">{signal.instrument}</p>
                        <p className="text-sm text-gray-400">{signal.reason}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${signal.action === 'BUY' ? 'text-green-400' : 'text-red-400'}`}>
                        {signal.action}
                      </p>
                      <p className="text-sm text-gray-400">Confidence: {(signal.confidence * 100).toFixed(0)}%</p>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Entry:</span>
                      <span className="ml-2">{signal.entryPrice.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">SL:</span>
                      <span className="ml-2 text-red-400">{signal.stopLoss.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">TP:</span>
                      <span className="ml-2 text-green-400">{signal.takeProfit.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Open Positions */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Open Positions</h2>
          <div className="space-y-3">
            {positions.length === 0 ? (
              <p className="text-gray-400 text-center py-4">No open positions</p>
            ) : (
              positions.map((position) => (
                <div key={position.id} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {position.side === 'BUY' ? (
                        <TrendingUp className="w-5 h-5 text-green-400" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-400" />
                      )}
                      <div>
                        <p className="font-semibold">{position.instrument}</p>
                        <p className="text-sm text-gray-400">
                          {position.side} @ {position.entryPrice.toFixed(2)} | {position.lotSize} lots
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${position.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        ${position.pnl.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-400">
                        SL: {position.stopLoss.toFixed(2)} | TP: {position.takeProfit.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
