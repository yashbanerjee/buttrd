import { useCallback, useEffect, useRef, useState } from "react";

const SWIPE_THRESHOLD = 72;
const MAX_ROTATION = 14;
const EXIT_MS = 280;
const AUTO_ROTATE_MS = 2000;

function getRotation(dragX) {
  return Math.min(MAX_ROTATION, Math.max(-MAX_ROTATION, dragX * 0.06));
}

export function HeroCardDeck({ cards, autoRotateMs = AUTO_ROTATE_MS }) {
  const [order, setOrder] = useState(() => cards.map((_, i) => i));
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [exitDir, setExitDir] = useState(null);

  const startRef = useRef({ x: 0, y: 0 });
  const pointerIdRef = useRef(null);
  const pausedRef = useRef(false);
  const exitDirRef = useRef(null);

  const finishSwipe = useCallback((direction) => {
    setExitDir(direction);
    exitDirRef.current = direction;
    window.setTimeout(() => {
      setOrder((prev) => [...prev.slice(1), prev[0]]);
      setExitDir(null);
      exitDirRef.current = null;
      setDrag({ x: 0, y: 0 });
      setDragging(false);
    }, EXIT_MS);
  }, []);

  useEffect(() => {
    if (cards.length < 2 || autoRotateMs <= 0) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    const tick = () => {
      if (pausedRef.current || exitDirRef.current || pointerIdRef.current !== null) return;
      finishSwipe("right");
    };

    const id = window.setInterval(tick, autoRotateMs);
    return () => window.clearInterval(id);
  }, [cards.length, autoRotateMs, finishSwipe]);

  const onPointerDown = (e) => {
    if (exitDir || cards.length < 2) return;
    pausedRef.current = true;
    pointerIdRef.current = e.pointerId;
    startRef.current = { x: e.clientX, y: e.clientY };
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!dragging || pointerIdRef.current !== e.pointerId || exitDir) return;
    setDrag({
      x: e.clientX - startRef.current.x,
      y: (e.clientY - startRef.current.y) * 0.25,
    });
  };

  const onPointerUp = (e) => {
    if (pointerIdRef.current !== e.pointerId) return;
    pointerIdRef.current = null;
    setDragging(false);
    pausedRef.current = false;

    if (exitDir) return;

    const dx = e.clientX - startRef.current.x;
    if (Math.abs(dx) >= SWIPE_THRESHOLD) {
      finishSwipe("right");
      return;
    }
    setDrag({ x: 0, y: 0 });
  };

  const onPointerCancel = () => {
    pointerIdRef.current = null;
    setDragging(false);
    pausedRef.current = false;
    if (!exitDir) setDrag({ x: 0, y: 0 });
  };

  const visible = order.slice(0, Math.min(3, order.length));

  return (
    <div
      className="hero-card-deck"
      aria-roledescription="carousel"
      aria-label="Featured dishes"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
      onFocusCapture={() => { pausedRef.current = true; }}
      onBlurCapture={() => { pausedRef.current = false; }}
    >
      {[...visible].reverse().map((cardIndex, reverseIndex) => {
        const depth = visible.length - 1 - reverseIndex;
        const isTop = depth === 0;
        const card = cards[cardIndex];

        let transform = "";
        if (isTop) {
          if (exitDir === "left") {
            transform = "translate(-140%, -8%) rotate(-18deg)";
          } else if (exitDir === "right") {
            transform = "translate(140%, -8%) rotate(18deg)";
          } else {
            transform = `translate(${drag.x}px, ${drag.y}px) rotate(${getRotation(drag.x)}deg)`;
          }
        } else {
          const offsetY = depth * 10;
          const offsetX = depth * 8;
          transform = `translate(${offsetX}px, ${offsetY}px)`;
        }

        return (
          <div
            key={cardIndex}
            className={`hero-card${isTop ? " hero-card--top" : ""}${exitDir && isTop ? ` hero-card--exit-${exitDir}` : ""}`}
            style={{
              zIndex: 10 + reverseIndex,
              transform,
              opacity: isTop && exitDir === "right" ? 0 : 1,
              transition:
                exitDir && isTop
                  ? `transform ${EXIT_MS}ms ease-out, opacity ${EXIT_MS}ms ease-out`
                  : dragging && isTop
                    ? "none"
                    : "transform 0.35s cubic-bezier(0.34, 1.2, 0.64, 1), opacity 0.35s ease",
            }}
            onPointerDown={isTop ? onPointerDown : undefined}
            onPointerMove={isTop ? onPointerMove : undefined}
            onPointerUp={isTop ? onPointerUp : undefined}
            onPointerCancel={isTop ? onPointerCancel : undefined}
          >
            <div className="hero-card__surface">
              <img src={card.src} alt={card.alt} draggable={false} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
