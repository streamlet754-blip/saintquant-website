"use client"

import { useState } from "react"
import { Menu, X, Globe } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Trading", href: "/trading" },
    { name: "Strategies", href: "#" },
    { name: "About", href: "#" },
    { name: "News", href: "#" },
    { name: "FAQ", href: "#" },
    { name: "Affiliate", href: "#" },
    { name: "App", href: "#" },
    { name: "Free Bot", href: "#" },
    { name: "Contact", href: "#" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
              <span className="text-sm font-bold text-white">SQ</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SaintQuant
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Right side - Language & Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-sm text-gray-700 hover:text-blue-600 transition-colors">
              <Globe className="h-4 w-4" />
              <span>English</span>
            </button>
            <a
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Sign In
            </a>
            <a
              href="#"
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Sign Up
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex items-center space-x-2 pt-2">
                <Globe className="h-4 w-4 text-gray-700" />
                <span className="text-sm text-gray-700">English</span>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Sign In
              </a>
              <a
                href="#"
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-center"
              >
                Sign Up
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
