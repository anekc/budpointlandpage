'use client'

import { useState, useEffect } from 'react'

export function useIsSafari() {
    const [isSafari, setIsSafari] = useState(false)

    useEffect(() => {
        const ua = navigator.userAgent.toLowerCase()
        const isSafariBrowser = ua.indexOf('safari') > -1 && ua.indexOf('chrome') === -1
        setIsSafari(isSafariBrowser)
    }, [])

    return isSafari
}
