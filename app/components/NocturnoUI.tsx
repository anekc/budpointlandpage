'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'framer-motion'

export type Lang = 'en' | 'es'

const EASE = [0.22, 1, 0.36, 1] as const

const money = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

function useReveal<T extends Element>() {
  const ref = useRef<T>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  return [ref, inView] as const
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
  const day = 18
  const total = 30
  return (
    <div ref={ref} className="nb-card p-5" style={{ boxShadow: 'var(--shadow)' }}>
      <div className="nb-label">{lang === 'es' ? 'Periodo actual' : 'Current period'}</div>
      <div className="mt-2 flex items-center gap-2 text-[28px] font-medium tracking-tight">
        1 Nov – 30 Nov
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="opacity-60" aria-hidden><path d="m6 9 6 6 6-6" /></svg>
      </div>
      <div className="mt-4"><Bar pct={(day / total) * 100} active={inView} /></div>
      <div className="mt-2 flex justify-between text-sm" style={{ color: 'var(--muted)' }}>
        <span>{lang === 'es' ? `Día ${day} de ${total}` : `Day ${day} of ${total}`}</span>
        <span>{lang === 'es' ? `Quedan ${total - day} días` : `${total - day} days left`}</span>
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
      <div className="mt-2"><Amount value={24860.4} active={inView} size={40} /></div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-2xl p-3.5" style={{ background: 'var(--income-bg)' }}>
          <div className="text-sm font-medium" style={{ color: 'var(--income)' }}>↑ {lang === 'es' ? 'Ingresos' : 'Income'}</div>
          <div className="mt-1"><Amount value={42000} active={inView} size={19} /></div>
        </div>
        <div className="rounded-2xl p-3.5" style={{ background: 'var(--expense-bg)' }}>
          <div className="text-sm font-medium" style={{ color: 'var(--expense)' }}>↓ {lang === 'es' ? 'Gastos' : 'Expenses'}</div>
          <div className="mt-1"><Amount value={17139.6} active={inView} size={19} /></div>
        </div>
      </div>
    </div>
  )
}

/* ---------- Transactions list ---------- */

const txns = [
  { name: { en: 'Groceries', es: 'Súper' }, tags: [{ en: 'Debit', es: 'Débito' }, { en: 'Food', es: 'Comida' }], amount: -1284.5, color: 'var(--c3)', icon: 'cart' },
  { name: { en: 'Paycheck', es: 'Nómina' }, tags: [{ en: 'Payroll', es: 'Nómina' }], amount: 21000, color: 'var(--c1)', icon: 'up' },
  { name: { en: 'Gas — for Dad', es: 'Gasolina — de papá' }, tags: [{ en: 'Excluded', es: 'Excluido' }], amount: -850, color: 'var(--c2)', icon: 'fuel', excluded: true },
]

function TxIcon({ kind, color }: { kind: string; color: string }) {
  const paths: Record<string, string> = {
    cart: 'M3 4h2l2.4 11h10.2L20 7H6.3M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z',
    up: 'M12 19V5m0 0-6 6m6-6 6 6',
    fuel: 'M4 20V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v14M3 20h12M14 10h2a2 2 0 0 1 2 2v4a1.5 1.5 0 0 0 3 0V9l-3-3M7 8h4',
  }
  return (
    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl" style={{ background: `color-mix(in srgb, ${color} 18%, transparent)`, color }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={paths[kind]} /></svg>
    </div>
  )
}

