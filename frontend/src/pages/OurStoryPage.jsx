import { Helmet } from 'react-helmet-async'
import { FeedbackFaq } from '../components/FeedbackFaq.jsx'
import { Footer } from '../components/Footer.jsx'
import { SocialSection } from '../components/SocialSection.jsx'
import { ourStoryFaqs } from '../data/faqs.js'
import { ourStorySocialImages } from '../data/socialGrids.js'

export function OurStoryPage() {
  return (
    <>
      <Helmet>
        <title>Buttrd – Our Story</title>
      </Helmet>

      <section className="story-section">
        <div className="story-card">
          <span className="story-decor" style={{ top: '60px', right: '180px', width: '18px', height: '18px', opacity: 0.3 }} />
          <span className="story-decor" style={{ bottom: '200px', left: '60px', width: '14px', height: '14px', opacity: 0.25 }} />

          <h1 className="story-title">Our Story</h1>

          <div className="story-body">
            <p>
              Buttrd is built on a simple idea: take the comfort food people already love — and reinvent it in bold,
              unexpected ways.
              <br />
              We don&apos;t start with dishes. We start with flavour.
            </p>

            <p>
              Everything on our menu is built around signature sauces — Buttrd, Beef Chilli, and Birria — developed
              in-house and designed to transform familiar formats like sandwiches, pasta, and rice bowls into something
              more addictive, more indulgent, and more memorable.
            </p>

            <p>
              This isn&apos;t about reinventing food for the sake of it.
              <br />
              It is about doing simple things better — with more intention, more depth, and more flavour.
            </p>

            <strong>What We Believe</strong>
            <div className="story-beliefs">
              <p>
                Flavour comes first — always
                <br />
                A great sauce can change everything
                <br />
                Simple food doesn&apos;t have to be boring
              </p>
            </div>
          </div>

          <div className="story-sauce-grid">
            <div className="story-sauce-item">
              <h4>Buttrd Sauce</h4>
              <p>
                Our take on butter chicken, with a perfect balance of sweetness and a gentle tang, reimagined the Buttrd
                way. Rich, creamy, and indulgent.
              </p>
            </div>
            <div className="story-sauce-item">
              <h4>Beef Chilli</h4>
              <p>
                Slow-cooked beef in a rich, savoury chilli con carne, packed with serious flavour in every bite. Messy,
                rich and hearty.
              </p>
            </div>
            <div className="story-sauce-item">
              <h4>Beef Birria</h4>
              <p>
                Slow-braised beef soaked in rich, spiced broth, packed with warmth in every bite. Deep, comforting, and
                worth every drip.
              </p>
            </div>
          </div>

          <div className="story-regards">
            <div className="story-regards-left">
              <span className="story-regards-label">Regards From</span>
              <img src="/assets/buttrd-logo.png" className="story-regards-logo" alt="Buttrd" />
            </div>
            <img src="/assets/chef-illustration.png" className="story-chef" alt="Buttrd chef" />
          </div>
        </div>
      </section>

      <SocialSection images={ourStorySocialImages} />
      <FeedbackFaq faqs={ourStoryFaqs} />
      <Footer aboutUsTo="/our-story" />
    </>
  )
}
