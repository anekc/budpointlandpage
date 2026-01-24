'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isDark, setIsDark] = useState(false)
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDark(darkModeQuery.matches)

    const browserLang = navigator.language.startsWith('es') ? 'es' : 'en'
    setLanguage(browserLang)

    const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches)
    darkModeQuery.addEventListener('change', handleChange)
    return () => darkModeQuery.removeEventListener('change', handleChange)
  }, [])

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      {/* Subtle gradient background */}
      <div className={`absolute top-0 left-0 right-0 h-[600px] pointer-events-none overflow-hidden ${isDark ? 'opacity-20' : 'opacity-15'}`}>
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-blue-400 rounded-full filter blur-[150px]"></div>
        <div className="absolute top-20 right-1/4 w-[300px] h-[300px] bg-purple-400 rounded-full filter blur-[150px]"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 ${isDark ? 'bg-black/70' : 'bg-white/70'} backdrop-blur-xl border-b ${isDark ? 'border-gray-800/30' : 'border-gray-200/50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3 group">
              <Image
                src="/logo.png"
                alt="Budpoint Logo"
                width={32}
                height={32}
                className="rounded-lg transition-shadow duration-300 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
              />
              <span className="text-xl font-bold">Budpoint</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link
                href="/"
                className={`hover:text-blue-500 transition-colors ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
              >
                {language === 'es' ? 'Inicio' : 'Home'}
              </Link>
              <Link
                href="/blog"
                className="text-blue-500 font-medium"
              >
                Blog
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="pt-24 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className={`border-t ${isDark ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}>
        {/* Gradient separator */}
        <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 -mt-px"></div>
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              &copy; 2026 Budpoint. {language === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
