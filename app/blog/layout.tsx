'use client'

import { SiteShell } from '../components/SiteChrome'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {children}
      </div>
    </SiteShell>
  )
}
