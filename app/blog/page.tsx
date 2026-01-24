'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// Lista de posts con títulos en ambos idiomas
const posts = [
  {
    slug: 'how-to-choose-budget-period',
    title: {
      es: 'Cómo Elegir el Periodo de tu Presupuesto',
      en: 'How to Choose Your Budget Period',
    },
    description: {
      es: '¿Mensual, quincenal o por corte de tarjeta? Descubre cuál periodo funciona mejor para ti.',
      en: 'Monthly, biweekly, or billing cycle? Find out which budget period works best for you.',
    },
    date: {
      es: '22 de Enero, 2026',
      en: 'January 22, 2026',
    },
    readTime: {
      es: '8 min',
      en: '8 min',
    },
    tags: {
      es: ['Presupuesto', 'Tips', 'Guía'],
      en: ['Budgeting', 'Tips', 'Guide'],
    },
    color: 'blue',
  },
  {
    slug: 'why-budgeting-matters',
    title: {
      es: 'Por Qué es Importante Armar un Presupuesto',
      en: 'Why Budgeting Matters',
    },
    description: {
      es: 'Datos y estudios que demuestran cómo un presupuesto puede transformar tu bienestar financiero y reducir el estrés.',
      en: 'Data and studies showing how a budget can transform your financial well-being and reduce stress.',
    },
    date: {
      es: '21 de Enero, 2026',
      en: 'January 21, 2026',
    },
    readTime: {
      es: '10 min',
      en: '10 min',
    },
    tags: {
      es: ['Presupuesto', 'Finanzas', 'Datos'],
      en: ['Budgeting', 'Finance', 'Data'],
    },
    color: 'purple',
  },
  {
    slug: 'welcome-to-budpoint',
    title: {
      es: 'Bienvenido al Blog de Budpoint',
      en: 'Welcome to the Budpoint Blog',
    },
    description: {
      es: 'Descubre cómo Budpoint te ayudará a tomar control de tus finanzas personales de forma inteligente.',
      en: 'Discover how Budpoint will help you take control of your personal finances smartly.',
    },
    date: {
      es: '18 de Enero, 2026',
      en: 'January 18, 2026',
    },
    readTime: {
      es: '3 min',
      en: '3 min',
    },
    tags: {
      es: ['Anuncios', 'Budpoint'],
      en: ['Announcements', 'Budpoint'],
    },
    color: 'green',
  },
  {
    slug: '5-tips-to-save-money',
    title: {
      es: '5 Tips para Ahorrar Dinero en 2026',
      en: '5 Tips to Save Money in 2026',
    },
    description: {
      es: 'Estrategias prácticas para mejorar tus finanzas personales y empezar a ahorrar desde hoy.',
      en: 'Practical strategies to improve your personal finances and start saving today.',
    },
    date: {
      es: '15 de Enero, 2026',
      en: 'January 15, 2026',
    },
    readTime: {
      es: '8 min',
      en: '8 min',
    },
    tags: {
      es: ['Tips', 'Finanzas'],
      en: ['Tips', 'Finance'],
    },
    color: 'orange',
  },
]

const translations = {
  es: {
    title: 'Blog',
    subtitle: 'Tips, noticias y guías sobre finanzas personales',
    readTime: 'lectura',
  },
  en: {
    title: 'Blog',
    subtitle: 'Tips, news, and guides about personal finance',
    readTime: 'read',
  },
}

const colorClasses = {
  blue: {
    border: 'hover:border-blue-500/50',
    shadow: 'hover:shadow-blue-500/10',
    tag: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    accent: 'border-l-blue-500',
  },
  purple: {
    border: 'hover:border-purple-500/50',
    shadow: 'hover:shadow-purple-500/10',
    tag: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    accent: 'border-l-purple-500',
  },
  green: {
    border: 'hover:border-green-500/50',
    shadow: 'hover:shadow-green-500/10',
    tag: 'bg-green-500/10 text-green-600 dark:text-green-400',
    accent: 'border-l-green-500',
  },
  orange: {
    border: 'hover:border-orange-500/50',
    shadow: 'hover:shadow-orange-500/10',
    tag: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
    accent: 'border-l-orange-500',
  },
}

export default function BlogPage() {
  const [language, setLanguage] = useState<'es' | 'en'>('es')
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const browserLang = navigator.language.startsWith('es') ? 'es' : 'en'
    setLanguage(browserLang)

    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDark(darkModeQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches)
    darkModeQuery.addEventListener('change', handleChange)
    return () => darkModeQuery.removeEventListener('change', handleChange)
  }, [])

  const t = translations[language]

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gradient">{t.title}</h1>
        <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {t.subtitle}
        </p>
      </div>

      {/* Posts Grid */}
      <div className="space-y-6">
        {posts.map((post) => {
          const colors = colorClasses[post.color as keyof typeof colorClasses]
          return (
            <article
              key={post.slug}
              className={`group p-6 rounded-xl border-l-4 ${colors.accent} ${isDark ? 'bg-gray-900/50' : 'bg-gray-50/80'} border border-transparent ${colors.border} transition-all duration-300 hover:shadow-xl ${isDark ? colors.shadow : colors.shadow}`}
            >
              <Link href={`/blog/posts/${post.slug}`}>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <h2 className={`text-2xl font-semibold mb-2 group-hover:text-blue-500 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {post.title[language]}
                    </h2>
                    <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {post.description[language]}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags[language].map((tag) => (
                        <span
                          key={tag}
                          className={`px-3 py-1 text-sm rounded-full font-medium ${colors.tag}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className={`text-sm whitespace-nowrap ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    <p>{post.date[language]}</p>
                    <p>{post.readTime[language]} {t.readTime}</p>
                  </div>
                </div>
              </Link>
            </article>
          )
        })}
      </div>
    </div>
  )
}
