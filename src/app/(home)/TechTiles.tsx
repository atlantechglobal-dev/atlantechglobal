"use client";

import { useState, type CSSProperties } from "react";
import { asset } from "@/lib/asset";
import styles from "./page.module.css";

type Tech = { icon: string; image: string; title: string; desc: string };

export default function TechTiles({ columns }: { columns: Tech[][] }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [active, setActive] = useState<string | null>(null);

  const all = columns.flat();
  const shown = hovered ?? active ?? all[0].title;

  return (
    <>
      <div className={`${styles.techImage} ${styles.reveal}`} data-reveal>
        {all.map((item, i) => (
          <img
            key={item.title}
            src={asset(item.image)}
            alt={item.title}
            width={600}
            height={800}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            className={item.title === shown ? styles.techImageShown : undefined}
          />
        ))}
        <span className={styles.techImageLabel}>{shown}</span>
      </div>

      {columns.map((col, c) => (
        <div className={styles.techCol} key={c} onMouseLeave={() => setHovered(null)}>
          {col.map((item, i) => (
            <div
              key={item.title}
              className={`${styles.techCell} ${styles.reveal}`}
              data-reveal
              style={{ "--d": `${(c * 3 + i) * 90}ms` } as CSSProperties}
            >
              <button
                type="button"
                className={`${styles.techItem}${active === item.title ? ` ${styles.techActive}` : ""}`}
                aria-expanded={active === item.title}
                onMouseEnter={() => setHovered(item.title)}
                onFocus={() => setHovered(item.title)}
                onBlur={() => setHovered(null)}
                onClick={() => setActive((cur) => (cur === item.title ? null : item.title))}
              >
                <img src={asset(item.icon)} alt="" width={44} height={44} className={styles.techIcon} />
                <span>
                  <span className={styles.techItemTitle}>{item.title}</span>
                  <span className={styles.techItemDesc}>{item.desc}</span>
                </span>
              </button>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}
