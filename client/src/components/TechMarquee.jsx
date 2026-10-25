// Endless scrolling strip of technologies between the hero and the About section.
export default function TechMarquee({ skills }) {
  const items = [...new Set(skills.flatMap((group) => group.items))];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {/* rendered twice so the -50% translate loops seamlessly */}
        {[...items, ...items].map((item, i) => (
          <span key={i}>
            {item}
            <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}
