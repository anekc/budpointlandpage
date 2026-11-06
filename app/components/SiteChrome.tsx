'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useTheme } from './ThemeContext'
import { useLanguage } from './LanguageContext'

const chrome = {
  en: { features: 'Features', pricing: 'Pricing', faq: 'FAQ', blog: 'Blog', cta: 'Join the list', support: 'Support', privacy: 'Privacy', terms: 'Terms' },
  es: { features: 'Funciones', pricing: 'Precios', faq: 'Preguntas', blog: 'Blog', cta: 'Avísame', support: 'Soporte', privacy: 'Privacidad', terms: 'Términos' },
}

export function AccentButton({ children, href, onClick, type, disabled }: {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  type?: 'submit'
  disabled?: boolean
}) {
  const cls = 'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[15px] font-semibold transition-transform active:scale-[0.97] hover:brightness-[1.04] disabled:opacity-60'
  const style = { background: 'var(--accent)', color: 'var(--on-accent)' }
  if (href) return <a href={href} className={cls} style={style}>{children}</a>
  return <button type={type ?? 'button'} onClick={onClick} disabled={disabled} className={cls} style={style}>{children}</button>
}

export function SiteHeader() {
  const { isDark, toggleTheme } = useTheme()
  const { lang, switchLang } = useLanguage()
  const pathname = usePathname()
  const c = chrome[lang]
  const linkCls = (active: boolean) => active ? 'text-[var(--text)]' : 'hover:text-[var(--text)]'

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl" style={{ background: 'color-mix(in srgb, var(--bg) 82%, transparent)', borderBottom: '1px solid var(--stroke)' }}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="" width={28} height={28} className="rounded-[8px]" />
          <span className="text-lg font-semibold tracking-tight">Budpoint</span>
        </Link>
        <nav className="hidden items-center gap-7 text-[15px] md:flex" style={{ color: 'var(--muted)' }}>
          <Link href="/#features" className={linkCls(false)}>{c.features}</Link>
          <Link href="/#pricing" className={linkCls(false)}>{c.pricing}</Link>
          <Link href="/#faq" className={linkCls(false)}>{c.faq}</Link>
          <Link href="/blog" className={linkCls(pathname.startsWith('/blog'))}>{c.blog}</Link>
        </nav>
        <div className="flex items-center gap-1.5">
          <button onClick={switchLang} className="h-9 rounded-full px-3 text-sm font-medium hover:bg-[var(--track)]" aria-label={lang === 'en' ? 'Cambiar a español' : 'Switch to English'}>
            {lang === 'en' ? 'ES' : 'EN'}
          </button>
          <button onClick={toggleTheme} className="grid h-9 w-9 place-items-center rounded-full hover:bg-[var(--track)]" aria-label={isDark ? 'Light mode' : 'Dark mode'}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              {isDark
                ? <path d="M12 3v2m0 14v2M5.6 5.6l1.4 1.4m10 10 1.4 1.4M3 12h2m14 0h2M5.6 18.4 7 17M17 7l1.4-1.4M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
                : <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" />}
            </svg>
          </button>
          <span className="ml-1 hidden sm:block"><AccentButton href="/#join">{c.cta}</AccentButton></span>
        </div>
      </div>
    </header>
  )
}

export function SiteFooter() {
  const { lang } = useLanguage()
  const c = chrome[lang]
  return (
    <footer style={{ borderTop: '1px solid var(--stroke)' }}>
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6" style={{ color: 'var(--muted)' }}>
        <div className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="" width={22} height={22} className="rounded-[6px]" />
          <span>© {new Date().getFullYear()} Budpoint</span>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/blog" className="hover:text-[var(--text)]">{c.blog}</Link>
          <Link href="/support" className="hover:text-[var(--text)]">{c.support}</Link>
          <Link href="/privacy" className="hover:text-[var(--text)]">{c.privacy}</Link>
          <Link href="/terms" className="hover:text-[var(--text)]">{c.terms}</Link>
        </div>
      </div>
    </footer>
  )
}

/** Page frame for every screen outside the landing: Nocturno background, header and footer. */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="nb flex min-h-screen flex-col overflow-x-clip">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
