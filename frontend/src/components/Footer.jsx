import { Link } from 'react-router-dom'

export function Footer({ aboutUsTo = '#' }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src="/assets/buttrd-logo.png" className="logo-img" alt="Buttrd" />
          <span className="logo-tagline" style={{ marginTop: '4px' }}>
            Catering &amp; Cloud Kitchen
          </span>
          <div className="footer-contact" style={{ marginTop: '16px' }}>
            <span>+971 56 683 3534</span>
            <span>Info@buttrdme.com</span>
          </div>
        </div>
        <div className="footer-col">
          <h4>Useful Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a href="#">Sale</a>
            </li>
            <li>
              {aboutUsTo === '/our-story' ? (
                <Link to="/our-story">About us</Link>
              ) : (
                <a href="#">About us</a>
              )}
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">Delivery info</a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Kitchen</h4>
          <p>Mon – Fri: 8:00 – 21:00</p>
          <p>Sat: 9:30 – 18:00</p>
          <p>Sun: 9:30 – 16:00</p>
          <p style={{ marginTop: '12px' }}>
            1501 Main St, Ste 50
            <br />
            Tewksbury MA 01876
          </p>
        </div>
        <div className="footer-col">
          <h4>Follow Us</h4>
          <ul>
            <li>
              <a href="#">Instagram</a>
            </li>
            <li>
              <a href="#">Facebook</a>
            </li>
            <li>
              <a href="#">TikTok</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-links">
          <a href="#">Cookies</a>
          <a href="#">Privacy</a>
          <a href="#">Terms of use</a>
        </div>
        <span className="footer-copyright">Copyright 2026 | Buttrd</span>
      </div>
    </footer>
  )
}
