import type { Metadata } from "next";
import Link from "next/link";
import ConsultationForm from "@/components/ConsultationForm/ConsultationForm";
import PsFaq, { type PsFaqItem } from "./psfaq";
import { ArrowIcon, CheckIcon } from "@/lib/icons";
import { asset } from "@/lib/asset";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Product Strategy & Consulting | Atlantech Global",
  description:
    "Turn product ideas into a validated strategy, a prioritized roadmap and a delivery plan. Atlantech Global helps enterprises decide what to build, for whom and in what order.",
  alternates: { canonical: "/product-engineering/product-strategy-consulting" },
};

const stats = [
  { v: "3", l: "Core questions answered" },
  { v: "4", l: "Prioritization criteria" },
  { v: "6", l: "Lifecycle stages covered" },
  { v: "1", l: "Shared product roadmap" },
];

const reasons = [
  { t: "Business-first approach", d: "Every product decision traces back to a business objective, not a feature wish list." },
  { t: "Informed by engineering", d: "Strategy is shaped by real delivery and architecture experience, so plans are buildable." },
  { t: "Built to adapt", d: "Roadmaps are structured to change as markets, users and requirements change." },
  { t: "Strategy through delivery", d: "One partner can carry the work from strategy and design into engineering and optimization." },
];

const capabilities = [
  {
    t: "Product Discovery",
    d: "Research users, markets and opportunities to shape the right product before investing in build.",
    pts: ["Stakeholder interviews", "User and market research", "Competitor review"],
    out: "Clear opportunity",
  },
  {
    t: "Product Roadmapping",
    d: "Plan releases and priorities around business goals, with milestones teams can follow.",
    pts: ["Vision and positioning", "Prioritized backlog", "Phased release plan"],
    out: "Actionable roadmap",
    featured: true,
  },
  {
    t: "Experience & Architecture",
    d: "Define user journeys and the technology foundation that lets the product scale.",
    pts: ["Journey and persona mapping", "Platform selection", "Architecture direction"],
    out: "Scalable foundation",
  },
  {
    t: "MVP & Modernization",
    d: "Test ideas early, or improve an existing product with updated features and platforms.",
    pts: ["Prototype and MVP scope", "Legacy product review", "Modernization phases"],
    out: "Faster validation",
  },
];

const advanced = [
  { t: "Market & competitor analysis", d: "Understand where your product fits and where it can stand apart." },
  { t: "Persona & journey mapping", d: "Ground decisions in how real users discover, adopt and use the product." },
  { t: "Feature prioritization frameworks", d: "Rank initiatives by value, effort and risk so trade-offs stay visible." },
  { t: "Technology & platform selection", d: "Choose platforms and architecture that support scale and change." },
  { t: "Prototype & MVP planning", d: "Define the smallest release that can test your riskiest assumptions." },
  { t: "Metrics & KPI definition", d: "Set success measures early so progress can be tracked after launch." },
];

const impact = [
  {
    t: "Lower product risk",
    d: "Assumptions are tested with users and prototypes before large build commitments are made.",
    note: "Through discovery, validation and feasibility checks.",
    tone: "purple",
  },
  {
    t: "Focused investment",
    d: "Budget and engineering effort go to the features with the clearest customer and business value.",
    note: "Through shared prioritization criteria and a ranked backlog.",
    tone: "green",
  },
  {
    t: "Faster, aligned delivery",
    d: "Teams work from one vision, one set of metrics and one roadmap instead of competing assumptions.",
    note: "Through a documented strategy and phased delivery plan.",
    tone: "indigo",
  },
] as const;

const phases = [
  { t: "Discover", d: "Understand users, market context, business goals and existing products.", out: "Insights summary" },
  { t: "Define", d: "Shape the product vision, positioning, scope and success metrics.", out: "Product vision brief" },
  { t: "Validate", d: "Test key assumptions through prototypes, feedback and feasibility checks.", out: "Validated MVP scope" },
  { t: "Plan", d: "Prioritize features and build a phased roadmap with milestones and owners.", out: "Product roadmap" },
  { t: "Launch & grow", d: "Support release, track metrics and refine the backlog continuously.", out: "Improvement plan" },
];

const industries = [
  { t: "Healthcare & Life Sciences", d: "Patient, provider and operations platforms where usability and compliance both matter.", focus: "Portals and workflow products" },
  { t: "Financial Services & Fintech", d: "Digital products that must balance customer experience, security and regulation.", focus: "Customer-facing platforms" },
  { t: "Retail & E-Commerce", d: "Commerce and engagement products shaped around real shopping journeys.", focus: "Commerce and loyalty experiences" },
  { t: "Manufacturing", d: "Operational and customer products that connect plants, partners and data.", focus: "Operations and partner platforms" },
  { t: "Logistics & Supply Chain", d: "Tracking, planning and visibility products for complex networks.", focus: "Visibility and planning tools" },
  { t: "Education", d: "Learning and administration products built around learner and educator needs.", focus: "Learning and campus platforms" },
];

