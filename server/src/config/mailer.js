import nodemailer from 'nodemailer';

const { EMAIL_USER, EMAIL_PASS, EMAIL_TO, RESEND_API_KEY } = process.env;
const RECIPIENT = EMAIL_TO || EMAIL_USER;

// Resend (HTTPS API) is used when RESEND_API_KEY is set — needed on hosts like Render's
// free plan that block SMTP. Otherwise fall back to Gmail SMTP with an App Password.
const transporter =
  !RESEND_API_KEY && EMAIL_USER && EMAIL_PASS
    ? nodemailer.createTransport({ service: 'gmail', auth: { user: EMAIL_USER, pass: EMAIL_PASS.replace(/\s/g, '') } })
    : null;

if (RESEND_API_KEY && !RECIPIENT) console.log('RESEND_API_KEY is set but EMAIL_TO is empty — emails are off.');
else if (!RESEND_API_KEY && !transporter)
  console.log('Email notifications are off (set RESEND_API_KEY, or EMAIL_USER and EMAIL_PASS, in server/.env).');

const escapeHtml = (s = '') =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

async function sendWithResend(mail) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [RECIPIENT],
      reply_to: mail.replyTo,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
    }),
  });
  if (!res.ok) {
    const err = new Error(`Resend error ${res.status}: ${await res.text()}`);
    if (res.status === 401 || res.status === 403) err.code = 'EAUTH';
    throw err;
  }
}

// Emails a new contact-form message to the portfolio owner. Reply-To is the visitor.
export async function notifyNewMessage({ name, email, subject, message }) {
  if (!RECIPIENT || (!RESEND_API_KEY && !transporter)) return false;

  const mail = {
    replyTo: `"${name.replace(/"/g, '')}" <${email}>`,
    subject: `New portfolio message${subject ? `: ${subject}` : ` from ${name}`}`,
    text: `From: ${name} <${email}>\nSubject: ${subject || '-'}\n\n${message}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:560px">
        <h2 style="margin:0 0 12px">New message from your portfolio</h2>
        <p style="margin:4px 0"><b>Name:</b> ${escapeHtml(name)}</p>
        <p style="margin:4px 0"><b>Email:</b> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        <p style="margin:4px 0"><b>Subject:</b> ${escapeHtml(subject) || '-'}</p>
        <div style="margin-top:16px;padding:14px;background:#f4f4f7;border-radius:8px;white-space:pre-wrap">${escapeHtml(message)}</div>
        <p style="color:#888;font-size:12px;margin-top:16px">Press Reply to answer ${escapeHtml(name)} directly.</p>
      </div>`,
  };

  if (RESEND_API_KEY) await sendWithResend(mail);
  else await transporter.sendMail({ from: `"Portfolio Contact" <${EMAIL_USER}>`, to: RECIPIENT, ...mail });
  return true;
}
