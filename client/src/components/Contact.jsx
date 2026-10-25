import { useState } from 'react';
import Section from './Section.jsx';
import { sendMessage } from '../api.js';

const EMPTY = { name: '', email: '', subject: '', message: '' };

export default function Contact({ profile }) {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState({ state: 'idle', text: '' });
  const [errors, setErrors] = useState({});
  const [copied, setCopied] = useState(false);

  const update = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: undefined });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'sending', text: '' });
    setErrors({});
    try {
      const res = await sendMessage(form);
      setStatus({ state: 'success', text: `✓ ${res.message} I'll reply to ${form.email} soon.` });
      setForm(EMPTY);
    } catch (err) {
      setErrors(err.errors || {});
      setStatus({
        state: 'error',
        text: err.errors
          ? 'Please fix the highlighted fields.'
          : 'Could not send your message. Please check your connection and try again.',
      });
    }
  };

  const field = (name) => ({
    name,
    value: form[name],
    onChange: update,
    'aria-invalid': errors[name] ? 'true' : undefined,
  });

  return (
    <Section id="contact" eyebrow="05 — Contact" title="Let's work together">
      <div className="contact-grid">
        <div className="contact-info">
          <p>
            I&apos;m open to internships, freelance work and collaborations. Have a question or just want to say
            hi? Drop me a message and I&apos;ll get back to you.
          </p>
          <ul>
            {profile.email && (
              <li>
                ✉️ <a href={`mailto:${profile.email}`}>{profile.email}</a>
                <button type="button" className="copy-btn" onClick={copyEmail} aria-live="polite">
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </li>
            )}
            <li>📍 {profile.address ? `${profile.address}, Sri Lanka` : profile.location}</li>
            {profile.socials?.linkedin && (
              <li>🔗 <a href={profile.socials.linkedin} target="_blank" rel="noreferrer">linkedin.com/in/hasithk</a></li>
            )}
          </ul>
        </div>
        <form className="card contact-form" onSubmit={submit} noValidate>
          <div className="row">
            <label>
              <span>Name <span className="req">*</span></span>
              <input {...field('name')} autoComplete="name" placeholder="e.g. Nimal Perera" required />
              {errors.name && <small>{errors.name}</small>}
            </label>
            <label>
              <span>Email <span className="req">*</span></span>
              <input {...field('email')} type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" required />
              {errors.email && <small>{errors.email}</small>}
            </label>
          </div>
          <label>
            <span>Subject <span className="optional">(optional)</span></span>
            <input {...field('subject')} placeholder="e.g. Internship opportunity" />
          </label>
          <label>
            <span>Message <span className="req">*</span></span>
            <textarea {...field('message')} rows="5" maxLength={5000} placeholder="Hi Hasith, I saw your projects and would like to talk about..." required />
            <span className="field-foot">
              {errors.message ? <small>{errors.message}</small> : <span />}
              <span className="counter">{form.message.length}/5000</span>
            </span>
          </label>
          <button className="btn btn-primary" disabled={status.state === 'sending'}>
            {status.state === 'sending' ? <><span className="btn-spinner" /> Sending…</> : 'Send message'}
          </button>
          <p className={`form-status ${status.state}`} role="status" aria-live="polite">
            {status.text}
          </p>
        </form>
      </div>
    </Section>
  );
}
