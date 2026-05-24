import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { fetchPublicContent } from '../api/adminApi.js'
import { defaultSiteContent } from '../data/defaultSiteContent.js'

const SiteContentContext = createContext(null)

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(defaultSiteContent)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    try {
      const data = await fetchPublicContent()
      setContent(data)
    } catch {
      setContent(defaultSiteContent)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const value = useMemo(
    () => ({
      content,
      loading,
      refresh,
      heroCards: content.heroCards ?? defaultSiteContent.heroCards,
      offers: (content.offers ?? defaultSiteContent.offers).filter(
        (offer) => offer.active !== false,
      ),
      socialGrids: content.socialGrids ?? defaultSiteContent.socialGrids,
    }),
    [content, loading, refresh],
  )

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext)
  if (!ctx) throw new Error('useSiteContent must be used within SiteContentProvider')
  return ctx
}