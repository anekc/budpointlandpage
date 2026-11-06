'use client'

import Link from 'next/link'
import { useLanguage } from '../components/LanguageContext'
import { AccentButton } from '../components/SiteChrome'
import { posts } from './posts'

const copy = {
  es: { back: 'Volver al blog', readTime: 'de lectura', ctaTitle: 'Pon esto en práctica con Budpoint.', cta: 'Quiero estar en la lista' },
  en: { back: 'Back to blog', readTime: 'read', ctaTitle: 'Put this into practice with Budpoint.', cta: 'Join the waitlist' },
}

/** Frame for one blog post: meta line, the MDX article in the reading column, and a closing CTA. */
export function BlogPost({ slug, ContentEs, ContentEn }: {
  slug: string
  ContentEs: React.ComponentType
  ContentEn: React.ComponentType
}) {
  const { lang } = useLanguage()
  const t = copy[lang]
  const post = posts.find(p => p.slug === slug)
  const Content = lang === 'es' ? ContentEs : ContentEn

  return (
    <div className="mx-auto max-w-[44rem] pt-10 pb-20 md:pt-14">
      <Link href="/blog" className="group inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: 'var(--muted)' }}>
        <span className="transition-transform group-hover:-translate-x-0.5">←</span> {t.back}
      </Link>

      {post && (
        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm" style={{ color: 'var(--muted)' }}>
          <span>{post.date[lang]}</span>
          <span>{post.readTime[lang]} {t.readTime}</span>
          <div className="flex flex-wrap gap-1.5">
            {post.tags[lang].map(tag => (
              <span key={tag} className="rounded-md px-2 py-0.5 text-xs font-medium" style={{ background: 'var(--track)' }}>{tag}</span>
            ))}
          </div>
        </div>
      )}

      <article className="nb-prose nb-article mt-4">
        <Content />
      </article>

      <div className="nb-card mt-16 flex flex-col items-start gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="text-xl font-semibold tracking-tight">{t.ctaTitle}</div>
        <AccentButton href="/#join">{t.cta}</AccentButton>
      </div>
    </div>
  )
}
