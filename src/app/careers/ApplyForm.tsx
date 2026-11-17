"use client";

import type { FieldSpec } from "@/lib/validation";
import type { LeadPayload } from "@/lib/submitLead";
import { sendApplication, type Job } from "@/lib/careers";
import FieldError from "@/components/forms/FieldError";
import HumanCheck from "@/components/forms/HumanCheck";
import PhoneField from "@/components/forms/PhoneField";
import { useLeadForm } from "@/components/forms/useLeadForm";
import formStyles from "@/components/ContactForm/ContactForm.module.css";
import styles from "./OpenRoles.module.css";

const SCHEMA: Record<string, FieldSpec> = {
  applicant_name: { kind: "fullName", required: true },
  email: { kind: "email", required: true },
  cover_letter: { kind: "message", required: false },
};

const CV_TYPES = [".pdf", ".doc", ".docx"];

/** Application for one job; it becomes a Job Applicant (with the CV) in the ERP. */
export default function ApplyForm({ job }: { job: Job }) {
  async function send(payload: LeadPayload, form: HTMLFormElement): Promise<true | string> {
    const values = new FormData(form);
    const cv = values.get("resume");
    if (!(cv instanceof File) || !cv.name) return "Please attach your CV.";
    if (!CV_TYPES.some((ext) => cv.name.toLowerCase().endsWith(ext))) return "Your CV must be a PDF, DOC or DOCX file.";
    const link = String(values.get("resume_link") ?? "").trim();
    if (link && !/^https?:\/\//i.test(link)) return "Your LinkedIn / portfolio link must start with https://";

    const body = new FormData();
    body.append("job", job.id);
    for (const key of ["applicant_name", "email", "cover_letter", "phone", "phone_country", "botcheck", "elapsed_ms"]) {
      if (payload[key]) body.append(key, payload[key]);
    }
    if (link) body.append("resume_link", link);
    body.append("resume", cv);
    return sendApplication(body);
  }

  const form = useLeadForm({
    schema: SCHEMA,
    phone: { required: true },
    subject: () => `Job application: ${job.title}`,
    source: "Careers page",
    send,
  });
  const { status, fieldProps, errorProps } = form;

  if (status === "success") {
    return (
      <p className="form-status success" role="status">
        Thank you! Your application for {job.title} has reached our team. We&apos;ll contact you if your profile is a match.
      </p>
    );
  }

  return (
    <form className={formStyles.form} {...form.formProps}>
      <input type="checkbox" name="botcheck" hidden tabIndex={-1} autoComplete="off" />
      <div className={formStyles.cell}>
        <input type="text" name="applicant_name" placeholder="Full name" aria-label="Full name" autoComplete="name" maxLength={100} required {...fieldProps("applicant_name")} />
        <FieldError {...errorProps("applicant_name")} />
      </div>
      <div className={formStyles.row}>
        <div className={formStyles.cell}>
          <input type="email" name="email" placeholder="Email" aria-label="Email" autoComplete="email" maxLength={254} required {...fieldProps("email")} />
          <FieldError {...errorProps("email")} />
        </div>
        <PhoneField value={form.phone} onChange={form.changePhone} onBlur={form.blurPhone} required {...errorProps("phone")} />
      </div>
      <div className={formStyles.cell}>
        <input type="url" name="resume_link" placeholder="LinkedIn or portfolio link (optional)" aria-label="LinkedIn or portfolio link" maxLength={500} />
      </div>
      <label className={styles.cvField}>
        <span>CV (PDF, DOC or DOCX)</span>
        <input type="file" name="resume" accept={CV_TYPES.join(",")} required />
      </label>
      <div className={formStyles.cell}>
        <textarea name="cover_letter" placeholder="Tell us why you're a good fit (optional)" aria-label="Cover letter" rows={4} maxLength={2000} {...fieldProps("cover_letter")} />
        <FieldError {...errorProps("cover_letter")} />
      </div>
      <HumanCheck checked={form.human} onChange={form.changeHuman} {...errorProps("human")} />
      <button type="submit" className={`btn btn-primary ${formStyles.submit}`} disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Submit Application"}
      </button>
      {status === "error" && (
        <p className="form-status error" role="alert">
          {form.serverError || "Something went wrong. Please email us at hello@atlantechglobal.com."}
        </p>
      )}
    </form>
  );
}
