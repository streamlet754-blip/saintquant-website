import { Code, Shield, Terminal, Zap } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: Code,
      title: "Free core stack",
      description: "Python + Freqtrade are open source.",
    },
    {
      icon: Shield,
      title: "Security by design",
      description: "Encrypted storage, tight file permissions, no credential logs.",
    },
    {
      icon: Terminal,
      title: "Optional CLI",
      description: "The optional CLI walks you through Freqtrade so you can run your bot from the terminal with a guided menu.",
    },
    {
      icon: Zap,
      title: "Trading styles",
      description: "Common patterns: Grid, RSI, and EMA strategies included.",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Free Bot?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to run a secure, local crypto trading bot
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-gradient-to-b from-gray-50 to-white border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
