'use client'

import { SiteShell } from './SiteChrome'
import { useLanguage } from './LanguageContext'

export interface LegalSection {
  id: string
  title: string
  body: React.ReactNode
}

export interface LegalContent {
  label: string
  title: string
  updated: string
  intro?: React.ReactNode
  sections: LegalSection[]
}

const ui = {
  en: { contents: 'On this page' },
  es: { contents: 'En esta página' },
}

/** Shared frame for Privacy and Terms: title block, sticky index on desktop, readable column. */
export function LegalPage({ content }: { content: Record<'en' | 'es', LegalContent> }) {
  const { lang } = useLanguage()
  const c = content[lang]

  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pt-14 pb-10 md:pt-20" style={{ borderBottom: '1px solid var(--stroke)' }}>
          <div className="nb-label">{c.label}</div>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.035em] sm:text-6xl">{c.title}</h1>
          <p className="mt-4 text-sm" style={{ color: 'var(--muted)' }}>{c.updated}</p>
        </div>

        <div className="grid gap-12 py-12 lg:grid-cols-[220px_1fr] lg:gap-20 lg:py-16">
          <aside className="hidden lg:block">
            <nav className="sticky top-24">
              <div className="nb-label">{ui[lang].contents}</div>
              <ol className="mt-4 space-y-2.5 text-sm" style={{ color: 'var(--muted)' }}>
                {c.sections.map((s, i) => (
                  <li key={s.id} className="flex gap-3">
                    <span className="nb-num w-5 shrink-0" style={{ color: 'var(--accent-text)' }}>{String(i + 1).padStart(2, '0')}</span>
                    <a href={`#${s.id}`} className="hover:text-[var(--text)]">{s.title}</a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="nb-prose max-w-2xl pb-8">
            {c.intro && <div className="text-lg leading-relaxed" style={{ color: 'var(--text)' }}>{c.intro}</div>}
            {c.sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2>
                  <span className="nb-num mr-3 text-base font-medium" style={{ color: 'var(--accent-text)' }}>{String(i + 1).padStart(2, '0')}</span>
                  {s.title}
                </h2>
                {s.body}
              </section>
            ))}
          </article>
        </div>
      </div>
    </SiteShell>
  )
}
