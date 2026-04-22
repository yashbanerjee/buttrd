import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { MobileNav } from './MobileNav.jsx'
import { SiteNav } from './SiteNav.jsx'

export function RootLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <SiteNav onOpenMenu={() => setMobileOpen(true)} />
      <Outlet />
    </>
  )
}
