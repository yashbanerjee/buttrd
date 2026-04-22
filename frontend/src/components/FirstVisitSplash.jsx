import { useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'buttrd_splash_seen'

/**
 * One-time first-visit overlay: yellow drip slides into place, logo buzzes, then fades away.
 */
export function FirstVisitSplash({ onComplete }) {
  const [dripIn, setDripIn] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    let cancelled = false
    let raf2 = 0
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        if (!cancelled) setDripIn(true)
      })
    })

    const fadeTimer = window.setTimeout(() => {
      if (!cancelled) setFadeOut(true)
    }, 2600)
    const doneTimer = window.setTimeout(() => {
      if (cancelled) return
      try {
        localStorage.setItem(STORAGE_KEY, '1')
      } catch {
        /* private mode etc. */
      }
      onCompleteRef.current?.()
    }, 3400)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
      window.clearTimeout(fadeTimer)
      window.clearTimeout(doneTimer)
    }
  }, [])

  return (
    <div
      className={`first-visit-splash${dripIn ? ' first-visit-splash--drip-in' : ''}${fadeOut ? ' first-visit-splash--fade-out' : ''}`}
      role="presentation"
      aria-hidden="true"
    >
      <div className="first-visit-splash__drip-wrap">
        <svg
          className="first-visit-splash__drip"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            fill="var(--yellow)"
            d="M0,0 L1200,0 L1200,38
               C1080,72 1020,18 960,42 C900,68 840,22 780,48 C720,78 660,28 600,44
               C540,62 480,20 420,46 C360,72 300,26 240,44 C180,62 120,24 60,46
               C40,52 20,40 0,48 Z"
          />
        </svg>
      </div>
      <div className="first-visit-splash__logo-wrap">
        <img src="/assets/buttrd-logo.png" className="first-visit-splash__logo" alt="" />
      </div>
    </div>
  )
}

export function shouldShowFirstVisitSplash() {
  if (typeof window === 'undefined') return false
  try {
    return !localStorage.getItem(STORAGE_KEY)
  } catch {
    return true
  }
}
