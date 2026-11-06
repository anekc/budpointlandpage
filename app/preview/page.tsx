'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { useTheme } from '../components/ThemeContext'
import {
  AccountSplitsCard,
  ApplePayToast,
  BalanceCard,
  BudgetCard,
  type Lang,
  PeriodCard,
  SharedCard,
  TransactionsCard,
} from './ui'

const EASE = [0.22, 1, 0.36, 1] as const

const copy = {
  en: {
    nav: { features: 'Features', pricing: 'Pricing', faq: 'FAQ', blog: 'Blog', cta: 'Join the list' },
    hero: {
      eyebrow: 'Personal finance for iPhone',
      title: ['Know where your money went.', 'Before the month ends.'],
      body: 'Budpoint keeps your accounts, budgets and the expenses you share with other people in one place, and keeps what’s yours apart from what isn’t.',
      cta: 'Join the waitlist',
      secondary: 'See how it works',
      meta: 'Free to start · Pro from $4.99/mo · Spanish & English',
    },
    chapters: [
      {
        label: 'Dashboard',
        title: 'The whole month on one screen.',
        body: 'See which day of the period you’re on, how much is left, and which account the money is coming out of. No digging through menus.',
        points: ['Custom periods that match your paycheck', 'Spending split by account and by person', 'Every account with its live balance'],
      },
      {
        label: 'Transactions',
        title: 'Log it once. Or don’t log it at all.',
        body: 'Pay with Apple Pay and the purchase lands in Budpoint on its own, waiting for you to confirm it. Bank email alerts work too.',
        points: ['Income, expenses and transfers', 'Recurring entries that create themselves', 'Mark a purchase as “not mine” so it never touches your budget'],
      },
      {
        label: 'Budgets & goals',
        title: 'A plan that splits your income for you.',
        body: 'Pick a rule like 50/30/20 and Budpoint divides what comes in. Anything outside the plan shows up separately, so it doesn’t hide in the totals.',
        points: ['Budgets by tag, with live progress', 'Savings goals tied to real accounts', 'Untagged spending gets its own bucket'],
      },
      {
        label: 'Shared',
        title: 'Split the bill. Skip the spreadsheet.',
        body: 'Send someone their share with their Budpoint code. They accept it and it’s in their app, already tagged. You always know who owes whom.',
        points: ['Split by fixed amounts or percentages', 'Pending and accepted at a glance', 'Settle up straight from your card balances'],
      },
    ],
    moreTitle: 'And the details that make it stick.',
    more: [
      { t: 'Apple Pay automation', d: 'One Shortcut, set up once. Every tap-to-pay purchase is captured for you.', i: 'bolt' },
      { t: 'Card reconciliation', d: 'Know exactly how much to pay on each card, and who still owes you.', i: 'scale' },
      { t: 'CSV import with drafts', d: 'Bring your history from a spreadsheet. Review each row before it’s saved.', i: 'table' },
      { t: 'iCloud backup & restore', d: 'New phone? Sign in and everything comes back. We never see your data.', i: 'cloud' },
      { t: 'Home Screen widgets', d: 'Your budget and a quick-add button without opening the app.', i: 'grid' },
      { t: 'Face ID lock', d: 'Your numbers stay yours, even if someone borrows your phone.', i: 'lock' },
    ],
    screensTitle: 'Light or dark, it follows your iPhone.',
    screens: ['Dashboard', 'Transactions', 'Budgets', 'Shared'],
    pricingTitle: 'Simple pricing.',
    pricingBody: 'Start free. Upgrade when you need more accounts, more people or iCloud sync.',
    plans: [
      { name: 'Free', price: '$0', per: '', note: 'Forever', features: ['2 accounts', '5 tags', '2 people for splits', '3 budgets per period', 'Widgets'] },
      { name: 'Monthly', price: '$4.99', per: '/mo', note: '7-day free trial', features: ['Everything unlimited', 'iCloud sync & restore', 'Shared expenses', 'Recurring entries', 'CSV & PDF export'] },
      { name: 'Annual', price: '$39.99', per: '/yr', note: '14-day free trial', badge: 'Save 33%', features: ['Everything in Monthly', 'About $3.33 a month'] },
      { name: 'Lifetime', price: '$79.99', per: '', note: 'Pay once', features: ['Everything in Pro, forever', 'No subscription'] },
    ],
    faqTitle: 'Questions',
    faq: [
      { q: 'When is Budpoint available?', a: 'It’s in final testing on iOS. Join the list and we’ll email you the day it’s on the App Store.' },
      { q: 'Does Budpoint connect to my bank?', a: 'No. Nothing asks for your bank password. Purchases come in through Apple Pay Shortcuts, your bank’s email alerts, CSV import, or by hand.' },
      { q: 'Who can see my data?', a: 'Your data lives on your iPhone and in your own iCloud account. Only the expenses you share go through our servers, so they can reach the other person.' },
      { q: 'Can I use it with my partner or roommates?', a: 'Yes. Each person uses their own Budpoint and you send each other shared expenses with your Budpoint codes.' },
    ],
    ctaTitle: 'Start next month with a plan.',
    ctaBody: 'Leave your email and we’ll let you know when Budpoint is live.',
    email: 'you@email.com',
    join: 'Join',
    joining: 'Joining…',
    ok: 'You’re on the list. We’ll be in touch.',
    err: 'That email didn’t work. Try again in a few seconds.',
    footer: { privacy: 'Privacy', terms: 'Terms', support: 'Support' },
  },
  es: {
    nav: { features: 'Funciones', pricing: 'Precios', faq: 'Preguntas', blog: 'Blog', cta: 'Unirme' },
    hero: {
      eyebrow: 'Finanzas personales para iPhone',
      title: ['Sabe a dónde se fue tu dinero.', 'Antes de que acabe el mes.'],
      body: 'Budpoint junta tus cuentas, tus presupuestos y los gastos que compartes con otras personas, y separa lo que es tuyo de lo que no.',
      cta: 'Unirme a la lista',
      secondary: 'Ver cómo funciona',
      meta: 'Gratis para empezar · Pro desde $4.99/mes · Español e inglés',
    },
    chapters: [
      {
        label: 'Dashboard',
        title: 'Todo el mes en una sola pantalla.',
        body: 'Ve en qué día del periodo vas, cuánto te queda y de qué cuenta está saliendo el dinero. Sin buscar entre menús.',
        points: ['Periodos a la medida de tu quincena', 'Gasto dividido por cuenta y por persona', 'Cada cuenta con su saldo al momento'],
      },
      {
        label: 'Movimientos',
        title: 'Anótalo una vez. O no lo anotes.',
        body: 'Paga con Apple Pay y la compra llega sola a Budpoint, lista para que la confirmes. También funciona con los correos de tu banco.',
        points: ['Ingresos, gastos y transferencias', 'Movimientos recurrentes que se crean solos', 'Marca una compra como “no es mía” y no toca tu presupuesto'],
      },
      {
        label: 'Presupuestos y metas',
        title: 'Un plan que reparte tu ingreso por ti.',
        body: 'Elige una regla como 50/30/20 y Budpoint divide lo que entra. Lo que se sale del plan lo ves aparte, para que no se esconda en los totales.',
        points: ['Presupuestos por etiqueta con avance en vivo', 'Metas de ahorro ligadas a cuentas reales', 'Lo que no tiene etiqueta tiene su propio lugar'],
      },
      {
        label: 'Compartidos',
        title: 'Divide la cuenta. Olvídate del Excel.',
        body: 'Mándale a alguien su parte con su código Budpoint. La acepta y ya está en su app, con su etiqueta. Siempre sabes quién le debe a quién.',
        points: ['Divide por montos fijos o porcentajes', 'Pendientes y aceptados de un vistazo', 'Cuadra todo desde el saldo de tus tarjetas'],
      },
    ],
    moreTitle: 'Y los detalles que hacen que lo sigas usando.',
    more: [
      { t: 'Automatización con Apple Pay', d: 'Un Atajo que configuras una vez. Cada compra con Apple Pay se registra sola.', i: 'bolt' },
      { t: 'Cuadre de tarjetas', d: 'Sabe cuánto pagar de cada tarjeta y quién todavía te debe.', i: 'scale' },
      { t: 'Importa desde CSV', d: 'Trae tu historial de una hoja de cálculo. Revisa cada fila antes de guardarla.', i: 'table' },
      { t: 'Respaldo en iCloud', d: '¿Teléfono nuevo? Inicia sesión y todo regresa. Nosotros nunca vemos tus datos.', i: 'cloud' },
      { t: 'Widgets', d: 'Tu presupuesto y un botón para agregar gastos sin abrir la app.', i: 'grid' },
      { t: 'Bloqueo con Face ID', d: 'Tus números son tuyos, aunque alguien te pida el teléfono.', i: 'lock' },
    ],
    screensTitle: 'Claro u oscuro, sigue a tu iPhone.',
    screens: ['Dashboard', 'Movimientos', 'Presupuestos', 'Compartidos'],
    pricingTitle: 'Precios simples.',
    pricingBody: 'Empieza gratis. Pásate a Pro cuando necesites más cuentas, más personas o sincronizar con iCloud.',
    plans: [
      { name: 'Gratis', price: '$0', per: '', note: 'Para siempre', features: ['2 cuentas', '5 etiquetas', '2 personas para dividir', '3 presupuestos por periodo', 'Widgets'] },
      { name: 'Mensual', price: '$4.99', per: '/mes', note: '7 días de prueba gratis', features: ['Todo ilimitado', 'Sincronización y respaldo en iCloud', 'Gastos compartidos', 'Movimientos recurrentes', 'Exporta a CSV y PDF'] },
      { name: 'Anual', price: '$39.99', per: '/año', note: '14 días de prueba gratis', badge: 'Ahorra 33%', features: ['Todo lo del plan mensual', 'Unos $3.33 al mes'] },
      { name: 'De por vida', price: '$79.99', per: '', note: 'Un solo pago', features: ['Todo Pro, para siempre', 'Sin suscripción'] },
    ],
    faqTitle: 'Preguntas',
    faq: [
      { q: '¿Cuándo sale Budpoint?', a: 'Está en las últimas pruebas en iOS. Únete a la lista y te escribimos el día que esté en el App Store.' },
      { q: '¿Se conecta a mi banco?', a: 'No. Nada te pide la contraseña de tu banco. Las compras llegan por Atajos de Apple Pay, los correos de tu banco, importando un CSV o a mano.' },
      { q: '¿Quién puede ver mis datos?', a: 'Tus datos viven en tu iPhone y en tu propia cuenta de iCloud. Solo los gastos que compartes pasan por nuestros servidores, para llegarle a la otra persona.' },
      { q: '¿Lo puedo usar con mi pareja o roomies?', a: 'Sí. Cada quien usa su Budpoint y se mandan los gastos compartidos con su código.' },
    ],
    ctaTitle: 'Empieza el próximo mes con un plan.',
    ctaBody: 'Déjanos tu correo y te avisamos cuando Budpoint esté disponible.',
    email: 'tu@correo.com',
    join: 'Unirme',
    joining: 'Enviando…',
    ok: 'Listo, ya estás en la lista. Te escribimos pronto.',
    err: 'Ese correo no funcionó. Inténtalo de nuevo en unos segundos.',
    footer: { privacy: 'Privacidad', terms: 'Términos', support: 'Soporte' },
  },
}

