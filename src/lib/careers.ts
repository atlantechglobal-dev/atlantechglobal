import { ERP_URL } from "@/lib/site";

/** A Job Opening that HR marked "Publish" and "Open" in the ERP. */
export type Job = {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  /** "Hybrid", "Remote" or empty (office). */
  work_mode: string;
  /** One short line under the title, e.g. "Tech Stack: React • Next.js". */
  highlight: string;
  closes_on: string;
  /** HTML, already cleaned by the ERP. */
  description: string;
  salary?: { from: number; to: number; currency: string; per: string };
};

/** A job plus the URL segment of its own page, e.g. "business-development-executive". */
export type JobWithSlug = Job & { slug: string };

const API = `${ERP_URL}/api/method/raven_desk.careers`;

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Gives every job a URL slug from its title; two jobs with the same title also get their ERP id. */
export function withSlugs(jobs: Job[]): JobWithSlug[] {
  const counts = new Map<string, number>();
  for (const job of jobs) counts.set(slugify(job.title), (counts.get(slugify(job.title)) ?? 0) + 1);
  return jobs.map((job) => {
    const base = slugify(job.title) || slugify(job.id);
    return { ...job, slug: (counts.get(base) ?? 0) > 1 ? `${base}-${slugify(job.id)}` : base };
  });
}

/** Path of a job's own page (trailing slash to match the site's URL style). */
export const jobPath = (job: JobWithSlug) => `/careers/openroles/${job.slug}/`;
const GENERIC_ERROR = "We could not send your application. Please try again, or email hello@atlantechglobal.com.";

/** Open jobs from the ERP, or null when the ERP could not be reached. */
export async function fetchJobs(): Promise<Job[] | null> {
  try {
    const response = await fetch(`${API}.get_jobs`, { headers: { Accept: "application/json" } });
    if (!response.ok) return null;
    const data = (await response.json()) as { message?: unknown };
    return Array.isArray(data.message) ? (data.message as Job[]) : null;
  } catch {
    return null;
  }
}

/** Sends one application (fields + CV file). Resolves true, or the message to show the visitor. */
export async function sendApplication(body: FormData): Promise<true | string> {
  try {
    const response = await fetch(`${API}.apply`, { method: "POST", body, headers: { Accept: "application/json" } });
    if (response.status === 429) return "Too many applications from your network. Please try again in an hour.";
    const data = (await response.json().catch(() => null)) as { message?: { ok?: boolean; error?: string } } | null;
    if (response.ok && data?.message?.ok) return true;
    return data?.message?.error || GENERIC_ERROR;
  } catch {
    return GENERIC_ERROR;
  }
}

export function formatSalary(salary: NonNullable<Job["salary"]>): string {
  const money = (n: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: salary.currency || "INR", maximumFractionDigits: 0 }).format(n);
  const range = salary.from && salary.to ? `${money(salary.from)} – ${money(salary.to)}` : money(salary.to || salary.from);
  return salary.per ? `${range} per ${salary.per.toLowerCase()}` : range;
}

export function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  return Number.isNaN(date.getTime()) ? iso : date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
