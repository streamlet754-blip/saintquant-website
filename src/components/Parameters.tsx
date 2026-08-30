import { Settings, ShieldCheck, AlertTriangle } from "lucide-react"

export default function Parameters() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Parameters */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Settings className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Parameters</h2>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Typical settings</h3>
            <p className="text-gray-600 mb-6">
              Each built-in template shares basics like pair, timeframe, order type, position size, max open trades, stop-loss, take-profit, and optional trailing stop. Template-specific defaults (e.g. RSI thresholds, EMA periods, grid spacing) can be adjusted in the wizard.
            </p>

            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-gray-200">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Dry-run</p>
                  <p className="text-sm text-gray-600">Virtual balance, no real orders — ideal for learning.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-gray-200">
                <div className="w-2 h-2 mt-2 rounded-full bg-purple-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Sandbox</p>
                  <p className="text-sm text-gray-600">Exchange testnet with testnet API keys.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-gray-200">
                <div className="w-2 h-2 mt-2 rounded-full bg-green-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Live</p>
                  <p className="text-sm text-gray-600">Real funds; use only after thorough testing.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Highlights */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Security highlights</h2>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <p className="text-gray-700">
                  <span className="font-semibold text-gray-900">API secrets encrypted at rest</span> (Fernet); key derived from your machine ID.
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <p className="text-gray-700">
                  <span className="font-semibold text-gray-900">Temporary Freqtrade configs</span> with credentials are deleted right after the subprocess reads them.
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <p className="text-gray-700">
                  <span className="font-semibold text-gray-900">Config and database files</span> created with 600 permissions (owner read/write only).
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <p className="text-gray-700">
                  <span className="font-semibold text-gray-900">Raw credentials are never written</span> to logs.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600">
                  Reset wizard: <code className="bg-gray-200 px-1 rounded">saintbot-cli setup</code> — full wipe: <code className="bg-gray-200 px-1 rounded">saintbot-cli setup --reset</code>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Disclaimer */}
        <div className="mt-12 p-6 bg-yellow-50 rounded-xl border border-yellow-200">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Risk disclaimer</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Automated trading carries substantial risk of loss. Past backtests do not guarantee future results. This page is educational only and not investment advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
