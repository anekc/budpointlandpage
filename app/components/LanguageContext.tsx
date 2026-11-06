'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export type Lang = 'en' | 'es'

interface LanguageContextType {
    lang: Lang
    switchLang: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLang] = useState<Lang>('en')

    // Saved choice first, then the browser language
    useEffect(() => {
        try {
            const saved = localStorage.getItem('budpoint-lang')
            if (saved === 'en' || saved === 'es') {
                setLang(saved)
                return
            }
        } catch {}
        if (navigator.language.startsWith('es')) setLang('es')
    }, [])

    useEffect(() => {
        document.documentElement.lang = lang
    }, [lang])

    const switchLang = () => {
        const next = lang === 'en' ? 'es' : 'en'
        setLang(next)
        try { localStorage.setItem('budpoint-lang', next) } catch {}
    }

    return (
        <LanguageContext.Provider value={{ lang, switchLang }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}
