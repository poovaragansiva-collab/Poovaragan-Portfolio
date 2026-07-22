import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendLeadNotification(params: {
  name: string;
  email: string;
  company?: string;
  projectDetails: string;
  source: string;
}) {
  if (!resend) {
    console.warn("RESEND_API_KEY not configured — skipping email notification.");
    return { skipped: true };
  }

  const to = process.env.EMAIL_TO || "hello@poovaragan.dev";
  const from = process.env.EMAIL_FROM || "Portfolio Leads <leads@poovaragan.dev>";

  return resend.emails.send({
    from,
    to,
    subject: `New lead: ${params.name} (${params.source})`,
    html: `
      <h2>New portfolio lead</h2>
      <p><strong>Name:</strong> ${escapeHtml(params.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(params.email)}</p>
      <p><strong>Company:</strong> ${escapeHtml(params.company || "—")}</p>
      <p><strong>Source:</strong> ${escapeHtml(params.source)}</p>
      <p><strong>Project details:</strong></p>
      <p>${escapeHtml(params.projectDetails).replace(/\n/g, "<br/>")}</p>
    `,
  });
}

export async function sendContactNotification(params: {
  name: string;
  email: string;
  message: string;
}) {
  if (!resend) {
    console.warn("RESEND_API_KEY not configured — skipping email notification.");
    return { skipped: true };
  }

  const to = process.env.EMAIL_TO || "hello@poovaragan.dev";
  const from = process.env.EMAIL_FROM || "Portfolio Contact <contact@poovaragan.dev>";

  return resend.emails.send({
    from,
    to,
    subject: `New contact form message from ${params.name}`,
    html: `
      <h2>New contact message</h2>
      <p><strong>Name:</strong> ${escapeHtml(params.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(params.email)}</p>
      <p>${escapeHtml(params.message).replace(/\n/g, "<br/>")}</p>
    `,
  });
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
