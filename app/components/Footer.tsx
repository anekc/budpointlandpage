'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Footer() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Detect system dark mode preference
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDark(darkModeQuery.matches)
    
    // Listen for system theme changes
    const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches)
    darkModeQuery.addEventListener('change', handleChange)
    return () => darkModeQuery.removeEventListener('change', handleChange)
  }, [])

  return (
    <footer className={`transition-colors duration-300 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image src="/logo.png" alt="Budpoint" className="h-8 w-8" width={32} height={32} />
              <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Budpoint</span>
            </div>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Smart personal finance management with shared expense tracking. 
              Take control of your money, together.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Product</h3>
            <ul className={`space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <li><Link href="#features" className={`${isDark ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}>Features</Link></li>
              <li><Link href="#pricing" className={`${isDark ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}>Pricing</Link></li>
              <li><Link href="#screenshots" className={`${isDark ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}>Screenshots</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Support</h3>
            <ul className={`space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <li><Link href="#faq" className={`${isDark ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}>FAQ</Link></li>
              <li><a href="mailto:support@budpoint.app" className={`${isDark ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}>Contact</a></li>
              <li><Link href="#waitlist" className={`${isDark ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}>Join Waitlist</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Legal</h3>
            <ul className={`space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <li><Link href="/privacy" className={`${isDark ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}>Privacy Policy</Link></li>
              <li><Link href="/terms" className={`${isDark ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}>Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            © 2025 Budpoint. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="/privacy" className={`text-sm transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              Privacy
            </Link>
            <Link href="/terms" className={`text-sm transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}