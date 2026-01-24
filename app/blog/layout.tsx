'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from '../components/ThemeContext'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isDark, toggleTheme } = useTheme()
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    const browserLang = navigator.language.startsWith('es') ? 'es' : 'en'
    setLanguage(browserLang)
  }, [])

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark bg-black text-white' : 'bg-white text-gray-900'}`}>
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
            <div className="flex items-center space-x-4">
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
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all duration-300 ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
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
      <footer className={`border-t ${isDark ? 'border-gray-800 bg-black' : 'border-gray-200 bg-white'}`}>
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
