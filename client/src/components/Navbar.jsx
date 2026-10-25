import { useEffect, useState } from 'react';
import ThemeControls from './ThemeControls.jsx';

const LINKS = ['about', 'skills', 'experience', 'projects', 'contact'];

export default function Navbar({ name, themeProps }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the link for the section crossing the middle of the screen.
  useEffect(() => {
    const sections = ['home', ...LINKS].map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // While the mobile menu is open: lock page scroll and close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const initials = name.split(' ').map((n) => n[0]).join('');

  return (
    <header className={`navbar ${scrolled || open ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#home" className="logo" aria-label={`${name} — home`} onClick={() => setOpen(false)}>
          {initials}<span>.</span>
        </a>
        <nav id="site-nav" className={open ? 'open' : ''} aria-label="Main">
          {LINKS.map((link) => (
            <a
              key={link}
              href={`#${link}`}
              className={active === link ? 'active' : ''}
              aria-current={active === link ? 'true' : undefined}
              onClick={() => setOpen(false)}
            >
              {link}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <ThemeControls {...themeProps} />
          <button
            className={`menu-btn ${open ? 'open' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen(!open)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
      {open && <div className="nav-backdrop" onClick={() => setOpen(false)} />}
    </header>
  );
}
