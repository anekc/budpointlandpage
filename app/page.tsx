'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useLanguage } from './components/LanguageContext'
import { AccentButton, SiteFooter, SiteHeader, TESTFLIGHT_URL } from './components/SiteChrome'
import {
  AccountSplitsCard,
  BalanceCard,
  BudgetCard,
  PeriodCard,
  SharedCard,
  SplitMathCard,
  TransactionsCard,
} from './components/NocturnoUI'
import { APPLE_LOGO, PhoneHero } from './components/PhoneHero'
import { track } from './components/track'

const EASE = [0.22, 1, 0.36, 1] as const

const copy = {
  en: {
    hero: {
      eyebrow: 'Personal finance for iPhone',
      title: ['Know where your money went.', 'Before the month ends.'],
      body: 'Budpoint is an iPhone app that shows what you’ve spent, what’s left and where it’s all going. Set up a budget in minutes, and when you pay for other people, only your share counts.',
      cta: 'Try the beta',
      secondary: 'See how it works',
      meta: 'For iPhone · iOS 17 or later · Free beta on TestFlight',
    },
    chapters: [
      {
        label: 'Dashboard',
        title: 'The whole month on one screen.',
        body: 'Open the app and know in seconds whether you’re on track: what you’ve spent, how many days are left, and which account the money is coming from. So you can tell if that purchase fits this month, or can wait.',
        points: ['Your month starts on the day you choose, like payday', 'Spending by account and by person', 'Every account’s balance in one place', 'Seven sections you can show, hide and reorder'],
      },
      {
        label: 'Transactions',
        title: 'Logging an expense takes seconds.',
        body: 'Add it by hand in a few taps, or let it come in on its own: set up a Shortcuts automation once, and every Apple Pay purchase shows up in Budpoint, in the right account, waiting for you to confirm it.',
        points: ['Income, expenses and transfers between your accounts', 'Fixed bills like rent or Spotify log themselves every period', 'Bank email alerts too: build a Shortcuts automation for your bank that pulls the amount and store from the email (in Apple Mail) and sends them to Budpoint', 'Pro: see how many hours of work each expense cost you'],
      },
      {
        label: 'Budgets & goals',
        title: 'A plan that splits your income for you.',
        body: 'A budget just means deciding ahead of time how much goes where, so the end of the month holds no surprises. Pick a rule like 50/30/20, Budpoint splits what comes in, and you see what’s left in each bucket as you spend.',
        points: ['On $5,600 a month: $2,800 for needs, $1,680 for wants, $1,120 for savings', 'Category budgets that update with every expense', 'Savings goals tied to your real accounts', 'Spending without a category shows up on its own, so nothing hides'],
      },
      {
        label: 'Shared',
        title: 'Split the bill. Skip the spreadsheet.',
        body: 'Paid for everyone’s dinner? Log the full check and split it. Only your share hits your balance, and everyone gets theirs through their Budpoint code: they accept it and it lands in their app.',
        points: ['Pay for others without throwing off your budget', 'See who owes you and who you owe', 'Mark it paid when they pay you back, and settle up from your card balances', 'Split by amount or by percentage', 'Pro: sharing needs Pro on your side or theirs'],
      },
    ],
    howTitle: 'How Budpoint works.',
    how: [
      { t: 'Add your accounts', d: 'Checking, credit cards, cash. Enter today’s balance and you’re set. We never ask for your bank password.' },
      { t: 'Log what comes and goes', d: 'By hand in a few taps, through Apple Pay with Shortcuts, or by importing a file from your bank (Pro).' },
      { t: 'Understand your money', d: 'Your dashboard and budgets show what you’ve spent, what’s left and where to cut back.' },
    ],
    moreTitle: 'And the details you’ll use every day.',
    more: [
      { t: 'Put Shortcuts to work', d: 'Set it up once and your Apple Pay purchases arrive on their own, ready to confirm. One automation covers all your cards.', i: 'bolt' },
      { t: 'Card settle-up', d: 'Pay off your cards from your own accounts, and log what friends pay you back, card by card. Every balance stays right.', i: 'scale' },
      { t: 'CSV import with drafts', d: 'Pro: don’t start from zero. Bring your history from a spreadsheet and review each row before it’s saved.', i: 'table' },
      { t: 'iCloud backup & sync', d: 'Pro: new phone? Sign in to iCloud and everything comes back. Your backup lives in your own private iCloud, not on our servers.', i: 'cloud' },
      { t: 'Widgets', d: 'See what’s left of your budget from the Home Screen, and log an expense, income or transfer in one tap.', i: 'grid' },
    ],
    pricingTitle: 'Simple pricing.',
    pricingBody: 'Start free. Upgrade when you need more accounts, more people or iCloud sync. During the beta, you can try Pro without paying.',
    plans: [
      { name: 'Free', price: '$0', per: '', note: 'Forever', features: ['2 accounts', '15 categories', '2 people for splits', '3 budgets per period', '3 savings goals', 'Recurring entries', 'Widgets'] },
      { name: 'Monthly', price: '$5.99', per: '/mo', note: '7-day free trial', features: ['Everything unlimited', 'iCloud backup & sync', 'Shared expenses', 'CSV import and export', 'Hours of work per expense', 'PDF report of what each person owes you'] },
      { name: 'Annual', price: '$39.99', per: '/yr', note: '14-day free trial', badge: 'Save 44%', features: ['Everything in Monthly', 'About $3.33 a month'] },
    ],
    priceNote: 'Prices in US dollars on the US App Store. In other countries, the App Store shows the price for your region.',
    faqTitle: 'Questions',
    faq: [
      { q: 'Can I use Budpoint yet?', a: 'Yes, it’s in beta. Get it free through TestFlight, Apple’s app for trying apps before they reach the App Store. If you’d rather wait for the final version, leave your email and we’ll let you know.' },
      { q: 'Do I pay for Pro in the beta?', a: 'No. In TestFlight, purchases are test purchases and you aren’t charged. Once Budpoint is on the App Store, Pro is bought normally.' },
      { q: 'Does Budpoint connect to my bank?', a: 'No. Nothing asks for your bank password. Purchases come in through an Apple Pay Shortcuts automation, CSV import (Pro), or by hand.' },
      { q: 'Who can see my data?', a: 'Your finances live on your iPhone and, if you turn on iCloud sync (Pro), in your own private iCloud. If you sign in to share expenses, our servers keep only what sharing needs: your name and Budpoint code, your connections and the expenses you share. Anonymous usage stats never include financial data, and you can turn them off.' },
      { q: 'Can I use it with my partner or roommates?', a: 'Yes. Each person uses their own Budpoint and you send each other shared expenses with your Budpoint codes.' },
    ],
    ctaTitle: 'Try Budpoint today.',
    ctaBody: 'The beta is free on TestFlight. Install it, use it, and tell us what you think.',
    betaCta: 'Get the beta on TestFlight',
    betaNote: 'It’s a beta: you may run into bugs, and Pro purchases are test purchases, so you won’t be charged.',
    stepsTitle: 'How to join',
    steps: ['Install TestFlight from the App Store on your iPhone.', 'Open the Budpoint invite on your iPhone and tap Accept.', 'Install Budpoint. Send feedback from TestFlight or write to support@budpoint.app.'],
    waitTitle: 'Rather wait for the App Store version? Leave your email.',
    email: 'you@email.com',
    join: 'Join',
    joining: 'Joining…',
    ok: 'You’re on the list. We’ll be in touch.',
    err: 'That email didn’t work. Try again in a few seconds.',
  },
  es: {
    hero: {
      eyebrow: 'Tus finanzas en tu iPhone',
      title: ['Descubre en qué se te va el dinero,', 'antes de que se acabe el mes.'],
      body: 'Budpoint es una app para iPhone que te dice cuánto llevas gastado, cuánto te queda y en qué se te va. Arma tu presupuesto en minutos y, si pagas por otros, solo cuenta lo que de verdad fue tuyo.',
      cta: 'Prueba la beta',
      secondary: 'Mira cómo funciona',
      meta: 'Para iPhone · iOS 17 o posterior · Beta gratis en TestFlight',
    },
    chapters: [
      {
        label: 'Dashboard',
        title: 'Tu mes completo, de un vistazo.',
        body: 'Abres la app y en segundos sabes si vas bien: cuánto llevas gastado, cuántos días le quedan al periodo y de qué cuenta está saliendo el dinero. Así decides si ese gasto cabe este mes o mejor esperas.',
        points: ['Tu mes empieza el día que tú elijas, como tu día de pago', 'Cuánto se ha ido por cada cuenta y por cada persona', 'El saldo de todas tus cuentas en un solo lugar', 'Siete secciones que puedes mostrar, ocultar y ordenar'],
      },
      {
        label: 'Movimientos',
        title: 'Registra un gasto en segundos.',
        body: 'Anótalo a mano en unos toques o deja que llegue solo: configuras una vez una automatización en Atajos y cada compra con Apple Pay aparece en Budpoint, en la cuenta correcta, esperando que la confirmes.',
        points: ['Ingresos, gastos y transferencias entre tus cuentas', 'Pagos fijos, como la renta o Spotify, que se registran solos cada periodo', 'También los correos de tu banco: armas en Atajos una automatización para tu banco que tome el monto y el comercio del correo (en la app Mail de Apple) y los mande a Budpoint', 'Pro: ve cuántas horas de trabajo te costó cada gasto'],
      },
      {
        label: 'Presupuestos y metas',
        title: 'Tu ingreso, repartido sin hacer cuentas.',
        body: 'Un presupuesto es decidir antes cuánto va a cada cosa, para que el fin de mes no te tome por sorpresa. Elige una regla como la 50/30/20, Budpoint reparte lo que te entra y ves cuánto te queda en cada parte conforme gastas.',
        points: ['Si te entran $42,000: $21,000 para necesidades, $12,600 para gustos y $8,400 para ahorro', 'Presupuestos por categoría que avanzan con cada gasto', 'Metas de ahorro conectadas a tus cuentas', 'Lo que gastas sin categoría aparece aparte, para que no se esconda'],
      },
      {
        label: 'Compartidos',
        title: 'Divide la cuenta sin pelearte con el Excel.',
        body: '¿Pagaste la cena de todos? Regístrala completa y divídela. A tu balance solo entra tu parte, y a cada quien le mandas lo suyo con su código de Budpoint: lo acepta y le aparece en su app.',
        points: ['Paga por otros sin que se te desacomode el presupuesto', 'Ve quién te debe y a quién le debes', 'Marca cuando te pagan y salda desde el saldo de tus tarjetas', 'Divide por monto o por porcentaje', 'Pro: para compartir, tú o la otra persona necesitan Pro'],
      },
    ],
    howTitle: 'Cómo funciona Budpoint.',
    how: [
      { t: 'Agrega tus cuentas', d: 'Tu débito, tus tarjetas, tu efectivo. Pones el saldo de hoy y listo. Nunca te pedimos la contraseña de tu banco.' },
      { t: 'Registra lo que entra y sale', d: 'A mano en unos toques, con Apple Pay a través de Atajos, o importando un archivo de tu banco (Pro).' },
      { t: 'Entiende tu dinero', d: 'Tu Dashboard y tus presupuestos te dicen cuánto llevas, cuánto te queda y dónde conviene ajustar.' },
    ],
    moreTitle: 'Y los detalles que vas a usar todos los días.',
    more: [
      { t: 'Aprovecha los Atajos', d: 'Lo configuras una vez y tus compras con Apple Pay llegan solas, listas para confirmar. Una sola automatización sirve para todas tus tarjetas.', i: 'bolt' },
      { t: 'Cuadre de tarjetas', d: 'Paga tus tarjetas desde tus cuentas y registra lo que otros te reponen, tarjeta por tarjeta. Así cada saldo queda correcto.', i: 'scale' },
      { t: 'Importa tu historial', d: 'Pro: no empieces de cero. Sube un CSV o el estado de cuenta en PDF de BBVA, Banamex, Banorte, Nu o Revolut, y revisa cada movimiento antes de guardarlo.', i: 'table' },
      { t: 'Respaldo en iCloud', d: 'Pro: ¿cambiaste de iPhone? Inicias sesión en iCloud y todo vuelve a su lugar. Tu respaldo vive en tu propio iCloud privado, no en nuestros servidores.', i: 'cloud' },
      { t: 'Widgets', d: 'Ve cuánto te queda del presupuesto desde la pantalla de inicio, y registra un gasto, un ingreso o una transferencia con un toque.', i: 'grid' },
    ],
    pricingTitle: 'Precios claros.',
    pricingBody: 'Empieza gratis. Cuando necesites más cuentas, más personas o sincronizar con iCloud, pásate a Pro. Durante la beta, pruébalo sin pagar nada.',
    plans: [
      { name: 'Gratis', price: '$0', per: '', note: 'Siempre gratis', features: ['2 cuentas', '15 categorías', '2 personas para dividir gastos', '3 presupuestos por periodo', '3 metas de ahorro', 'Pagos recurrentes', 'Widgets'] },
      { name: 'Mensual', price: '$59', per: 'MXN/mes', note: '7 días gratis para probar', features: ['Todo sin límites', 'Respaldo y sincronización en iCloud', 'Gastos compartidos', 'Importa CSV y estados de cuenta en PDF, exporta a CSV', 'Horas de trabajo por gasto', 'Reporte PDF de lo que te debe cada quien'] },
      { name: 'Anual', price: '$399', per: 'MXN/año', note: '14 días gratis para probar', badge: 'Ahorras 44%', features: ['Todo lo del plan mensual', 'Te sale en $33 al mes'] },
    ],
    priceNote: 'Precios en pesos mexicanos en la App Store de México. En otros países, la App Store muestra el precio de tu región.',
    faqTitle: 'Preguntas frecuentes',
    faq: [
      { q: '¿Ya puedo usar Budpoint?', a: 'Sí, ya está en beta. Descárgala gratis con TestFlight, la app de Apple para probar apps antes de que lleguen al App Store. Si prefieres esperar la versión final, déjanos tu correo y te avisamos.' },
      { q: '¿Pago Pro en la beta?', a: 'No. En TestFlight las compras son de prueba y no se te cobra nada. Cuando Budpoint llegue al App Store, Pro se compra de forma normal.' },
      { q: '¿Necesito conectar mi banco?', a: 'No, y nunca te vamos a pedir la contraseña de tu banco. Tus compras llegan con una automatización de Atajos para Apple Pay, con los correos de alerta de tu banco, importando un CSV o un PDF de tu banco (Pro), o las registras a mano.' },
      { q: '¿Quién puede ver mi información?', a: 'Tus finanzas se guardan en tu iPhone y, si activas la sincronización con iCloud (Pro), en tu propio iCloud privado. Si inicias sesión para compartir gastos, en nuestros servidores solo queda lo necesario para eso: tu nombre y tu código de Budpoint, tus conexiones y los gastos que compartes. Las estadísticas de uso son anónimas, nunca incluyen datos financieros y puedes apagarlas.' },
      { q: '¿Puedo usarlo con mi pareja o con mis roomies?', a: 'Sí. Cada quien tiene su Budpoint y se mandan los gastos compartidos con su código.' },
    ],
    ctaTitle: 'Pruébala desde hoy.',
    ctaBody: 'La beta es gratis en TestFlight. Instálala, úsala y cuéntanos qué te parece.',
    betaCta: 'Descarga la beta en TestFlight',
    betaNote: 'Es una beta: puede tener errores, y las compras de Pro son de prueba, así que no se te cobra nada.',
    stepsTitle: 'Cómo entrar',
    steps: ['Instala TestFlight desde la App Store en tu iPhone.', 'Abre la invitación de Budpoint en tu iPhone y toca Aceptar.', 'Instala Budpoint. Mándanos comentarios desde TestFlight o escríbenos a support@budpoint.app.'],
    waitTitle: '¿Prefieres esperar a la versión del App Store? Déjanos tu correo.',
    email: 'tu@correo.com',
    join: 'Avísame',
    joining: 'Enviando…',
    ok: '¡Listo! Ya estás en la lista. Pronto te escribimos.',
    err: 'No pudimos registrar ese correo. Inténtalo otra vez en unos segundos.',
  },
}

