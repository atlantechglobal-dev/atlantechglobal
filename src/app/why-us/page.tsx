import type { Metadata } from "next";
import Link from "next/link";
import { asset } from "@/lib/asset";
import { ArrowIcon, CheckIcon, QuoteIcon } from "@/lib/icons";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Why Atlantech Global",
  description:
    "Engineering confidence, delivering outcomes. See why enterprises choose Atlantech Global for precision engineering, scalable architecture and data-driven insights.",
  alternates: { canonical: "/why-us/" },
};

const coreStrengths = [
  {
    title: "Innovation First",
    desc: "We leverage cutting-edge technology stacks to build products that define the future.",
    icon: (
      <>
        <path d="M12 21s7-7.5 7-12a7 7 0 10-14 0c0 4.5 7 12 7 12z" />
        <circle cx="12" cy="9" r="2.5" />
      </>
    ),
  },
  {
    title: "Scalable Architecture",
    desc: "Infrastructure designed to grow seamlessly with your business and peak loads.",
    icon: <path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />,
  },
  {
    title: "Security by Design",
    desc: "Enterprise-grade security embedded at every layer of the software lifecycle.",
    icon: <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />,
  },
  {
    title: "Agile Execution",
    desc: "Rapid delivery cycles that guarantee faster time-to-market without compromise.",
    icon: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />,
  },
];

const stats = [
  { num: "15", label: "Years Experience" },
  { num: "200", label: "Clients Globally" },
  { num: "12", label: "Industries Served" },
  { num: "99%", label: "Client Retention" },
];

const steps = [
  { title: "Understand & Assess", desc: "Deep dive into business goals and existing technical landscape." },
  { title: "Engineer & Execute", desc: "Precision development using agile methodologies and top-tier talent." },
  { title: "Measure & Optimize", desc: "Continuous monitoring and scaling to ensure long-term success." },
];

export default function WhyUsPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <p className="eyebrow-pill center">WHY ATLANTECH GLOBAL</p>
          <h1 className={styles.title}>
            Engineering Confidence.
            <br />
            Delivering <span className="text-purple">Outcomes.</span>
          </h1>
          <p className="section-body center">
            Atlantech Global empowers enterprises with precision engineering, scalable digital
            architecture, and data-driven insights.
          </p>
          <ul className={styles.badges}>
            {["Global Delivery", "Enterprise Trusted"].map((b) => (
              <li key={b}>
                <CheckIcon />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <h2 className={`section-title ${styles.barTitle}`}>Core Strengths</h2>
          <div className={styles.strengths}>
            <ul className={styles.strengthCards}>
              {coreStrengths.map((item) => (
                <li className={styles.strengthCard} key={item.title}>
                  <span className={styles.strengthIcon}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      {item.icon}
                    </svg>
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </li>
              ))}
            </ul>
            <div className={styles.strengthImage}>
              <img
                src={asset("/images/why-us.webp")}
                alt="Atlantech Global engineer reviewing performance dashboards"
                width={800}
                height={600}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className={styles.panel}>
          <h2 className="section-title center">
            Built for Scale. <span className="text-purple">Trusted for Impact.</span>
          </h2>
          <p className="section-body center">Numbers that speak to our commitment to engineering excellence.</p>
          <dl className={styles.stats}>
            {stats.map((s) => (
              <div className={styles.stat} key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.num}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <h2 className={`section-title center ${styles.barTitle} ${styles.barCenter}`}>How We Work</h2>
          <ol className={styles.steps}>
            {steps.map((step, i) => (
              <li className={styles.step} key={step.title}>
                <span className={styles.stepNum}>{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container">
        <figure className={`${styles.panel} ${styles.quote}`}>
          <QuoteIcon className={styles.quoteIcon} />
          <blockquote>
            &ldquo;We don&apos;t just build technology — we build{" "}
            <span className="text-purple">measurable business outcomes</span>.&rdquo;
          </blockquote>
          <figcaption className={styles.author}>
            <span className={styles.avatar} aria-hidden="true">
              CS
            </span>
            <span>
              <strong>Chief Strategy Officer</strong>
              <small>ATLANTECH GLOBAL</small>
            </span>
          </figcaption>
        </figure>
      </section>

      <section className={`container ${styles.ctaWrap}`}>
        <div className={styles.cta}>
          <h2>Ready to engineer your next advantage?</h2>
          <p>Book a complimentary digital audit and get a high-level architecture assessment free of charge.</p>
          <Link href="/contact" className="btn btn-white">
            Get in touch <ArrowIcon />
          </Link>
        </div>
      </section>
    </>
  );
}
