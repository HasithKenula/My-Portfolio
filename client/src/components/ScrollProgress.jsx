import { useEffect, useRef } from 'react';

// Thin gradient bar at the top of the page showing how far the visitor has scrolled.
export default function ScrollProgress() {
  const ref = useRef(null);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const progress = doc.scrollTop / (doc.scrollHeight - doc.clientHeight || 1);
      if (ref.current) ref.current.style.transform = `scaleX(${progress})`;
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return <div className="scroll-progress" ref={ref} aria-hidden="true" />;
}
