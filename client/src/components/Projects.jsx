import { useMemo, useState } from 'react';
import Section from './Section.jsx';

function Thumbnail({ project }) {
  const [failed, setFailed] = useState(false);
  const link = project.live || project.github;

  const content =
    project.image && !failed ? (
      <img src={project.image} alt={`${project.title} preview`} loading="lazy" onError={() => setFailed(true)} />
    ) : (
      <div className="thumb-fallback">
        <span>{project.title}</span>
      </div>
    );

  return link ? (
    <a className="project-thumb" href={link} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}>
      {content}
    </a>
  ) : (
    <div className="project-thumb">{content}</div>
  );
}

export default function Projects({ projects }) {
  const categories = useMemo(
    () => ['All', ...new Set(projects.map((p) => p.category).filter(Boolean))],
    [projects]
  );
  const [filter, setFilter] = useState('All');
  const shown = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <Section id="projects" eyebrow="04 — Work" title="Featured projects">
      <div className="filters">
        {categories.map((c) => (
          <button key={c} className={`filter ${filter === c ? 'active' : ''}`} onClick={() => setFilter(c)}>
            {c}
          </button>
        ))}
      </div>
      <div className="projects-grid stagger">
        {shown.map((p) => (
          <article key={p._id} className={`card project ${p.featured ? 'featured' : ''}`}>
            <Thumbnail project={p} />
            <div className="project-top">
              <span className="project-cat">{p.category}</span>
              {p.featured && <span className="badge">Featured</span>}
            </div>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <div className="chips small">
              {p.tech.map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
            <div className="project-links">
              {p.github && <a href={p.github} target="_blank" rel="noreferrer">Code ↗</a>}
              {p.live && <a href={p.live} target="_blank" rel="noreferrer">Live ↗</a>}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
