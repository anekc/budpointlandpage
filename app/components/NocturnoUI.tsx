'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'framer-motion'

import type { Lang } from './LanguageContext'

export type { Lang }

const EASE = [0.22, 1, 0.36, 1] as const

const money = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

/** Sample amounts per market: Spanish shows a month in Mexico in pesos, English a
 *  month in the US in dollars. Each set adds up (accounts = expenses, etc.). */
type Money = Record<Lang, number>
const currency = (lang: Lang) => (lang === 'es' ? 'MXN' : 'USD')
const sample = {
  balance: { es: 24860.4, en: 3315.63 },
  income: { es: 42000, en: 5600 },
  expenses: { es: 17139.6, en: 2284.37 },
  cafe: { es: 89, en: 6.75 },
  twoPurchases: { es: 214.5, en: 19.15 },
} satisfies Record<string, Money>

function useReveal<T extends Element>() {
  const ref = useRef<T>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  return [ref, inView] as const
}

/** Today on the visitor's device, so the mock cards always show the current month.
 *  Starts from the build date on the server and switches to the real date after mount. */
function useToday() {
  const [today, setToday] = useState(() => new Date())
  useEffect(() => setToday(new Date()), [])
  return today
}

function monthName(date: Date, lang: Lang, style: 'short' | 'long') {
  const name = date.toLocaleDateString(lang === 'es' ? 'es-MX' : 'en-US', { month: style }).replace('.', '')
  return style === 'short' ? name[0].toUpperCase() + name.slice(1) : name
}

function useCountUp(target: number, active: boolean, duration = 1.4) {
  const reduce = useReducedMotion()
  const [value, setValue] = useState(reduce ? target : 0)

  useEffect(() => {
    if (!active) return
    if (reduce) {
      setValue(target)
      return
    }
    const controls = animate(0, target, { duration, ease: EASE, onUpdate: setValue })
    return () => controls.stop()
  }, [active, target, duration, reduce])

  return value
}

/** Large amount: integer in text color, decimals smaller and muted — like NocturnoAmountText. */
export function Amount({ value, active = true, size = 32, sign = '', color }: {
  value: number
  active?: boolean
  size?: number
  sign?: string
  color?: string
}) {
  const v = useCountUp(value, active)
  const [int, dec] = money.format(v).split('.')
  return (
    <span className="nb-num font-semibold whitespace-nowrap" style={{ fontSize: size, color: color ?? 'var(--text)' }}>
      {sign}${int}
      <span className="font-medium" style={{ fontSize: size * 0.6, color: 'var(--muted)' }}>.{dec}</span>
    </span>
  )
}

function Bar({ pct, active, color = 'var(--accent)', height = 8, delay = 0 }: {
  pct: number
  active: boolean
  color?: string
  height?: number
  delay?: number
}) {
  const reduce = useReducedMotion()
  return (
    <div className="w-full rounded-full overflow-hidden" style={{ height, background: 'var(--track)' }}>
      <motion.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={{ width: reduce ? `${pct}%` : 0 }}
        animate={{ width: active ? `${pct}%` : reduce ? `${pct}%` : 0 }}
        transition={{ duration: 1.2, ease: EASE, delay }}
      />
    </div>
  )
}

/* ---------- Period ---------- */

