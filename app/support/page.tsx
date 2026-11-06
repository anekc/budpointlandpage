'use client'

import Link from 'next/link'
import { SiteShell, AccentButton } from '../components/SiteChrome'
import { useLanguage } from '../components/LanguageContext'

const copy = {
  en: {
    label: 'Support',
    title: 'How can we help?',
    body: 'Start with the common questions below. If you don’t find your answer, write to us and a real person will reply.',
    write: 'Email us',
    reply: 'Questions, bugs or ideas for the app.',
    faqTitle: 'Common questions',
    faq: [
      { q: 'How do I sync my data across devices?', a: 'iCloud backup and sync is part of Pro. Turn it on in Budpoint’s Settings and use the same Apple ID on every device. When you install Budpoint on a new iPhone, it offers to restore your data from iCloud.' },
      { q: 'How do I restore my Pro purchase?', a: 'If you got a new device or reinstalled the app, go to the Settings tab, open the Pro section and tap “Restore Purchases”.' },
      { q: 'My Apple Pay purchases aren’t showing up', a: 'Only purchases paid with Apple Pay are captured; paying with the physical card or online without Apple Pay won’t trigger it. Check in the Shortcuts app that the automation is turned on, then open Budpoint: new purchases appear when the app opens, ready for you to confirm.' },
      { q: 'How do I share expenses with my partner or friends?', a: 'Connect with the other person using your Budpoint codes (they look like BUD-…). Once you’re connected, you can send them their share of any expense. They accept it and it shows up in their app.' },
      { q: 'Is my financial data secure?', a: 'Your finances are stored on your iPhone and, if you turn on sync, in your own iCloud with end-to-end encryption. Only the expenses you share with someone go through our servers.' },
      { q: 'How do I delete my account?', a: 'You can delete your account from the app’s settings. That permanently removes your sharing data from our servers.' },
    ],
    legal: 'Legal',
    privacy: 'Privacy Policy',
    privacyDesc: 'What we store, where, and how to delete it.',
    terms: 'Terms of Service',
    termsDesc: 'Subscriptions, payments and the rules of use.',
  },
  es: {
    label: 'Soporte',
    title: '¿En qué te ayudamos?',
    body: 'Empieza por las preguntas frecuentes de abajo. Si no encuentras tu respuesta, escríbenos y te contesta una persona de verdad.',
    write: 'Escríbenos',
    reply: 'Dudas, errores o ideas para la app.',
    faqTitle: 'Preguntas frecuentes',
    faq: [
      { q: '¿Cómo sincronizo mis datos entre dispositivos?', a: 'El respaldo y la sincronización con iCloud son parte de Pro. Actívalos en los Ajustes de Budpoint y usa el mismo Apple ID en todos tus dispositivos. Cuando instalas Budpoint en un iPhone nuevo, te ofrece recuperar tu información desde iCloud.' },
      { q: '¿Cómo recupero mi compra de Pro?', a: 'Si cambiaste de dispositivo o reinstalaste la app, ve a la pestaña Ajustes, entra a la sección Pro y toca “Restaurar compras”.' },
      { q: 'Mis compras con Apple Pay no aparecen', a: 'Solo se registran las compras pagadas con Apple Pay; si pagas con la tarjeta física o en línea sin Apple Pay, no se activa. Revisa en la app Atajos que la automatización esté encendida y luego abre Budpoint: las compras nuevas aparecen al abrir la app, listas para que las confirmes.' },
      { q: '¿Cómo comparto gastos con mi pareja o mis amigos?', a: 'Conéctate con la otra persona usando sus códigos de Budpoint (se ven así: BUD-…). Ya conectados, puedes mandarle su parte de cualquier gasto. La acepta y le aparece en su app.' },
      { q: '¿Mi información financiera está segura?', a: 'Tus finanzas se guardan en tu iPhone y, si activas la sincronización, en tu propio iCloud con cifrado de extremo a extremo. Solo los gastos que compartes con alguien pasan por nuestros servidores.' },
      { q: '¿Cómo borro mi cuenta?', a: 'Puedes borrar tu cuenta desde los ajustes de la app. Eso elimina para siempre tus datos de compartir de nuestros servidores.' },
    ],
    legal: 'Legal',
    privacy: 'Política de privacidad',
    privacyDesc: 'Qué guardamos, dónde y cómo borrarlo.',
    terms: 'Términos de servicio',
    termsDesc: 'Suscripciones, pagos y reglas de uso.',
  },
}

export default function SupportPage() {
  const { lang } = useLanguage()
  const c = copy[lang]

  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 pt-14 pb-14 md:pt-20 lg:grid-cols-[1.2fr_1fr] lg:items-end" style={{ borderBottom: '1px solid var(--stroke)' }}>
          <div>
            <div className="nb-label">{c.label}</div>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.035em] sm:text-6xl">{c.title}</h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed" style={{ color: 'var(--muted)' }}>{c.body}</p>
          </div>
          <div className="nb-card p-6">
            <div className="nb-label">Email</div>
            <div className="mt-2 text-xl font-medium tracking-tight">support@budpoint.app</div>
            <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>{c.reply}</p>
            <div className="mt-5"><AccentButton href="mailto:support@budpoint.app">{c.write}</AccentButton></div>
          </div>
        </div>

        <div className="grid gap-10 py-14 lg:grid-cols-[1fr_2fr] lg:py-20">
          <h2 className="text-3xl font-semibold tracking-[-0.03em]">{c.faqTitle}</h2>
          <div>
            {c.faq.map(f => (
              <details key={f.q} className="group py-5" style={{ borderBottom: '1px solid var(--stroke)' }}>
                <summary className="flex cursor-pointer items-center justify-between gap-6 text-lg font-medium">
                  {f.q}
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-lg transition-transform group-open:rotate-45" style={{ background: 'var(--track)' }}>+</span>
                </summary>
                <p className="mt-3 max-w-2xl leading-relaxed" style={{ color: 'var(--muted)' }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="grid gap-10 pb-20 lg:grid-cols-[1fr_2fr]" style={{ borderTop: '1px solid var(--stroke)' }}>
          <h2 className="pt-14 text-3xl font-semibold tracking-[-0.03em]">{c.legal}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:pt-14">
            {[
              { href: '/privacy', t: c.privacy, d: c.privacyDesc },
              { href: '/terms', t: c.terms, d: c.termsDesc },
            ].map(l => (
              <Link key={l.href} href={l.href} className="nb-card group block p-6 transition-colors hover:border-[var(--muted)]">
                <div className="flex items-center justify-between gap-3 text-lg font-semibold tracking-tight">
                  {l.t}
                  <span className="transition-transform group-hover:translate-x-0.5" style={{ color: 'var(--muted)' }}>→</span>
                </div>
                <p className="mt-2" style={{ color: 'var(--muted)' }}>{l.d}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </SiteShell>
  )
}
