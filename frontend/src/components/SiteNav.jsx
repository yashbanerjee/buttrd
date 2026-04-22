import { Link, NavLink } from 'react-router-dom'
import { FeedbackNavLink } from './FeedbackNavLink.jsx'

const linkClass = ({ isActive }) => (isActive ? 'active' : undefined)

export function SiteNav({ onOpenMenu }) {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          <img src="/assets/buttrd-logo.png" className="logo-img" alt="Buttrd" />
          <span className="logo-tagline">Catering &amp; Cloud Kitchen</span>
        </Link>
        <ul className="nav-links">
          <li>
            <NavLink to="/" className={linkClass} end>
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink to="/our-story" className={linkClass}>
              OUR STORY
            </NavLink>
          </li>
          <li>
            <FeedbackNavLink />
          </li>
          <li>
            <NavLink to="/offers" className={linkClass}>
              OFFERS
            </NavLink>
          </li>
        </ul>
        <button type="button" className="nav-hamburger" onClick={onOpenMenu} aria-label="Open menu">
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  )
}
