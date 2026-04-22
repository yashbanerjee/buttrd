import { Helmet } from 'react-helmet-async'
import { OfferCoupon } from '../components/OfferCoupon.jsx'
import { Footer } from '../components/Footer.jsx'
import { offers } from '../data/offers.js'

export function OffersPage() {
  return (
    <>
      <Helmet>
        <title>Buttrd – Offers &amp; Coupons</title>
      </Helmet>

      <section className="offers-page" aria-labelledby="offers-page-heading">
        <div className="section-inner offers-page-inner">
          <header className="offers-page-header">
            <h1 className="offers-page-title" id="offers-page-heading">
              Offers
            </h1>
            <p className="offers-page-subtitle">Save more on comfort food — copy a code and use it at checkout.</p>
          </header>
          <ul className="offers-list">
            {offers.map((offer) => (
              <li key={offer.id}>
                <OfferCoupon offer={offer} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer aboutUsTo="/our-story" />
    </>
  )
}
