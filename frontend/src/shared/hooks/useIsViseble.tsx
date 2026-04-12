import { useEffect, useState, useRef } from "react"

export function useIsVisible<T extends HTMLElement> () {

    const ref = useRef<T | null>(null)
    const [isVisible, setIsViseble] = useState<boolean>(false)

    useEffect(() => {
        const el = ref.current

        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsViseble(entry.isIntersecting)
            },
            {
                threshold: 0.2,
            }
        );

        observer.observe(el)

        return () => observer.disconnect();
    })
    return {ref, isVisible}
}