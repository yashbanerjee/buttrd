import { Helmet } from "react-helmet-async";
import { FeedbackFaq } from "../components/FeedbackFaq.jsx";
import { Footer } from "../components/Footer.jsx";
import { SocialSection } from "../components/SocialSection.jsx";
import { BriocheLabsSection } from "../components/BriocheLabsSection.jsx";
import { WaveDivider } from "../components/WaveDivider.jsx";
import { homeFaqs } from "../data/faqs.js";
import { homeSocialImages } from "../data/socialGrids.js";

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
              MADE FOR THE MOMENT <br />
              YOU’VE BEEN CRAVING.
            </span>
            <div>
              <p className="hero-subtitle">
                Buttrd is built on a simple idea: take the comfort food people
                already love and reimage it in a familiar , yet unexpected way.
              </p>
              {/* <p className="hero-body" style={{ marginTop: "10px" }}>
                We don’t start with dishes. We start with flavour.

Everything on our menu is built around signature sauces Buttrd, Beef Chilli, and Birria. They were developed in-house and designed to transform familiar formats like sandwiches, pasta, and rice bowls into something more addictive, more indulgent, and more memorable.

This isn’t about reinventing food for the sake of it.
It is about doing simple things better with more intention, more depth, and more flavour.


              </p> */}

              <br />
              <br />
              <div className="hero-beliefs">
                <p className="hero-subtitle">What We Believe</p>
                <ul className="hero-beliefs-list hero-body">
                  <li>Flavour comes first - always</li>
                  <li>A great sauce can change everything</li>
                  <li>Simple food doesn’t have to be boring</li>
                </ul>
              </div>
              <br />
              <br />
            </div>
            <a href="javascript:;" className="hero-cta" onClick={() => window.DeliverectWidget?.orderNow()}>
              {/* <svg
                width="32"
                height="32"
                viewBox="0 0 35 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M33 18H30M30 18V14L27 10H22V18M30 18H22M22 18H11M11 18H8M8 18C8 19.66 6.66 21 5 21C3.34 21 2 19.66 2 18M8 18C8 16.34 6.66 15 5 15C3.34 15 2 16.34 2 18M2 18H0M26 20.5C26 21.88 25.12 22 25.5 22C25.88 22 26 21.88 26 20.5C26 19.12 25.88 18 25.5 18C25.12 18 26 19.12 26 20.5ZM14 20.5C14 21.88 13.12 22 13.5 22C13.88 22 14 21.88 14 20.5C14 19.12 13.12 18 13.5 18C13.88 18 14 19.12 14 20.5ZM2 14L8 6H18V14"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg> */}
              Get Buttr&apos;d In 30 Minutes
            </a>
          </div>
          <div className="hero-image">
            <img
              src="/assets/hero-home.png"
              alt="Menu highlights: Chilli Cheese Loaded Hot Dog, Buttrd Paneer Brioche, Beef Chilli Cheese, and Buttrd Chicken Brioche on pink"
            />
          </div>
        </div>
      </section>

      <WaveDivider background="var(--pink)" pathFill="var(--yellow)" />

      <section className="sauces">
        <div className="section-inner">
          <div className="sauces-header">
            <div className="sauces-title-group">
              <h2 className="sauces-title">
                This is where the flavour starts.
              </h2>
              <p className="sauces-subtitle">
                Three sauces. Three completely different moods. Three signature
                profiles, each crafted to deliver a completely different kind of
                comfort. One goal: to make every bite hit.
              </p>
            </div>
            <div style={{ flexShrink: 0, position: "relative" }}>
              <img
                src="/assets/buttrd-logo.png"
                style={{ height: "52px", width: "auto" }}
                alt="Buttrd"
              />
              <span
                style={{
                  display: "none",
                  fontFamily: "var(--font-display)",
                  fontSize: "55px",
                  fontWeight: 700,
                  color: "var(--yellow)",
                  transform: "rotate(-10deg) translateX(20px)",
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
                Our take on butter chicken, with a perfect balance of sweetness
                and a gentle tang, reimagined the Buttrd way. Rich, creamy, and
                indulgent.
              </p>
            </div>
            <div className="sauce-card">
              <div className="sauce-card-img">
                <img src="/assets/sauce-beef-chilli.png" alt="Beef Chilli" />
              </div>
              <p className="sauce-card-title">Beef Chilli</p>
              <p className="sauce-card-desc">
                Slow-cooked beef in a rich, savoury chilli con carne, packed
                with serious flavour in every bite. Messy, rich and hearty.
              </p>
            </div>
            <div className="sauce-card">
              <div className="sauce-card-img">
                <img src="/assets/sauce-beef-birria.png" alt="Beef Birria" />
              </div>
              <p className="sauce-card-title">Beef Birria</p>
              <p className="sauce-card-desc">
                Slow-braised beef soaked in rich, spiced broth, packed with
                warmth in every bite. Deep, comforting, and worth every drip.
              </p>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider background="var(--blue)" pathFill="var(--pink)" />

      <BriocheLabsSection />

      <WaveDivider background="#fff" pathFill="var(--blue)" svgStyle={{ color: 'rgba(255, 255, 255, 1)', backgroundColor: 'rgba(235, 248, 255, 1)' }} />

      {/* <section className="food-range">
        <div className="section-inner">
          <div className="food-range-header">
            <h2>The Menu</h2>
            <p>
              Comfort food, curated by flavor. Whether it’s pillowy brioche,
              hearty bowls, or our signature melts, every format is a deliberate
              stage for our three icons: Buttrd, Beef Chilli, and Birria. Choose
              your base, pick your soul, and rediscover the classics.
            </p>
          </div>
          <div className="food-range-cards">
            <div className="food-card food-card-yellow food-card--split">
              <div className="food-card-text">
                <h3>BRIOCHE ROLLS</h3>
                <p>
                  The softest seat in the house for our boldest flavors.
                  Pillowy, buttery, and built to be held.
                </p>
                <a href="javascript:;" className="food-card-cta" onClick={() => window.DeliverectWidget?.orderNow()}>
                  order now
                </a>
              </div>
              <div className="food-card-media">
                <img
                  src="/assets/brioche-rolls-stack.png"
                  alt="Stack of four loaded brioche sandwiches with pink sauce poured over the top"
                />
              </div>
            </div>

            <div className="food-card food-card-blue food-card--split">
              <div className="food-card-text">
                <h3>RICE & PASTA BOWLS</h3>
                <p>
                  Where grains and greens meet the depth of the simmer. A
                  hearty, soulful soak in every forkful.
                </p>
                <a href="javascript:;" className="food-card-cta" onClick={() => window.DeliverectWidget?.orderNow()}>
                  order now
                </a>
              </div>
              <div className="food-card-media">
                <img
                  src="/assets/rice-pasta-bowls.png"
                  alt="Fork twirl of pasta topped with shredded meat and herbs on a pink background"
                />
              </div>
            </div>

            <div className="food-card food-card-pink food-card--split">
              <div className="food-card-text">
                <h3>MELTS & WRAPS</h3>
                <p>
                  Golden-crisped, gooey, and unapologetically messy. The
                  ultimate collision of crunch and melt.
                </p>
                <a href="javascript:;" className="food-card-cta" onClick={() => window.DeliverectWidget?.orderNow()}>
                  order now
                </a>
              </div>
              <div className="food-card-media">
                <img
                  src="/assets/melts-wraps.png"
                  alt="Toasted melt sandwich halves stacked with pulled beef and melted cheese on branded paper"
                />
              </div>
            </div>

            <div className="food-card food-card-ice food-card--split">
              <div className="food-card-text">
                <h3>DESSERTS & DRINKS</h3>
                <p>
                  The encore your meal deserves. Cool, sweet, and designed to
                  balance the heat.
                </p>
                <a href="javascript:;" className="food-card-cta" onClick={() => window.DeliverectWidget?.orderNow()}>
                  order now
                </a>
              </div>
              <div
                className="food-card-media food-card-media--placeholder food-card-media--placeholder-ice"
                aria-label="Desserts and drinks photo placeholder"
              >
                <span
                  className="food-card-media__placeholder-label"
                  aria-hidden="true"
                >
                  Photo placeholder
                </span>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <SocialSection images={homeSocialImages} />
      <FeedbackFaq faqs={homeFaqs} />
      <Footer aboutUsTo="#" />
    </>
  );
}
