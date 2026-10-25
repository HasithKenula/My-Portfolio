import { useEffect, useRef, useState } from 'react';

const ACCENTS = [
  { id: 'ember', label: 'Ember' },
  { id: 'aurora', label: 'Aurora' },
  { id: 'ocean', label: 'Ocean' },
  { id: 'sunset', label: 'Sunset' },
  { id: 'forest', label: 'Forest' },
];

const SunIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
);

const PaletteIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.7-.9 1.7-1.8 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-1 .8-1.8 1.8-1.8H16a5 5 0 0 0 5-5C21 6.4 17 3 12 3z" />
    <circle cx="7.5" cy="11.5" r="1.2" />
    <circle cx="10.5" cy="7.5" r="1.2" />
    <circle cx="15.5" cy="7.5" r="1.2" />
  </svg>
);

export default function ThemeControls({ theme, setTheme, accent, setAccent }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    if (!open) return;
    const onPointer = (e) => !ref.current?.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="theme-controls" ref={ref}>
      <button
        className="icon-btn"
        onClick={() => setOpen(!open)}
        aria-label="Choose color theme"
        aria-expanded={open}
        title="Color theme"
      >
        <PaletteIcon />
      </button>
      {open && (
        <div className="accent-menu" role="menu" aria-label="Color theme">
          <p>Color theme</p>
          {ACCENTS.map((a) => (
            <button
              key={a.id}
              role="menuitemradio"
              aria-checked={accent === a.id}
              className={`accent-option ${accent === a.id ? 'selected' : ''}`}
              onClick={() => {
                setAccent(a.id);
                setOpen(false);
              }}
            >
              <span className="swatch" data-swatch={a.id} />
              {a.label}
              {accent === a.id && <span className="check">✓</span>}
            </button>
          ))}
        </div>
      )}
      <button
        className="icon-btn"
        onClick={() => setTheme(nextTheme)}
        aria-label={`Switch to ${nextTheme} mode`}
        title={`Switch to ${nextTheme} mode`}
      >
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </button>
    </div>
  );
}
