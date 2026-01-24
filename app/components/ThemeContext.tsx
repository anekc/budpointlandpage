'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface ThemeContextType {
    isDark: boolean
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    // Initialize state based on localStorage or system preference if available on client
    // Default to false (light) for SSR to avoid mismatch, but we handle FOUC separately
    const [isDark, setIsDark] = useState(false)
    const [isInitialized, setIsInitialized] = useState(false)

    useEffect(() => {
        // Check localStorage first
        const savedTheme = localStorage.getItem('budpoint-theme')
        if (savedTheme) {
            setIsDark(savedTheme === 'dark')
        } else {
            // Fallback to system preference
            const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
            setIsDark(darkModeQuery.matches)
        }
        setIsInitialized(true)

        // Listen for system changes
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handleSystemChange = (e: MediaQueryListEvent) => {
            if (!localStorage.getItem('budpoint-theme')) {
                setIsDark(e.matches)
            }
        }
        darkModeQuery.addEventListener('change', handleSystemChange)
        return () => darkModeQuery.removeEventListener('change', handleSystemChange)
    }, [])

    const toggleTheme = () => {
        const newValue = !isDark
        setIsDark(newValue)
        localStorage.setItem('budpoint-theme', newValue ? 'dark' : 'light')

        // Update HTML class for Tailwind dark mode if using 'class' strategy
        // Although standard Tailwind with 'media' strategy doesn't strictly need this on 'html',
        // explicitly toggling a class is good practice for 'class' based dark mode.
        if (newValue) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }

    // Sync state with DOM on mount and updates
    useEffect(() => {
        if (!isInitialized) return

        if (isDark) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [isDark, isInitialized])

    // Prevent flash by not rendering children until mounted? 
    // Better approach for FOUC is script injection in layout, but for now access to state is enough.
    // We explicitly return children always, but state might be 'light' initially.
    // The script in layout.tsx (or metadata) handles initial paint if we use a script.
    // For simplicity here, we trust the effect sync. To strictly avoid FOUC, we need a blocking script in head.

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {/* 
        This div wraps the app content. 
        Note: Layouts might impose their own backgrounds. 
        The global context just provides the state.
      */}
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}
