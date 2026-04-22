import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { RootLayout } from './components/RootLayout.jsx'
import { CateringPage } from './pages/CateringPage.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { OurStoryPage } from './pages/OurStoryPage.jsx'

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/catering" element={<CateringPage />} />
            <Route path="/our-story" element={<OurStoryPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}
