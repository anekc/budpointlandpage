'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function PrivacyPolicy() {
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
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      {/* Simple Header */}
      <header className={`${isDark ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} border-b transition-colors duration-300`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className={`flex items-center space-x-2 ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} transition-colors`}>
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
          <h1 className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Privacy Policy</h1>
          <p className={`mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Last updated: July 2025</p>

          <section className="mb-8">
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Introduction</h2>
            <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              At Budpoint, we value your privacy and are committed to protecting your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and protect your information when 
              you use our personal finance application.
            </p>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Information We Collect</h2>
            <div className={`leading-relaxed space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <p><strong>• Account Information:</strong> Name, email address, and Apple ID authentication information</p>
              <p><strong>• Financial Data:</strong> Transactions, budgets, accounts, and categories you enter in the application</p>
              <p><strong>• Usage Data:</strong> Information about how you use the app, including features accessed and usage time</p>
              <p><strong>• Device Information:</strong> Device type, operating system, unique device identifiers</p>
              <p><strong>• Notification Tokens:</strong> To send push notifications when you share transactions with other users</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>How We Use Your Information</h2>
            <div className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <p className="mb-3">We use your information to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Provide and maintain app services</li>
                <li>Sync your data across devices through iCloud</li>
                <li>Facilitate transaction sharing with other users when you choose to connect</li>
                <li>Send notifications about shared transactions and important updates</li>
                <li>Improve user experience and develop new features</li>
                <li>Provide technical support when needed</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Data Storage and Security</h2>
            <div className={`leading-relaxed space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <p><strong>• Local Storage:</strong> Your data is stored locally on your device</p>
              <p><strong>• iCloud:</strong> We use Apple&apos;s iCloud to sync your data across devices (optional)</p>
              <p><strong>• Firebase:</strong> When you connect with other users, we use Firebase (Google) to facilitate transaction sharing</p>
              <p><strong>• Encryption:</strong> All data is transmitted using TLS/SSL encryption</p>
              <p><strong>• We don&apos;t sell your information:</strong> We never sell, rent, or share your personal information with third parties for commercial purposes</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Third-Party Services</h2>
            <div className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <p className="mb-3">We use the following third-party services:</p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Apple iCloud:</strong> For data synchronization across devices</li>
                <li><strong>Firebase (Google):</strong> For transaction sharing features between users</li>
                <li><strong>Apple Sign-In:</strong> For secure authentication</li>
              </ul>
              <p className="mt-3">These services have their own privacy policies that we recommend reviewing.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Your Rights</h2>
            <div className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <p className="mb-3">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Delete your account and associated data</li>
                <li>Export your data in CSV format</li>
                <li>Revoke permissions for transaction sharing</li>
                <li>Disable push notifications at any time</li>
              </ul>
              <p className="mt-3">You can exercise these rights directly in the app or by contacting us.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Children&apos;s Privacy</h2>
            <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Our application is not directed to children under 13 years of age. We do not knowingly 
              collect personal information from children under 13. If we discover that we have collected 
              personal information from a child under 13, we will immediately delete such information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Changes to This Policy</h2>
            <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              We may update this Privacy Policy occasionally. We will notify you of important changes 
              through an app update or notification. We recommend reviewing this policy periodically 
              to stay informed about how we protect your information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Contact</h2>
            <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              If you have questions about this Privacy Policy or the handling of your personal information, 
              you can contact us through the support section in the app or by sending an email to{' '}
              <a href="mailto:support@budpoint.app" className={`${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} transition-colors`}>
                support@budpoint.app
              </a>.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}