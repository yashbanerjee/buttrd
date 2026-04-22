import { NavLink } from 'react-router-dom'
import { FeedbackNavLink } from './FeedbackNavLink.jsx'

const linkClass = ({ isActive }) => (isActive ? 'active' : undefined)

export function MobileNav({ isOpen, onClose }) {
  return (
    <div className={`nav-mobile${isOpen ? ' open' : ''}`} id="mobileNav">
      <button type="button" className="nav-mobile-close" onClick={onClose} aria-label="Close menu">
        &#x2715;
      </button>
      <NavLink to="/" className={linkClass} onClick={onClose} end>
        HOME
      </NavLink>
      <NavLink to="/our-story" className={linkClass} onClick={onClose}>
        OUR STORY
      </NavLink>
      <FeedbackNavLink onNavigate={onClose} />
      <NavLink to="/offers" className={linkClass} onClick={onClose}>
        OFFERS
      </NavLink>
    </div>
  )
}
