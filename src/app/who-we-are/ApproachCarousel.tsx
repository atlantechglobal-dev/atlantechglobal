"use client";

import { useRef } from "react";
import styles from "./page.module.css";

type Step = { title: string; desc: string };

export default function ApproachCarousel({ steps }: { steps: Step[] }) {
  const trackRef = useRef<HTMLOListElement>(null);

  function scroll(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    track.scrollBy({ left: direction * (card ? card.offsetWidth + 20 : 300), behavior: "smooth" });
  }

  return (
    <>
      <div className={styles.approachHeader}>
        <div>
          <p className="eyebrow-pill">OUR APPROACH</p>
          <h2 className="section-title">Four moves, one trajectory.</h2>
        </div>
        <div className={styles.approachControls}>
          <button type="button" className={styles.carouselBtn} aria-label="Previous step" onClick={() => scroll(-1)}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            className={`${styles.carouselBtn} ${styles.carouselBtnPrimary}`}
            aria-label="Next step"
            onClick={() => scroll(1)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      <ol className={styles.approachTrack} ref={trackRef}>
        {steps.map((step, i) => (
          <li className={styles.approachStep} key={step.title}>
            <span className={styles.approachNum}>{String(i + 1).padStart(2, "0")}</span>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </li>
        ))}
      </ol>
    </>
  );
}
