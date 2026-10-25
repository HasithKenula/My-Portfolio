import { useEffect, useRef, useState } from 'react';
import Section from './Section.jsx';
import CompanyText from './CompanyText.jsx';

// Counts numeric stats (e.g. "155+") up from 0 when they scroll into view.
function CountUp({ value, links }) {
  const match = /^(\d+)(.*)$/.exec(value);
  const target = match && Number(match[1]) >= 10 ? Number(match[1]) : null;
  const ref = useRef(null);
  const [n, setN] = useState(target === null ? null : 0);

  useEffect(() => {
    if (target === null) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(target);
      return;
    }
    let raf;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / 1600, 1);
        setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target]);

  return (
    <strong ref={ref}>
      {target === null ? <CompanyText text={value} links={links} /> : `${n}${match[2]}`}
    </strong>
  );
}

export default function About({ profile }) {
  const links = [profile.company, profile.university];

  return (
    <Section id="about" eyebrow="01 — About" title="A bit about me">
      <div className="about-grid">
        <div className="about-text">
          {profile.about.map((p, i) => (
            <p key={i}>
              <CompanyText text={p} links={links} />
            </p>
          ))}
        </div>
        <div className="stats stagger">
          {profile.stats?.map((s) => (
            <div key={s.label} className="stat card">
              <CountUp value={s.value} links={links} />
              <span>
                <CompanyText text={s.label} links={links} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
