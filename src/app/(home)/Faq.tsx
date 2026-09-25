"use client";

import { useState } from "react";
import styles from "./page.module.css";

export type FaqItem = { q: string; a: string; list?: string[]; outro?: string };

export default function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: [item.a, item.list?.join(", "), item.outro].filter(Boolean).join(" "),
      },
    })),
  };

  return (
    <div className={styles.faqList}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className={`${styles.faqItem}${isOpen ? ` ${styles.faqOpen}` : ""}`}>
            <h3>
              <button
                type="button"
                className={styles.faqQuestion}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                {item.q}
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
            </h3>
            <div className={styles.faqAnswer} id={`faq-answer-${i}`} role="region">
              <div className={styles.faqAnswerInner}>
                <p>{item.a}</p>
                {item.list && (
                  <ul>
                    {item.list.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                )}
                {item.outro && <p>{item.outro}</p>}
              </div>
            </div>
          </div>
        );
      })}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
