import Section from './Section.jsx';

export default function Skills({ skills }) {
  return (
    <Section id="skills" eyebrow="02 — Skills" title="Tools I work with">
      <div className="skills-grid stagger">
        {skills.map((group) => (
          <div key={group.category} className="card skill-card">
            <h3>{group.category}</h3>
            <div className="chips">
              {group.items.map((item) => (
                <span key={item} className="chip">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
