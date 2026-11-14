'use client'

import { motion, useReducedMotion } from 'framer-motion'

import { AccountSplitsCard, ApplePayBanner, BalanceCard, PeriodCard, type Lang } from './NocturnoUI'

// The app's own tab names (Localizable.strings), so the mock reads as Budpoint and not a web page
const tabs: Record<Lang, string[]> = {
  es: ['Dashboard', 'Transacciones', 'Objetivos', 'Ajustes'],
  en: ['Dashboard', 'Transactions', 'Targets', 'Settings'],
}

// SF-symbol-like glyphs: chart.bar, arrow.left.arrow.right, target, gearshape
const TAB_ICONS = [
  'M5 20V11m5 9V5m5 15v-8m5 8V8',
  'M7 4 3 8l4 4M3 8h14m0 12 4-4-4-4m4 4H7',
  'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-4a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z',
  'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7.4-3a7.4 7.4 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7.5 7.5 0 0 0-2-1.2L14.5 3h-5l-.4 2.6a7.5 7.5 0 0 0-2 1.2l-2.4-1-2 3.4 2 1.6a7.4 7.4 0 0 0 0 2.4l-2 1.6 2 3.4 2.4-1a7.5 7.5 0 0 0 2 1.2l.4 2.6h5l.4-2.6a7.5 7.5 0 0 0 2-1.2l2.4 1 2-3.4-2-1.6c.1-.4.1-.8.1-1.2Z',
]

export const APPLE_LOGO = 'M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.3-1.8-1.4-.1-2.8.8-3.5.8-.7 0-1.8-.8-3-.8-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 6.9 1.2 9.1.8 1.1 1.7 2.3 2.9 2.3 1.1 0 1.6-.7 3-.7s1.8.7 3 .7c1.2 0 2-1.1 2.8-2.2.9-1.3 1.2-2.5 1.3-2.6 0 0-2.4-.9-2.4-3.6ZM14.1 5.9c.6-.8 1.1-1.8.9-2.9-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.8-1 2.8 1.1.1 2.1-.5 2.8-1.3Z'

function StatusBar() {
  return (
    <div className="flex h-[54px] items-center justify-between pr-7 pl-9 pt-1.5 text-[17px] font-semibold">
      <span className="nb-num">9:41</span>
      <div className="flex items-center gap-1.5" aria-hidden>
        <div className="flex h-3 items-end gap-[2px]">
          {[4, 6, 9, 12].map(h => <span key={h} className="w-[3px] rounded-[1px]" style={{ height: h, background: 'var(--text)' }} />)}
        </div>
        <svg width="17" height="12" viewBox="0 0 24 17"><path d="M12 16.5 8.5 13a5 5 0 0 1 7 0L12 16.5ZM4.9 9.4a10 10 0 0 1 14.2 0l-2 2a7.2 7.2 0 0 0-10.2 0l-2-2ZM1.3 5.8a15 15 0 0 1 21.4 0l-2 2a12.2 12.2 0 0 0-17.4 0l-2-2Z" fill="var(--text)" /></svg>
        <span className="h-[13px] w-[26px] rounded-[4px] p-[1.5px]" style={{ border: '1px solid var(--muted)' }}>
          <span className="block h-full w-[80%] rounded-[2px]" style={{ background: 'var(--text)' }} />
        </span>
      </div>
    </div>
  )
}

function TabBar({ lang }: { lang: Lang }) {
  return (
    <div
      className="absolute inset-x-3 bottom-6 grid h-[62px] grid-cols-4 items-center rounded-full px-1"
      style={{ background: 'color-mix(in srgb, var(--card) 82%, transparent)', border: '1px solid var(--stroke)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.45)' }}
    >
      {tabs[lang].map((label, i) => (
        <div
          key={label}
          className="flex flex-col items-center gap-0.5 rounded-full py-1.5"
          style={{ color: i === 0 ? 'var(--accent-text)' : 'var(--text)', background: i === 0 ? 'var(--track)' : 'transparent' }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={TAB_ICONS[i]} /></svg>
          <span className="text-[10px] font-medium">{label}</span>
        </div>
      ))}
    </div>
  )
}

/**
 * The hero's iPhone: a CSS phone with the Dashboard inside, built from the same live cards as the
 * rest of the page (theme, language and animation included). Drawn at the real 390 pt screen
 * width and scaled down with --s (see .nb-phone in nocturno.css).
 */
export function PhoneHero({ lang }: { lang: Lang }) {
  const reduce = useReducedMotion()
  return (
    <div className="relative mx-auto w-fit">
      {/* soft lime glow behind the phone */}
      <div aria-hidden className="pointer-events-none absolute -inset-y-10 inset-x-0 rounded-full opacity-60 blur-3xl" style={{ background: 'radial-gradient(closest-side, rgba(200,242,90,0.22), transparent)' }} />

      <motion.div
        className="nb-phone-wrap relative"
        initial={reduce ? false : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <div className="nb-phone" role="img" aria-label={lang === 'es' ? 'Budpoint en un iPhone: el Dashboard' : 'Budpoint on an iPhone: the Dashboard'}>
          <div className="relative h-full w-full overflow-hidden rounded-[54px]" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
            <StatusBar />
            <div className="px-5 pt-1 pb-3 text-[34px] font-bold tracking-[-0.02em]">Dashboard</div>
            <div className="space-y-3 px-4" aria-hidden>
              <PeriodCard lang={lang} />
              <ApplePayBanner lang={lang} delay={1.1} />
              <AccountSplitsCard lang={lang} />
              <BalanceCard lang={lang} />
            </div>

            {/* add button, like the app's floating + */}
            <div className="absolute right-5 bottom-[100px] grid h-14 w-14 place-items-center rounded-[20px]" style={{ background: 'var(--accent)', color: 'var(--on-accent)', boxShadow: '0 10px 24px -8px rgba(0,0,0,0.5)' }} aria-hidden>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
            </div>
            <TabBar lang={lang} />
            <div className="absolute bottom-2 left-1/2 h-[5px] w-[134px] -translate-x-1/2 rounded-full" style={{ background: 'var(--text)', opacity: 0.85 }} aria-hidden />
          </div>
          {/* Dynamic Island */}
          <div className="absolute top-[23px] left-1/2 h-[35px] w-[122px] -translate-x-1/2 rounded-full bg-black" aria-hidden />
        </div>
      </motion.div>
    </div>
  )
}
