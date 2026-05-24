import { BUTTRD_INSTAGRAM_URL } from '../data/buttrdLinks.js'
import { toMediaUrl } from '../utils/mediaUrl.js'

export function SocialSection({ images }) {
  return (
    <section className="social">
      <div className="section-inner">
        <div className="social-header">
          <h2>Join our social circle</h2>
          <a href={BUTTRD_INSTAGRAM_URL} target="_blank" rel="noreferrer" className="social-insta-btn">
            @Buttrd.me
          </a>
        </div>
        <div className="social-grid">
          {images.map((img, i) => (
            <div key={i} className="social-item">
              <a href={BUTTRD_INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="View on Instagram">
                <img src={toMediaUrl(img.src)} alt={img.alt} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
