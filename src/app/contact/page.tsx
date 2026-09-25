import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm/ContactForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Talk to Atlantech Global's experts about AI, digital transformation, cloud and product engineering. Offices in India and Kuwait, with a response within 24 hours.",
  alternates: { canonical: "/contact/" },
};

const phoneIcon = (
  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2z" />
);
const pinIcon = (
  <>
    <path d="M12 22s7-7.4 7-12.5A7 7 0 0 0 5 9.5C5 14.6 12 22 12 22z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </>
);

const contactDetails = [
  {
    label: "hello@atlantechglobal.com",
    href: "mailto:hello@atlantechglobal.com",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </>
    ),
  },
  { label: "+91 73871 40440", href: "tel:+917387140440", icon: phoneIcon },
  { label: "India", icon: pinIcon },
  { label: "+965 6685 8781", href: "tel:+96566858781", icon: phoneIcon },
  { label: "Kuwait", icon: pinIcon },
];

const perks = [
  {
    title: "Response in 24 hours",
    desc: "Every enquiry reaches a senior engineer, never a queue.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </>
    ),
  },
  {
    title: "Free digital audit",
    desc: "A high-level review of your stack, risks and quickest wins.",
    icon: <path d="M12 3l1.8 4.6L18 9l-4.2 1.4L12 15l-1.8-4.6L6 9l4.2-1.4z" />,
  },
  {
    title: "Two hubs, one team",
    desc: "Delivery centres in India and Kuwait covering overlapping time zones.",
    icon: pinIcon,
  },
];

export default function ContactPage() {
  return (
    <section className={styles.page}>
      <div className={`container ${styles.hero}`}>
        <p className="eyebrow-pill center">CONTACT US</p>
        <h1 className={styles.title}>
          Let&apos;s Build the <span className="text-purple">Future Together</span>
        </h1>
        <p className="section-body center">
          At Atlantech Global, we turn bold ideas into powerful digital realities. Together, let&apos;s
          build a future defined by innovation, clarity, and flawless execution.
        </p>
      </div>

      <div className={`container ${styles.grid}`}>
        <div className={styles.infoCard}>
          <h2>Contact Information</h2>
          <ul className={styles.infoList}>
            {contactDetails.map((item) => (
              <li key={item.label}>
                <span className={styles.infoIcon}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    {item.icon}
                  </svg>
                </span>
                {item.href ? <a href={item.href}>{item.label}</a> : item.label}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.formCard}>
          <p className="eyebrow-pill">SEND A MESSAGE</p>
          <h2 className={styles.formTitle}>Tell us what you&apos;re building.</h2>
          <ContactForm />
        </div>
      </div>

      <ul className={`container ${styles.perks}`}>
        {perks.map((perk) => (
          <li className={styles.perk} key={perk.title}>
            <span className={styles.perkIcon}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                {perk.icon}
              </svg>
            </span>
            <h3>{perk.title}</h3>
            <p>{perk.desc}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
