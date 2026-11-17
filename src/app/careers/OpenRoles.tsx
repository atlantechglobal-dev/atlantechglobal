"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowIcon } from "@/lib/icons";
import { fetchJobs, formatDate, formatSalary, type Job } from "@/lib/careers";
import ApplyForm from "./ApplyForm";
import pageStyles from "./page.module.css";
import styles from "./OpenRoles.module.css";

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}

function JobMeta({ job }: { job: Job }) {
  return (
    <p className={pageStyles.roleMeta}>
      {job.department && <span className={pageStyles.roleTeam}>{job.department.toUpperCase()}</span>}
      {job.department && job.type && <span className={pageStyles.roleDot} aria-hidden="true" />}
      {job.type && <span className={pageStyles.roleType}>{job.type}</span>}
      {job.location && (
        <>
          <span className={pageStyles.roleDot} aria-hidden="true" />
          <span className={pageStyles.roleLoc}>
            <PinIcon />
            {job.location}
          </span>
        </>
      )}
    </p>
  );
}

/** Open jobs, read live from the ERP (HR publishes them there), each with its own application form. */
export default function OpenRoles({ resumeHref }: { resumeHref: string }) {
  const [jobs, setJobs] = useState<Job[] | null | undefined>(undefined);
  const [open, setOpen] = useState<Job | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    let active = true;
    fetchJobs().then((list) => {
      if (active) setJobs(list);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (open) dialog.current?.showModal();
  }, [open]);

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
    <>
      <ul className={pageStyles.roles}>
        {jobs.map((job) => (
          <li className={pageStyles.roleCard} key={job.id}>
            <div className={pageStyles.roleMain}>
              <JobMeta job={job} />
              <h3>{job.title}</h3>
              <p className={pageStyles.roleDetail}>
                {job.salary ? formatSalary(job.salary) : null}
                {job.salary && job.closes_on ? " · " : null}
                {job.closes_on ? `Apply by ${formatDate(job.closes_on)}` : null}
              </p>
            </div>
            <button type="button" className={pageStyles.primaryBtn} onClick={() => setOpen(job)}>
              VIEW ROLE <ArrowIcon />
            </button>
          </li>
        ))}
      </ul>

      <dialog ref={dialog} className={styles.dialog} onClose={() => setOpen(null)} aria-labelledby="role-title">
        {open && (
          <div className={styles.dialogBody}>
            <button type="button" className={styles.close} onClick={() => dialog.current?.close()} aria-label="Close">
              ×
            </button>
            <JobMeta job={open} />
            <h3 id="role-title" className={styles.dialogTitle}>
              {open.title}
            </h3>
            {(open.salary || open.closes_on) && (
              <p className={pageStyles.roleDetail}>
                {open.salary ? formatSalary(open.salary) : null}
                {open.salary && open.closes_on ? " · " : null}
                {open.closes_on ? `Apply by ${formatDate(open.closes_on)}` : null}
              </p>
            )}
            {open.description && (
              // Cleaned by the ERP before it is sent (scripts and event handlers removed).
              <div className={styles.description} dangerouslySetInnerHTML={{ __html: open.description }} />
            )}
            <h4 className={styles.applyTitle}>Apply for this role</h4>
            <ApplyForm key={open.id} job={open} />
          </div>
        )}
      </dialog>
    </>
  );
}
