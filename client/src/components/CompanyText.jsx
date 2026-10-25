const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Renders text with organisation names (e.g. "Omobio", "SLIIT") turned into links to their websites.
// Pass one organisation as `company`, or several as `links`.
export default function CompanyText({ text, company, links }) {
  const orgs = (links || [company]).filter((o) => o?.name && o?.url);
  if (!text || !orgs.length) return text ?? null;

  const pattern = new RegExp(`(${orgs.map((o) => escapeRegExp(o.name)).join('|')})`, 'g');
  return text.split(pattern).map((part, i) => {
    const org = orgs.find((o) => o.name === part);
    return org ? (
      <a key={i} href={org.url} target="_blank" rel="noreferrer" className="company-link">
        {part}
      </a>
    ) : (
      part
    );
  });
}
