'use client'

import { useRef, useEffect, useState } from 'react'

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
    src: string
}

export default function LazyVideo({ src, style, ...props }: LazyVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [hasPlayed, setHasPlayed] = useState(false)

    useEffect(() => {
        const videoElement = videoRef.current
        if (!videoElement) return

        const observerCallback: IntersectionObserverCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !hasPlayed) {
                    videoElement.play().catch(() => {
                        // Auto-play was prevented (e.g., low power mode or user interaction required)
                    })
                    setHasPlayed(true)
                } else if (!entry.isIntersecting && hasPlayed && !videoElement.paused) {
                    // Optional: Pause when out of view if desired
                    videoElement.pause()
                    setHasPlayed(false)
                }
            })
        }

        const observer = new IntersectionObserver(observerCallback, {
            threshold: 0.5, // Play when 50% visible
        })

        observer.observe(videoElement)

        return () => observer.disconnect()
    }, [hasPlayed])

    return (
        <video
            ref={videoRef}
            muted
            playsInline
            loop
            style={style}
            {...props}
        >
            <source src={src} type="video/mp4" />
        </video>
    )
}
