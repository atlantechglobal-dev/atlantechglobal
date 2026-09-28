"use client";
import { useState } from "react";
import styles from "./page.module.css";

export type ServiceFaqItem = { q: string; a: string };

export default function ServiceFaq({ items }: { items: ServiceFaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
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
                className={styles.faqQ}
                aria-expanded={isOpen}
                aria-controls={`ms-faq-${i}`}
                onClick={() => setOpen((prev) => (prev === i ? null : i))}
              >
                <span className={styles.faqNum}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.faqText}>{item.q}</span>
                <svg className={styles.faqIcon} viewBox="0 0 24 24" aria-hidden="true">
                  <path d={isOpen ? "M5 12h14" : "M12 5v14M5 12h14"} />
                </svg>
              </button>
            </h3>
            <div className={styles.faqA} id={`ms-faq-${i}`}>
              <div>
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
