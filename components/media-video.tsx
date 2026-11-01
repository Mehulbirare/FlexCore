"use client"

import { useState } from "react"

type MediaVideoProps = React.VideoHTMLAttributes<HTMLVideoElement> & {
    fallbackImage: string
    fallbackAlt: string
}

export function MediaVideo({ fallbackImage, fallbackAlt, ...videoProps }: MediaVideoProps) {
    const [hasError, setHasError] = useState(false)

    if (hasError) {
        return (
            <img
                src={fallbackImage}
                alt={fallbackAlt}
                className={videoProps.className}
            />
        )
    }

    return <video {...videoProps} onError={() => setHasError(true)} />
}
