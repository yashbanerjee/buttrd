import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { FeedbackFaq } from '../components/FeedbackFaq.jsx'
import { Footer } from '../components/Footer.jsx'
import { SocialSection } from '../components/SocialSection.jsx'
import { BriocheLabsSection } from '../components/BriocheLabsSection.jsx'
import { WaveDivider } from '../components/WaveDivider.jsx'
import { homeFaqs } from '../data/faqs.js'
import { homeSocialImages } from '../data/socialGrids.js'

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Buttrd – Comfort Food That Hits Differently</title>
      </Helmet>

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-content">
            <span className="hero-headline">
              Comfort Food,
              <br />
              Reimagined
              <br />
              Boldly
            </span>
            <div>
              <p className="hero-subtitle">We don&apos;t start with dishes. We start with flavour.</p>
              <p className="hero-body" style={{ marginTop: '10px' }}>
                Buttrd is built on a simple idea: take the comfort food people already love—and reinvent it in bold,
                unexpected ways. Everything on our menu is built around signature sauces — Buttrd, Beef Chilli, and
                Birria — developed in-house and designed to transform familiar formats like sandwiches, pasta, and rice
                bowls into something more addictive, more indulgent, and more memorable.
              </p>
              <p className="hero-body" style={{ marginTop: '14px' }}>
                This isn&apos;t about reinventing food for the sake of it. It is about doing simple things better —
                with more intention, more depth, and more flavour.
              </p>
            </div>
            <Link to="/catering" className="hero-cta">
              <svg width="32" height="32" viewBox="0 0 35 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M33 18H30M30 18V14L27 10H22V18M30 18H22M22 18H11M11 18H8M8 18C8 19.66 6.66 21 5 21C3.34 21 2 19.66 2 18M8 18C8 16.34 6.66 15 5 15C3.34 15 2 16.34 2 18M2 18H0M26 20.5C26 21.88 25.12 22 25.5 22C25.88 22 26 21.88 26 20.5C26 19.12 25.88 18 25.5 18C25.12 18 26 19.12 26 20.5ZM14 20.5C14 21.88 13.12 22 13.5 22C13.88 22 14 21.88 14 20.5C14 19.12 13.12 18 13.5 18C13.88 18 14 19.12 14 20.5ZM2 14L8 6H18V14"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Get Buttr&apos;d In 30 Minutes
            </Link>
          </div>
          <div className="hero-image">
            <img
              src="/assets/hero-home.png"
              alt="Stack of Buttrd brioche sandwiches with chilli cheese hot dog, paneer, beef chilli, and chicken"
            />
          </div>
        </div>
      </section>

      <WaveDivider background="var(--pink)" pathFill="var(--yellow)" />

      <section className="sauces">
        <div className="section-inner">
          <div className="sauces-header">
            <div className="sauces-title-group">
              <h2 className="sauces-title">Signature Sauces, <br/>Made In-House</h2>
              <p className="sauces-subtitle">
                A great sauce can change everything. Our Buttrd, Beef Chilli, and Birria sauces are the foundation of
                the menu—each one crafted to turn the dishes you already crave into something worth coming back for.
              </p>
            </div>
            <div style={{ flexShrink: 0, position: 'relative' }}>
              <img src="/assets/buttrd-logo.png" style={{ height: '52px', width: 'auto' }} alt="Buttrd" />
              <span
                style={{
                  display: 'none',
                  fontFamily: 'var(--font-display)',
                  fontSize: '55px',
                  fontWeight: 700,
                  color: 'var(--yellow)',
                  transform: 'rotate(-10deg) translateX(20px)',
                }}
                aria-hidden
              >
                Sauces
              </span>
            </div>
          </div>

          <div className="sauces-cards">
            <div className="sauce-card">
              <div className="sauce-card-img">
                <img src="/assets/sauce-buttrd.png" alt="Buttrd Sauce" />
              </div>
              <p className="sauce-card-title">Buttrd Sauce</p>
              <p className="sauce-card-desc">
                Our take on butter chicken, with a perfect balance of sweetness and a gentle tang, reimagined the
                Buttrd way. Rich, creamy, and indulgent.
              </p>
            </div>
            <div className="sauce-card">
              <div className="sauce-card-img">
                <img src="/assets/sauce-beef-chilli.png" alt="Beef Chilli" />
              </div>
              <p className="sauce-card-title">Beef Chilli</p>
              <p className="sauce-card-desc">
                Slow-cooked beef in a rich, savoury chilli con carne, packed with serious flavour in every bite. Messy,
                rich and hearty.
              </p>
            </div>
            <div className="sauce-card">
              <div className="sauce-card-img">
                <img src="/assets/sauce-beef-birria.png" alt="Beef Birria" />
              </div>
              <p className="sauce-card-title">Beef Birria</p>
              <p className="sauce-card-desc">
                Slow-braised beef soaked in rich, spiced broth, packed with warmth in every bite. Deep, comforting, and
                worth every drip.
              </p>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider background="var(--blue)" pathFill="var(--pink)" />

      <BriocheLabsSection />

      <WaveDivider background="#fff" pathFill="var(--blue)" />

      <section className="food-range">
        <div className="section-inner">
          <div className="food-range-header">
            <h2>The Menu</h2>
            <p>
              A sauce that feels familiar, but hits differently. A sandwich you think you know until the first bite.
              Flavours that comfort you, but still surprise you. From brioche to bowls to melts and something sweet at
              the end—every format is a chance to let the sauces do what they do best.
            </p>
          </div>
          <div className="food-range-cards">
            <div className="food-card food-card-yellow food-card--split">
              <div className="food-card-text">
                <h3>
                  Brioche
                  <br />
                  Rolls
                </h3>
                <p>Soft, buttery rolls built to carry our sauces—perfect when you want comfort you can hold in two hands.</p>
                <Link to="/offers" className="food-card-cta">
                  order now
                </Link>
              </div>
              <div className="food-card-media food-card-media--placeholder" aria-label="Brioche rolls photo placeholder">
                <span className="food-card-media__placeholder-label" aria-hidden="true">
                  Photo placeholder
                </span>
              </div>
            </div>

            <div className="food-card food-card-blue food-card--split">
              <div className="food-card-text">
                <h3>Rice &amp; Pasta Bowls</h3>
                <p>
                  Rice and pasta become a canvas: the same sauces you love, coating every forkful with depth and warmth.
                </p>
                <Link to="/offers" className="food-card-cta">
                  order now
                </Link>
              </div>
              <div className="food-card-media">
                <img src="/assets/catering-hero.png" alt="Rice and pasta bowls" />
              </div>
            </div>

            <div className="food-card food-card-pink food-card--split">
              <div className="food-card-text">
                <h3>Melts &amp; Wraps</h3>
                <p>
                  Messy-in-the-best-way layers—paneer, beef, or whatever the day calls for—so the first bite is never
                  quite what you expected.
                </p>
                <Link to="/offers" className="food-card-cta">
                  order now
                </Link>
              </div>
              <div className="food-card-media">
                <img src="/assets/melts-wraps.png" alt="Melts and Wraps" />
              </div>
            </div>

            <div className="food-card food-card-ice food-card--split">
              <div className="food-card-text">
                <h3>Desserts &amp; Drinks</h3>
                <p>Round off the meal with something sweet or cold—because indulgence shouldn&apos;t stop at the main event.</p>
                <Link to="/offers" className="food-card-cta">
                  order now
                </Link>
              </div>
              <div
                className="food-card-media food-card-media--placeholder food-card-media--placeholder-ice"
                aria-label="Desserts and drinks photo placeholder"
              >
                <span className="food-card-media__placeholder-label" aria-hidden="true">
                  Photo placeholder
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SocialSection images={homeSocialImages} />
      <FeedbackFaq faqs={homeFaqs} />
      <Footer aboutUsTo="#" />
    </>
  )
}
