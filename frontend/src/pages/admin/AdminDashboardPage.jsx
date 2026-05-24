import { useEffect, useRef, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { getAdminToken, logoutAdmin, saveSiteContent, uploadImage } from '../../api/adminApi.js'
import { defaultSiteContent } from '../../data/defaultSiteContent.js'
import { useSiteContent } from '../../context/SiteContentContext.jsx'

const TABS = [
  { id: 'hero', label: 'Hero banners' },
  { id: 'offers', label: 'Offers' },
  { id: 'social', label: 'Social circle' },
]

const SOCIAL_PAGES = [
  { id: 'home', label: 'Home' },
  { id: 'catering', label: 'Catering' },
  { id: 'ourStory', label: 'Our story' },
]

function ImageField({ label, src, alt, onSrcChange, onAltChange, onUpload }) {
  const inputRef = useRef(null)
  const [uploading, setUploading] = useState(false)

  async function handleFileChange(e) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return

    setUploading(true)
    try {
      await onUpload(file)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="admin-image-field">
      <div className="admin-image-field__preview">
        {src ? <img src={src} alt={alt || label} /> : <span>No image</span>}
      </div>
      <div className="admin-image-field__controls">
        <label className="admin-field">
          <span>{label} URL</span>
          <input type="text" value={src} onChange={(e) => onSrcChange(e.target.value)} />
        </label>
        <label className="admin-field">
          <span>Alt text</span>
          <input type="text" value={alt} onChange={(e) => onAltChange(e.target.value)} />
        </label>
        <button
          type="button"
          className="admin-upload-btn"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? 'Uploading…' : 'Upload new image'}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="admin-file-input"
          onChange={handleFileChange}
        />
      </div>
    </div>
  )
}
export function AdminDashboardPage() {
  const { content, loading, refresh } = useSiteContent()
  const [tab, setTab] = useState('hero')
  const [draft, setDraft] = useState(defaultSiteContent)
  const [socialPage, setSocialPage] = useState('home')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const draftDirty = useRef(false)

  useEffect(() => {
    if (loading || draftDirty.current) return
    setDraft({
      heroCards: [...(content.heroCards || [])],
      offers: [...(content.offers || [])],
      socialGrids: {
        home: [...(content.socialGrids?.home || [])],
        catering: [...(content.socialGrids?.catering || [])],
        ourStory: [...(content.socialGrids?.ourStory || [])],
      },
    })
  }, [content, loading])

  if (!getAdminToken()) {
    return <Navigate to="/admin/login" replace />
  }

  async function handleUpload(file) {
    const { url } = await uploadImage(file)
    return url
  }

  async function uploadFieldImage(file, applyUrl) {
    setError('')
    setMessage('')
    try {
      const url = await handleUpload(file)
      draftDirty.current = true
      applyUrl(url)
      setMessage('Image uploaded. Click Save changes to publish.')
    } catch (err) {
      setError(err.message || 'Upload failed')
      throw err
    }
  }

  async function handleSave() {
    setSaving(true)
    setError('')
    setMessage('')
    try {
      await saveSiteContent(draft)
      draftDirty.current = false
      await refresh()
      setMessage('Saved successfully.')
    } catch (err) {
      setError(err.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  async function handleLogout() {
    await logoutAdmin()
    window.location.href = '/admin/login'
  }

  function updateHero(index, patch) {
    draftDirty.current = true
    setDraft((prev) => {
      const heroCards = [...prev.heroCards]
      heroCards[index] = { ...heroCards[index], ...patch }
      return { ...prev, heroCards }
    })
  }

  function moveHero(index, direction) {
    draftDirty.current = true
    setDraft((prev) => {
      const heroCards = [...prev.heroCards]
      const next = index + direction
      if (next < 0 || next >= heroCards.length) return prev
      ;[heroCards[index], heroCards[next]] = [heroCards[next], heroCards[index]]
      return { ...prev, heroCards }
    })
  }

  function addHero() {
    draftDirty.current = true
    setDraft((prev) => ({
      ...prev,
      heroCards: [...prev.heroCards, { src: '', alt: '' }],
    }))
  }

  function removeHero(index) {
    draftDirty.current = true
    setDraft((prev) => ({
      ...prev,
      heroCards: prev.heroCards.filter((_, i) => i !== index),
    }))
  }

  function updateOffer(index, patch) {
    draftDirty.current = true
    setDraft((prev) => {
      const offers = [...prev.offers]
      offers[index] = { ...offers[index], ...patch }
      return { ...prev, offers }
    })
  }

  function addOffer() {
    draftDirty.current = true
    setDraft((prev) => ({
      ...prev,
      offers: [
        {
          id: `offer-${Date.now()}`,
          badge: 'NEW',
          title: 'New offer',
          description: '',
          code: 'CODE',
          expires: '',
          active: true,
        },
        ...prev.offers,
      ],
    }))
  }

  function removeOffer(index) {
    draftDirty.current = true
    setDraft((prev) => ({
      ...prev,
      offers: prev.offers.filter((_, i) => i !== index),
    }))
  }

  function updateSocial(index, patch) {
    draftDirty.current = true
    setDraft((prev) => {
      const socialGrids = { ...prev.socialGrids }
      const list = [...socialGrids[socialPage]]
      list[index] = { ...list[index], ...patch }
      socialGrids[socialPage] = list
      return { ...prev, socialGrids }
    })
  }

  function addSocial() {
    draftDirty.current = true
    setDraft((prev) => {
      const socialGrids = { ...prev.socialGrids }
      socialGrids[socialPage] = [...socialGrids[socialPage], { src: '', alt: 'Instagram post' }]
      return { ...prev, socialGrids }
    })
  }

  function removeSocial(index) {
    draftDirty.current = true
    setDraft((prev) => {
      const socialGrids = { ...prev.socialGrids }
      socialGrids[socialPage] = socialGrids[socialPage].filter((_, i) => i !== index)
      return { ...prev, socialGrids }
    })
  }

  const socialImages = draft.socialGrids[socialPage] || []

  return (
    <div className="admin-page admin-dashboard">
      <header className="admin-header">
        <div>
          <h1>Buttrd Admin</h1>
          <p>Manage site content</p>
        </div>
        <div className="admin-header__actions">
          <Link to="/" className="admin-btn admin-btn--ghost">
            View site
          </Link>
          <button type="button" className="admin-btn admin-btn--ghost" onClick={handleLogout}>
            Log out
          </button>
          <button type="button" className="admin-btn admin-btn--primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </header>

      {message ? <p className="admin-banner admin-banner--success">{message}</p> : null}
      {error ? <p className="admin-banner admin-banner--error">{error}</p> : null}

      <nav className="admin-tabs" aria-label="Admin sections">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`admin-tabs__btn${tab === item.id ? ' is-active' : ''}`}
            onClick={() => setTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <main className="admin-panel">
        {tab === 'hero' ? (
          <section>
            <div className="admin-panel__head">
              <h2>Hero carousel</h2>
              <button type="button" className="admin-btn admin-btn--secondary" onClick={addHero}>
                Add slide
              </button>
            </div>
            <div className="admin-cards">
              {draft.heroCards.map((slide, index) => (
                <article key={`hero-${index}`} className="admin-card">
                  <ImageField
                    label="Image"
                    src={slide.src}
                    alt={slide.alt}
                    onSrcChange={(src) => updateHero(index, { src })}
                    onAltChange={(alt) => updateHero(index, { alt })}
                    onUpload={(file) =>
                      uploadFieldImage(file, (url) => updateHero(index, { src: url }))
                    }
                  />
                  <div className="admin-card__actions">
                    <button type="button" onClick={() => moveHero(index, -1)} disabled={index === 0}>
                      Move up
                    </button>
                    <button
                      type="button"
                      onClick={() => moveHero(index, 1)}
                      disabled={index === draft.heroCards.length - 1}
                    >
                      Move down
                    </button>
                    <button type="button" className="admin-btn--danger" onClick={() => removeHero(index)}>
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {tab === 'offers' ? (
          <section>
            <div className="admin-panel__head">
              <h2>Offers</h2>
              <button type="button" className="admin-btn admin-btn--secondary" onClick={addOffer}>
                Add offer
              </button>
            </div>
            <div className="admin-cards">
              {draft.offers.map((offer, index) => (
                <article key={`offer-${index}`} className="admin-card">
                  <div className="admin-form admin-form--grid">
                    <label className="admin-field">
                      <span>ID</span>
                      <input
                        type="text"
                        value={offer.id}
                        onChange={(e) => updateOffer(index, { id: e.target.value })}
                      />
                    </label>
                    <label className="admin-field">
                      <span>Badge</span>
                      <input
                        type="text"
                        value={offer.badge}
                        onChange={(e) => updateOffer(index, { badge: e.target.value })}
                      />
                    </label>
                    <label className="admin-field admin-field--full">
                      <span>Title</span>
                      <input
                        type="text"
                        value={offer.title}
                        onChange={(e) => updateOffer(index, { title: e.target.value })}
                      />
                    </label>
                    <label className="admin-field admin-field--full">
                      <span>Description</span>
                      <textarea
                        rows={3}
                        value={offer.description}
                        onChange={(e) => updateOffer(index, { description: e.target.value })}
                      />
                    </label>
                    <label className="admin-field">
                      <span>Promo code</span>
                      <input
                        type="text"
                        value={offer.code}
                        onChange={(e) => updateOffer(index, { code: e.target.value })}
                      />
                    </label>
                    <label className="admin-field">
                      <span>Expires</span>
                      <input
                        type="text"
                        value={offer.expires}
                        onChange={(e) => updateOffer(index, { expires: e.target.value })}
                      />
                    </label>
                    <label className="admin-field admin-field--checkbox">
                      <input
                        type="checkbox"
                        checked={offer.active !== false}
                        onChange={(e) => updateOffer(index, { active: e.target.checked })}
                      />
                      <span>Visible on site</span>
                    </label>
                  </div>
                  <div className="admin-card__actions">
                    <button type="button" className="admin-btn--danger" onClick={() => removeOffer(index)}>
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {tab === 'social' ? (
          <section>
            <div className="admin-panel__head">
              <h2>Social circle</h2>
              <div className="admin-segmented">
                {SOCIAL_PAGES.map((page) => (
                  <button
                    key={page.id}
                    type="button"
                    className={socialPage === page.id ? 'is-active' : ''}
                    onClick={() => setSocialPage(page.id)}
                  >
                    {page.label}
                  </button>
                ))}
              </div>
              <button type="button" className="admin-btn admin-btn--secondary" onClick={addSocial}>
                Add image
              </button>
            </div>
            <div className="admin-cards">
              {socialImages.map((image, index) => (
                <article key={`${socialPage}-${index}`} className="admin-card">
                  <ImageField
                    label={`Image ${index + 1}`}
                    src={image.src}
                    alt={image.alt}
                    onSrcChange={(src) => updateSocial(index, { src })}
                    onAltChange={(alt) => updateSocial(index, { alt })}
                    onUpload={(file) =>
                      uploadFieldImage(file, (url) => updateSocial(index, { src: url }))
                    }
                  />
                  <div className="admin-card__actions">
                    <button type="button" className="admin-btn--danger" onClick={() => removeSocial(index)}>
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}