const icons: Record<string, string> = {
  bolt: 'M13 2 4 14h7l-1 8 9-12h-7l1-8Z',
  scale: 'M12 3v18M5 7h14M5 7l-3 7a3 3 0 0 0 6 0L5 7Zm14 0-3 7a3 3 0 0 0 6 0l-3-7ZM8 21h8',
  table: 'M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5Zm0 5h18M9 10v11',
  cloud: 'M7 18a4 4 0 0 1-.9-7.9A5 5 0 0 1 15.9 8 4.5 4.5 0 0 1 17 18H7Zm5-7v5m0 0-2-2m2 2 2-2',
  grid: 'M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm12.5 0v7M13 16.5h7',
  lock: 'M6 11h12v10H6V11Zm2 0V8a4 4 0 1 1 8 0v3m-4 4v2',
}

function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

function AccentButton({ children, href, onClick, type, disabled }: {
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

const chapterCards = [AccountSplitsCard, TransactionsCard, BudgetCard, SharedCard]
const chapterCompanions = [PeriodCard, BalanceCard, null, null]
const screenFiles = ['dashboard', 'transactions', 'budgets', 'Shared']

export default function PreviewPage() {
  const { isDark, toggleTheme } = useTheme()
  const [lang, setLang] = useState<Lang>('en')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle')
  const c = copy[lang]

  useEffect(() => {
    const saved = localStorage.getItem('budpoint-lang')
    if (saved === 'en' || saved === 'es') setLang(saved)
    else if (navigator.language.startsWith('es')) setLang('es')
  }, [])

  const switchLang = () => {
    const next = lang === 'en' ? 'es' : 'en'
    setLang(next)
    try { localStorage.setItem('budpoint-lang', next) } catch {}
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('err')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/mnnvdwdy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'Budpoint Landing Page', language: lang, timestamp: new Date().toISOString() }),
      })
      setStatus(res.ok ? 'ok' : 'err')
      if (res.ok) setEmail('')
    } catch {
      setStatus('err')
    }
  }

  return (
    <div className="nb min-h-screen overflow-x-clip">
      {/* Nav */}
      <header className="sticky top-0 z-50 backdrop-blur-xl" style={{ background: 'color-mix(in srgb, var(--bg) 82%, transparent)', borderBottom: '1px solid var(--stroke)' }}>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/preview" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="" width={28} height={28} className="rounded-[8px]" />
            <span className="text-lg font-semibold tracking-tight">Budpoint</span>
          </Link>
          <nav className="hidden items-center gap-7 text-[15px] md:flex" style={{ color: 'var(--muted)' }}>
            <a href="#features" className="hover:text-[var(--text)]">{c.nav.features}</a>
            <a href="#pricing" className="hover:text-[var(--text)]">{c.nav.pricing}</a>
            <a href="#faq" className="hover:text-[var(--text)]">{c.nav.faq}</a>
            <Link href="/blog" className="hover:text-[var(--text)]">{c.nav.blog}</Link>
          </nav>
          <div className="flex items-center gap-1.5">
            <button onClick={switchLang} className="h-9 rounded-full px-3 text-sm font-medium hover:bg-[var(--track)]" aria-label="Change language">
              {lang === 'en' ? 'ES' : 'EN'}
            </button>
            <button onClick={toggleTheme} className="grid h-9 w-9 place-items-center rounded-full hover:bg-[var(--track)]" aria-label={isDark ? 'Light mode' : 'Dark mode'}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                {isDark
                  ? <path d="M12 3v2m0 14v2M5.6 5.6l1.4 1.4m10 10 1.4 1.4M3 12h2m14 0h2M5.6 18.4 7 17M17 7l1.4-1.4M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
                  : <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" />}
              </svg>
            </button>
            <span className="ml-1 hidden sm:block"><AccentButton href="#join">{c.nav.cta}</AccentButton></span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-14 px-4 pt-14 pb-20 sm:px-6 md:pt-20 lg:grid-cols-[1.1fr_1fr] lg:gap-10 lg:pb-28">
        <div>
          <Reveal><div className="nb-label">{c.hero.eyebrow}</div></Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 text-[42px] leading-[1.02] font-semibold tracking-[-0.035em] sm:text-6xl lg:text-[68px]">
              {c.hero.title[0]}{' '}
              <span style={{ color: 'var(--muted)' }}>{c.hero.title[1]}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-[34rem] text-lg leading-relaxed" style={{ color: 'var(--muted)' }}>{c.hero.body}</p>
          </Reveal>
          <Reveal delay={0.18} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <AccentButton href="#join">{c.hero.cta}</AccentButton>
            <a href="#features" className="group inline-flex items-center gap-1.5 text-[15px] font-medium">
              {c.hero.secondary}
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          </Reveal>
          <Reveal delay={0.24}><p className="mt-8 text-sm" style={{ color: 'var(--muted)' }}>{c.hero.meta}</p></Reveal>
        </div>

        <div className="relative mx-auto w-full max-w-[440px]">
          <div className="absolute -top-6 right-0 left-6 z-20 sm:-right-8 sm:left-auto sm:w-[320px]">
            <ApplePayToast lang={lang} />
          </div>
          <Reveal delay={0.15} className="relative z-10 pt-14"><PeriodCard lang={lang} /></Reveal>
          <Reveal delay={0.3} className="relative z-0 mt-3 sm:ml-10 sm:-mr-6"><BalanceCard lang={lang} /></Reveal>
        </div>
      </section>

      {/* Chapters */}
      <section id="features" className="mx-auto max-w-6xl px-4 sm:px-6">
        {c.chapters.map((ch, i) => {
          const Card = chapterCards[i]
          const Companion = chapterCompanions[i]
          const flip = i % 2 === 1
          return (
            <div key={ch.label} className="grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-20 lg:py-24" style={{ borderTop: '1px solid var(--stroke)' }}>
              <Reveal className={flip ? 'lg:order-2' : ''}>
                <div className="nb-label flex items-center gap-3">
                  <span className="nb-num" style={{ color: 'var(--accent-text)' }}>0{i + 1}</span>
                  {ch.label}
                </div>
                <h2 className="mt-4 text-3xl leading-[1.08] font-semibold tracking-[-0.03em] sm:text-[44px]">{ch.title}</h2>
                <p className="mt-5 max-w-md text-lg leading-relaxed" style={{ color: 'var(--muted)' }}>{ch.body}</p>
                <ul className="mt-7 space-y-3">
                  {ch.points.map(p => (
                    <li key={p} className="flex gap-3 text-[15px]">
                      <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: 'var(--accent)' }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.1} className={`mx-auto w-full max-w-[420px] space-y-3 ${flip ? 'lg:order-1' : ''}`}>
                {Companion && <Companion lang={lang} />}
                <Card lang={lang} />
              </Reveal>
            </div>
          )
        })}
      </section>

      {/* More */}
      <section className="py-20 lg:py-28" style={{ borderTop: '1px solid var(--stroke)' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal><h2 className="max-w-xl text-3xl leading-[1.08] font-semibold tracking-[-0.03em] sm:text-[44px]">{c.moreTitle}</h2></Reveal>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {c.more.map((m, i) => (
              <Reveal key={m.t} delay={(i % 3) * 0.06}>
                <div className="nb-card h-full p-6">
                  <div className="grid h-9 w-9 place-items-center rounded-[10px]" style={{ background: 'var(--track)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={icons[m.i]} /></svg>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">{m.t}</h3>
                  <p className="mt-2 leading-relaxed" style={{ color: 'var(--muted)' }}>{m.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Screens */}
      <section className="py-20 lg:py-28" style={{ borderTop: '1px solid var(--stroke)' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal><h2 className="max-w-xl text-3xl leading-[1.08] font-semibold tracking-[-0.03em] sm:text-[44px]">{c.screensTitle}</h2></Reveal>
        </div>
        <div className="mx-auto mt-12 flex max-w-6xl snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:px-6 lg:grid lg:grid-cols-4 lg:overflow-visible">
          {screenFiles.map((f, i) => (
            <Reveal key={f} delay={i * 0.08} className="w-[62vw] max-w-[260px] shrink-0 snap-center lg:w-auto lg:max-w-none">
              <div className="overflow-hidden rounded-[32px] p-1.5" style={{ background: 'var(--card)', border: '1px solid var(--stroke)', boxShadow: 'var(--shadow)' }}>
                <Image
                  src={`/screenshots/${isDark ? 'dark' : 'light'}/en/${f}.png`}
                  alt={c.screens[i]}
                  width={1206}
                  height={2622}
                  className="h-auto w-full rounded-[26px]"
                />
              </div>
              <div className="mt-3 text-center text-sm" style={{ color: 'var(--muted)' }}>{c.screens[i]}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 lg:py-28" style={{ borderTop: '1px solid var(--stroke)' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <h2 className="text-3xl leading-[1.08] font-semibold tracking-[-0.03em] sm:text-[44px]">{c.pricingTitle}</h2>
            <p className="mt-4 max-w-lg text-lg" style={{ color: 'var(--muted)' }}>{c.pricingBody}</p>
          </Reveal>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {c.plans.map((p, i) => {
              const featured = i === 2
              return (
                <Reveal key={p.name} delay={i * 0.06}>
                  <div className="nb-card relative flex h-full flex-col p-6" style={featured ? { borderColor: 'var(--accent)', boxShadow: '0 0 0 1px var(--accent)' } : undefined}>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{p.name}</span>
                      {'badge' in p && p.badge && (
                        <span className="rounded-full px-2.5 py-1 text-xs font-semibold" style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}>{p.badge}</span>
                      )}
                    </div>
                    <div className="mt-5 flex items-baseline gap-1">
                      <span className="nb-num text-4xl font-semibold">{p.price}</span>
                      <span style={{ color: 'var(--muted)' }}>{p.per}</span>
                    </div>
                    <div className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>{p.note}</div>
                    <ul className="mt-6 space-y-2.5 text-[15px]">
                      {p.features.map(f => (
                        <li key={f} className="flex gap-2.5">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-text)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className="mt-[3px] shrink-0" aria-hidden><path d="m5 12 5 5L20 7" /></svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 lg:py-28" style={{ borderTop: '1px solid var(--stroke)' }}>
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_2fr]">
          <Reveal><h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-[44px]">{c.faqTitle}</h2></Reveal>
          <div>
            {c.faq.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.04}>
                <details className="group py-5" style={{ borderBottom: '1px solid var(--stroke)' }}>
                  <summary className="flex cursor-pointer items-center justify-between gap-6 text-lg font-medium">
                    {f.q}
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-lg transition-transform group-open:rotate-45" style={{ background: 'var(--track)' }}>+</span>
                  </summary>
                  <p className="mt-3 max-w-2xl leading-relaxed" style={{ color: 'var(--muted)' }}>{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="join" className="px-4 pb-20 sm:px-6 lg:pb-28">
        <Reveal className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[28px] px-6 py-14 sm:px-12 sm:py-20" style={{ background: 'var(--cta-bg)', border: '1px solid var(--stroke)', color: '#F2F3F5' }}>
            <div className="nb-dots pointer-events-none absolute inset-0 opacity-40" style={{ ['--stroke' as string]: '#2A2D36' }} />
            <div className="relative grid items-end gap-10 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl leading-[1.08] font-semibold tracking-[-0.03em] sm:text-5xl">{c.ctaTitle}</h2>
                <p className="mt-4 max-w-md text-lg" style={{ color: '#9BA1AD' }}>{c.ctaBody}</p>
              </div>
              {status === 'ok' ? (
                <p className="text-lg font-medium" style={{ color: '#C8F25A' }}>{c.ok}</p>
              ) : (
                <form onSubmit={submit} className="w-full min-w-0">
                  <div className="flex flex-col gap-2 rounded-[22px] p-1.5 sm:flex-row sm:rounded-full" style={{ background: '#0D0E12', border: '1px solid #2A2D36' }}>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => { setEmail(e.target.value); if (status === 'err') setStatus('idle') }}
                      placeholder={c.email}
                      aria-label={c.email}
                      className="min-w-0 flex-1 bg-transparent px-4 py-3 text-[16px] outline-none placeholder:text-[#5F6573] sm:py-0"
                    />
                    <AccentButton type="submit" disabled={status === 'sending'}>{status === 'sending' ? c.joining : c.join}</AccentButton>
                  </div>
                  {status === 'err' && <p className="mt-3 pl-4 text-sm" style={{ color: '#FF9C7A' }}>{c.err}</p>}
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--stroke)' }}>
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6" style={{ color: 'var(--muted)' }}>
          <div className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="" width={22} height={22} className="rounded-[6px]" />
            <span>© {new Date().getFullYear()} Budpoint</span>
          </div>
          <div className="flex gap-6">
            <Link href="/blog" className="hover:text-[var(--text)]">{c.nav.blog}</Link>
            <Link href="/support" className="hover:text-[var(--text)]">{c.footer.support}</Link>
            <Link href="/privacy" className="hover:text-[var(--text)]">{c.footer.privacy}</Link>
            <Link href="/terms" className="hover:text-[var(--text)]">{c.footer.terms}</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
