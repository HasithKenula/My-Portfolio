import { useEffect, useRef, useState } from 'react';

const INTERACTIVE = 'a, button, [role="button"], .card, label, .chip';

// Dot that follows the mouse exactly + a ring that trails behind it.
// Desktop only (fine pointer); touch devices and reduced-motion users keep the normal cursor.
export default function CustomCursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [enabled] = useState(
    () =>
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add('has-custom-cursor');

    let x = 0;
    let y = 0;
    let rx = 0;
    let ry = 0;
    let visible = false;
    let raf;

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!visible) {
        visible = true;
        rx = x;
        ry = y;
        root.classList.add('cursor-visible');
      }
      const typing = e.target.closest?.('input, textarea');
      root.classList.toggle('cursor-text', !!typing);
      ring.current.classList.toggle('is-hover', !typing && !!e.target.closest?.(INTERACTIVE));
      dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    const onDown = () => ring.current.classList.add('is-down');
    const onUp = () => ring.current.classList.remove('is-down');
    const onOut = (e) => {
      if (e.relatedTarget) return; // still inside the page
      visible = false;
      root.classList.remove('cursor-visible');
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('pointerup', onUp);
    document.addEventListener('mouseout', onOut);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('pointerup', onUp);
      document.removeEventListener('mouseout', onOut);
      root.classList.remove('has-custom-cursor', 'cursor-visible', 'cursor-text');
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div className="cursor-ring" ref={ring} aria-hidden="true">
        <span />
      </div>
      <div className="cursor-dot" ref={dot} aria-hidden="true" />
    </>
  );
}
