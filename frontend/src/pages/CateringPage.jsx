import { Helmet } from 'react-helmet-async'
import { FeedbackFaq } from '../components/FeedbackFaq.jsx'
import { Footer } from '../components/Footer.jsx'
import { SocialSection } from '../components/SocialSection.jsx'
import { WaveDivider } from '../components/WaveDivider.jsx'
import { cateringFaqs } from '../data/faqs.js'
import { cateringSocialImages } from '../data/socialGrids.js'

function MenuCardArrow() {
  return (
    <svg className="menu-card-arrow" viewBox="0 0 24 24" fill="none">
      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MenuCard({ src, alt, label }) {
  return (
    <div className="menu-card">
      <div className="menu-card-img">
        <img src={src} alt={alt} />
      </div>
      <div className="menu-card-label">
        <span>{label}</span>
        <MenuCardArrow />
      </div>
    </div>
  )
}

export function CateringPage() {
  return (
    <>
      <Helmet>
        <title>Buttrd – Catering &amp; Cloud Kitchen</title>
      </Helmet>

      <section className="catering-hero">
        <div className="catering-hero-inner">
          <div className="catering-hero-content">
            <span className="catering-headline">
              MAKE YOUR
              <br />
              EVENTS
              <br />
              BETTER WITH
              <br />
              BUTTR&apos;D
            </span>
            <div>
              <p className="hero-subtitle">It All Started With Our Sauces</p>
              <p className="hero-body" style={{ marginTop: '10px' }}>
                Our Signature range of sauces, made fresh with only the finest ingredients
              </p>
            </div>
            <a href="#catering-form" className="catering-cta">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C10.34 2 9 3.34 9 5V6H6C4.9 6 4 6.9 4 8V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8C20 6.9 19.1 6 18 6H15V5C15 3.34 13.66 2 12 2ZM12 4C12.55 4 13 4.45 13 5V6H11V5C11 4.45 11.45 4 12 4ZM12 10C13.1 10 14 10.9 14 12C14 13.1 13.1 14 12 14C10.9 14 10 13.1 10 12C10 10.9 10.9 10 12 10ZM8 17C8 15.34 9.79 14 12 14C14.21 14 16 15.34 16 17H8Z"
                  fill="black"
                />
              </svg>
              Make Your Event Better
            </a>
          </div>
          <div className="catering-hero-images">
            <div className="catering-hero-img">
              <img src="/assets/catering-hero.png" alt="Catering spread" />
            </div>
            <div className="catering-hero-img">
              <img src="/assets/hero-food.png" alt="Event food" />
            </div>
            <div className="catering-hero-img">
              <img src="/assets/melts-wraps.png" alt="Catering wraps" />
            </div>
            <div className="catering-hero-img">
              <img src="/assets/social-1.png" alt="Catering event" />
            </div>
          </div>
        </div>
      </section>

      <WaveDivider background="#fff" pathFill="#FFD61F" />

      <section className="catering-form-section" id="catering-form">
        <div className="catering-form-card">
          <div className="catering-form-logo">
            <img src="/assets/buttrd-logo.png" style={{ height: '60px', width: 'auto' }} alt="Buttrd" />
            <span className="catering-form-subtitle-badge">Catering Services</span>
          </div>
          <h2 className="catering-form-title">Catering Form</h2>
          <p className="catering-form-desc">Tell us about your event and we&apos;ll take care of the rest</p>
          <form
            className="catering-form-fields"
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
            <div className="form-field">
              <label>Number of people</label>
              <input type="number" placeholder="Enter the number of people for the event" />
            </div>
            <div className="form-field">
              <label>Date &amp; Time of the event</label>
              <input type="text" placeholder="Enter the date and time of the event" />
            </div>
            <div className="form-field">
              <label>Area / Location to cater</label>
              <input type="text" placeholder="Enter the area / location" />
            </div>
            <div className="form-actions" style={{ marginTop: '8px' }}>
              <button type="submit" className="btn-submit" style={{ background: 'var(--pink)' }}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="catering-menu-section">
        <div className="catering-menu-inner">
          <h2 className="catering-menu-title">CATERING MENU</h2>
          <div className="menu-grid">
            <MenuCard src="/assets/catering-hero.png" alt="Wings and Tenders" label="Wings & Tenders" />
            <MenuCard src="/assets/hero-food.png" alt="Wings Bundles" label="Wings Bundles" />
            <MenuCard src="/assets/social-1.png" alt="Appetizers" label="Appetizers" />
            <MenuCard src="/assets/menu-item.png" alt="Sides and Extras" label="Sides & Extras" />
            <MenuCard src="/assets/melts-wraps.png" alt="Burgers" label="Burgers" />
            <MenuCard src="/assets/brioche-rolls-1.png" alt="Sandwiches and Wraps" label="Sandwiches & Wraps" />
            <MenuCard src="/assets/brioche-rolls-2.png" alt="Kids Menu" label="Kids Menu" />
            <MenuCard src="/assets/desserts-1.png" alt="Salads" label="Salads" />
            <MenuCard src="/assets/desserts-2.png" alt="Desserts" label="Desserts & Drinks" />
          </div>
        </div>
      </section>

      <FeedbackFaq faqs={cateringFaqs} />
      <SocialSection images={cateringSocialImages} />
      <Footer aboutUsTo="#" />
    </>
  )
}
