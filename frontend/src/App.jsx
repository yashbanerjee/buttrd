import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { SiteContentProvider } from './context/SiteContentContext.jsx'
import { RootLayout } from './components/RootLayout.jsx'
import { CateringPage } from './pages/CateringPage.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { OurStoryPage } from './pages/OurStoryPage.jsx'
import { OffersPage } from './pages/OffersPage.jsx'
import { AdminLoginPage } from './pages/admin/AdminLoginPage.jsx'
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage.jsx'

export default function App() {
  return (
    <HelmetProvider>
      <SiteContentProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route element={<RootLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/catering" element={<CateringPage />} />
              <Route path="/our-story" element={<OurStoryPage />} />
              <Route path="/offers" element={<OffersPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SiteContentProvider>
    </HelmetProvider>
  )
}
