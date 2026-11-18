import type { Metadata } from "next";
import Link from "next/link";
import { cache } from "react";
import { ArrowIcon } from "@/lib/icons";
import { fetchJobs, jobPath, withSlugs } from "@/lib/careers";
import ApplyForm from "../../ApplyForm";
import { JobDetail, JobMeta } from "../../JobInfo";
import pageStyles from "../../page.module.css";
import roleStyles from "../../OpenRoles.module.css";
import styles from "./page.module.css";

/**
 * One page per open job, e.g. /careers/openroles/business-analyst/.
 * Jobs are read from the ERP at build time, so a job HR publishes later appears after the next build.
 */
export const dynamicParams = false;

// Shown (and kept out of search) when the ERP has no open jobs at build time, since a static
// export needs at least one page for this route.
const NO_ROLES_SLUG = "no-open-roles";

type Props = { params: Promise<{ slug: string }> };

const getJobs = cache(async () => withSlugs((await fetchJobs()) ?? []));

async function findJob(slug: string) {
  return (await getJobs()).find((job) => job.slug === slug);
}

/** Plain-text summary of the ERP's HTML description for the meta description. */
function summary(html: string): string {
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > 155 ? `${text.slice(0, 152).trimEnd()}...` : text;
}

export async function generateStaticParams() {
  const jobs = await getJobs();
  return jobs.length ? jobs.map((job) => ({ slug: job.slug })) : [{ slug: NO_ROLES_SLUG }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = await findJob((await params).slug);
  if (!job) return { title: "Role not available", robots: { index: false, follow: true } };
  const place = [job.location, job.work_mode].filter(Boolean).join(" / ");
  return {
    title: `${job.title}${place ? ` (${place})` : ""} | Careers`,
    description:
      summary(job.description) ||
      `Apply for the ${job.title} role at Atlantech Global${place ? ` in ${place}` : ""}.`,
    alternates: { canonical: jobPath(job) },
  };
}

export default async function JobPage({ params }: Props) {
  const job = await findJob((await params).slug);

  return (
    <div className={pageStyles.page}>
      <section className={`${styles.section} ${pageStyles.tintSection}`}>
        <div className={`container ${styles.inner}`}>
          {job ? (
            <div className={styles.layout}>
              <article className={styles.card}>
                {/* Meta line on the left, "All open roles" (styled like the header's Contact Us) on the right. */}
                <div className={styles.topRow}>
                  <JobMeta job={job} />
                  <Link href="/careers/#openroles" className={`btn btn-primary btn-small ${styles.allRoles}`}>
                    All open roles
                  </Link>
                </div>
                <h1 className={styles.title}>{job.title}</h1>
                <JobDetail job={job} />
                {job.description && (
                  // Cleaned by the ERP before it is sent (scripts and event handlers removed).
                  <div
                    className={`${roleStyles.description} ${styles.description}`}
                    dangerouslySetInnerHTML={{ __html: job.description }}
                  />
                )}
              </article>

              <aside className={`${styles.card} ${styles.apply}`} id="apply" aria-labelledby="apply-title">
                <h2 className={styles.applyTitle} id="apply-title">
                  Apply for this role
                </h2>
                <p className={styles.applyNote}>Takes about 2 minutes. Keep your CV (PDF, DOC or DOCX) ready.</p>
                <ApplyForm job={job} />
              </aside>
            </div>
          ) : (
            <div className={`${styles.card} ${styles.closed}`}>
              <h1 className={styles.title}>This role is no longer open.</h1>
              <p className={pageStyles.lead}>Take a look at our current openings, or send us your resume.</p>
              <Link href="/careers/#openroles" className={pageStyles.primaryBtn}>
                VIEW OPEN ROLES <ArrowIcon />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
