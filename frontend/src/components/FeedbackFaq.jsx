import { useState } from 'react'

export function FeedbackFaq({ faqs }) {
  const [openIndex, setOpenIndex] = useState(0)
  const [anonymousOn, setAnonymousOn] = useState(false)

  const toggleFaq = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <div className="feedback-faq">
      <div className="feedback-panel">
        <div>
          <h2 className="panel-title">Feedback Form</h2>
          <p className="panel-subtitle">We&apos;d love to hear from you</p>
        </div>
        <form
          className="form-group"
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <div className="form-field">
            <label>Name</label>
            <input type="text" placeholder="Enter your name" />
          </div>
          <div className="form-field">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>
          <div className="form-field">
            <label>Phone</label>
            <input type="tel" placeholder="Enter your phone number" />
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
            <label>Your Feedback</label>
            <textarea placeholder="Tell us what you think…" />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-submit">
              Send Feedback
            </button>
          </div>
        </form>
      </div>
      <div className="faq-panel">
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
              <div className="faq-answer">{item.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
