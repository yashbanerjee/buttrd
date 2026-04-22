export function SocialSection({ images }) {
  return (
    <section className="social">
      <div className="section-inner">
        <div className="social-header">
          <h2>Join our social circle</h2>
          <a href="https://instagram.com/buttrd.me" target="_blank" rel="noreferrer" className="social-insta-btn">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
            </svg>
            @Buttrd.me
          </a>
        </div>
        <div className="social-grid">
          {images.map((img, i) => (
            <div key={i} className="social-item">
              <img src={img.src} alt={img.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