const icons: Record<string, string> = {
  bolt: 'M13 2 4 14h7l-1 8 9-12h-7l1-8Z',
  scale: 'M12 3v18M5 7h14M5 7l-3 7a3 3 0 0 0 6 0L5 7Zm14 0-3 7a3 3 0 0 0 6 0l-3-7ZM8 21h8',
  table: 'M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5Zm0 5h18M9 10v11',
  cloud: 'M7 18a4 4 0 0 1-.9-7.9A5 5 0 0 1 15.9 8 4.5 4.5 0 0 1 17 18H7Zm5-7v5m0 0-2-2m2 2 2-2',
  grid: 'M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm12.5 0v7M13 16.5h7',
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

const chapterCards = [AccountSplitsCard, TransactionsCard, BudgetCard, SharedCard]
const chapterCompanions = [PeriodCard, BalanceCard, null, SplitMathCard]

export default function Home() {
  const { lang } = useLanguage()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle')
  const c = copy[lang]

  // One pricing_view per page load, when the plans actually reach the screen
  const pricingRef = useRef<HTMLElement>(null)
  const pricingSeen = useInView(pricingRef, { once: true, amount: 0.3 })
  useEffect(() => {
    if (pricingSeen) track('pricing_view', { lang })
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fire once, with the language at that moment
  }, [pricingSeen])

  // Mobile Safari restores the old scroll offset on reload, but the animated hero
  // changes height while loading, so it lands mid-page. Always start at the top
  // unless the link points at a section.
  useEffect(() => {
    history.scrollRestoration = 'manual'
    if (!location.hash) window.scrollTo(0, 0)
  }, [])

  // Scroll to the chapters without leaving #features in the URL, so a later
  // reload or shared link opens at the hero
  const toFeatures = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
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
      track(res.ok ? 'waitlist_submit' : 'waitlist_error', { lang })
      if (res.ok) setEmail('')
    } catch {
      setStatus('err')
      track('waitlist_error', { lang })
    }
  }

  return (
    <div className="nb min-h-screen overflow-x-clip">
      {/* React hoists this into <head>; only the home page claims the root URL */}
      <link rel="canonical" href="https://budpoint.app/" />
      <SiteHeader />

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-4 pt-14 pb-20 sm:px-6 md:pt-20 lg:grid-cols-[1.1fr_1fr] lg:gap-10 lg:pb-28">
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
            <AccentButton href={TESTFLIGHT_URL} event={{ name: 'testflight_click', props: { placement: 'hero', lang } }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="-mt-0.5"><path d={APPLE_LOGO} /></svg>
              {c.hero.cta}
            </AccentButton>
            <a href="#features" onClick={toFeatures} className="group inline-flex items-center gap-1.5 text-[15px] font-medium">
              {c.hero.secondary}
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          </Reveal>
          <Reveal delay={0.24}><p className="mt-8 text-sm" style={{ color: 'var(--muted)' }}>{c.hero.meta}</p></Reveal>
        </div>

        <PhoneHero lang={lang} />
      </section>

      {/* Chapters */}
      <section id="features" className="mx-auto max-w-6xl px-4 sm:px-6">
        {c.chapters.map((ch, i) => {
          const Card = chapterCards[i]
          const Companion = chapterCompanions[i]
          const flip = i % 2 === 1
          return (
            <div key={ch.label} className="grid grid-cols-1 items-center gap-10 py-16 lg:grid-cols-2 lg:gap-20 lg:py-24" style={{ borderTop: '1px solid var(--stroke)' }}>
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

      {/* How it works */}
      <section id="how" className="py-20 lg:py-28" style={{ borderTop: '1px solid var(--stroke)' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal><h2 className="max-w-xl text-3xl leading-[1.08] font-semibold tracking-[-0.03em] sm:text-[44px]">{c.howTitle}</h2></Reveal>
          <ol className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-3">
            {c.how.map((step, i) => (
              <li key={step.t}>
                <Reveal delay={i * 0.06} className="nb-card h-full p-6">
                  <span className="nb-num grid h-9 w-9 place-items-center rounded-full text-[15px] font-semibold" style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}>{i + 1}</span>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">{step.t}</h3>
                  <p className="mt-2 leading-relaxed" style={{ color: 'var(--muted)' }}>{step.d}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* More */}
      <section className="py-20 lg:py-28" style={{ borderTop: '1px solid var(--stroke)' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal><h2 className="max-w-xl text-3xl leading-[1.08] font-semibold tracking-[-0.03em] sm:text-[44px]">{c.moreTitle}</h2></Reveal>
          <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* Pricing */}
      <section id="pricing" ref={pricingRef} className="py-20 lg:py-28" style={{ borderTop: '1px solid var(--stroke)' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <h2 className="text-3xl leading-[1.08] font-semibold tracking-[-0.03em] sm:text-[44px]">{c.pricingTitle}</h2>
            <p className="mt-4 max-w-lg text-lg" style={{ color: 'var(--muted)' }}>{c.pricingBody}</p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-3">
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
          <p className="mt-6 text-sm" style={{ color: 'var(--muted)' }}>{c.priceNote}</p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 lg:py-28" style={{ borderTop: '1px solid var(--stroke)' }}>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_2fr]">
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
            <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-3xl leading-[1.08] font-semibold tracking-[-0.03em] sm:text-5xl">{c.ctaTitle}</h2>
                <p className="mt-4 max-w-md text-lg" style={{ color: '#9BA1AD' }}>{c.ctaBody}</p>
                <div className="mt-8"><AccentButton href={TESTFLIGHT_URL} event={{ name: 'testflight_click', props: { placement: 'cta', lang } }}>{c.betaCta} ↗</AccentButton></div>
                <p className="mt-4 max-w-md text-sm" style={{ color: '#9BA1AD' }}>{c.betaNote}</p>
                <h3 className="mt-8 text-[15px] font-medium">{c.stepsTitle}</h3>
                <ol className="mt-3 max-w-md space-y-2.5 text-sm" style={{ color: '#9BA1AD' }}>
                  {c.steps.map((step, i) => (
                    <li key={step} className="flex gap-3">
                      <span className="nb-num grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-semibold" style={{ background: '#23262E', color: '#C8F25A' }}>{i + 1}</span>
                      <span className="pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="lg:border-l lg:pl-12" style={{ borderColor: '#2A2D36' }}>
                <p className="mb-4 text-[15px] font-medium">{c.waitTitle}</p>
                {status === 'ok' ? (
                  <p className="text-lg font-medium" style={{ color: '#C8F25A' }}>{c.ok}</p>
                ) : (
                  <form onSubmit={submit} className="w-full min-w-0">
                    <div className="flex flex-col gap-2 rounded-[22px] p-1.5 focus-within:ring-2 focus-within:ring-[#C8F25A] sm:flex-row sm:rounded-full" style={{ background: '#0D0E12', border: '1px solid #2A2D36' }}>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => { setEmail(e.target.value); if (status === 'err') setStatus('idle') }}
                        placeholder={c.email}
                        aria-label={c.email}
                        className="min-w-0 flex-1 bg-transparent px-4 py-3 text-[16px] outline-none placeholder:text-[#5F6573] sm:py-0"
                      />
                      <button type="submit" disabled={status === 'sending'} className="rounded-full px-5 py-3 text-[15px] font-semibold disabled:opacity-60" style={{ background: '#23262E', color: '#F2F3F5' }}>
                        {status === 'sending' ? c.joining : c.join}
                      </button>
                    </div>
                    {status === 'err' && <p className="mt-3 pl-4 text-sm" style={{ color: '#FF9C7A' }}>{c.err}</p>}
                  </form>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </div>
  )
}
