'use client'

import ContentEs from './content-es.mdx'
import ContentEn from './content-en.mdx'
import { BlogPost } from '../../BlogPost'

export default function Post() {
  return <BlogPost slug="welcome-to-budpoint" ContentEs={ContentEs} ContentEn={ContentEn} />
}
