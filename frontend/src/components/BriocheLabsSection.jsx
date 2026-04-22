function StarDots() {
  return (
    <div className="rating-dots" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="rating-dot filled">
          <span className="rating-star">★</span>
        </span>
      ))}
    </div>
  )
}

export function BriocheLabsSection() {
  return (
    <section className="brioche">
      <div className="section-inner">
        <div className="brioche-inner">
          <div className="brioche-image brioche-image--labs">
            <img src="/assets/brioche-bread.png" alt="Fresh toasted brioche slice" />
          </div>
          <div className="brioche-content brioche-content--labs">
            <h2 className="brioche-labs-title">THE BRIOCHE LABS</h2>
            <p className="brioche-labs-tagline">We make our breads fresh everyday, so it can make your day better.</p>
            <div className="rating-row">
              <div className="rating-item">
                <span className="rating-label">Buttery:</span>
                <StarDots />
              </div>
              <div className="rating-item">
                <span className="rating-label">Softness:</span>
                <StarDots />
              </div>
              <div className="rating-item">
                <span className="rating-label">Overall Yum:</span>
                <StarDots />
              </div>
              <div className="rating-item rating-item--report">
                <span className="rating-label">Overall Report:</span>
                <span className="brioche-must-try">Must Try!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
