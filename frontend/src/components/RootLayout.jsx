import { useEffect, useLayoutEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { FirstVisitSplash, shouldShowFirstVisitSplash } from './FirstVisitSplash.jsx'
import { MobileTabBar } from './MobileTabBar.jsx'
import { SiteNav } from './SiteNav.jsx'

export function RootLayout() {
  const { pathname } = useLocation()
  const [showSplash, setShowSplash] = useState(shouldShowFirstVisitSplash)

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = showSplash ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [showSplash])

  return (
    <>
      <SiteNav />
      <Outlet />
      <MobileTabBar />
      {showSplash ? <FirstVisitSplash onComplete={() => setShowSplash(false)} /> : null}
    </>
  )
}
