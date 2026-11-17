import { ERP_URL } from "@/lib/site";

/** A Job Opening that HR marked "Publish" and "Open" in the ERP. */
export type Job = {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  closes_on: string;
  /** HTML, already cleaned by the ERP. */
  description: string;
  salary?: { from: number; to: number; currency: string; per: string };
};

const API = `${ERP_URL}/api/method/raven_desk.careers`;
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
