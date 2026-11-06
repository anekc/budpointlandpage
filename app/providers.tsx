'use client'

import { ThemeProvider } from './components/ThemeContext'
import { LanguageProvider } from './components/LanguageContext'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <LanguageProvider>
                {children}
            </LanguageProvider>
        </ThemeProvider>
    )
}
