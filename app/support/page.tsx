'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function SupportPage() {
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
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      {/* Simple Header */}
      <header className={`${isDark ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} border-b`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className={`flex items-center space-x-2 ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Budpoint</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <h1 className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Support</h1>
          <p className={`mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>How can we help you with Budpoint?</p>

          <section className="mb-8">
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className={`text-xl font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>How do I sync my data across devices?</h3>
                <p className={`leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Budpoint uses iCloud to seamlessly sync your data. Make sure you are signed in with the same Apple ID on all your devices and that iCloud Drive is enabled for Budpoint in your device settings.
                </p>
              </div>

              <div>
                <h3 className={`text-xl font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>How do I restore my Pro purchase?</h3>
                <p className={`leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  If you got a new device or reinstalled the app, you can restore your Pro purchase by going to the Settings tab in the app, tapping on the Pro section, and selecting "Restore Purchases".
                </p>
              </div>

              <div>
                <h3 className={`text-xl font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Is my financial data secure?</h3>
                <p className={`leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Yes. Your data is stored locally on your device and securely synced through your personal Apple iCloud account. We do not have access to your financial data and it is not shared with any third parties.
                </p>
              </div>

              <div>
                <h3 className={`text-xl font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>How can I share an account with my partner or family?</h3>
                <p className={`leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  You can use the built-in sharing features inside the app to invite other users to collaborate on specific budgets and expense tracking.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Contact Us</h2>
            <p className={`leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              If you couldn't find the answer to your question, or if you want to report a bug or suggest a new feature, please don't hesitate to reach out to us.
            </p>
            <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Email us at:{' '}
              <a href="mailto:support@budpoint.app" className={`${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} font-medium`}>
                support@budpoint.app
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Legal</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className={`${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className={`${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  )
}
