'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Footer from './components/Footer'
import { useTheme } from './components/ThemeContext'


// Section navigation data
const sections = [
  { id: 'hero', label: { en: 'Home', es: 'Inicio' } },
  { id: 'screenshots', label: { en: 'Preview', es: 'Vista Previa' } },
  { id: 'features', label: { en: 'Features', es: 'Características' } },
  { id: 'why-choose', label: { en: 'Why Us', es: 'Por Qué' } },
  { id: 'testimonials', label: { en: 'Reviews', es: 'Opiniones' } },
  { id: 'pricing', label: { en: 'Pricing', es: 'Precios' } },
  { id: 'faq', label: { en: 'FAQ', es: 'FAQ' } },
  { id: 'waitlist', label: { en: 'Join', es: 'Únete' } },
]

export default function Home() {
  const { isDark, toggleTheme } = useTheme()
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    // Detect browser language
    if (typeof navigator !== 'undefined') {
      const browserLang = navigator.language.startsWith('es') ? 'es' : 'en'
      setLanguage(browserLang)
    }
  }, [])

  // Waitlist form state
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0)
  const [submitCount, setSubmitCount] = useState<number>(0)
  const [emailTouched, setEmailTouched] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [showValidation, setShowValidation] = useState(false)

  // Pricing plan selection state
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro' | 'annual' | 'lifetime'>('pro')

  // Section navigation state
  const [activeSection, setActiveSection] = useState('hero')


  // Scroll tracking for active section using IntersectionObserver
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Activate when section is in middle of viewport
      threshold: 0
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sections.forEach(section => {
      const element = document.getElementById(section.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
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
    const waitlistSection = document.getElementById('waitlist')
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
      subtitle: "Built for shared expenses. Monitor your spending, split group costs, and gain insights that truly matter",
      joinWaitlist: "Join Waitlist",
      features: "Features",
      multiAccount: "Multi-Account Management",
      multiAccountDesc: "Manage multiple accounts (Savings, Investment, Credit Card) with custom icons and colors for easy organization",
      smartBudgeting: "Advanced Budget System",
      smartBudgetingDesc: "Tag-based budgets with real-time progress and color-coded indicators to monitor spending patterns",
      expenseTracking: "Smart Transaction Splits",
      expenseTrackingDesc: "Divide expenses by fixed amounts or percentages among multiple people. See who owes what with automatic calculations",
      analytics: "Recurring Transactions",
      analyticsDesc: "Schedule automatic entries weekly, bi-weekly, monthly, or yearly with customizable repetition counts",
      security: "Rich Analytics Dashboard",
      securityDesc: "Interactive charts showing person-based spending, tag distribution, and balance trends with visual indicators",
      icloudSync: "Complete Transaction System",
      icloudSyncDesc: "Log income, expenses, and transfers with 150+ icons across 10 categories for effortless organization",
      goals: "iOS Home Screen Widgets",
      goalsDesc: "Small and medium widgets displaying budget summaries, quick actions, and direct links to app features",
      scanning: "Secure iCloud Sync (Pro)",
      scanningDesc: "Your data is fully encrypted in iCloud. We have zero access to your information, ensuring maximum security.",
      personalTracking: "Collaborative Features (Pro)",
      personalTrackingDesc: "Connect with friends, share entries instantly, and view individual spending with person-specific reports",
      timeCost: "Time Cost Calculator (Pro)",
      timeCostDesc: "Discover how many work hours each purchase costs you. Link spending to your time for wiser decisions",
      periodComparison: "Period Comparison",
      periodComparisonDesc: "Automatic comparison with the previous period. Instantly see if you're spending more or less",
      savingsGoals: "Savings Goals",
      savingsGoalsDesc: "Set targets with deadlines, visualize progress, and link goals to specific accounts",
      pricing: "Simple Pricing",
      free: "Free",
      freeFeatures: ["Up to 2 accounts", "5 smart tags", "2 people for splits", "3 budgets per period", "Widget system"],
      pro: "Pro",
      proPrice: "$4.99/month",
      proFeatures: ["Unlimited accounts", "Unlimited tags", "Unlimited people", "Unlimited budgets", "Recurring transactions", "iCloud sync", "Collaborative features", "CSV export"],
      annual: "Annual",
      annualPrice: "$39.99/year",
      annualSavings: "Save 33%",
      lifetime: "Lifetime",
      lifetimePrice: "$79.99",
      lifetimeBest: "Best Value",
      comingSoon: "Coming Soon",
      waitlistTitle: "Be the first to experience Budpoint",
      waitlistSubtitle: "Join thousands waiting for the most intuitive finance app",
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
      realTime: "Focus on YOUR Expenses",
      realTimeDesc: "Monitor only your personal spending. When someone asks you to buy something for them, it won't affect your budgets",
      smartNotifications: "Smart Budget Categories",
      smartNotificationsDesc: "Dedicated budgets for untagged and unassigned expenses, plus starter rules to begin immediately",
      multiCurrency: "Real-Time Expense Sharing",
      multiCurrencyDesc: "Share costs with friends or partners instantly so everyone stays synchronized and balanced",
      betaTestersTitle: "What Beta Testers Say",
      betaTestersSubtitle: "Real feedback from early users who've been testing Budpoint",
      testimonial1: "The interface is simple and I adapted quickly. Thanks to that, I've been able to keep tracking my expenses for much longer.",
      testimonial1Author: "Sarah M.",
      testimonial1Role: "Beta Tester",
      testimonial2: "Organizing shared expenses is so much easier now. We keep everything up to date effortlessly without having to do manual math.",
      testimonial2Author: "Mike R.",
      testimonial2Role: "Early User",
      testimonial3: "It helps me reach the end of the month without surprises. Just by seeing the bar colors, I know if I need to slow down my spending.",
      testimonial3Author: "Jessica L.",
      testimonial3Role: "Beta Tester",
      faqTitle: "Frequently Asked Questions",
      faqSubtitle: "Get answers to common questions about Budpoint",
      faq1Question: "When will Budpoint be available?",
      faq1Answer: "Budpoint is coming soon to iOS. Join our waitlist to be notified when it launches!",
      faq2Question: "Is there a free version?",
      faq2Answer: "Yes! Budpoint offers a free tier with 2 accounts, 5 tags, and 2 people for splits.",
      faq3Question: "Can I share expenses with friends?",
      faq3Answer: "Absolutely! Pro users can share expenses in real-time with friends and partners seamlessly."
    },
    es: {
      title: "Gestión Financiera Inteligente",
      subtitle: "Para gastos compartidos modernos. Lleva el control de tus finanzas, divide costos grupales y obtén información que realmente importa",
      joinWaitlist: "Unirse a Lista de Espera",
      features: "Características",
      multiAccount: "Gestión Multi-Cuenta",
      multiAccountDesc: "Administra múltiples cuentas (Ahorros, Inversión, Tarjeta) con iconos y colores personalizados para mejor organización",
      smartBudgeting: "Sistema Avanzado de Presupuestos",
      smartBudgetingDesc: "Presupuestos por etiquetas con progreso en tiempo real e indicadores de colores para monitorear tu gasto",
      expenseTracking: "División Inteligente de Transacciones",
      expenseTrackingDesc: "Divide gastos con montos fijos o porcentajes entre varias personas. Ve quién debe qué con cálculos automáticos",
      analytics: "Transacciones Recurrentes",
      analyticsDesc: "Programa entradas automáticas semanales, quincenales, mensuales o anuales con repeticiones personalizables",
      security: "Dashboard de Análisis Avanzado",
      securityDesc: "Gráficos interactivos mostrando gastos por persona, distribución por etiquetas y tendencias de balance",
      icloudSync: "Sistema Completo de Transacciones",
      icloudSyncDesc: "Registra ingresos, gastos y transferencias con 150+ iconos en 10 categorías para organización sin esfuerzo",
      goals: "Widgets de iOS",
      goalsDesc: "Widgets pequeños y medianos con resúmenes de presupuesto, acciones rápidas y enlaces directos a la app",
      scanning: "Sincronización iCloud Segura (Pro)",
      scanningDesc: "Tu información está completamente cifrada en iCloud. No tenemos acceso a tus datos, garantizando máxima seguridad.",
      personalTracking: "Funciones Colaborativas (Pro)",
      personalTrackingDesc: "Conéctate con amigos, comparte entradas al instante y ve gastos individuales con reportes por persona",
      timeCost: "Calculadora de Costo en Tiempo (Pro)",
      timeCostDesc: "Descubre cuántas horas de trabajo te cuesta cada compra. Conecta tu gasto con tu tiempo para decidir mejor",
      periodComparison: "Comparación de Períodos",
      periodComparisonDesc: "Comparación automática con el período anterior. Ve al instante si estás gastando más o menos",
      savingsGoals: "Metas de Ahorro",
      savingsGoalsDesc: "Establece metas con fechas límite, visualiza el progreso y vincula objetivos a cuentas específicas",
      pricing: "Precios Simples",
      free: "Gratis",
      freeFeatures: ["Hasta 2 cuentas", "5 etiquetas inteligentes", "2 personas para divisiones", "3 presupuestos por período", "Sistema de widgets"],
      pro: "Pro",
      proPrice: "$4.99/mes",
      proFeatures: ["Cuentas ilimitadas", "Etiquetas ilimitadas", "Personas ilimitadas", "Presupuestos ilimitados", "Transacciones recurrentes", "Sincronización iCloud", "Funciones colaborativas", "Exportación CSV"],
      annual: "Anual",
      annualPrice: "$39.99/año",
      annualSavings: "Ahorra 33%",
      lifetime: "De por vida",
      lifetimePrice: "$79.99",
      lifetimeBest: "Mejor valor",
      comingSoon: "Próximamente",
      waitlistTitle: "Sé el primero en experimentar Budpoint",
      waitlistSubtitle: "Únete a miles esperando la app de finanzas más intuitiva",
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
      realTime: "Enfócate en TUS Gastos",
      realTimeDesc: "Monitorea solo tu gasto personal. Cuando alguien te pide comprar algo para ellos, no afecta tus presupuestos",
      smartNotifications: "Categorías Inteligentes de Presupuesto",
      smartNotificationsDesc: "Presupuestos dedicados para gastos sin etiqueta y etiquetas sin asignar, más reglas iniciales para empezar de inmediato",
      multiCurrency: "Compartir Gastos en Tiempo Real",
      multiCurrencyDesc: "Comparte costos con amigos o pareja al instante para que todos estén sincronizados y balanceados",
      betaTestersTitle: "Lo que Dicen los Beta Testers",
      betaTestersSubtitle: "Comentarios reales de usuarios tempranos que han estado probando Budpoint",
      testimonial1: "La interfaz es sencilla y no me costó nada adaptarme. Gracias a eso he podido mantener el registro de mis gastos por mucho más tiempo.",
      testimonial1Author: "Sarah M.",
      testimonial1Role: "Beta Tester",
      testimonial2: "Organizarnos con los gastos compartidos ahora es mucho más fácil. Mantenemos todo al día sin tener que hacer cuentas manuales.",
      testimonial2Author: "Mike R.",
      testimonial2Role: "Usuario Temprano",
      testimonial3: "Me ayuda a llegar a fin de mes sin sustos. Solo con ver los colores de las barras ya sé si tengo que frenar un poco el gasto.",
      testimonial3Author: "Jessica L.",
      testimonial3Role: "Beta Tester",
      faqTitle: "Preguntas Frecuentes",
      faqSubtitle: "Respuestas a preguntas comunes sobre Budpoint",
      faq1Question: "¿Cuándo estará disponible Budpoint?",
      faq1Answer: "Budpoint llegará pronto a iOS. ¡Únete a nuestra lista de espera para ser notificado cuando se lance!",
      faq2Question: "¿Hay una versión gratuita?",
      faq2Answer: "¡Sí! Budpoint ofrece un plan gratuito con 2 cuentas, 5 etiquetas y 2 personas para divisiones.",
      faq3Question: "¿Puedo compartir gastos con amigos?",
      faq3Answer: "¡Por supuesto! Los usuarios Pro pueden compartir gastos en tiempo real con amigos y parejas sin problema."
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
      name: 'transactions',
      title: { en: 'Transactions', es: 'Transacciones' },
      description: { en: 'Expense tracking', es: 'Seguimiento de gastos' }
    },
    {
      name: 'budgets',
      title: { en: 'Budgets', es: 'Presupuestos' },
      description: { en: 'Smart budgeting', es: 'Presupuestos inteligentes' }
    },
    {
      name: 'Shared',
      title: { en: 'Shared Transactions', es: 'Transacciones Compartidas' },
      description: { en: 'Share expenses with friends', es: 'Comparte gastos con amigos' }
    }
  ]

  const featureItems = [
    { title: currentLang.multiAccount, desc: currentLang.multiAccountDesc, path: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { title: currentLang.smartBudgeting, desc: currentLang.smartBudgetingDesc, path: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { title: currentLang.expenseTracking, desc: currentLang.expenseTrackingDesc, path: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { title: currentLang.analytics, desc: currentLang.analyticsDesc, path: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
    { title: currentLang.personalTracking, desc: currentLang.personalTrackingDesc, path: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { title: currentLang.security, desc: currentLang.securityDesc, path: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
    { title: currentLang.icloudSync, desc: currentLang.icloudSyncDesc, path: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10' },
    { title: currentLang.goals, desc: currentLang.goalsDesc, path: 'M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z' },
    { title: currentLang.scanning, desc: currentLang.scanningDesc, path: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12' },
    { title: currentLang.timeCost, desc: currentLang.timeCostDesc, path: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { title: currentLang.periodComparison, desc: currentLang.periodComparisonDesc, path: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { title: currentLang.savingsGoals, desc: currentLang.savingsGoalsDesc, path: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
  ]

  return (
    <>
      <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
        {/* Fixed Navigation */}
        <nav className={`fixed top-0 left-0 right-0 z-50 ${isDark ? 'bg-black/70' : 'bg-white/70'} backdrop-blur-xl border-b ${isDark ? 'border-gray-800/30' : 'border-gray-200/50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center space-x-3 group">
                <Image
                  src="/logo.png"
                  alt="Budpoint Logo"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
                <span className="text-xl font-semibold">Budpoint</span>
              </Link>
              <div className="flex items-center space-x-4">
                <Link
                  href="/blog"
                  className={`font-medium transition-opacity hover:opacity-70 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  Blog
                </Link>
                {/* Theme Toggle Button */}
                <button
                  onClick={toggleTheme}
                  className={`p-2 rounded-lg transition-all duration-300 ${isDark ? 'hover:bg-gray-800 text-yellow-400' : 'hover:bg-gray-100 text-gray-700'}`}
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

        <div className="pt-16">
          {/* Floating Section Navigation Dots - Desktop (right side) */}
          <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  const el = document.getElementById(section.id)
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
                className="group relative flex items-center justify-end"
                aria-label={section.label[language as keyof typeof section.label]}
              >
                {/* Label tooltip */}
                <span className={`absolute right-6 px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900 shadow-lg'}`}>
                  {section.label[language as keyof typeof section.label]}
                </span>
                {/* Dot */}
                <span className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeSection === section.id
                  ? isDark ? 'bg-white scale-125' : 'bg-black scale-125'
                  : isDark
                    ? 'bg-gray-600 hover:bg-gray-400'
                    : 'bg-gray-300 hover:bg-gray-500'
                  }`} />
              </button>
            ))}
          </div>

          {/* Floating Section Navigation - Mobile (bottom bar) */}
          <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 lg:hidden flex items-center gap-2 px-4 py-3 rounded-full backdrop-blur-xl ${isDark ? 'bg-gray-900/80 border border-gray-700' : 'bg-white/80 border border-gray-200 shadow-lg'}`}>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  const el = document.getElementById(section.id)
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
                className="relative p-1"
                aria-label={section.label[language as keyof typeof section.label]}
              >
                <span className={`block w-2 h-2 rounded-full transition-all duration-300 ${activeSection === section.id
                  ? isDark ? 'bg-white scale-125' : 'bg-black scale-125'
                  : isDark
                    ? 'bg-gray-600'
                    : 'bg-gray-300'
                  }`} />
              </button>
            ))}
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <motion.div id="hero" className="text-center py-20">
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
                  className="mx-auto rounded-3xl shadow-xl"
                />
              </motion.div>
              <motion.h1
                className={`text-4xl font-semibold sm:text-6xl mb-6 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}
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
                  className={`px-8 py-3 rounded-lg text-lg font-medium transition-opacity hover:opacity-80 ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}
                >
                  {currentLang.joinWaitlist}
                </button>
              </motion.div>
            </motion.div>

            <motion.div id="screenshots" className="pt-20 pb-10">
              <div className="text-center mb-16">
                <motion.h2
                  className="text-3xl font-semibold mb-4"
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
                      <div className="relative transition-all duration-500 hover:scale-105">
                        {/* iPhone Simulation - Realistic */}
                        <div className="relative max-w-[280px] md:max-w-[320px] lg:max-w-[350px] mx-auto">
                          {/* iPhone Frame */}
                          <div className={`relative rounded-[2rem] md:rounded-[2.5rem] ${isDark ? 'bg-gray-900' : 'bg-gray-800'} shadow-xl`}>
                            {/* Screen Container */}
                            <div className="relative p-2 md:p-2">
                              {/* Screen */}
                              <div className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-black">
                                <Image
                                  src={`/screenshots/${isDark ? 'dark' : 'light'}/${language}/${screenshot.name}.png`}
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
                          <div className="flex flex-col justify-center">
                            <div className={`font-semibold text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>{screenshot.title[language as keyof typeof screenshot.title]}</div>
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
            <div id="features" className="pt-10 pb-20">
              <h2 className="text-3xl font-semibold text-center mb-12">
                {currentLang.features}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px overflow-hidden rounded-xl border" style={{ borderColor: isDark ? 'rgb(255 255 255 / 10%)' : 'rgb(0 0 0 / 10%)' }}>
                {featureItems.map((item) => (
                  <div
                    key={item.title}
                    className={`p-8 ${isDark ? 'bg-black' : 'bg-white'}`}
                  >
                    <div className={`w-10 h-10 mb-5 flex items-center justify-center rounded-lg ${isDark ? 'bg-white/10' : 'bg-black/5'}`}>
                      <svg className={isDark ? 'w-5 h-5 text-white' : 'w-5 h-5 text-black'} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d={item.path} />
                      </svg>
                    </div>
                    <h3 className="text-base font-medium mb-2">{item.title}</h3>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Choose Budpoint Section */}
            <div id="why-choose" className="py-16">
              <h2 className="text-3xl font-semibold text-center mb-4">
                {currentLang.whyChoose}
              </h2>
              <p className={`text-lg text-center mb-12 ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
                {currentLang.whyChooseDesc}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
                {[
                  { title: currentLang.realTime, desc: currentLang.realTimeDesc, path: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
                  { title: currentLang.smartNotifications, desc: currentLang.smartNotificationsDesc, path: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' },
                  { title: currentLang.multiCurrency, desc: currentLang.multiCurrencyDesc, path: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
                ].map((item) => (
                  <div key={item.title} className="text-center">
                    <div className="w-10 h-10 mx-auto mb-4 flex items-center justify-center">
                      <svg className={isDark ? 'w-7 h-7 text-white' : 'w-7 h-7 text-black'} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d={item.path} />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                    <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Beta Testers Testimonials Section */}
            <div id="testimonials" className="py-20">
              <h2 className="text-3xl font-semibold text-center mb-4">
                {currentLang.betaTestersTitle}
              </h2>
              <p className={`text-lg text-center mb-12 ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
                {currentLang.betaTestersSubtitle}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-px overflow-hidden rounded-xl border max-w-6xl mx-auto" style={{ borderColor: isDark ? 'rgb(255 255 255 / 10%)' : 'rgb(0 0 0 / 10%)' }}>
                {[
                  { quote: currentLang.testimonial1, author: currentLang.testimonial1Author, role: currentLang.testimonial1Role },
                  { quote: currentLang.testimonial2, author: currentLang.testimonial2Author, role: currentLang.testimonial2Role },
                  { quote: currentLang.testimonial3, author: currentLang.testimonial3Author, role: currentLang.testimonial3Role },
                ].map((item) => (
                  <div key={item.author} className={`p-8 ${isDark ? 'bg-black' : 'bg-white'}`}>
                    <div className={`flex mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className={`mb-6 text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      &quot;{item.quote}&quot;
                    </p>
                    <div className="flex items-center">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium mr-3 ${isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-black'}`}>
                        {item.author.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{item.author}</p>
                        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{item.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Section */}
            <div id="pricing" className="py-20">
              <div className="text-center">
                <h2 className="text-3xl font-semibold mb-10">
                  {currentLang.pricing}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
                  {([
                    { key: 'free', name: currentLang.free, price: '$0', features: currentLang.freeFeatures, badge: null },
                    { key: 'pro', name: currentLang.pro, price: currentLang.proPrice, features: currentLang.proFeatures, badge: null },
                    { key: 'annual', name: currentLang.annual, price: currentLang.annualPrice, features: currentLang.proFeatures, badge: currentLang.annualSavings },
                    { key: 'lifetime', name: currentLang.lifetime, price: currentLang.lifetimePrice, features: currentLang.proFeatures, badge: currentLang.lifetimeBest },
                  ] as const).map((plan) => (
                    <div
                      key={plan.key}
                      className={`relative flex flex-col p-6 rounded-xl border cursor-pointer transition-colors duration-300 ${selectedPlan === plan.key
                        ? isDark ? 'border-white bg-gray-900' : 'border-black bg-white'
                        : isDark ? 'border-gray-800 bg-gray-900 hover:border-gray-600' : 'border-gray-200 bg-white hover:border-gray-400'
                        }`}
                      onClick={() => setSelectedPlan(plan.key)}
                    >
                      {plan.badge && (
                        <span className={`self-start mb-3 px-2.5 py-1 rounded-md text-xs font-medium ${isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-black'}`}>
                          {plan.badge}
                        </span>
                      )}
                      <h3 className="text-base font-medium mb-3">{plan.name}</h3>
                      <p className="text-2xl font-semibold mb-6">{plan.price}</p>
                      <ul className="text-left space-y-2 mb-8 flex-grow text-sm">
                        {plan.features.map((feature) => (
                          <li key={feature} className={`flex items-start gap-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <button className={`w-full py-3 rounded-lg font-medium mt-auto transition-opacity hover:opacity-80 ${isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-black'}`}>
                        {currentLang.comingSoon}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div id="faq" className="py-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-semibold mb-4">{currentLang.faqTitle}</h2>
                <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{currentLang.faqSubtitle}</p>
              </div>
              <div className={`max-w-3xl mx-auto divide-y ${isDark ? 'divide-gray-800' : 'divide-gray-200'}`}>
                {[
                  { q: currentLang.faq1Question, a: currentLang.faq1Answer },
                  { q: currentLang.faq2Question, a: currentLang.faq2Answer },
                  { q: currentLang.faq3Question, a: currentLang.faq3Answer },
                ].map((item) => (
                  <div key={item.q} className="py-6">
                    <h3 className="text-lg font-medium mb-2">{item.q}</h3>
                    <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Waitlist Section */}
            <div id="waitlist" className="py-20 text-center">
              <div>
                <h2 className="text-3xl font-semibold mb-4">
                  {currentLang.waitlistTitle}
                </h2>
                <p className={`text-lg mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {currentLang.waitlistSubtitle}
                </p>

                {submitStatus === 'success' ? (
                  <div className="max-w-md mx-auto">
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
                  </div>
                ) : (
                  <form
                    onSubmit={handleWaitlistSubmit}
                    className="max-w-md mx-auto"
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
                            className={`w-full px-4 py-3 border rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 ${isDark ? 'focus:ring-white/30' : 'focus:ring-black/20'} ${submitStatus === 'error'
                              ? isDark ? 'bg-red-900/20 border-red-800 text-white placeholder-red-400' : 'bg-red-50 border-red-300 text-gray-900 placeholder-red-400'
                              : showValidation
                                ? isEmailValid
                                  ? isDark ? 'bg-green-900/20 border-green-700 text-white placeholder-gray-400' : 'bg-green-50 border-green-300 text-gray-900'
                                  : isDark ? 'bg-red-900/20 border-red-700 text-white placeholder-gray-400' : 'bg-red-50 border-red-300 text-gray-900'
                                : isDark ? 'bg-gray-800/80 border-gray-600 text-white placeholder-gray-400' : 'bg-white/80 border-gray-300 text-gray-900'
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
                        className={`px-6 py-3 rounded-lg font-medium transition-opacity duration-300 self-start ${isSubmitting || !email.trim() || (showValidation && !isEmailValid)
                          ? isDark ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : isDark ? 'bg-white text-black hover:opacity-80' : 'bg-black text-white hover:opacity-80'
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
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Footer - Outside main container for full width */}
        <Footer isDark={isDark} />
      </div>
    </>
  )
}