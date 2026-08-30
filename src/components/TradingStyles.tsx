export default function TradingStyles() {
  const styles = [
    {
      name: "Grid",
      description: "Buy toward the lower bound of a range, sell toward the upper bound. Works best in sideways, oscillating markets.",
      icon: "📊",
    },
    {
      name: "RSI mean reversion",
      description: "Enter when the Relative Strength Index suggests oversold conditions; exit when it suggests overbought. Suited to ranging or mildly trending pairs.",
      icon: "📈",
    },
    {
      name: "EMA crossover",
      description: "Golden cross (short EMA above long EMA) for entries; death cross for exits. Classic trend-following on higher timeframes.",
      icon: "🔄",
    },
    {
      name: "Market making",
      description: "Places bid and ask quotes around mid-price to earn spread. Needs low fees, fast connectivity, and careful inventory risk management.",
      icon: "💹",
    },
    {
      name: "Arbitrage",
      description: "Exploits price differences across venues or instruments. Technically demanding and sensitive to latency and capital locks.",
      icon: "⚡",
    },
    {
      name: "Breakout / momentum",
      description: "Enters when price clears a volatility band or structure level. Fits strong trends; false breakouts are the main risk.",
      icon: "🚀",
    },
  ]

  return (
    <section id="strategies" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trading Styles
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Common patterns for different market conditions
          </p>
          <p className="text-gray-500 mt-2">
            Different market conditions favour different ideas. Below are common rule-based styles people use with trading bots; the included CLI ships starter templates for Grid, RSI, and EMA.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {styles.map((style, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all group"
            >
              <div className="text-4xl mb-4">{style.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {style.name}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {style.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
