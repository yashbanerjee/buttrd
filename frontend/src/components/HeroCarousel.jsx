import { useCallback, useEffect, useState } from "react";

const AUTO_PLAY_MS = 5000;

function ChevronIcon({ direction }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {direction === "prev" ? (
        <path d="M15 18l-6-6 6-6" />
      ) : (
        <path d="M9 18l6-6-6-6" />
      )}
    </svg>
  );
}

export function HeroCarousel({ slides, autoPlayMs = AUTO_PLAY_MS }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const goTo = useCallback(
    (next) => {
      if (count < 1) return;
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  const goPrev = () => goTo(index - 1);
  const goNext = () => goTo(index + 1);

  useEffect(() => {
    if (count < 2 || autoPlayMs <= 0 || paused) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    const id = window.setInterval(() => goTo(index + 1), autoPlayMs);
    return () => window.clearInterval(id);
  }, [index, count, autoPlayMs, paused, goTo]);

  if (count === 0) return null;

  return (
    <div
      className="hero-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured dishes"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="hero-carousel__track">
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className={`hero-carousel__slide${i === index ? " is-active" : ""}`}
            aria-hidden={i !== index}
          >
            <img src={slide.src} alt={slide.alt} draggable={false} />
          </div>
        ))}
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            className="hero-carousel__arrow hero-carousel__arrow--prev"
            onClick={goPrev}
            aria-label="Previous slide"
          >
            <ChevronIcon direction="prev" />
          </button>
          <button
            type="button"
            className="hero-carousel__arrow hero-carousel__arrow--next"
            onClick={goNext}
            aria-label="Next slide"
          >
            <ChevronIcon direction="next" />
          </button>
          <div className="hero-carousel__dots" role="tablist" aria-label="Choose slide">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                role="tab"
                className={`hero-carousel__dot${i === index ? " is-active" : ""}`}
                aria-label={`Slide ${i + 1} of ${count}`}
                aria-selected={i === index}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