export function PeriodCard({ lang }: { lang: Lang }) {
  const [ref, inView] = useReveal<HTMLDivElement>()
  const today = useToday()
  const day = today.getDate()
  const total = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
  const month = monthName(today, lang, 'short')
  const left = total - day
  return (
    <div ref={ref} className="nb-card p-5" style={{ boxShadow: 'var(--shadow)' }}>
      <div className="nb-label">{lang === 'es' ? 'Periodo actual' : 'Current period'}</div>
      <div className="mt-2 flex items-center gap-2 text-[28px] font-medium tracking-tight">
        1 {month} – {total} {month}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="opacity-60" aria-hidden><path d="m6 9 6 6 6-6" /></svg>
      </div>
      <div className="mt-4"><Bar pct={(day / total) * 100} active={inView} /></div>
      <div className="mt-2 flex justify-between text-sm" style={{ color: 'var(--muted)' }}>
        <span>{lang === 'es' ? `Día ${day} de ${total}` : `Day ${day} of ${total}`}</span>
        <span>
          {left === 0
            ? (lang === 'es' ? 'Último día' : 'Last day')
            : lang === 'es'
              ? `${left === 1 ? 'Queda 1 día' : `Quedan ${left} días`}`
              : `${left} ${left === 1 ? 'day' : 'days'} left`}
        </span>
      </div>
    </div>
  )
}

/* ---------- Balance ---------- */

export function BalanceCard({ lang }: { lang: Lang }) {
  const [ref, inView] = useReveal<HTMLDivElement>()
  return (
    <div ref={ref} className="nb-card p-5" style={{ boxShadow: 'var(--shadow)' }}>
      <div className="nb-label">{lang === 'es' ? 'Balance del periodo' : 'Period balance'}</div>
      <div className="mt-2"><Amount value={sample.balance[lang]} active={inView} size={40} /></div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-2xl p-3.5" style={{ background: 'var(--income-bg)' }}>
          <div className="text-sm font-medium" style={{ color: 'var(--income)' }}>↑ {lang === 'es' ? 'Ingresos' : 'Income'}</div>
          <div className="mt-1"><Amount value={sample.income[lang]} active={inView} size={19} /></div>
        </div>
        <div className="rounded-2xl p-3.5" style={{ background: 'var(--expense-bg)' }}>
          <div className="text-sm font-medium" style={{ color: 'var(--expense)' }}>↓ {lang === 'es' ? 'Gastos' : 'Expenses'}</div>
          <div className="mt-1"><Amount value={sample.expenses[lang]} active={inView} size={19} /></div>
        </div>
      </div>
    </div>
  )
}

/* ---------- Transactions list ---------- */

type Tag = { label: Record<Lang, string>; kind: 'account' | 'category' }


// The people in the sample, with names that fit each market
const people = {
  friend: { es: 'Mariana', en: 'Emily' },
  roommate: { es: 'Diego', en: 'Jake' },
}

const txns: {
  name: Record<Lang, string | ((month: string) => string)>
  tags: Tag[]
  amount: Money
  color: string
  icon: string
  split?: { who: Record<Lang, string>; amount: Money }[]
  sharedBy?: Record<Lang, string>
}[] = [
  {
    name: { en: 'Paycheck', es: 'Nómina' },
    tags: [{ label: { en: 'Recurring', es: 'Recurrente' }, kind: 'category' }, { label: { en: 'Biweekly', es: 'Quincenal' }, kind: 'category' }],
    amount: { es: 21000, en: 2800 }, color: 'var(--c1)', icon: 'up',
  },
  // Shared expense: the full charge is listed, but only your half counts in your balance
  {
    name: { en: 'Friday dinner', es: 'Cena del viernes' },
    tags: [{ label: { en: 'Gold card', es: 'Tarjeta oro' }, kind: 'account' }, { label: { en: 'Restaurants', es: 'Restaurantes' }, kind: 'category' }],
    amount: { es: -900, en: -77 }, color: 'var(--c3)', icon: 'down',
    split: [
      { who: { en: 'You', es: 'Tú' }, amount: { es: 450, en: 38.5 } },
      { who: people.friend, amount: { es: 450, en: 38.5 } },
    ],
  },
  // Diego's rent, once accepted from Shared: it lands here as your share only
  {
    name: { en: (m: string) => `${m} rent`, es: (m: string) => `Renta de ${m}` },
    tags: [{ label: { en: 'Debit', es: 'Débito' }, kind: 'account' }, { label: { en: 'Home', es: 'Hogar' }, kind: 'category' }],
    amount: { es: -6500, en: -975 }, color: 'var(--c3)', icon: 'home',
    sharedBy: people.roommate,
  },
]

