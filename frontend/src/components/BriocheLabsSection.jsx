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
            <h2 className="brioche-labs-title">
              THE BRIOCHE LABS - The Perfect Vessel for The Perfect Dip
            </h2>
            <p className="brioche-labs-tagline">
              A signature sauce is only as good as the grain that carries it.
              That’s why we’re obsessive about our bread. It isn't just a
              pairing; it’s a revelation-toasted to a golden precision that
              shatters at the first bite, only to melt away like butter on a hot
              pan. It is the silent hero of the Buttrd experience, designed to
              soak up every drop of our Buttrd, Beef Chilli, and Birria
              signatures. When the crunch of the crust meets the depth of the
              simmer, that’s when you realize: this isn't just a meal. It’s a
              masterpiece of texture.
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