const faqs: PsFaqItem[] = [
  {
    q: "What is Product Strategy & Consulting?",
    a: "It helps organizations decide what to build, who it is for and why it matters, then turn that into a roadmap for designing and delivering the product.",
  },
  {
    q: "What does a product strategy include?",
    a: "A product strategy typically includes the product vision, target users, market positioning, feature priorities, success metrics and a delivery roadmap.",
  },
  {
    q: "How does product consulting help enterprises?",
    a: "It helps enterprises reduce risk, focus investment on high-value features and speed up delivery of products that meet customer needs.",
  },
  {
    q: "How long does a product strategy engagement take?",
    a: "It depends on the scope of the product and how much research already exists. We agree scope and timeline with you after an initial discussion.",
  },
];

const num = (i: number) => String(i + 1).padStart(2, "0");

const impactIcons = {
  purple: <path d="M12 3l8 4v5c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V7l8-4z" />,
  green: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  indigo: <path d="M5 12h14M13 6l6 6-6 6" />,
};

export default function ProductStrategyConsultingPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/product-engineering-services">Product Engineering Services</Link>
            <span aria-hidden="true">/</span>
            <span className={styles.breadcrumbCurrent}>Product Strategy &amp; Consulting</span>
          </nav>

          <div className={styles.heroGrid}>
            <div>
              <h1 className={styles.heroTitle}>
                Product Strategy &amp; <span className={styles.gradText}>Consulting</span>
              </h1>
              <p className={styles.heroSub}>Decide what to build, for whom, and in what order.</p>
              <p className={styles.heroCopy}>
                We help enterprises turn product ideas into a validated vision, a prioritized roadmap
                and a delivery plan that connects user needs, business goals and technology.
              </p>
              <div className={styles.heroActions}>
                <Link href="/contact" className="btn btn-primary">
                  Build Your Product Roadmap <ArrowIcon />
                </Link>
                <a href="#framework" className={styles.ghostBtn}>See how we work</a>
              </div>
            </div>

            <div className={styles.heroArt}>
              <img
                src={asset("/images/digital-growth.png")}
                alt="Product strategy roadmap connecting users, vision and delivery"
                width={800}
                height={450}
                decoding="async"
              />
              <span className={`${styles.pill} ${styles.pillTop}`}>
                <i className={`${styles.dot} ${styles.dotGreen}`} />
                <span><b>Validated</b><small>Before you build</small></span>
              </span>
              <span className={`${styles.pill} ${styles.pillBottom}`}>
                <i className={`${styles.dot} ${styles.dotPurple}`} />
                <span><b>Prioritized</b><small>By value, effort and risk</small></span>
              </span>
            </div>
          </div>

          <dl className={styles.stats}>
            {stats.map((s) => (
              <div key={s.l}>
                <dt className={styles.gradText}>{s.v}</dt>
                <dd>{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Why choose us */}
      <section className={`${styles.section} ${styles.ruled}`}>
        <div className="container">
          <div className={styles.whyGrid}>
            <div className={styles.archCard}>
              <div className={styles.archHead}>
                <span className={styles.mono}>STRATEGY_MAP</span>
                <span className={styles.liveBadge}>Illustrative</span>
              </div>
              {/* <svg className={styles.archSvg} viewBox="0 0 360 230" role="img" aria-label="Product strategy connects vision, users, roadmap and architecture">
                <g className={styles.archLinks}>
                  <line x1="180" y1="115" x2="70" y2="37" />
                  <line x1="180" y1="115" x2="290" y2="37" />
                  <line x1="180" y1="115" x2="70" y2="193" className={styles.archDash} />
                  <line x1="180" y1="115" x2="290" y2="193" className={styles.archDash} />
                </g>
                <g className={styles.archNode}>
                  <rect x="20" y="20" width="100" height="34" rx="9" />
                  <rect x="240" y="20" width="100" height="34" rx="9" />
                  <rect x="20" y="176" width="100" height="34" rx="9" />
                  <rect x="240" y="176" width="100" height="34" rx="9" />
                </g>
                <g className={styles.archText} textAnchor="middle">
                  <text x="70" y="41">Vision</text>
                  <text x="290" y="41">Users</text>
                  <text x="70" y="197">Roadmap</text>
                  <text x="290" y="197">Architecture</text>
                </g>
                <circle cx="180" cy="115" r="38" className={styles.archCore} />
                <g className={styles.archTextCore} textAnchor="middle">
                  <text x="180" y="112">Product</text>
                  <text x="180" y="127">Strategy</text>
                </g>  
              </svg> */}
                 <img
                src={asset("/images/prodengineering.webp")}
                alt="Product strategy roadmap connecting users, vision and delivery"
                width={800}
                height={250}
                decoding="async"
              />

              <div className={styles.archFoot}>
                <div>
                  <b>One shared strategy</b>
                  <span className={styles.archAccent}>Aligned teams</span>
                </div>
                <p>Vision, users, roadmap and architecture are planned together, not in separate silos.</p>
              </div>
            </div>

            <div>
              <h2 className={styles.title}>
                Why partner with <span className={styles.gradText}>Atlantech Global</span>
              </h2>
              <ul className={styles.reasons}>
                {reasons.map((r, i) => (
                  <li key={r.t}>
                    <span className={styles.reasonNum}>{num(i)}</span>
                    <h3>{r.t}</h3>
                    <p>{r.d}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core capabilities */}
      <section className={`${styles.section} ${styles.tinted}`}>
        <div className="container">
          <div className={styles.head}>
            <h2 className={styles.title}>
              Core <span className={styles.gradText}>product strategy capabilities</span>
            </h2>
            <p className={styles.body}>
              Four connected practices that take a product from first idea to a roadmap your teams can deliver.
            </p>
          </div>
          <div className={styles.capGrid}>
            {capabilities.map((c, i) => (
              <article className={`${styles.capCard}${c.featured ? ` ${styles.capFeatured}` : ""}`} key={c.t}>
                <span className={styles.capNum}>{num(i)}</span>
                <h3>{c.t}</h3>
                <p className={styles.capDesc}>{c.d}</p>
                <ul className={styles.capPoints}>
                  {c.pts.map((p) => (
                    <li key={p}>
                      <span className={styles.tick}><CheckIcon /></span>
                      {p}
                    </li>
                  ))}
                </ul>
                <p className={styles.capMetric}>Outcome <strong>{c.out}</strong></p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced capabilities */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.splitHead}>
            <div>
              <h2 className={styles.title}>
                What we bring to <span className={styles.gradText}>every engagement</span>
              </h2>
              <p className={styles.body}>
                The methods and deliverables behind a strategy that holds up under real delivery.
              </p>
            </div>
            <Link href="/contact" className={styles.outlineBtn}>
              Discuss your product <ArrowIcon />
            </Link>
          </div>
          <div className={styles.advGrid}>
            {advanced.map((a, i) => (
              <article className={styles.advCard} key={a.t}>
                <span className={styles.numChip}>{num(i)}</span>
                <h3>{a.t}</h3>
                <p>{a.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Business impact */}
      <section className={`${styles.section} ${styles.tinted}`}>
        <div className="container">
          <div className={styles.head}>
            <h2 className={styles.title}>
              Business <span className={styles.gradText}>impact</span>
            </h2>
            <p className={styles.body}>What a clear product strategy changes for your organization.</p>
          </div>
          <div className={styles.impactGrid}>
            {impact.map((c) => (
              <article className={`${styles.impactCard} ${styles[`tone_${c.tone}`]}`} key={c.t}>
                <span className={styles.impactIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {impactIcons[c.tone]}
                  </svg>
                </span>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
                <p className={styles.impactNote}>{c.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Dark framework */}
      {/* <section className={styles.dark} id="framework">
        <div className="container">
          <div className={styles.head}>
            <h2>Our product strategy framework</h2>
            <p>Five phases from first insight to continuous improvement, each with a clear output.</p>
          </div>
          <div className={styles.phases}>
            {phases.map((p, i) => (
              <article className={styles.phaseCard} key={p.t}>
                <span className={styles.phaseNum}>{num(i)}</span>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
                <span className={styles.phaseTime}>Output: {p.out}</span>
              </article>
            ))}
          </div>
        </div>
      </section> */}

      {/* Industries */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.head}>
            <h2 className={styles.title}>
              Product strategy for <span className={styles.gradText}>every industry</span>
            </h2>
            <p className={styles.body}>The method stays the same. The users, constraints and priorities are specific to you.</p>
          </div>
          <div className={styles.indGrid}>
            {industries.map((x) => (
              <article className={styles.indCard} key={x.t}>
                <p className={styles.indTag}>INDUSTRY <i className={styles.indDot} /></p>
                <h3>{x.t}</h3>
                <p>{x.d}</p>
                <p className={styles.indMetric}>Typical focus: <b>{x.focus}</b></p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className={`${styles.section} ${styles.tinted}`} id="contact">
        <div className="container">
          <div className={styles.contactCard}>
            <div className={styles.contactLeft}>
              <h2 className={styles.title}>
                Ready to shape your <span className={styles.gradText}>product roadmap?</span>
              </h2>
              <p>Tell us about your product, your users and your goals. We will respond with next steps.</p>
              <div className={styles.auditBox}>
                <span className={styles.auditCheck}><CheckIcon /></span>
                <div>
                  <p className={styles.auditTitle}>Product discovery conversation</p>
                  <p>Talk through your idea, constraints and priorities with a senior advisor.</p>
                </div>
              </div>
              <ul className={styles.assurances}>
                <li><CheckIcon /> Senior advisory team, not junior sales reps</li>
                <li><CheckIcon /> Response within 24 hours</li>
              </ul>
            </div>
            <ConsultationForm source="Product Strategy & Consulting" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.section} id="faq">
        <div className="container">
          <div className={styles.head}>
            <h2 className={styles.title}>
              Frequently asked <span className={styles.gradText}>questions</span>
            </h2>
          </div>
          <PsFaq items={faqs} />
        </div>
      </section>
    </div>
  );
}