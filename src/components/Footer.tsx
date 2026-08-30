"use client"

import { useState } from "react"
import { GitHub, X, Linkedin, Mail, ArrowRight } from "lucide-react"

export default function Footer() {
  const [email, setEmail] = useState("")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Subscribed:", email)
    setEmail("")
  }

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
                <span className="text-sm font-bold text-white">SQ</span>
              </div>
              <span className="text-xl font-bold text-white">SaintQuant</span>
            </div>
            <p className="text-sm leading-relaxed">
              SaintQuant is the premier crypto quant trading bot platform. We deliver sophisticated AI-Powered Crypto Quant Trading solutions that fuse advanced machine learning with proven quantitative models, offering investors stable long-term performance, strict risk management, and institutional-grade security in dynamic crypto markets.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <GitHub className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <X className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Strategies</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">News</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Affiliate</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">App</a></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">Newsletter</h3>
            <p className="text-sm mb-4">
              Subscribe for AI-Powered Crypto Quant Insights, and SaintQuant's update.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center"
              >
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm">
              © 2026 SaintQuant. All Rights Reserved.
            </p>
            <p className="text-xs text-gray-500 max-w-2xl text-center md:text-right">
              Disclaimer: The information provided by SaintQuant is for informational purposes only and does not constitute financial, investment, legal, or tax advice. All investments involve risk, including the possible loss of principal. Past performance does not guarantee future results. Users are solely responsible for their investment decisions and should conduct their own research or consult with a professional advisor before making any financial decisions.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