const tagStyle = {
  account: { background: 'color-mix(in srgb, var(--c2) 16%, transparent)', color: 'color-mix(in srgb, var(--c2) 70%, var(--text))' },
  category: { background: 'var(--income-bg)', color: 'var(--income)' },
}

/** Pro: how long you worked for an expense. Monthly income over monthly work hours:
 *  192 in Mexico (the legal maximum), ~173 in the US (40 h × 52 weeks / 12). */
const HOURS_PER_MONTH: Money = { es: 192, en: 173.33 }

function WorkTime({ amount, lang }: { amount: number; lang: Lang }) {
  const minutes = Math.round((amount / (sample.income[lang] / HOURS_PER_MONTH[lang])) * 60)
  const h = Math.floor(minutes / 60)
  const label = h ? `${h}h ${minutes % 60}min` : `${minutes}min`
  return (
    <span className="nb-num inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-medium" style={{ background: 'color-mix(in srgb, #F2A93B 18%, transparent)', color: 'color-mix(in srgb, #F2A93B 75%, var(--text))' }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M9 4h6a1 1 0 0 1 1 1v2h3a2 2 0 0 1 2 2v3H3V9a2 2 0 0 1 2-2h3V5a1 1 0 0 1 1-1Zm1 3h4V6h-4v1ZM3 14h7v1h4v-1h7v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4Z" /></svg>
      {label}
    </span>
  )
}

const PERSON = 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0H5Z'

function TxIcon({ kind, color }: { kind: string; color: string }) {
  const paths: Record<string, string> = {
    up: 'M12 19V5m0 0-6 6m6-6 6 6',
    down: 'M12 5v14m0 0-6-6m6 6 6-6',
    home: 'M3 11 12 4l9 7M5 10v10h14V10M10 20v-5h4v5',
  }
  return (
    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl" style={{ background: `color-mix(in srgb, ${color} 18%, transparent)`, color }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={paths[kind]} /></svg>
    </div>
  )
}

export function TransactionsCard({ lang }: { lang: Lang }) {
  const [ref, inView] = useReveal<HTMLDivElement>()
  const month = monthName(useToday(), lang, 'long')
  return (
    <div ref={ref} className="nb-card overflow-hidden" style={{ boxShadow: 'var(--shadow)' }}>
      <div className="nb-label px-5 pt-4 pb-2">{lang === 'es' ? 'Hoy' : 'Today'}</div>
      {txns.map((t, i) => {
        const value = t.amount[lang]
        const total = Math.abs(value)
        return (
          <motion.div
            key={i}
            className="flex items-start gap-3 px-5 py-3.5"
            style={{ borderTop: i ? '1px solid var(--stroke)' : undefined }}
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: 0.15 + i * 0.12 }}
          >
            <TxIcon kind={t.icon} color={t.color} />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <div className="truncate font-medium">{(n => (typeof n === 'function' ? n(month) : n))(t.name[lang])}</div>
                <div className="nb-num font-medium whitespace-nowrap" style={{ color: value > 0 ? 'var(--income)' : 'var(--text)' }}>
                  {value > 0 ? '+' : '−'}{money.format(total)}
                  <span className="ml-1 text-[10px]" style={{ color: 'var(--muted)' }}>{currency(lang)}</span>
                </div>
              </div>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {t.tags.map((tag, j) => (
                  <span key={j} className="rounded-md px-1.5 py-0.5 text-xs font-medium" style={tagStyle[tag.kind]}>{tag.label[lang]}</span>
                ))}
                {value < 0 && !t.split && <WorkTime amount={total} lang={lang} />}
              </div>
              {t.sharedBy && (
                <div className="mt-3 pt-2.5 text-[13px]" style={{ borderTop: '1px dashed var(--stroke)' }}>
                  <div className="font-medium">{lang === 'es' ? 'Compartido por' : 'Shared by'}</div>
                  <div className="mt-1 flex items-center gap-1.5" style={{ color: 'var(--muted)' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d={PERSON} /></svg>
                    {t.sharedBy[lang]}
                  </div>
                </div>
              )}
              {t.split && (
                <div className="mt-3 pt-2.5 text-[13px]" style={{ borderTop: '1px dashed var(--stroke)' }}>
                  <div className="font-medium">{lang === 'es' ? 'División del gasto' : 'Split'}</div>
                  {t.split.map((part, j) => (
                    <div key={part.who.en} className="nb-num mt-1 flex items-center gap-1.5" style={{ color: 'var(--muted)' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d={PERSON} /></svg>
                      {part.who[lang]}: {money.format(part.amount[lang])} {currency(lang)} ({Math.round((part.amount[lang] / total) * 100)}%)
                      {j === 0 && <WorkTime amount={part.amount[lang]} lang={lang} />}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

/* ---------- Spending by account ---------- */

const accounts = [
  { name: { en: 'Debit', es: 'Débito' }, value: { es: 6240, en: 832 }, color: 'var(--c1)' },
  { name: { en: 'Gold card', es: 'Tarjeta oro' }, value: { es: 5180, en: 690.4 }, color: 'var(--c2)' },
  { name: { en: 'Cash', es: 'Efectivo' }, value: { es: 3410, en: 455 }, color: 'var(--c3)' },
  { name: { en: 'Shared card', es: 'Tarjeta compartida' }, value: { es: 2309.6, en: 306.97 }, color: 'var(--c4)' },
]

export function AccountSplitsCard({ lang }: { lang: Lang }) {
  const [ref, inView] = useReveal<HTMLDivElement>()
  const reduce = useReducedMotion()
  const total = accounts.reduce((s, a) => s + a.value[lang], 0)
  const max = Math.max(...accounts.map(a => a.value[lang]))
  return (
    <div ref={ref} className="nb-card p-5" style={{ boxShadow: 'var(--shadow)' }}>
      <div className="flex items-center justify-between gap-3">
        <div className="nb-label">{lang === 'es' ? 'Gasto por cuenta' : 'Spending by account'}</div>
        <span className="nb-num rounded-full px-3 py-1 text-sm font-semibold" style={{ background: 'var(--expense-bg)', color: 'var(--expense)' }}>
          {money.format(total)}
        </span>
      </div>
      <div className="nb-dots mt-4 space-y-3.5 rounded-xl p-1">
        {accounts.map((a, i) => (
          <div key={i}>
            <div className="flex justify-between text-sm">
              <span>{a.name[lang]}</span>
              <span className="nb-num" style={{ color: 'var(--muted)' }}>{money.format(a.value[lang])}</span>
            </div>
            <div className="mt-1.5"><Bar pct={(a.value[lang] / max) * 100} active={inView} color={a.color} height={6} delay={i * 0.08} /></div>
          </div>
        ))}
      </div>
      <div className="mt-5 flex h-2.5 gap-0.5 overflow-hidden rounded-full">
        {accounts.map((a, i) => (
          <motion.div
            key={i}
            style={{ background: a.color }}
            initial={{ flexGrow: reduce ? a.value[lang] : 0.0001 }}
            animate={{ flexGrow: inView || reduce ? a.value[lang] : 0.0001 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
          />
        ))}
      </div>
      <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1 text-xs" style={{ color: 'var(--muted)' }}>
        {accounts.map((a, i) => (
          <span key={i} className="nb-num flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: a.color }} />
            {Math.round((a.value[lang] / total) * 100)}%
          </span>
        ))}
      </div>
    </div>
  )
}

/* ---------- Budget ring ---------- */

export function BudgetCard({ lang }: { lang: Lang }) {
  const [ref, inView] = useReveal<HTMLDivElement>()
  const reduce = useReducedMotion()
  const spent = sample.expenses[lang]
  // The plan splits the whole monthly income, so the budget is the income
  const budget = sample.income[lang]
  const pct = spent / budget
  const shownPct = useCountUp(Math.round(pct * 100), inView)
  const r = 44
  const rules = [
    { name: { en: 'Needs · 50%', es: 'Necesidades · 50%' }, pct: 54, color: 'var(--c1)' },
    { name: { en: 'Wants · 30%', es: 'Gustos · 30%' }, pct: 46, color: 'var(--c2)' },
    { name: { en: 'Savings · 20%', es: 'Ahorro · 20%' }, pct: 40, color: 'var(--c5)' },
  ]
  return (
    <div ref={ref} className="nb-card p-5" style={{ boxShadow: 'var(--shadow)' }}>
      <div className="nb-label">{lang === 'es' ? 'Resumen del periodo' : 'Period summary'}</div>
      <div className="mt-4 flex items-center gap-5">
        <div className="relative h-28 w-28 shrink-0">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden>
            <circle cx="50" cy="50" r={r} fill="none" stroke="var(--track)" strokeWidth="9" />
            <motion.circle
              cx="50" cy="50" r={r} fill="none" stroke="var(--accent)" strokeWidth="9" strokeLinecap="round"
              initial={{ pathLength: reduce ? pct : 0 }}
              animate={{ pathLength: inView || reduce ? pct : 0 }}
              transition={{ duration: 1.4, ease: EASE }}
            />
          </svg>
          <div className="nb-num absolute inset-0 grid place-items-center text-2xl font-semibold">{Math.round(shownPct)}%</div>
        </div>
        <dl className="flex-1 space-y-2 text-sm">
          <div className="flex justify-between gap-2"><dt style={{ color: 'var(--muted)' }}>{lang === 'es' ? 'Gastado' : 'Spent'}</dt><dd className="nb-num font-medium">${money.format(spent)}</dd></div>
          <div className="flex justify-between gap-2"><dt style={{ color: 'var(--muted)' }}>{lang === 'es' ? 'Presupuesto' : 'Budgeted'}</dt><dd className="nb-num font-medium">${money.format(budget)}</dd></div>
          <div className="flex justify-between gap-2 border-t pt-2" style={{ borderColor: 'var(--stroke)' }}><dt style={{ color: 'var(--muted)' }}>{lang === 'es' ? 'Disponible' : 'Left'}</dt><dd className="nb-num font-semibold" style={{ color: 'var(--accent-text)' }}>${money.format(budget - spent)}</dd></div>
        </dl>
      </div>
      <div className="mt-5 space-y-3">
        {rules.map((rule, i) => (
          <div key={i}>
            <div className="flex justify-between text-sm"><span>{rule.name[lang]}</span><span className="nb-num" style={{ color: 'var(--muted)' }}>{rule.pct}%</span></div>
            <div className="mt-1.5"><Bar pct={rule.pct} active={inView} color={rule.color} height={6} delay={0.2 + i * 0.1} /></div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------- Shared expenses (mirrors the app's "Compartidas" screen) ---------- */

const sharedCopy = {
  en: { pending: 'Pending', accepted: 'Accepted', received: 'Received', sent: 'Sent', from: 'From', to: 'To', yourShare: 'Your share', theirShare: 'Their share', receivedAt: 'Received', sentAt: 'Sent', acceptedOne: 'Accepted', pendingOne: 'Pending' },
  es: { pending: 'Pendientes', accepted: 'Aceptadas', received: 'Recibidas', sent: 'Enviadas', from: 'De', to: 'Para', yourShare: 'Tu parte', theirShare: 'Su parte', receivedAt: 'Recibida', sentAt: 'Enviada', acceptedOne: 'Aceptada', pendingOne: 'Pendiente' },
}

// You paid the Friday dinner from the transactions card and sent Mariana her half;
// Diego paid the rent and sent you yours.
const sentItem = { who: people.friend, title: { en: () => 'Friday dinner', es: () => 'Cena del viernes' }, amount: { es: 450, en: 38.5 }, tag: { en: 'Restaurants', es: 'Restaurantes' }, time: { en: 'Today at 9:40 PM', es: 'Hoy a las 21:40' } }
const receivedItem = { who: people.roommate, title: { en: (m: string) => `${m} rent`, es: (m: string) => `Renta de ${m}` }, amount: { es: 6500, en: 975 }, tag: { en: 'Home', es: 'Hogar' }, time: { en: 'Yesterday at 9:15 AM', es: 'Ayer a las 09:15' } }

function StatusPill({ accepted, lang }: { accepted: boolean; lang: Lang }) {
  const t = sharedCopy[lang]
  return (
    <motion.span
      key={accepted ? 'a' : 'p'}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="rounded-full px-3 py-1 text-sm font-medium"
      style={accepted
        ? { background: 'var(--income-bg)', color: 'var(--income)' }
        : { background: 'var(--expense-bg)', color: 'var(--expense)' }}
    >
      {accepted ? t.acceptedOne : t.pendingOne}
    </motion.span>
  )
}

const TRAY_IN = 'M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4M8 14h2l1 2h2l1-2h2M12 3v8m0 0-3-3m3 3 3-3'
const TRAY_OUT = 'M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4M8 14h2l1 2h2l1-2h2M12 11V3m0 0L9 6m3-3 3 3'

export function SharedCard({ lang }: { lang: Lang }) {
  const [ref, inView] = useReveal<HTMLDivElement>()
  const reduce = useReducedMotion()
  const [accepted, setAccepted] = useState(!!reduce)
  const [tab, setTab] = useState<'sent' | 'received'>('sent')
  const touched = useRef(false)
  const t = sharedCopy[lang]
  const month = monthName(useToday(), lang, 'long')

  // Mariana accepts her half a moment after the card scrolls into view; then the
  // tabs take turns on their own until the visitor taps one
  useEffect(() => {
    if (!inView || reduce) return
    const accept = setTimeout(() => setAccepted(true), 2200)
    let cycle: ReturnType<typeof setInterval> | undefined
    const start = setTimeout(() => {
      const flip = () => { if (!touched.current) setTab(cur => (cur === 'sent' ? 'received' : 'sent')) }
      flip()
      cycle = setInterval(flip, 4500)
    }, 5200)
    return () => { clearTimeout(accept); clearTimeout(start); clearInterval(cycle) }
  }, [inView, reduce])

  const sent = tab === 'sent'
  const item = sent ? sentItem : receivedItem
  const isAccepted = sent ? accepted : true
  const pendingTotal = sent && !accepted ? sentItem.amount[lang] : 0
  const acceptedTotal = sent ? (accepted ? sentItem.amount[lang] : 0) : receivedItem.amount[lang]

  return (
    <div ref={ref} className="space-y-3">
      <div className="nb-card grid grid-cols-2 p-5 text-center" style={{ boxShadow: 'var(--shadow)' }}>
        {[
          { label: t.pending, value: pendingTotal, color: 'var(--expense)', icon: 'M12 7v5l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' },
          { label: t.accepted, value: acceptedTotal, color: 'var(--income)', icon: 'm8.5 12 2.5 2.5L16 9.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' },
        ].map(col => (
          <div key={col.label}>
            <div className="flex items-center justify-center gap-2 text-[15px]" style={{ color: 'var(--muted)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={col.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={col.icon} /></svg>
              {col.label}
            </div>
            <motion.div key={col.value} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="nb-num mt-1.5 text-2xl font-medium" style={{ color: col.color }}>
              ${money.format(col.value)}
            </motion.div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 overflow-hidden rounded-2xl" style={{ background: 'var(--card)', border: '1px solid var(--stroke)' }}>
        {([
          { id: 'received', label: `${t.received} (1)`, icon: TRAY_IN },
          { id: 'sent', label: `${t.sent} (1)`, icon: TRAY_OUT },
        ] as const).map(tb => (
          <button
            key={tb.id}
            type="button"
            onClick={() => { touched.current = true; setTab(tb.id) }}
            className="flex cursor-pointer items-center justify-center gap-2 py-3 text-[17px] font-medium transition-colors"
            style={tab === tb.id ? { background: 'var(--accent)', color: 'var(--on-accent)', borderRadius: 14 } : undefined}
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={tb.icon} /></svg>
            {tb.label}
          </button>
        ))}
      </div>

      <motion.div
        key={tab}
        className="nb-card p-5"
        style={{ boxShadow: 'var(--shadow)' }}
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="text-lg font-semibold">{sent ? t.to : t.from}: {item.who[lang]}</div>
          <StatusPill accepted={isAccepted} lang={lang} />
        </div>
        <div className="mt-2 text-lg">{item.title[lang](month)}</div>
        <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2">
          <span className="text-sm" style={{ color: 'var(--muted)' }}>{sent ? t.theirShare : t.yourShare}:</span>
          <span className="nb-num text-2xl font-medium">{money.format(item.amount[lang])} {currency(lang)}</span>
          <span className="text-sm" style={{ color: 'var(--muted)' }}>· {item.tag[lang]}</span>
        </div>
        <div className="mt-1.5 text-sm" style={{ color: 'var(--muted)' }}>
          {sent ? t.sentAt : t.receivedAt}: {item.time[lang]}
        </div>
      </motion.div>
    </div>
  )
}

/* ---------- Apple Pay pending banner (mirrors ApplePayPendingBanner on the Dashboard) ---------- */

const bannerCopy = {
  en: { one: '1 purchase to confirm', other: (n: number) => `${n} purchases to confirm`, and: 'and', review: 'Review' },
  es: { one: '1 compra por confirmar', other: (n: number) => `${n} compras por confirmar`, and: 'y', review: 'Revisar' },
}

export function ApplePayBanner({ lang, delay = 0.9 }: { lang: Lang; delay?: number }) {
  const reduce = useReducedMotion()
  const t = bannerCopy[lang]
  // A second Apple Pay purchase lands a moment after the banner shows up
  const [count, setCount] = useState(reduce ? 2 : 1)

  useEffect(() => {
    if (reduce) return
    const id = setTimeout(() => setCount(2), (delay + 2.2) * 1000)
    return () => clearTimeout(id)
  }, [reduce, delay])

  const cafe = `Café Olmo · $${money.format(sample.cafe[lang])}`
  const subtitle = count === 1 ? cafe : `${lang === 'es' ? 'Oxxo' : 'Corner Mart'} ${t.and} Café Olmo · $${money.format(sample.twoPurchases[lang])}`

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, height: 0, marginTop: 0 }}
      animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      className="overflow-hidden"
    >
      <div className="flex items-center gap-3 rounded-[18px] p-3.5" style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}>
        <motion.div
          key={count}
          initial={reduce ? false : { scale: 0.7 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 22 }}
          className="nb-num grid h-9 w-9 shrink-0 place-items-center rounded-[10px] text-base font-bold"
          style={{ background: 'var(--on-accent)', color: 'var(--accent)' }}
        >
          {count}
        </motion.div>
        <div className="min-w-0 flex-1 leading-snug">
          <div className="text-[15px] font-semibold">{count === 1 ? t.one : t.other(count)}</div>
          <div className="nb-num truncate text-xs" style={{ opacity: 0.75 }}>{subtitle}</div>
        </div>
        <span className="flex shrink-0 items-center gap-0.5 text-[13px] font-semibold">
          {t.review}
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m9 6 6 6-6 6" /></svg>
        </span>
      </div>
    </motion.div>
  )
}
