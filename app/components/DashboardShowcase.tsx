'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import {
  AccountSplitsCard, AccountsCard, BalanceCard, DistributionCard, GoalsCard, RecurringCard, SharedBalancesCard,
} from './NocturnoUI'
import type { Lang } from './LanguageContext'

const EASE = [0.22, 1, 0.36, 1] as const

// Same widgets, order and copy as DashboardWidget / DashboardSettingsView in the app
const widgets = [
  { id: 'expensesSummary', Card: AccountSplitsCard, icon: 'M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 2c-3 0-6 1.5-6 4v2h12v-2c0-2.5-3-4-6-4Zm8 0c-.5 0-1 0-1.5.1 1.5.9 2.5 2.2 2.5 3.9v2h5v-2c0-2.5-3-4-6-4Z',
    name: { es: 'Resumen de gastos', en: 'Expenses summary' }, desc: { es: 'Gastos personales y compartidos, por cuenta', en: 'Personal and shared spending, by account' } },
  { id: 'accounts', Card: AccountsCard, icon: 'M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Zm0 3h18M7 15h4',
    name: { es: 'Cuentas', en: 'Accounts' }, desc: { es: 'Tus cuentas y sus saldos', en: 'Your accounts and their balances' } },
  { id: 'periodStats', Card: BalanceCard, icon: 'M5 20V10m7 10V4m7 16v-7',
    name: { es: 'Estadísticas del periodo', en: 'Period statistics' }, desc: { es: 'Ingresos, gastos y balance del mes', en: 'Income, expenses and balance for the month' } },
  { id: 'recurring', Card: RecurringCard, icon: 'M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4',
    name: { es: 'Recurrentes', en: 'Recurring' }, desc: { es: 'Lo que entra y sale cada mes', en: 'What comes in and goes out every month' } },
  { id: 'sharedBalances', Card: SharedBalancesCard, icon: 'M7 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 20c0-3 2.5-5 5-5s5 2 5 5m0 0c0-3 2.5-5 5-5s5 2 5 5',
    name: { es: 'Balances compartidos', en: 'Shared balances' }, desc: { es: 'Lo que debes y lo que te deben', en: 'What you owe and what you’re owed' } },
  { id: 'goals', Card: GoalsCard, icon: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-4a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z',
    name: { es: 'Metas financieras', en: 'Financial goals' }, desc: { es: 'Cuánto llevas ahorrado para cada meta', en: 'How far along each savings goal is' } },
  { id: 'distribution', Card: DistributionCard, icon: 'M12 3v9h9a9 9 0 1 1-9-9Zm3 0a6 6 0 0 1 6 6h-6V3Z',
    name: { es: 'Distribución de gastos', en: 'Expense distribution' }, desc: { es: 'En qué categorías se va tu dinero', en: 'Which categories your money goes to' } },
] as const

/** The app's "Dashboard layout" settings: pick a widget to preview it. Cycles on its own until tapped. */
export function DashboardShowcase({ lang }: { lang: Lang }) {
  const [active, setActive] = useState(0)
  const touched = useRef(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-20% 0px' })
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!inView || reduce) return
    const id = setInterval(() => {
      if (!touched.current) setActive(i => (i + 1) % widgets.length)
    }, 4000)
    return () => clearInterval(id)
  }, [inView, reduce])

  const { Card } = widgets[active]

  return (
    <div ref={ref} className="grid items-start gap-6 lg:grid-cols-[1fr_420px] lg:gap-12">
      <div className="nb-card overflow-hidden p-1.5">
        {widgets.map((w, i) => {
          const on = i === active
          return (
            <button
              key={w.id}
              type="button"
              onClick={() => { touched.current = true; setActive(i) }}
              className="flex w-full cursor-pointer items-center gap-3 rounded-[14px] px-3 py-2.5 text-left transition-colors"
              style={on ? { background: 'var(--track)' } : undefined}
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px]" style={{ background: on ? 'var(--accent)' : 'var(--track)', color: on ? 'var(--on-accent)' : 'var(--accent-text)' }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={w.icon} /></svg>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-medium">{w.name[lang]}</span>
                <span className="block truncate text-[13px]" style={{ color: 'var(--muted)' }}>{w.desc[lang]}</span>
              </span>
              {/* Same toggle as the settings screen; every widget is on by default */}
              <span className="relative h-[22px] w-[38px] shrink-0 rounded-full" style={{ background: 'var(--accent)' }}>
                <span className="absolute top-[2px] right-[2px] h-[18px] w-[18px] rounded-full bg-white shadow" />
              </span>
            </button>
          )
        })}
      </div>

      <div className="relative min-h-[520px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={widgets[active].id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <Card lang={lang} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
