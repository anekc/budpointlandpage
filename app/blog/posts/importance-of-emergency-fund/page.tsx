'use client'

import { useState, useEffect } from 'react'
import ContentEs from './content-es.mdx'
import ContentEn from './content-en.mdx'
import Link from 'next/link'

export default function BlogPost() {
    const [language, setLanguage] = useState<'es' | 'en'>('en')

    useEffect(() => {
        const browserLang = navigator.language.startsWith('es') ? 'es' : 'en'
        setLanguage(browserLang)
    }, [])

    return (
        <div>
            {/* Back link */}
            <Link
                href="/blog"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
            >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {language === 'es' ? 'Volver al blog' : 'Back to blog'}
            </Link>

            {/* Content */}
            <article className="prose prose-lg dark:prose-invert max-w-none">
                {language === 'es' ? <ContentEs /> : <ContentEn />}
            </article>
        </div>
    )
}
