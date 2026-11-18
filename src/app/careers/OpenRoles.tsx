"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowIcon } from "@/lib/icons";
import { fetchJobs, jobPath, withSlugs, type JobWithSlug } from "@/lib/careers";
import { JobDetail, JobMeta } from "./JobInfo";
import pageStyles from "./page.module.css";
import styles from "./OpenRoles.module.css";

/**
 * Open jobs from the ERP (HR publishes them there); each links to its own page with the application form.
 * `initialJobs` is the list the server read at build time, shown straight away; the browser then asks the
 * ERP for the latest list and keeps the server's list if that request fails (e.g. CORS on localhost).
 */
export default function OpenRoles({ resumeHref, initialJobs }: { resumeHref: string; initialJobs?: JobWithSlug[] }) {
  const [jobs, setJobs] = useState<JobWithSlug[] | null | undefined>(initialJobs);

  useEffect(() => {
    let active = true;
    fetchJobs().then((list) => {
      if (!active) return;
      if (list) setJobs(withSlugs(list));
      else setJobs((current) => current ?? null);
    });
    return () => {
      active = false;
    };
  }, []);

  if (jobs === undefined) {
    return <p className={styles.notice}>Loading open roles…</p>;
  }

  if (!jobs || jobs.length === 0) {
    return (
      <div className={styles.notice}>
        <p>
          {jobs ? "There are no open roles right now." : "Open roles could not be loaded right now."} We&apos;re always happy to
          hear from talented people.
        </p>
        <a href={resumeHref} className={pageStyles.primaryBtn}>
          SEND YOUR RESUME <ArrowIcon />
        </a>
      </div>
    );
  }

  return (
    <ul className={pageStyles.roles}>
      {jobs.map((job) => (
        <li className={pageStyles.roleCard} key={job.id}>
          <div className={pageStyles.roleMain}>
            <JobMeta job={job} />
            <h3>{job.title}</h3>
            <JobDetail job={job} />
          </div>
          <Link href={jobPath(job)} className={pageStyles.primaryBtn}>
            VIEW ROLE <ArrowIcon />
          </Link>
        </li>
      ))}
    </ul>
  );
}
