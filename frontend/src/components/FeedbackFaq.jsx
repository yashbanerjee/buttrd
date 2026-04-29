import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT

export function FeedbackFaq({ faqs }) {
  const location = useLocation()
  const [openIndex, setOpenIndex] = useState(0)
  const [anonymousOn, setAnonymousOn] = useState(false)
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [fields, setFields] = useState({ name: '', email: '', phone: '', message: '' })
  const formRef = useRef(null)

  useEffect(() => {
    if (location.hash !== '#feedback') return
    const el = document.getElementById('feedback')
    if (!el) return
    const scroll = () => el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    scroll()
    const t = window.setTimeout(scroll, 350)
    return () => window.clearTimeout(t)
  }, [location.hash, location.pathname])

  const toggleFaq = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  const handleChange = (e) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      const payload = {
        message: fields.message,
        phone: fields.phone,
        _subject: 'New Feedback – Buttrd',
      }
      if (!anonymousOn) {
        payload.name = fields.name
        payload.email = fields.email
      } else {
        payload.name = 'Anonymous'
        payload.email = 'anonymous'
      }
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setStatus('success')
        setFields({ name: '', email: '', phone: '', message: '' })
        setAnonymousOn(false)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="feedback-faq">
      <div className="feedback-panel" id="feedback">
        <div className="feedback-panel-inner">
          <div>
            <h2 className="panel-title">Feedback Form</h2>
            <p className="panel-subtitle">We&apos;d love to hear from you</p>
          </div>

          {status === 'success' ? (
            <div className="feedback-success">
              <span className="feedback-success__icon">🎉</span>
              <p className="feedback-success__title">Thanks for your feedback!</p>
              <p className="feedback-success__body">We&apos;ve received your message and will get back to you soon.</p>
              <button className="btn-submit" style={{ marginTop: '8px' }} onClick={() => setStatus('idle')}>
                Send another
              </button>
            </div>
          ) : (
            <form ref={formRef} className="form-group" onSubmit={handleSubmit}>
              {!anonymousOn && (
                <>
                  <div className="form-field">
                    <label htmlFor="fb-name">Name</label>
                    <input
                      id="fb-name"
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={fields.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="fb-email">Email</label>
                    <input
                      id="fb-email"
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={fields.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </>
              )}
              <div className="form-field">
                <label htmlFor="fb-phone">Phone</label>
                <input
                  id="fb-phone"
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={fields.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="toggle-row">
                <div
                  className={`toggle${anonymousOn ? ' on' : ''}`}
                  onClick={() => setAnonymousOn((v) => !v)}
                  role="switch"
                  aria-checked={anonymousOn}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setAnonymousOn((v) => !v)
                    }
                  }}
                />
                <span className="toggle-label">I wish to stay anonymous</span>
              </div>
              <div className="form-field">
                <label htmlFor="fb-message">Your Feedback</label>
                <textarea
                  id="fb-message"
                  name="message"
                  placeholder="Tell us what you think…"
                  value={fields.message}
                  onChange={handleChange}
                  required
                />
              </div>
              {status === 'error' && (
                <p className="feedback-error">Something went wrong. Please try again.</p>
              )}
              <div className="form-actions">
                <button type="submit" className="btn-submit" disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Sending…' : 'Send Feedback'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <div className="faq-panel">
        <div className="faq-panel-inner">
          <div>
            <h2 className="panel-title">FAQ</h2>
            <p className="panel-subtitle">Got questions? We&apos;ve got answers.</p>
          </div>
          <div className="faq-list">
            {faqs.map((item, index) => (
              <div key={index} className={`faq-item${openIndex === index ? ' open' : ''}`}>
                <div className="faq-question" onClick={() => toggleFaq(index)} role="presentation">
                  {item.question}
                  <span className="faq-icon">+</span>
                </div>
                <div className="faq-answer">
                  {Array.isArray(item.answer)
                    ? item.answer.map((para, i) => <p key={i}>{para}</p>)
                    : item.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
