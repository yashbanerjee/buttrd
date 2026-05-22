import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT

const INITIAL_FIELDS = {
  name: '',
  email: '',
  phone: '',
  message: '',
  orderDate: '',
  orderTime: '',
}

export function FeedbackFaq({ faqs }) {
  const location = useLocation()
  const [openIndex, setOpenIndex] = useState(0)
  const [formType, setFormType] = useState('contact')
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [fields, setFields] = useState(INITIAL_FIELDS)
  const formRef = useRef(null)

  const isFeedback = formType === 'feedback'

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

  const handleFormTypeChange = (type) => {
    setFormType(type)
    if (type === 'contact') {
      setFields((prev) => ({ ...prev, orderDate: '', orderTime: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      const payload = {
        form_type: isFeedback ? 'Order feedback' : 'General enquiry',
        name: fields.name,
        email: fields.email,
        phone: fields.phone,
        message: fields.message,
        _subject: isFeedback ? 'New Order Feedback – Buttrd' : 'New Contact Enquiry – Buttrd',
      }
      if (isFeedback) {
        payload.order_date = fields.orderDate
        payload.order_time = fields.orderTime
      }
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setStatus('success')
        setFields(INITIAL_FIELDS)
        setFormType('contact')
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
            <h2 className="panel-title">Contact &amp; Feedback</h2>
            <p className="panel-subtitle">General enquiries or feedback about your order</p>
          </div>

          {status === 'success' ? (
            <div className="feedback-success">
              <span className="feedback-success__icon">🎉</span>
              <p className="feedback-success__title">Thanks for getting in touch!</p>
              <p className="feedback-success__body">We&apos;ve received your message and will get back to you soon.</p>
              <button className="btn-submit" style={{ marginTop: '8px' }} onClick={() => setStatus('idle')}>
                Send another
              </button>
            </div>
          ) : (
            <form ref={formRef} className="form-group" onSubmit={handleSubmit}>
              <fieldset className="form-type-fieldset">
                <legend className="form-type-legend">What would you like to do?</legend>
                <div className="form-type-options" role="radiogroup" aria-label="Form type">
                  <label className={`form-type-option${formType === 'contact' ? ' form-type-option--active' : ''}`}>
                    <input
                      type="radio"
                      name="formType"
                      value="contact"
                      checked={formType === 'contact'}
                      onChange={() => handleFormTypeChange('contact')}
                    />
                    Contact us
                  </label>
                  <label className={`form-type-option${formType === 'feedback' ? ' form-type-option--active' : ''}`}>
                    <input
                      type="radio"
                      name="formType"
                      value="feedback"
                      checked={formType === 'feedback'}
                      onChange={() => handleFormTypeChange('feedback')}
                    />
                    Order feedback
                  </label>
                </div>
              </fieldset>

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

              {isFeedback && (
                <div className="form-field-row">
                  <div className="form-field">
                    <label htmlFor="fb-order-date">Date of order</label>
                    <input
                      id="fb-order-date"
                      type="date"
                      name="orderDate"
                      value={fields.orderDate}
                      onChange={handleChange}
                      max={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="fb-order-time">Time of order</label>
                    <input
                      id="fb-order-time"
                      type="time"
                      name="orderTime"
                      value={fields.orderTime}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="form-field">
                <label htmlFor="fb-message">
                  {isFeedback ? 'Your feedback' : 'Your message'}
                </label>
                <textarea
                  id="fb-message"
                  name="message"
                  placeholder={
                    isFeedback
                      ? 'Tell us about your order experience…'
                      : 'How can we help?'
                  }
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
                  {status === 'submitting'
                    ? 'Sending…'
                    : isFeedback
                      ? 'Send feedback'
                      : 'Send message'}
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
