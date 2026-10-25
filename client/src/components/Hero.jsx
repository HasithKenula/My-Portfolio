import { useEffect, useState } from 'react';
import CompanyText from './CompanyText.jsx';
import HeroCanvas from './HeroCanvas.jsx';

// Skills that circle the photo (only those present in the profile are shown).
const ORBIT_SKILLS = ['React', 'Node.js', 'MongoDB', 'Express.js', 'Kotlin', 'Figma'];

function useTypewriter(words, speed = 80, pause = 1600) {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!words?.length) return;
    const word = words[index % words.length];
    if (!deleting && text === word) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => i + 1);
      return;
    }
    const t = setTimeout(
      () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
      deleting ? speed / 2 : speed
    );
    return () => clearTimeout(t);
  }, [text, deleting, index, words, speed, pause]);

  return text;
}

export default function Hero({ profile }) {
  const role = useTypewriter(profile.roles);
  const [imgOk, setImgOk] = useState(true);
  const initials = profile.name.split(' ').map((n) => n[0]).join('');

  const allSkills = profile.skills.flatMap((group) => group.items);
  const orbit = ORBIT_SKILLS.filter((s) => allSkills.includes(s));

  // Split the name into letters for the staggered entrance; words stay unbreakable.
  let charIndex = 0;
  const nameWords = profile.name.split(' ').map((word, w) => (
    <span key={w} className="word">
      {[...word].map((ch) => (
        <span key={charIndex} className="char" style={{ '--i': charIndex++ }}>
          {ch}
        </span>
      ))}
    </span>
  ));

  return (
    <section id="home" className="hero">
      <div className="hero-orbs" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <HeroCanvas />
      <div className="container hero-inner">
        <div className="hero-text">
          <p className="eyebrow">
            Hello, I&apos;m <span className="wave">👋</span>
          </p>
          <h1 aria-label={profile.name}>
            <span aria-hidden="true">
              {nameWords.flatMap((word, i) => (i ? [' ', word] : [word]))}
            </span>
          </h1>
          <p className="hero-role">
            <span className="mono">&gt;</span> {role}
            <span className="caret" />
          </p>
          <p className="hero-headline">
            <CompanyText text={profile.headline} company={profile.company} />
          </p>
          <p className="hero-location">📍 {profile.location}</p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary magnetic">View my work</a>
            <a href="#contact" className="btn btn-ghost magnetic">Get in touch</a>
          </div>
          <div className="socials">
            {profile.socials?.linkedin && (
              <a href={profile.socials.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            )}
            {profile.socials?.github && (
              <a href={profile.socials.github} target="_blank" rel="noreferrer">GitHub ↗</a>
            )}
          </div>
        </div>
        <div className="hero-photo">
          <div className="photo-wrap">
            <div className="orbit" aria-hidden="true">
              {orbit.map((skill, i) => (
                <span key={skill} className="orbit-item" style={{ '--a': `${(360 / orbit.length) * i}deg` }}>
                  <span className="orbit-chip">{skill}</span>
                </span>
              ))}
            </div>
            <div className="photo-ring">
              {imgOk && profile.avatar ? (
                <img src={profile.avatar} alt={profile.name} onError={() => setImgOk(false)} />
              ) : (
                <div className="avatar-fallback">{initials}</div>
              )}
            </div>
            <span className="photo-badge badge-top">
              🎓 <CompanyText text="IT @ SLIIT" company={profile.university} />
            </span>
            <span className="photo-badge">
              💼 <CompanyText text="Trainee @ Omobio" company={profile.company} />
            </span>
          </div>
        </div>
      </div>
      <a href="#about" className="scroll-hint" aria-label="Scroll to About section">
        <span />
      </a>
    </section>
  );
}
