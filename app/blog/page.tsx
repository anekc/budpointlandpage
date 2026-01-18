'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// Lista de posts con títulos en ambos idiomas
const posts = [
  {
    slug: 'bienvenido-a-budpoint',
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
  },
  {
    slug: '5-tips-para-ahorrar',
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
      es: '5 min',
      en: '5 min',
    },
    tags: {
      es: ['Tips', 'Finanzas'],
      en: ['Tips', 'Finance'],
    },
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

export default function BlogPage() {
  const [language, setLanguage] = useState<'es' | 'en'>('es')

  useEffect(() => {
    const browserLang = navigator.language.startsWith('es') ? 'es' : 'en'
    setLanguage(browserLang)
  }, [])

  const t = translations[language]

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {t.subtitle}
        </p>
      </div>

      {/* Posts Grid */}
      <div className="space-y-8">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="group p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
          >
            <Link href={`/blog/posts/${post.slug}`}>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                    {post.title[language]}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {post.description[language]}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags[language].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-500 whitespace-nowrap">
                  <p>{post.date[language]}</p>
                  <p>{post.readTime[language]} {t.readTime}</p>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
