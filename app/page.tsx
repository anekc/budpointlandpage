'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Home() {
  const [isDark, setIsDark] = useState(false)
  const [language, setLanguage] = useState('en')
  
  // Waitlist form state
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0)
  const [submitCount, setSubmitCount] = useState<number>(0)
  const [emailTouched, setEmailTouched] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [showValidation, setShowValidation] = useState(false)
  
  // Parallax scroll effects
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -200])
  const screenshotsY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const featuresY = useTransform(scrollYProgress, [0, 1], [0, 50])

  useEffect(() => {
    // Detect system dark mode preference
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDark(darkModeQuery.matches)
    
    // Detect browser language
    const browserLang = navigator.language.startsWith('es') ? 'es' : 'en'
    setLanguage(browserLang)
    
    // Listen for system theme changes
    const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches)
    darkModeQuery.addEventListener('change', handleChange)
    return () => darkModeQuery.removeEventListener('change', handleChange)
  }, [])

  // Debounced email validation
  useEffect(() => {
    if (!emailTouched || email.length === 0) {
      setShowValidation(false)
      return
    }

    const timer = setTimeout(() => {
      setIsEmailValid(validateEmail(email))
      setShowValidation(true)
    }, 800) // Wait 800ms after user stops typing

    return () => clearTimeout(timer)
  }, [email, emailTouched])

  // Scroll to waitlist section
  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist-section')
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Waitlist form handlers
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return false
    
    // Lista de dominios de email permitidos (proveedores confiables)
    const allowedDomains = [
      'gmail.com',
      'outlook.com',
      'hotmail.com',
      'yahoo.com',
      'yahoo.es',
      'icloud.com',
      'me.com',
      'live.com',
      'msn.com',
      'aol.com',
      'protonmail.com',
      'zoho.com',
      'mail.com',
      'gmx.com',
      'yandex.com',
      'tutanota.com'
    ]
    
    const domain = email.toLowerCase().split('@')[1]
    return allowedDomains.includes(domain)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value
    setEmail(newEmail)
    setShowValidation(false) // Hide validation while typing
    if (!emailTouched) {
      setEmailTouched(true)
    }
  }

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateEmail(email)) {
      setSubmitStatus('error')
      return
    }

    // Anti-spam protection: Rate limiting
    const now = Date.now()
    const timeSinceLastSubmit = now - lastSubmitTime
    
    // Prevent submissions faster than 5 seconds apart
    if (timeSinceLastSubmit < 5000) {
      setSubmitStatus('error')
      return
    }
    
    // Prevent more than 3 submissions per session
    if (submitCount >= 3) {
      setSubmitStatus('error')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Formspree endpoint for Budpoint waitlist
      const response = await fetch('https://formspree.io/f/mnnvdwdy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          source: 'Budpoint Landing Page',
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          referrer: document.referrer || 'direct',
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setEmail('')
        setLastSubmitTime(now)
        setSubmitCount(prev => prev + 1)
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const t = {
    en: {
      title: "Smarter Finance Management",
      subtitle: "For modern shared expenses. Track personal spending, manage group costs, and get insights that actually matter",
      joinWaitlist: "Join Waitlist",
      features: "Features",
      multiAccount: "Multi-Account Management",
      multiAccountDesc: "Track multiple bank accounts with real-time balance monitoring and intelligent account categorization",
      smartBudgeting: "Intelligent Budget System",
      smartBudgetingDesc: "Automatic budgets with 'Create with Rules' analyze your spending patterns, plus custom budget creation",
      expenseTracking: "Advanced Split System",
      expenseTrackingDesc: "Split expenses between multiple people with automatic calculations and intelligent distribution",
      analytics: "Recurring Transactions",
      analyticsDesc: "Schedule automatic transactions with weekly, biweekly, monthly, or annual frequencies",
      security: "Smart Financial Dashboard",
      securityDesc: "Real-time financial overview with intelligent charts and key performance indicators",
      icloudSync: "Advanced Transaction System",
      icloudSyncDesc: "Complete income, expense, and transfer tracking with smart categorization using intelligent tagging system",
      goals: "Intelligent Widgets",
      goalsDesc: "Home screen widgets with real-time budget data and quick actions for instant financial insights",
      scanning: "Pattern Recognition",
      scanningDesc: "Automatic budget creation based on historical spending analysis and financial behavior patterns",
      personalTracking: "Personal Expense Tracking",
      personalTrackingDesc: "Track only YOUR expenses. When someone asks you to buy something for them, it doesn't count toward your personal spending totals",
      pricing: "Simple Pricing",
      free: "Free",
              freeFeatures: ["Up to 3 accounts", "8 smart tags", "3 people for splits", "Automatic budgets", "Widget system"],
      pro: "Pro",
      proPrice: "$4.99/month",
              proFeatures: ["Unlimited accounts", "Unlimited tags", "Unlimited people", "Custom budgets", "Recurring transactions", "iCloud sync", "Priority support"],
      annual: "Annual",
      annualPrice: "$49.99/year",
      annualSavings: "Save 17%",
      lifetime: "Lifetime",
      lifetimePrice: "$79.99",
      lifetimeBest: "Best Value",
      comingSoon: "Coming Soon",
      waitlistTitle: "Be the first to experience Budpoint",
      waitlistSubtitle: "Join thousands of users waiting for the smartest finance app",
      emailPlaceholder: "Enter your email address",
      join: "Join Waitlist",
      joining: "Joining...",
      successMessage: "Thanks! You're on the waitlist. We'll notify you when Budpoint launches.",
      errorMessage: "Please enter a valid email address or wait before trying again.",
      tryAgain: "OK",
      emailInvalid: "Please use Gmail, Outlook, Yahoo, iCloud or another trusted email provider",
      emailValid: "Email looks good!",
      appPreview: "App Preview",
      appPreviewDesc: "Experience the intuitive and useful interface designed for iOS",
      swipeHint: "Swipe to explore more screens",
      whyChoose: "Why Choose Budpoint?",
      whyChooseDesc: "Join thousands of users who trust Budpoint to manage their finances",
      realTime: "Freemium System",
      realTimeDesc: "Generous free tier with 3 accounts, 8 tags, and 3 people. Upgrade for unlimited everything",
      smartNotifications: "iOS 18.4+ Optimized", 
      smartNotificationsDesc: "Built specifically for latest iOS with native performance and modern design patterns",
      multiCurrency: "Complete Widget Integration",
      multiCurrencyDesc: "Home screen widgets with live data and quick actions for instant budget monitoring",
      betaTestersTitle: "What Beta Testers Say",
      betaTestersSubtitle: "Real feedback from early users who've been testing Budpoint",
      testimonial1: "Controlling my budget is now super easy! I love how everything is organized and I can see exactly where my money goes.",
      testimonial1Author: "Sarah M.",
      testimonial1Role: "Beta Tester",
      testimonial2: "Before Budpoint, keeping track of expenses was a disaster because everything was mixed together. Now everything is perfectly organized!",
      testimonial2Author: "Mike R.",
      testimonial2Role: "Early User",
      testimonial3: "The analytics always give me confidence about how much I can spend. I feel calm following a budget for the first time.",
      testimonial3Author: "Jessica L.",
      testimonial3Role: "Beta Tester"
    },
    es: {
      title: "Gestión Financiera Inteligente",
      subtitle: "Para gastos compartidos modernos. Rastrea gastos personales, gestiona costos grupales y obtén información que realmente importa",
      joinWaitlist: "Unirse a Lista de Espera",
      features: "Características",
      multiAccount: "Gestión Multi-Cuenta",
      multiAccountDesc: "Rastrea múltiples cuentas bancarias con monitoreo de saldos en tiempo real. 3 cuentas gratis, ilimitadas con Pro",
      smartBudgeting: "Sistema de Presupuestos Inteligente",
      smartBudgetingDesc: "Presupuestos automáticos con 'Create with Rules' analizan tus patrones de gasto, presupuestos personalizados disponibles con Pro",
      expenseTracking: "Sistema Avanzado de Divisiones",
      expenseTrackingDesc: "Divide gastos entre múltiples personas con cálculos automáticos. Gestiona hasta 3 personas gratis, ilimitadas con Pro",
      analytics: "Transacciones Recurrentes",
      analyticsDesc: "Programa transacciones automáticas con frecuencias semanales, quincenales, mensuales o anuales",
      security: "Dashboard Financiero Inteligente",
      securityDesc: "Vista general financiera en tiempo real con gráficos inteligentes e indicadores clave de rendimiento",
      icloudSync: "Sistema Avanzado de Transacciones",
      icloudSyncDesc: "Seguimiento completo de ingresos, gastos y transferencias con categorización inteligente usando 8 etiquetas gratis, ilimitadas con Pro",
      goals: "Widgets Inteligentes",
      goalsDesc: "Widgets de pantalla principal con datos de presupuesto en tiempo real y acciones rápidas para información financiera instantánea",
      scanning: "Reconocimiento de Patrones",
      scanningDesc: "Creación automática de presupuestos basada en análisis de gastos históricos y patrones de comportamiento financiero",
      personalTracking: "Seguimiento Personal de Gastos",
      personalTrackingDesc: "Rastrea solo TUS gastos. Cuando alguien te pide que compres algo para ellos, no cuenta hacia tus totales de gasto personal",
      pricing: "Precios Simples",
      free: "Gratis",
              freeFeatures: ["Hasta 3 cuentas", "8 etiquetas inteligentes", "3 personas para divisiones", "Presupuestos automáticos", "Sistema de widgets"],
      pro: "Pro",
      proPrice: "$4.99/mes",
              proFeatures: ["Cuentas ilimitadas", "Etiquetas ilimitadas", "Personas ilimitadas", "Presupuestos personalizados", "Transacciones recurrentes", "Sincronización iCloud", "Soporte prioritario"],
      annual: "Anual",
      annualPrice: "$49.99/año",
      annualSavings: "Ahorra 17%",
      lifetime: "De por vida",
      lifetimePrice: "$79.99",
      lifetimeBest: "Mejor valor",
      comingSoon: "Próximamente",
      waitlistTitle: "Sé el primero en experimentar Budpoint",
      waitlistSubtitle: "Únete a miles de usuarios esperando la app financiera más inteligente",
      emailPlaceholder: "Ingresa tu correo electrónico",
      join: "Unirse",
      joining: "Uniéndose...",
      successMessage: "¡Gracias! Estás en la lista de espera. Te notificaremos cuando Budpoint se lance.",
      errorMessage: "Por favor ingresa un correo electrónico válido o espera antes de intentar de nuevo.",
      tryAgain: "OK",
      emailInvalid: "Por favor usa Gmail, Outlook, Yahoo, iCloud u otro proveedor de correo confiable",
      emailValid: "El correo electrónico parece correcto!",
      appPreview: "Vista Previa de la App",
      appPreviewDesc: "Experimenta la interfaz intuitiva y útil diseñada para iOS",
      swipeHint: "Desliza para explorar más pantallas",
      whyChoose: "¿Por qué elegir Budpoint?",
      whyChooseDesc: "Únete a miles de usuarios que confían en Budpoint para gestionar sus finanzas",
      realTime: "Sistema Freemium",
      realTimeDesc: "Nivel gratuito generoso con 3 cuentas, 8 etiquetas y 3 personas. Actualiza para obtener todo ilimitado",
      smartNotifications: "Optimizado para iOS 18.4+",
      smartNotificationsDesc: "Construido específicamente para el iOS más reciente con rendimiento nativo y patrones de diseño modernos",
      multiCurrency: "Integración Completa de Widgets",
      multiCurrencyDesc: "Widgets de pantalla principal con datos en vivo y acciones rápidas para monitoreo instantáneo del presupuesto",
      betaTestersTitle: "Lo que Dicen los Beta Testers",
      betaTestersSubtitle: "Comentarios reales de usuarios tempranos que han estado probando Budpoint",
      testimonial1: "¡Controlar mi presupuesto ahora es súper fácil! Me encanta cómo todo está organizado y puedo ver exactamente a dónde va mi dinero.",
      testimonial1Author: "Sarah M.",
      testimonial1Role: "Beta Tester",
      testimonial2: "Antes de Budpoint, hacer cuentas era un desastre porque estaba todo junto. ¡Ahora todo está perfectamente organizado!",
      testimonial2Author: "Mike R.",
      testimonial2Role: "Usuario Temprano",
      testimonial3: "Los análisis siempre me dan certeza de cuánto puedo gastar. Me siento tranquila siguiendo un presupuesto por primera vez.",
      testimonial3Author: "Jessica L.",
      testimonial3Role: "Beta Tester"
    }
  }

  const currentLang = t[language as keyof typeof t]

  // Screenshots data
  const screenshots = [
    {
      name: 'dashboard',
      title: { en: 'Dashboard', es: 'Panel Principal' },
      description: { en: 'Multi-account overview', es: 'Vista general de cuentas' }
    },
    {
      name: 'dashboard2',
      title: { en: 'Analytics Dashboard', es: 'Panel de Análisis' },
      description: { en: 'Expense distribution & recurring transactions', es: 'Distribución de gastos y transacciones recurrentes' }
    },
    {
      name: 'transactions',
      title: { en: 'Transactions', es: 'Transacciones' },
      description: { en: 'Expense tracking', es: 'Seguimiento de gastos' }
    },
    {
      name: 'budgets',
      title: { en: 'Budgets', es: 'Presupuestos' },
      description: { en: 'Smart budgeting', es: 'Presupuestos inteligentes' }
    }
  ]

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      {/* Fixed Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 ${isDark ? 'bg-black/60' : 'bg-white/60'} backdrop-blur-md border-b ${isDark ? 'border-gray-800/50' : 'border-gray-200/50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Image 
                src="/logo.png" 
                alt="Budpoint Logo" 
                width={32} 
                height={32}
                className="rounded-lg"
              />
              <span className="text-xl font-bold">Budpoint</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div className="text-center py-20" style={{ y: heroY }}>
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Image 
                src="/logo.png" 
                alt="Budpoint App Icon" 
                width={120} 
                height={120}
                className="mx-auto rounded-3xl shadow-2xl"
              />
            </motion.div>
            <motion.h1 
              className="text-4xl font-bold sm:text-6xl mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {currentLang.title}
            </motion.h1>
            <motion.p 
              className={`mt-6 text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {currentLang.subtitle}
            </motion.p>
            <motion.div 
              className="mt-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <button 
                onClick={scrollToWaitlist}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                {currentLang.joinWaitlist}
              </button>
            </motion.div>
          </motion.div>

          {/* App Preview Section - RESPONSIVE */}
          <motion.div className="pt-20 pb-10" style={{ y: screenshotsY }}>
            <div className="text-center mb-16">
              <motion.h2 
                className="text-3xl font-bold mb-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {currentLang.appPreview}
              </motion.h2>
              <motion.p 
                className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {currentLang.appPreviewDesc}
              </motion.p>
            </div>
            
            {/* Screenshots Container - RESPONSIVE GRID */}
            <div className="relative">
              {/* Mobile: Single column stack, Tablet: 2 columns, Desktop: 3 columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto px-4">
                {screenshots.map((screenshot, index) => (
                  <motion.div 
                    key={screenshot.name} 
                    className="group mx-auto"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="relative transform transition-all duration-300 hover:scale-105">
                      {/* iPhone Simulation - Realistic */}
                      <div className="relative max-w-[280px] md:max-w-[320px] lg:max-w-[350px] mx-auto">
                        {/* iPhone Frame */}
                        <div className={`relative rounded-[2rem] md:rounded-[2.5rem] ${isDark ? 'bg-gray-900' : 'bg-gray-800'} shadow-2xl`}>
                          {/* Screen Container */}
                          <div className="relative p-2 md:p-2">
                            {/* Screen */}
                            <div className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-black">
                              <Image 
                                src={`/screenshots/${isDark ? 'dark' : 'light'}/${screenshot.name}.png`}
                                alt={`${screenshot.title[language as keyof typeof screenshot.title]} - ${screenshot.description[language as keyof typeof screenshot.description]}`}
                                width={320} 
                                height={694}
                                className="w-full h-auto transition-opacity duration-300"
                                priority={index === 0}
                              />
                              

                            </div>
                          </div>
                          

                          
                          {/* Volume Buttons */}
                          <div className={`absolute left-0 top-16 md:top-20 w-1 h-8 md:h-10 ${isDark ? 'bg-gray-700' : 'bg-gray-600'} rounded-r-md`}></div>
                          <div className={`absolute left-0 top-28 md:top-32 w-1 h-6 md:h-8 ${isDark ? 'bg-gray-700' : 'bg-gray-600'} rounded-r-md`}></div>
                          
                          {/* Power Button */}
                          <div className={`absolute right-0 top-20 md:top-24 w-1 h-12 md:h-14 ${isDark ? 'bg-gray-700' : 'bg-gray-600'} rounded-l-md`}></div>
                          
                          {/* Home Indicator */}
                          <div className="absolute bottom-2 md:bottom-3 left-1/2 transform -translate-x-1/2 w-32 md:w-36 h-1 bg-white rounded-full opacity-60"></div>
                        </div>
                      </div>
                      
                      {/* Screenshot label */}
                      <div className="mt-6 text-center">
                        <div className={`px-4 py-2 rounded-lg text-sm font-medium ${isDark ? 'bg-gray-800/50 text-gray-300' : 'bg-white/80 text-gray-700'} backdrop-blur-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'} h-20 flex flex-col justify-center`}>
                          <div className="font-semibold text-base">{screenshot.title[language as keyof typeof screenshot.title]}</div>
                          <div className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'} leading-tight`}>
                            {screenshot.description[language as keyof typeof screenshot.description]}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              

            </div>
          </motion.div>
          
          {/* Features Section */}
          <motion.div className="pt-10 pb-20" style={{ y: featuresY }}>
            <motion.h2 
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {currentLang.features}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div 
                className={`text-center p-6 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'} hover:scale-105 transition-transform`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-green-600">{currentLang.multiAccount}</h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{currentLang.multiAccountDesc}</p>
              </motion.div>
              <motion.div 
                className={`text-center p-6 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'} hover:scale-105 transition-transform`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-blue-600">{currentLang.smartBudgeting}</h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{currentLang.smartBudgetingDesc}</p>
              </motion.div>
              <motion.div 
                className={`text-center p-6 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'} hover:scale-105 transition-transform`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-purple-600">{currentLang.expenseTracking}</h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{currentLang.expenseTrackingDesc}</p>
              </motion.div>
              <motion.div 
                className={`text-center p-6 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'} hover:scale-105 transition-transform`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-orange-600">{currentLang.analytics}</h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{currentLang.analyticsDesc}</p>
              </motion.div>
              <motion.div 
                className={`text-center p-6 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'} hover:scale-105 transition-transform`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-orange-600">{currentLang.personalTracking}</h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{currentLang.personalTrackingDesc}</p>
              </motion.div>
              <motion.div 
                className={`text-center p-6 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'} hover:scale-105 transition-transform`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-blue-600">{currentLang.security}</h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{currentLang.securityDesc}</p>
              </motion.div>
              <motion.div 
                className={`text-center p-6 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'} hover:scale-105 transition-transform`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-green-600">{currentLang.icloudSync}</h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{currentLang.icloudSyncDesc}</p>
              </motion.div>
              <motion.div 
                className={`text-center p-6 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'} hover:scale-105 transition-transform`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-purple-600">{currentLang.goals}</h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{currentLang.goalsDesc}</p>
              </motion.div>
              <motion.div 
                className={`text-center p-6 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'} hover:scale-105 transition-transform`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-orange-600">{currentLang.personalTracking}</h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{currentLang.personalTrackingDesc}</p>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Why Choose Budpoint Section */}
          <motion.div className="py-16">
            <motion.h2 
              className="text-3xl font-bold text-center mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {currentLang.whyChoose}
            </motion.h2>
            <motion.p 
              className={`text-lg text-center mb-12 ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {currentLang.whyChooseDesc}
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <motion.div 
                className={`text-center p-6 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'} hover:scale-105 transition-transform`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-blue-600">{currentLang.realTime}</h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{currentLang.realTimeDesc}</p>
              </motion.div>
              <motion.div 
                className={`text-center p-6 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'} hover:scale-105 transition-transform`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.828 7l2.828 2.828L5.828 12l2.828 2.828L6.828 17H4.828l-2.828-2.828L4.828 12 2 9.172 4.828 7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-orange-600">{currentLang.smartNotifications}</h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{currentLang.smartNotificationsDesc}</p>
              </motion.div>
              <motion.div 
                className={`text-center p-6 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'} hover:scale-105 transition-transform`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-green-600">{currentLang.multiCurrency}</h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{currentLang.multiCurrencyDesc}</p>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Beta Testers Testimonials Section */}
          <motion.div className="py-20">
            <motion.h2 
              className="text-3xl font-bold text-center mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {currentLang.betaTestersTitle}
            </motion.h2>
            <motion.p 
              className={`text-lg text-center mb-12 ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {currentLang.betaTestersSubtitle}
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <motion.div 
                className={`p-6 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'} hover:scale-105 transition-transform`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className={`mb-4 italic ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  "{currentLang.testimonial1}"
                </p>
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full ${isDark ? 'bg-blue-600' : 'bg-blue-500'} flex items-center justify-center text-white font-semibold mr-3`}>
                    {currentLang.testimonial1Author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{currentLang.testimonial1Author}</p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{currentLang.testimonial1Role}</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className={`p-6 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'} hover:scale-105 transition-transform`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className={`mb-4 italic ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  "{currentLang.testimonial2}"
                </p>
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full ${isDark ? 'bg-green-600' : 'bg-green-500'} flex items-center justify-center text-white font-semibold mr-3`}>
                    {currentLang.testimonial2Author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{currentLang.testimonial2Author}</p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{currentLang.testimonial2Role}</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className={`p-6 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'} hover:scale-105 transition-transform`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className={`mb-4 italic ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  "{currentLang.testimonial3}"
                </p>
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full ${isDark ? 'bg-purple-600' : 'bg-purple-500'} flex items-center justify-center text-white font-semibold mr-3`}>
                    {currentLang.testimonial3Author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{currentLang.testimonial3Author}</p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{currentLang.testimonial3Role}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Pricing Section */}
          <div className={`py-20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="text-center">
              <motion.h2 
                className="text-3xl font-bold mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {currentLang.pricing}
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {/* Free Plan */}
                <motion.div 
                  className={`p-6 rounded-xl shadow-lg flex flex-col ${isDark ? 'bg-gray-800' : 'bg-white'}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold mb-4">{currentLang.free}</h3>
                  <p className="text-3xl font-bold mb-6">$0</p>
                  <ul className="text-left space-y-2 mb-8 flex-grow">
                    {currentLang.freeFeatures.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 rounded-lg font-semibold mt-auto ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-800'}`}>
                    {currentLang.comingSoon}
                  </button>
                </motion.div>

                {/* Pro Monthly Plan */}
                <motion.div 
                  className={`p-6 rounded-xl shadow-lg border-2 border-blue-600 flex flex-col ${isDark ? 'bg-gray-800' : 'bg-white'}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold mb-4 text-blue-600">{currentLang.pro}</h3>
                  <p className="text-3xl font-bold mb-6">{currentLang.proPrice}</p>
                  <ul className="text-left space-y-2 mb-8 flex-grow">
                    {currentLang.proFeatures.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mt-auto">
                    {currentLang.comingSoon}
                  </button>
                </motion.div>

                {/* Pro Annual Plan */}
                <motion.div 
                  className={`p-6 rounded-xl shadow-lg flex flex-col relative ${isDark ? 'bg-gray-800' : 'bg-white'}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {currentLang.annualSavings}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-orange-600">{currentLang.annual}</h3>
                  <p className="text-3xl font-bold mb-6">{currentLang.annualPrice}</p>
                  <ul className="text-left space-y-2 mb-8 flex-grow">
                    {currentLang.proFeatures.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors mt-auto">
                    {currentLang.comingSoon}
                  </button>
                </motion.div>

                {/* Lifetime Plan */}
                <motion.div 
                  className={`p-6 rounded-xl shadow-lg flex flex-col relative ${isDark ? 'bg-gray-800' : 'bg-white'}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {currentLang.lifetimeBest}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-purple-600">{currentLang.lifetime}</h3>
                  <p className="text-3xl font-bold mb-6">{currentLang.lifetimePrice}</p>
                  <ul className="text-left space-y-2 mb-8 flex-grow">
                    {currentLang.proFeatures.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors mt-auto">
                    {currentLang.comingSoon}
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
          
          {/* Waitlist Section */}
          <div id="waitlist-section" className="py-20 text-center">
            <motion.h2 
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {currentLang.waitlistTitle}
            </motion.h2>
            <motion.p 
              className={`text-lg mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {currentLang.waitlistSubtitle}
            </motion.p>
            
            {submitStatus === 'success' ? (
              <motion.div 
                className="max-w-md mx-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className={`p-6 rounded-lg ${isDark ? 'bg-green-900/20 border border-green-800' : 'bg-green-50 border border-green-200'}`}>
                  <div className="text-4xl mb-4">✅</div>
                  <p className={`text-lg font-medium ${isDark ? 'text-green-400' : 'text-green-800'}`}>
                    {currentLang.successMessage}
                  </p>
                  <button 
                    onClick={() => setSubmitStatus('idle')}
                    className={`mt-4 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    {currentLang.tryAgain}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form 
                onSubmit={handleWaitlistSubmit} 
                className="max-w-md mx-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="flex gap-4 items-start">
                  <div className="flex-1">
                    <div className="h-20"> {/* Fixed height container */}
                      <input 
                        type="email" 
                        value={email}
                        onChange={handleEmailChange}
                        onBlur={() => setEmailTouched(true)}
                        placeholder={currentLang.emailPlaceholder}
                        required
                        disabled={isSubmitting}
                        className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 ${
                          submitStatus === 'error' 
                            ? isDark ? 'bg-red-900/20 border-red-800 text-white placeholder-red-400' : 'bg-red-50 border-red-300 text-gray-900 placeholder-red-400'
                            : showValidation
                              ? isEmailValid
                                ? isDark ? 'bg-green-900/20 border-green-700 text-white placeholder-gray-400' : 'bg-green-50 border-green-300 text-gray-900'
                                : isDark ? 'bg-red-900/20 border-red-700 text-white placeholder-gray-400' : 'bg-red-50 border-red-300 text-gray-900'
                              : isDark ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                        } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                      />
                      {showValidation && (
                        <div className="mt-2 flex items-center text-sm">
                          {isEmailValid ? (
                            <>
                              <span className="text-green-500 mr-2">✓</span>
                              <span className={isDark ? 'text-green-400' : 'text-green-600'}>
                                {currentLang.emailValid}
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="text-red-500 mr-2">✗</span>
                              <span className={isDark ? 'text-red-400' : 'text-red-600'}>
                                {currentLang.emailInvalid}
                              </span>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <button 
                    type="submit"
                    disabled={isSubmitting || !email.trim() || (showValidation && !isEmailValid)}
                    className={`px-6 py-3 rounded-lg font-semibold transition-colors self-start ${
                      isSubmitting || !email.trim() || (showValidation && !isEmailValid)
                        ? isDark ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isSubmitting ? currentLang.joining : currentLang.join}
                  </button>
                </div>
                {submitStatus === 'error' && (
                  <p className={`mt-3 text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                    {currentLang.errorMessage}
                  </p>
                )}
              </motion.form>
            )}
          </div>

          {/* Footer */}
          <motion.footer 
            className={`py-12 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <motion.div 
                className="flex items-center justify-center space-x-3 mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Image 
                  src="/logo.png" 
                  alt="Budpoint Logo" 
                  width={24} 
                  height={24}
                  className="rounded"
                />
                <span className="font-semibold">Budpoint</span>
              </motion.div>
              <motion.p 
                className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                © 2025 Budpoint. {language === 'en' ? 'All rights reserved.' : 'Todos los derechos reservados.'}
              </motion.p>
            </div>
          </motion.footer>
        </div>
      </div>
    </div>
  )
}