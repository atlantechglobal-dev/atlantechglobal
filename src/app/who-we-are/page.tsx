import type { Metadata } from "next";
import ConsultationForm from "@/components/ConsultationForm/ConsultationForm";
import { asset } from "@/lib/asset";
import { ArrowIcon, CheckIcon } from "@/lib/icons";
import ApproachCarousel from "./ApproachCarousel";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Who We Are",
  description:
    "Meet Atlantech Global — a technology and consulting partner that designs, builds and scales the digital core of growing enterprises with AI, cloud and data.",
  alternates: { canonical: "/who-we-are/" },
};

const missionVision = [
  {
    title: "Our Mission",
    desc: "To empower growing organisations with AI-driven technology that accelerates measurable impact, sustainable growth and meaningful progress.",
    points: ["Strategy Aligned", "Engineering Excellence", "Global Perspective"],
    icon: <path d="M5 3v18M5 4h13l-2.5 4L18 12H5" />,
  },
  {
    title: "Our Vision",
    desc: "To be the most trusted partner for high-stakes digital transformation, defining the standard where technology and real value meet.",
    points: ["Innovation Leadership", "Sustainable Delivery", "Trust-First Mentality"],
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M15.5 8.5l-2 5-5 2 2-5z" />
      </>
    ),
  },
];

const futureCards = [
  {
    title: "Scalable Foundations",
    desc: "Architecture that grows with demand, without rewrites or downtime.",
    icon: <path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />,
  },
  {
    title: "Enterprise Security",
    desc: "Zero-trust controls embedded at every layer of the delivery lifecycle.",
    icon: <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />,
  },
  {
    title: "Intelligence First",
    desc: "AI woven into the workflows your teams already rely on every day.",
    icon: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />,
  },
  {
    title: "Optimised Workflows",
    desc: "Removing friction between engineering, operations and the business.",
    icon: <path d="M4 4v6h6M20 20v-6h-6M20 10a8 8 0 0 0-14.5-4.5L4 8M4 14a8 8 0 0 0 14.5 4.5L20 16" />,
  },
];

const approachSteps = [
  { title: "Understand", desc: "We immerse in your business challenges, constraints and the outcomes that actually matter." },
  { title: "Engineer", desc: "Small senior teams ship high-performance, secure systems on short, predictable cycles." },
  { title: "Scale", desc: "We harden, automate and hand over platforms built to absorb growth without rework." },
  { title: "Optimise", desc: "Continuous engineering and measurement that compounds returns long after launch." },
];

export default function WhoWeArePage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <p className="eyebrow-pill center">ENTERPRISE ENGINEERING PARTNER</p>
          <h1 className={styles.title}>
            Partnering Today. Building <span className="text-purple">Tomorrow.</span>
          </h1>
          <p className="section-body center">
            We design, build and scale the digital core of growing enterprises — with clarity,
            precision and measurable outcomes.
          </p>
          <a href="#contact" className="btn btn-primary">
            Start a conversation <ArrowIcon />
          </a>
          <div className={styles.banner}>
            <img
              src={asset("/images/atlantech-global-collaborating.webp")}
              alt="Atlantech Global team collaborating"
              width={1600}
              height={686}
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      <section className={styles.about}>
        <div className="container">
          <div className={styles.introGrid}>
            <div className={styles.introPhoto}>
              <img
                src={asset("/images/engineer-working-on-laptop.webp")}
                alt="Atlantech Global engineer at work"
                width={800}
                height={900}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className={styles.introCard}>
              <p className={styles.kicker}>WHO WE ARE</p>
              <h2 className={styles.heading}>Pioneering the next era of enterprise intelligence.</h2>
              <p className={styles.body}>
                At Atlantech Global, we believe technology should remove friction, not add to it. We
                pair deep engineering craft with commercial focus so every platform we ship serves a
                measurable business outcome.
              </p>
              <p className={styles.body}>
                Our teams operate at the intersection of AI, cloud infrastructure and human-centred
                design — turning today&apos;s hardest problems into tomorrow&apos;s standard.
              </p>
            </div>
          </div>

          <div className={styles.missionGrid}>
            {missionVision.map((item) => (
              <article className={styles.card} key={item.title}>
                <span className={styles.missionIcon}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    {item.icon}
                  </svg>
                </span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <ul className={styles.checks}>
                  {item.points.map((point) => (
                    <li key={point}>
                      <span className={styles.check}>
                        <CheckIcon />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.future}>
        <div className="container">
          <p className={styles.kicker}>FUTURE-READY BY DESIGN</p>
          <h2 className={styles.heading}>Built to outlast the next platform shift.</h2>

          <div className={styles.futureGrid}>
            <div className={styles.futureCards}>
              {futureCards.map((card) => (
                <article className={styles.card} key={card.title}>
                  <span className={styles.futureIcon}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      {card.icon}
                    </svg>
                  </span>
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                </article>
              ))}
            </div>
            <div className={styles.futureImage}>
              <img
                src={asset("/images/engineer-monitoring-live-operations.webp")}
                alt="Engineer monitoring live operational dashboards"
                width={800}
                height={600}
                loading="lazy"
                decoding="async"
              />
              <div className={styles.futureCaption}>
                <span className={styles.liveTag}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2a10 10 0 1 0 10 10M12 12l4-4" />
                  </svg>
                  ALWAYS ON
                </span>
                <p>24/7 observability across every environment we operate.</p>
              </div>
            </div>
          </div>

          <div className={styles.compliance}>
            <span className={styles.complianceIcon}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="5" y="11" width="14" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </svg>
            </span>
            <div className={styles.complianceText}>
              <h3>Compliance without the drag</h3>
              <p>SOC 2, GDPR and ISO-aligned delivery baked into the pipeline.</p>
            </div>
            <a href="#approach" className={styles.complianceBtn}>
              See how we work
            </a>
          </div>
        </div>
      </section>

      <section className={styles.approach} id="approach">
        <div className="container">
          <ApproachCarousel steps={approachSteps} />
        </div>
      </section>

      <section className={styles.consultation} id="contact">
        <div className="container">
          <div className={styles.consultationCard}>
            <div className={styles.consultationInfo}>
              <p className="eyebrow-pill">LET&apos;S TALK STRATEGY</p>
              <h2>Schedule a Consultation</h2>
              <p>
                Let&apos;s discuss your transformation roadmap and identify the growth opportunities
                hiding in your current architecture.
              </p>
              <div className={styles.consultationBenefit}>
                <span className={styles.consultationCheck}>
                  <CheckIcon />
                </span>
                <div>
                  <h3>Complimentary Digital Audit</h3>
                  <p>Every engagement starts with a high-level digital audit — free of charge.</p>
                </div>
              </div>
            </div>
            <ConsultationForm source="Who We Are page" flat />
          </div>
        </div>
      </section>
    </>
  );
}
