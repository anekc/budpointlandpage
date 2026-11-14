import type { MetadataRoute } from 'next'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'

const SITE_URL = 'https://budpoint.app'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  // Every folder under app/blog/posts is a published post
  const posts = readdirSync(join(process.cwd(), 'app/blog/posts'), { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => `/blog/posts/${d.name}`)
  return ['', '/blog', ...posts, '/support', '/privacy', '/terms'].map(path => ({ url: `${SITE_URL}${path}` }))
}
