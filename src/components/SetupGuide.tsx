export default function SetupGuide() {
  return (
    <section id="setup" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Setup
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Run a bot locally
          </p>
          <p className="text-gray-500 mt-2">
            Follow these steps on macOS, Linux, or Windows (WSL recommended for Freqtrade). Always start with dry-run or exchange sandbox before live trading.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Description */}
          <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-gray-700 leading-relaxed">
              This open-source CLI helper runs a local trading bot: it manages Freqtrade processes, talks to Freqtrade's REST API, and stores state in a local SQLite database — no separate web app or cloud database.
            </p>
          </div>

          {/* Prerequisites */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Prerequisites</h3>
            <p className="text-gray-600 mb-4">Install Python 3.10+ and Freqtrade.</p>
            <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
              <pre className="text-sm text-gray-100 font-mono">
                <code>{`python3 --version   # must be >= 3.10
pip install freqtrade
freqtrade --version`}</code>
              </pre>
            </div>
            <p className="text-gray-500 mt-2 text-sm">
              If freqtrade is not found, add ~/.local/bin to PATH (e.g. export in ~/.zshrc).
            </p>
          </div>

          {/* Install CLI */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Install the CLI</h3>
            <p className="text-gray-600 mb-4">
              Recommended: clone from GitHub and install locally in editable mode. PyPI remains optional when the package is published.
            </p>
            <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
              <pre className="text-sm text-gray-100 font-mono">
                <code>{`git clone https://github.com/SaintQuant/saintquant-crypto-trading-cli saintquant-crypto-trading-cli
cd saintquant-crypto-trading-cli && pip install -e .
# Optional (PyPI, when published): pip install saintquant-crypto-trading-cli
saintbot-cli --version`}</code>
              </pre>
            </div>
          </div>

          {/* First Launch */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">First launch</h3>
            <p className="text-gray-600 mb-4">
              Run the wizard; confirm the Freqtrade binary path and optional proxy for geo-restricted exchanges.
            </p>
            <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
              <pre className="text-sm text-gray-100 font-mono">
                <code>{`saintbot-cli`}</code>
              </pre>
            </div>
          </div>

          {/* Create Bot */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Create a bot</h3>
            <p className="text-gray-600 mb-4">
              From the menu, choose create bot: pick exchange, prefer Dry-run (paper) first, enter API keys if needed, select Grid / RSI / EMA, accept or tune parameters, then start. You'll get a local Web UI URL on 127.0.0.1 with a generated password.
            </p>
          </div>

          {/* Proxy */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Proxy (optional)</h3>
            <p className="text-gray-600 mb-4">
              Only affects exchange API traffic; local Freqtrade API calls bypass the proxy.
            </p>
            <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
              <pre className="text-sm text-gray-100 font-mono">
                <code>{`saintbot-cli proxy
saintbot-cli proxy http://127.0.0.1:1087
saintbot-cli proxy clear`}</code>
              </pre>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center pt-8">
            <p className="text-gray-600 mb-4">Want ready-made strategies instead?</p>
            <p className="text-gray-500 mb-6">
              If self-hosting feels too cumbersome or the results are disappointing, you can use proven strategies from your dashboard in a few clicks.
            </p>
            <a
              href="#strategies"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Browse strategies
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
