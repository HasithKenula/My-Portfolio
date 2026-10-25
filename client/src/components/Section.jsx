import useReveal from '../useReveal.js';

export default function Section({ id, eyebrow, title, children }) {
  const ref = useReveal();
  return (
    <section id={id} ref={ref} className="section reveal">
      <div className="container">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="section-title">{title}</h2>
        {children}
      </div>
    </section>
  );
}
