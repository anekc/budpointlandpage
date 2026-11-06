import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './nocturno.css'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Budpoint — Preview',
  robots: { index: false, follow: false },
}

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return <div className={spaceGrotesk.variable}>{children}</div>
}
