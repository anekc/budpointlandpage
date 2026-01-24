'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

interface FooterProps {
  isDark?: boolean
}

export default function Footer({ isDark: isDarkProp }: FooterProps) {
  const [isDarkLocal, setIsDarkLocal] = useState(false)
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    // Detect system dark mode preference (only used if no prop passed)
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDarkLocal(darkModeQuery.matches)

    // Detect browser language
    const browserLang = navigator.language.startsWith('es') ? 'es' : 'en'
    setLanguage(browserLang)

    // Listen for system theme changes
    const handleChange = (e: MediaQueryListEvent) => setIsDarkLocal(e.matches)
    darkModeQuery.addEventListener('change', handleChange)
    return () => darkModeQuery.removeEventListener('change', handleChange)
  }, [])

  // Use prop if provided, otherwise use local state
  const isDark = isDarkProp !== undefined ? isDarkProp : isDarkLocal

  const t = {
    en: {
      description: "Smart personal finance management with shared expense tracking. Take control of your money, together.",
      product: "Product",
      features: "Features",
      pricing: "Pricing",
      screenshots: "Screenshots",
      support: "Support",
      faq: "FAQ",
      contact: "Contact",
      joinWaitlist: "Join Waitlist",
      legal: "Legal",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      copyright: "© 2026 Budpoint. All rights reserved.",
      privacyShort: "Privacy",
      termsShort: "Terms"
    },
    es: {
      description: "Gestión financiera personal con seguimiento de gastos compartidos. Toma el control de tu dinero, juntos.",
      product: "Producto",
      features: "Características",
      pricing: "Precios",
      screenshots: "Capturas",
      support: "Soporte",
      faq: "Preguntas Frecuentes",
      contact: "Contacto",
      joinWaitlist: "Lista de Espera",
      legal: "Legal",
      privacy: "Política de Privacidad",
      terms: "Términos de Servicio",
      copyright: "© 2026 Budpoint. Todos los derechos reservados.",
      privacyShort: "Privacidad",
      termsShort: "Términos"
    }
  }

  const currentLang = t[language as keyof typeof t]

  return (
    <footer className={`transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      {/* Gradient separator */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image src="/logo.png" alt="Budpoint" className="h-8 w-8" width={32} height={32} />
              <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Budpoint</span>
            </div>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {currentLang.description}
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{currentLang.product}</h3>
            <ul className={`space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <li><Link href="#features" className={`${isDark ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}>{currentLang.features}</Link></li>
              <li><Link href="#pricing" className={`${isDark ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}>{currentLang.pricing}</Link></li>
              <li><Link href="#screenshots" className={`${isDark ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}>{currentLang.screenshots}</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{currentLang.support}</h3>
            <ul className={`space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <li><Link href="#faq" className={`${isDark ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}>{currentLang.faq}</Link></li>
              <li><a href="mailto:support@budpoint.app" className={`${isDark ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}>{currentLang.contact}</a></li>
              <li><Link href="#waitlist" className={`${isDark ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}>{currentLang.joinWaitlist}</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{currentLang.legal}</h3>
            <ul className={`space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <li><Link href="/privacy" className={`${isDark ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}>{currentLang.privacy}</Link></li>
              <li><Link href="/terms" className={`${isDark ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}>{currentLang.terms}</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {currentLang.copyright}
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="/privacy" className={`text-sm transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              {currentLang.privacyShort}
            </Link>
            <Link href="/terms" className={`text-sm transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              {currentLang.termsShort}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
