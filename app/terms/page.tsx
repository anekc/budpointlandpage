'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function TermsOfService() {
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
          <h1 className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Terms of Service</h1>
          <p className={`mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Last updated: July 2025</p>

          <section className="mb-8">
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Agreement to Terms</h2>
            <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              By downloading, installing, or using the Budpoint application (&quot;App&quot;), you agree to be bound 
              by these Terms of Service (&quot;Terms&quot;). If you disagree with any part of these terms, 
              you may not use our App.
            </p>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Description of Service</h2>
            <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Budpoint is a personal finance management application that allows users to track expenses, 
              manage budgets, categorize transactions, and share financial information with other users. 
              The App provides tools for financial planning and expense analysis.
            </p>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>User Accounts and Registration</h2>
            <div className={`leading-relaxed space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <p><strong>• Account Creation:</strong> You must create an account using Apple Sign-In to access certain features</p>
              <p><strong>• Account Security:</strong> You are responsible for maintaining the confidentiality of your account</p>
              <p><strong>• Accurate Information:</strong> You agree to provide accurate and complete information during registration</p>
              <p><strong>• Age Requirement:</strong> You must be at least 13 years old to use the App</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Subscription and Payment Terms</h2>
            <div className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <p className="mb-3">Budpoint offers the following subscription options:</p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Monthly Subscription:</strong> Automatically renews every month</li>
                <li><strong>Annual Subscription:</strong> Automatically renews every year</li>
                <li><strong>Lifetime Purchase:</strong> One-time payment for permanent access</li>
              </ul>
              <div className="mt-4 space-y-2">
                <p><strong>• Auto-Renewal:</strong> Subscriptions automatically renew unless cancelled at least 24 hours before expiration</p>
                <p><strong>• Payment:</strong> Payment will be charged to your Apple ID account at confirmation of purchase</p>
                <p><strong>• Cancellation:</strong> You can manage and cancel subscriptions through your Apple ID account settings</p>
                <p><strong>• Refunds:</strong> Refunds are handled by Apple according to their refund policy</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>User Responsibilities</h2>
            <div className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <p className="mb-3">You agree to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Use the App only for lawful purposes and in accordance with these Terms</li>
                <li>Not attempt to gain unauthorized access to any part of the App</li>
                <li>Not use the App to transmit viruses, malware, or other harmful code</li>
                <li>Not reverse engineer, decompile, or disassemble the App</li>
                <li>Not share your account credentials with others</li>
                <li>Respect the privacy and rights of other users when sharing transactions</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Data and Privacy</h2>
            <div className={`leading-relaxed space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <p><strong>• Your Data:</strong> You retain ownership of all financial data you enter into the App</p>
              <p><strong>• Data Storage:</strong> Your data is stored locally on your device and optionally synced via iCloud</p>
              <p><strong>• Sharing Features:</strong> When you share transactions with other users, that data is transmitted through our servers</p>
              <p><strong>• Privacy Policy:</strong> Our collection and use of information is governed by our Privacy Policy</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Intellectual Property</h2>
            <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              The App and its original content, features, and functionality are owned by Budpoint and are 
              protected by international copyright, trademark, patent, trade secret, and other intellectual 
              property laws. You may not copy, modify, distribute, sell, or lease any part of our App.
            </p>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Limitation of Liability</h2>
            <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              In no event shall Budpoint be liable for any indirect, incidental, special, consequential, 
              or punitive damages, including without limitation, loss of profits, data, use, goodwill, 
              or other intangible losses, resulting from your use of the App.
            </p>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Service Availability</h2>
            <div className={`leading-relaxed space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <p><strong>• Availability:</strong> We strive to maintain App availability but cannot guarantee uninterrupted service</p>
              <p><strong>• Maintenance:</strong> We may temporarily suspend the service for maintenance or updates</p>
              <p><strong>• Modifications:</strong> We reserve the right to modify or discontinue features at any time</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Termination</h2>
            <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              We may terminate or suspend your account and access to the App immediately, without prior 
              notice or liability, for any reason, including breach of these Terms. You may also 
              terminate your account at any time by deleting the App and contacting us to remove your data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Changes to Terms</h2>
            <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              We reserve the right to modify these Terms at any time. We will notify users of any 
              material changes through an app update or notification. Your continued use of the App 
              after changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Governing Law</h2>
            <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              These Terms shall be governed by and construed in accordance with the laws of the 
              jurisdiction where Budpoint is based, without regard to conflict of law provisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Contact Information</h2>
            <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              If you have any questions about these Terms of Service, please contact us through 
              the support section in the app or by sending an email to{' '}
              <a href="mailto:support@budpoint.app" className={`${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
                support@budpoint.app
              </a>.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}