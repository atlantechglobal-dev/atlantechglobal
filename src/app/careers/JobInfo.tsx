import { formatDate, formatSalary, type Job } from "@/lib/careers";
import pageStyles from "./page.module.css";

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}

/** "Pune / Hybrid", "Pune" or just "Remote". */
function place(job: Job) {
  return [job.location, job.work_mode].filter(Boolean).join(" / ");
}

/** Highlight, salary and closing date on one line, e.g. "Tech Stack: React · ₹25,000 – ₹40,000 per month". */
export function JobDetail({ job }: { job: Job }) {
  const parts = [job.highlight, job.salary ? formatSalary(job.salary) : "", job.closes_on ? `Apply by ${formatDate(job.closes_on)}` : ""].filter(Boolean);
  return parts.length ? <p className={pageStyles.roleDetail}>{parts.join(" · ")}</p> : null;
}

/** Department, job type and place, e.g. "SALES · Full-time · Pune / Hybrid". */
export function JobMeta({ job }: { job: Job }) {
  return (
    <p className={pageStyles.roleMeta}>
      {job.department && <span className={pageStyles.roleTeam}>{job.department.toUpperCase()}</span>}
      {job.department && job.type && <span className={pageStyles.roleDot} aria-hidden="true" />}
      {job.type && <span className={pageStyles.roleType}>{job.type}</span>}
      {place(job) && (
        <>
          <span className={pageStyles.roleDot} aria-hidden="true" />
          <span className={pageStyles.roleLoc}>
            <PinIcon />
            {place(job)}
          </span>
        </>
      )}
    </p>
  );
}
