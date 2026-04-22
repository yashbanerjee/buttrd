import { useEffect, useLayoutEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { FirstVisitSplash, shouldShowFirstVisitSplash } from './FirstVisitSplash.jsx'
import { MobileNav } from './MobileNav.jsx'
import { SiteNav } from './SiteNav.jsx'

export function RootLayout() {
  const { pathname } = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showSplash, setShowSplash] = useState(shouldShowFirstVisitSplash)

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen || showSplash ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen, showSplash])

  return (
    <>
      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <SiteNav onOpenMenu={() => setMobileOpen(true)} />
      <Outlet />
      {showSplash ? <FirstVisitSplash onComplete={() => setShowSplash(false)} /> : null}
    </>
  )
}
