function StarDots() {
  return (
    <div className="rating-dots" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="rating-dot filled">
          <span className="rating-star">★</span>
        </span>
      ))}
    </div>
  );
}

export function BriocheLabsSection() {
  return (
    <section className="brioche">
      <div className="section-inner">
        <div className="brioche-inner">
          <div className="brioche-image brioche-image--labs">
            <img
              src="/assets/brioche-labs-hero.png"
              alt="Stack of four loaded toasted brioche rolls with toppings and sauce drizzle"
            />
          </div>
          <div className="brioche-content brioche-content--labs">
            <h2 className="brioche-labs-title">The Bases</h2>
            <p className="brioche-labs-tagline">
              Great flavour needs the right foundation. From soft, buttery
              brioche to crisp, herbed focaccia and from creamy pastas to
              comforting rice bowls: every base is designed to carry, soak, and
              deliver our signature flavours the way they are meant to be. But
              the brioche? That’s where it starts. Soft, buttery, and toasted
              just right, lightly crisp on the outside, soft in the centre, and
              built to hold every layer without falling apart.
            </p>
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
  );
}
