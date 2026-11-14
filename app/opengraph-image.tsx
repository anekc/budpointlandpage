import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

// Preview card for links shared on social networks and chat apps, in the Nocturno dark style
export const alt = 'Budpoint: budgets and shared expenses for iPhone'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const logo = await readFile(join(process.cwd(), 'public/logo.png'))
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 80, background: '#0D0E12', color: '#F2F3F5' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <img src={logoSrc} width={88} height={88} style={{ borderRadius: 22 }} alt="" />
          <div style={{ fontSize: 52, fontWeight: 600 }}>Budpoint</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 72, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.05 }}>Know where your money went.</div>
          <div style={{ fontSize: 72, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#9BA1AD' }}>Before the month ends.</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 32, color: '#9BA1AD' }}>
          <div style={{ display: 'flex', background: '#C8F25A', color: '#0D0E12', borderRadius: 999, padding: '10px 28px', fontWeight: 600 }}>Free beta on TestFlight</div>
          For iPhone
        </div>
      </div>
    ),
    size,
  )
}
