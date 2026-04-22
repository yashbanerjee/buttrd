import { Link, NavLink } from 'react-router-dom'

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
            <NavLink to="/catering" className={linkClass}>
              CATERING
            </NavLink>
          </li>
          <li>
            <a href="#">MENU</a>
          </li>
          <li>
            <NavLink to="/our-story" className={linkClass}>
              OUR STORY
            </NavLink>
          </li>
          <li>
            <a href="#">FEEDBACK</a>
          </li>
          <li>
            <a href="#">OFFERS</a>
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
