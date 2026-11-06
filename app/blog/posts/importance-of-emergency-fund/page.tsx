'use client'

import ContentEs from './content-es.mdx'
import ContentEn from './content-en.mdx'
import { BlogPost } from '../../BlogPost'

export default function Post() {
  return <BlogPost slug="importance-of-emergency-fund" ContentEs={ContentEs} ContentEn={ContentEn} />
}
