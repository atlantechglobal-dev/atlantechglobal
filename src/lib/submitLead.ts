export async function submitLead(formData: FormData, subject: string): Promise<boolean> {
  formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "");
  formData.append("subject", subject);
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });
    const result = await res.json();
    return Boolean(result.success);
  } catch {
    return false;
  }
}
