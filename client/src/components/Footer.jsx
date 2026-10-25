const LINKS = ['about', 'skills', 'experience', 'projects', 'contact'];

export default function Footer({ profile }) {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <a href="#home" className="logo">
            {profile.name}<span>.</span>
          </a>
          <p className="footer-tagline">{profile.headline}</p>
        </div>
        <nav className="footer-links" aria-label="Footer">
          {LINKS.map((link) => (
            <a key={link} href={`#${link}`}>{link}</a>
          ))}
        </nav>
        <div className="footer-social">
          {profile.socials?.linkedin && (
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          )}
          {profile.socials?.github && (
            <a href={profile.socials.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          )}
          {profile.email && <a href={`mailto:${profile.email}`}>Email ↗</a>}
        </div>
      </div>
      <p className="footer-copy">
        © {new Date().getFullYear()} {profile.name} · Built with MongoDB, Express, React &amp; Node.js
      </p>
    </footer>
  );
}
