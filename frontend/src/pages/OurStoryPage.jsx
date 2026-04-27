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
          <div className="story-card__surface">
            <h1 className="story-title">Our Story</h1>

            <div className="story-body">
              <p>
                Buttrd didn&apos;t start with a menu. It started in a home kitchen with two people and one obsession:
                getting a single sauce just right.
              </p>
              <p>
                It began with butter chicken, but not the way we knew it. We spent months tweaking, adjusting, and
                tasting. Too rich. Too flat. Too tangy. Too safe. Then, it clicked. We found that perfect balance of
                indulgent richness, a hint of sweetness, and a gentle tang, a flavor that felt familiar, yet possessed a
                character entirely its own.
              </p>
              <p>It was a sauce that didn&apos;t just sit on the food; it carried it.</p>
              <p>
                That first recipe became our foundation. Not just a signature flavor, but a way of thinking. We grew
                up on the classics, the dishes you crave after a long day; the ones you return to without thinking. They
                are reliable, but they are also predictable. We realized there was so much more they could be.
              </p>
              <p>
                We started asking: What if comfort food didn&apos;t stay in its lane? What if these flavors worked
                beyond the obvious, in a toasted sandwich, over pasta, or tossed in a bowl?
              </p>
              <p>
                Our mission isn&apos;t to reinvent food, but to reimagine what already works. We create sauces that feel
                like home but hit differently. Sandwiches you think you know, until the first bite. Flavors that comfort
                you, yet still find a way to surprise you.
              </p>
              <p>One sauce turned into a concept. A concept turned into a menu. That menu became Buttrd.</p>
              <p>
                Today, every dish we serve follows that same original spark: we take the things people already love and
                give them a reason to fall in love all over again. Because comfort food should never be boring.
              </p>
              <p>And at Buttrd, it never is.</p>
            </div>

            <div className="story-regards">
              <div className="story-regards-left">
                <span className="story-regards-label">Regards From</span>
                <img
                  src="/assets/logo-pink-colored.svg"
                  className="story-regards-logo"
                  alt="Buttrd"
                  width={200}
                  height={63}
                />
              </div>
              <img
                src="/assets/story-stickers.png"
                className="story-chef"
                alt="Cute sticker-style butter cube and pink heart characters"
              />
            </div>
          </div>
        </div>
      </section>

      <SocialSection images={ourStorySocialImages} />
      <FeedbackFaq faqs={ourStoryFaqs} />
      <Footer aboutUsTo="/our-story" />
    </>
  )
}
