import Section from './Section.jsx';

export default function Experience({ experience, education }) {
  return (
    <Section id="experience" eyebrow="03 — Journey" title="Experience & Education">
      <div className="journey">
        <div>
          <h3 className="column-title">💼 Experience</h3>
          <ol className="timeline stagger">
            {experience.map((job) => (
              <li key={`${job.company}-${job.role}`} className="card">
                <div className="timeline-head">
                  <h4>{job.role}</h4>
                  {job.current && <span className="badge">Current</span>}
                </div>
                <p className="timeline-meta">
                  {job.companyUrl ? (
                    <a href={job.companyUrl} target="_blank" rel="noreferrer" className="company-link">
                      {job.company}
                    </a>
                  ) : (
                    job.company
                  )}{' '}
                  · {job.period}
                  {job.location && ` · ${job.location}`}
                </p>
                <ul>
                  {job.description.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h3 className="column-title">🎓 Education</h3>
          <ol className="timeline stagger">
            {education.map((edu) => (
              <li key={edu.institution} className="card">
                <h4>{edu.degree}</h4>
                <p className="timeline-meta">
                  {edu.institutionUrl ? (
                    <a href={edu.institutionUrl} target="_blank" rel="noreferrer" className="company-link">
                      {edu.institution}
                    </a>
                  ) : (
                    edu.institution
                  )}{' '}
                  · {edu.period}
                </p>
                {edu.details && <p>{edu.details}</p>}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