export function TransactionsCard({ lang }: { lang: Lang }) {
  const [ref, inView] = useReveal<HTMLDivElement>()
  return (
    <div ref={ref} className="nb-card overflow-hidden" style={{ boxShadow: 'var(--shadow)' }}>
      <div className="nb-label px-5 pt-4 pb-2">{lang === 'es' ? 'Hoy' : 'Today'}</div>
      {txns.map((t, i) => (
        <motion.div
          key={i}
          className="flex items-center gap-3 px-5 py-3.5"
          style={{ borderTop: i ? '1px solid var(--stroke)' : undefined, opacity: t.excluded ? 0.75 : 1 }}
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: t.excluded ? 0.75 : 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE, delay: 0.15 + i * 0.12 }}
        >
          <TxIcon kind={t.icon} color={t.color} />
          <div className="min-w-0 flex-1">
            <div className="truncate font-medium">{t.name[lang]}</div>
            <div className="mt-1 flex gap-1.5">
              {t.tags.map((tag, j) => (
                <span key={j} className="rounded-md px-1.5 py-0.5 text-xs font-medium" style={{ background: 'var(--track)', color: 'var(--muted)' }}>{tag[lang]}</span>
              ))}
            </div>
          </div>
          <div className="nb-num font-medium whitespace-nowrap" style={{ color: t.amount > 0 ? 'var(--income)' : 'var(--text)' }}>
            {t.amount > 0 ? '+' : '−'}{money.format(Math.abs(t.amount))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

/* ---------- Spending by account ---------- */

const accounts = [
  { name: { en: 'Debit', es: 'Débito' }, value: 6240, color: 'var(--c1)' },
  { name: { en: 'Gold card', es: 'Tarjeta oro' }, value: 5180, color: 'var(--c2)' },
  { name: { en: 'Cash', es: 'Efectivo' }, value: 3410, color: 'var(--c3)' },
  { name: { en: 'Shared card', es: 'Tarjeta compartida' }, value: 2309.6, color: 'var(--c4)' },
]

export function AccountSplitsCard({ lang }: { lang: Lang }) {
  const [ref, inView] = useReveal<HTMLDivElement>()
  const reduce = useReducedMotion()
  const total = accounts.reduce((s, a) => s + a.value, 0)
  const max = Math.max(...accounts.map(a => a.value))
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
              <span className="nb-num" style={{ color: 'var(--muted)' }}>{money.format(a.value)}</span>
            </div>
            <div className="mt-1.5"><Bar pct={(a.value / max) * 100} active={inView} color={a.color} height={6} delay={i * 0.08} /></div>
          </div>
        ))}
      </div>
      <div className="mt-5 flex h-2.5 gap-0.5 overflow-hidden rounded-full">
        {accounts.map((a, i) => (
          <motion.div
            key={i}
            style={{ background: a.color }}
            initial={{ flexGrow: reduce ? a.value : 0.0001 }}
            animate={{ flexGrow: inView || reduce ? a.value : 0.0001 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
          />
        ))}
      </div>
      <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1 text-xs" style={{ color: 'var(--muted)' }}>
        {accounts.map((a, i) => (
          <span key={i} className="nb-num flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: a.color }} />
            {Math.round((a.value / total) * 100)}%
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
  const spent = 9612
  const budget = 15000
  const pct = spent / budget
  const shownPct = useCountUp(Math.round(pct * 100), inView)
  const r = 44
  const rules = [
    { name: { en: 'Needs · 50%', es: 'Necesidades · 50%' }, pct: 72, color: 'var(--c1)' },
    { name: { en: 'Wants · 30%', es: 'Gustos · 30%' }, pct: 58, color: 'var(--c2)' },
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

/* ---------- Shared expense ---------- */

export function SharedCard({ lang }: { lang: Lang }) {
  const [ref, inView] = useReveal<HTMLDivElement>()
  const [accepted, setAccepted] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!inView || reduce) return
    const id = setTimeout(() => setAccepted(true), 1800)
    return () => clearTimeout(id)
  }, [inView, reduce])

  return (
    <div ref={ref} className="nb-card p-5" style={{ boxShadow: 'var(--shadow)' }}>
      <div className="flex items-center justify-between gap-3">
        <div className="font-medium">{lang === 'es' ? 'De' : 'From'}: <span className="nb-num">BUD-7WK3E8</span></div>
        <motion.span
          key={accepted ? 'a' : 'p'}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="rounded-full px-2.5 py-1 text-xs font-medium"
          style={accepted
            ? { background: 'var(--income-bg)', color: 'var(--income)' }
            : { background: 'var(--expense-bg)', color: 'var(--expense)' }}
        >
          {accepted ? (lang === 'es' ? 'Aceptado' : 'Accepted') : (lang === 'es' ? 'Pendiente' : 'Pending')}
        </motion.span>
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-sm" style={{ color: 'var(--muted)' }}>{lang === 'es' ? 'Tu parte' : 'Your share'}</span>
        <Amount value={450} active={inView} size={26} />
        <span className="text-sm" style={{ color: 'var(--muted)' }}>· {lang === 'es' ? 'Cena del viernes' : 'Friday dinner'}</span>
      </div>
      <div className="mt-4 flex items-center gap-2">
        {['A', 'M', 'L'].map((n, i) => (
          <span key={n} className="-ml-1 first:ml-0 grid h-8 w-8 place-items-center rounded-full border-2 text-xs font-semibold" style={{ borderColor: 'var(--card)', background: [`var(--c2)`, `var(--c4)`, `var(--c5)`][i], color: '#0D0E12' }}>{n}</span>
        ))}
        <span className="ml-1 text-sm" style={{ color: 'var(--muted)' }}>{lang === 'es' ? '$1,350 entre 3' : '$1,350 split 3 ways'}</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button className="rounded-full py-2.5 text-sm font-semibold" style={{ background: 'var(--track)' }} tabIndex={-1}>{lang === 'es' ? 'Rechazar' : 'Decline'}</button>
        <button className="rounded-full py-2.5 text-sm font-semibold" style={{ background: 'var(--accent)', color: 'var(--on-accent)' }} tabIndex={-1}>{lang === 'es' ? 'Aceptar' : 'Accept'}</button>
      </div>
    </div>
  )
}

/* ---------- Apple Pay notification ---------- */

export function ApplePayToast({ lang, delay = 1.1 }: { lang: Lang; delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: -16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      className="flex items-center gap-3 rounded-[22px] p-3 pr-4 backdrop-blur-xl"
      style={{ background: 'color-mix(in srgb, var(--card) 88%, transparent)', border: '1px solid var(--stroke)', boxShadow: 'var(--shadow)' }}
    >
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px]" style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 5v14M5 12h14" /></svg>
      </div>
      <div className="min-w-0 flex-1 text-sm leading-snug">
        <div className="flex justify-between gap-2">
          <span className="font-semibold">Budpoint</span>
          <span style={{ color: 'var(--muted)' }}>{lang === 'es' ? 'ahora' : 'now'}</span>
        </div>
        <div className="truncate">{lang === 'es' ? 'Guardado por confirmar' : 'Saved for review'} · Apple Pay</div>
        <div className="nb-num truncate" style={{ color: 'var(--muted)' }}>Café Olmo · $89.00</div>
      </div>
    </motion.div>
  )
}
