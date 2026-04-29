import { NavLink } from 'react-router-dom'
import { FeedbackNavLink } from './FeedbackNavLink.jsx'

const tabClass = ({ isActive }) => `mobile-tabbar__item${isActive ? ' mobile-tabbar__item--active' : ''}`

function IconHome() {
  return (
    <svg className="mobile-tabbar__svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M3 10.5L12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-10.5z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconStory() {
  return (
    <svg className="mobile-tabbar__svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 7h8M8 11h6" strokeLinecap="round" />
    </svg>
  )
}

function IconOffers() {
  return (
    <svg className="mobile-tabbar__svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 7h.01" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

function IconOrder() {
  return (
    <svg className="mobile-tabbar__svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 6h18" strokeLinecap="round" />
      <path d="M16 10a4 4 0 0 1-8 0" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconFeedback() {
  return (
    <svg className="mobile-tabbar__svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/**
 * iOS-style bottom navigation for small viewports (see global.css breakpoint).
 */
export function MobileTabBar() {
  return (
    <nav className="mobile-tabbar" aria-label="Main navigation">
      <NavLink to="/" className={tabClass} end>
        <span className="mobile-tabbar__icon" aria-hidden="true">
          <IconHome />
        </span>
        <span className="mobile-tabbar__label">Home</span>
      </NavLink>
      <NavLink to="/our-story" className={tabClass}>
        <span className="mobile-tabbar__icon" aria-hidden="true">
          <IconStory />
        </span>
        <span className="mobile-tabbar__label">Our story</span>
      </NavLink>
      <a
        href="https://buttrd-uae.deliverectdirect.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="mobile-tabbar__item mobile-tabbar__item--cta"
      >
        <span className="mobile-tabbar__icon" aria-hidden="true">
          <IconOrder />
        </span>
        <span className="mobile-tabbar__label">Order now</span>
      </a>
      <NavLink to="/offers" className={tabClass}>
        <span className="mobile-tabbar__icon" aria-hidden="true">
          <IconOffers />
        </span>
        <span className="mobile-tabbar__label">Offers</span>
      </NavLink>
      <FeedbackNavLink activeClassName="mobile-tabbar__item--active" className="mobile-tabbar__item">
        <>
          <span className="mobile-tabbar__icon" aria-hidden="true">
            <IconFeedback />
          </span>
          <span className="mobile-tabbar__label">Feedback</span>
        </>
      </FeedbackNavLink>
    </nav>
  )
}
