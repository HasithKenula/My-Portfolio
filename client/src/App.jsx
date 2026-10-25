import { useCallback, useEffect, useState } from 'react';
import { getProfile, getProjects } from './api.js';
import useTheme from './useTheme.js';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Experience from './components/Experience.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import BackToTop from './components/BackToTop.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import TechMarquee from './components/TechMarquee.jsx';
import usePointerGlow from './usePointerGlow.js';

export default function App() {
  const themeProps = useTheme();
  usePointerGlow();
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const [slow, setSlow] = useState(false);

  const load = useCallback(() => {
    setError('');
    setSlow(false);
    // Free hosting sleeps when idle, so the first request can take a while.
    const timer = setTimeout(() => setSlow(true), 4000);
    Promise.all([getProfile(), getProjects()])
      .then(([p, pr]) => {
        setProfile(p);
        setProjects(pr);
      })
      .catch((err) => setError(err.message))
      .finally(() => clearTimeout(timer));
  }, []);

  useEffect(load, [load]);

  if (error) {
    return (
      <div className="status">
        <h2>Couldn&apos;t load the portfolio</h2>
        <p className="muted">{error}</p>
        <button className="btn btn-primary" onClick={load}>Try again</button>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="status" role="status">
        <div className="spinner" />
        <p className="muted">{slow ? 'Waking up the server, this can take up to a minute…' : 'Loading…'}</p>
      </div>
    );
  }

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <ScrollProgress />
      <Navbar name={profile.name} themeProps={themeProps} />
      <main id="main">
        <Hero profile={profile} />
        <TechMarquee skills={profile.skills} />
        <About profile={profile} />
        <Skills skills={profile.skills} />
        <Experience experience={profile.experience} education={profile.education} />
        <Projects projects={projects} />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
      <BackToTop />
      <CustomCursor />
    </>
  );
}
