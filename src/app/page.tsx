import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Features from "@/components/Features"
import TradingStyles from "@/components/TradingStyles"
import SetupGuide from "@/components/SetupGuide"
import Parameters from "@/components/Parameters"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <TradingStyles />
        <SetupGuide />
        <Parameters />
      </main>
      <Footer />
    </div>
  )
}
