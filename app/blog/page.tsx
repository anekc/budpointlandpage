'use client'

import Link from 'next/link'
import { useLanguage } from '../components/LanguageContext'
import { posts } from './posts'

const copy = {
  es: {
    title: 'Blog',
    subtitle: 'Tips, noticias y guías sobre finanzas personales.',
    latest: 'Lo más reciente',
    read: 'Leer',
    readTime: 'de lectura',
  },
  en: {
    title: 'Blog',
    subtitle: 'Tips, news and guides about personal finance.',
    latest: 'Latest',
    read: 'Read',
    readTime: 'read',
  },
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map(tag => (
        <span key={tag} className="rounded-md px-2 py-0.5 text-xs font-medium" style={{ background: 'var(--track)', color: 'var(--muted)' }}>{tag}</span>
      ))}
    </div>
  )
}

export default function BlogPage() {
  const { lang } = useLanguage()
  const t = copy[lang]
  const [featured, ...rest] = posts

  return (
    <div className="pb-20">
      <div className="pt-14 pb-10 md:pt-20">
        <div className="nb-label">Budpoint</div>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.035em] sm:text-6xl">{t.title}</h1>
        <p className="mt-4 max-w-lg text-lg" style={{ color: 'var(--muted)' }}>{t.subtitle}</p>
      </div>

      <Link href={`/blog/posts/${featured.slug}`} className="nb-card group block p-6 transition-colors hover:border-[var(--muted)] sm:p-10">
        <div className="nb-label" style={{ color: 'var(--accent-text)' }}>{t.latest}</div>
        <h2 className="mt-4 max-w-3xl text-3xl leading-[1.1] font-semibold tracking-[-0.03em] sm:text-[44px]">{featured.title[lang]}</h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed" style={{ color: 'var(--muted)' }}>{featured.description[lang]}</p>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: 'var(--muted)' }}>
            <span>{featured.date[lang]}</span>
            <span>{featured.readTime[lang]} {t.readTime}</span>
            <Tags tags={featured.tags[lang]} />
          </div>
          <span className="inline-flex items-center gap-1.5 font-medium">
            {t.read} <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </span>
        </div>
      </Link>

      <div className="mt-12">
        {rest.map(post => (
          <Link
            key={post.slug}
            href={`/blog/posts/${post.slug}`}
            className="group grid gap-3 py-7 sm:grid-cols-[180px_1fr_auto] sm:gap-8"
            style={{ borderTop: '1px solid var(--stroke)' }}
          >
            <div className="text-sm" style={{ color: 'var(--muted)' }}>
              <div>{post.date[lang]}</div>
              <div className="mt-0.5">{post.readTime[lang]} {t.readTime}</div>
            </div>
            <div>
              <h2 className="text-xl font-semibold tracking-tight group-hover:text-[var(--accent-text)] sm:text-2xl">{post.title[lang]}</h2>
              <p className="mt-2 max-w-2xl leading-relaxed" style={{ color: 'var(--muted)' }}>{post.description[lang]}</p>
              <div className="mt-3"><Tags tags={post.tags[lang]} /></div>
            </div>
            <span className="hidden text-xl transition-transform group-hover:translate-x-0.5 sm:block" style={{ color: 'var(--muted)' }}>→</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
