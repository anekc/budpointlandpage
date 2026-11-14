import { track as vercelTrack } from '@vercel/analytics'

/**
 * Landing events for Vercel Web Analytics. Properties never carry personal data
 * (no emails, no amounts): only where on the page something happened and the language.
 *
 * - testflight_click  A TestFlight button was clicked. placement: header | hero | cta
 * - waitlist_submit   Formspree accepted a waitlist email
 * - waitlist_error    Formspree rejected it or the request failed
 * - pricing_view      The pricing section scrolled into view (once per page load)
 * - language_switch   The ES/EN toggle was used. to: es | en
 *
 * A click on TestFlight is not an install; installs are counted in App Store Connect ▸ TestFlight.
 */
export type LandingEvent = 'testflight_click' | 'waitlist_submit' | 'waitlist_error' | 'pricing_view' | 'language_switch'

export function track(name: LandingEvent, props?: Record<string, string>) {
  // Analytics must never break the page (ad blockers, script not loaded yet)
  try {
    vercelTrack(name, props)
  } catch {}
}
