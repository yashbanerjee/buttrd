import { Link, NavLink } from "react-router-dom";
import { FeedbackNavLink } from "./FeedbackNavLink.jsx";

const linkClass = ({ isActive }) => (isActive ? "active" : undefined);

export function SiteNav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          <img
            src="/assets/buttrd-logo.png"
            className="logo-img"
            alt="Buttrd"
          />
          {/* <span className="logo-tagline">Catering &amp; Cloud Kitchen</span> */}
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
          <li>
            <a
              href="https://buttrd-uae.deliverectdirect.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-order-btn"
            >
              ORDER NOW
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
