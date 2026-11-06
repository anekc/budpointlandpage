'use client'

import ContentEs from './content-es.mdx'
import ContentEn from './content-en.mdx'
import { BlogPost } from '../../BlogPost'

export default function Post() {
  return <BlogPost slug="how-to-choose-budget-period" ContentEs={ContentEs} ContentEn={ContentEn} />
}
