import { NavLink } from 'react-router-dom'

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
      <NavLink to="/catering" className={linkClass} onClick={onClose}>
        CATERING
      </NavLink>
      <a href="#" onClick={onClose}>
        MENU
      </a>
      <NavLink to="/our-story" className={linkClass} onClick={onClose}>
        OUR STORY
      </NavLink>
      <a href="#" onClick={onClose}>
        FEEDBACK
      </a>
      <a href="#" onClick={onClose}>
        OFFERS
      </a>
    </div>
  )
}
