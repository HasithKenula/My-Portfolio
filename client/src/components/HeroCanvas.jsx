import { useEffect, useRef } from 'react';

const LINK_DIST = 130; // particles closer than this get a line
const CURSOR_DIST = 180; // particles closer than this connect to the cursor
const PUSH_DIST = 140; // particles closer than this drift away from the cursor

const readColors = () => {
  const css = getComputedStyle(document.documentElement);
  return ['--a1', '--a3', '--a2'].map((v) => css.getPropertyValue(v).trim() || '#f77f00');
};

// Interactive "constellation" behind the hero: drifting dots joined by lines,
// which reach out to the cursor and move away from it.
export default function HeroCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const hero = canvas.parentElement;
    const ctx = canvas.getContext('2d');
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mouse = { x: -9999, y: -9999 };
    let colors = readColors();
    let particles = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    let inView = true;

    const spawn = () => {
      const count = Math.max(24, Math.min(90, Math.round((w * h) / 15000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.8,
        c: Math.floor(Math.random() * 3),
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const prevW = w;
      w = hero.clientWidth;
      h = hero.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Small height changes (e.g. the typing text wrapping) shouldn't reshuffle everything.
      if (!particles.length || Math.abs(w - prevW) > 40) spawn();
      if (!running) draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      if (!still) {
        for (const p of particles) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < PUSH_DIST && d > 0) {
            const force = (1 - d / PUSH_DIST) * 0.9;
            p.x += (dx / d) * force;
            p.y += (dy / d) * force;
          }
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
          p.x = Math.max(0, Math.min(w, p.x));
          p.y = Math.max(0, Math.min(h, p.y));
        }
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK_DIST) {
            ctx.globalAlpha = (1 - d / LINK_DIST) * 0.3;
            ctx.strokeStyle = colors[a.c];
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (dm < CURSOR_DIST) {
          ctx.globalAlpha = (1 - dm / CURSOR_DIST) * 0.65;
          ctx.strokeStyle = colors[0];
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      for (const p of particles) {
        ctx.globalAlpha = 0.85;
        ctx.fillStyle = colors[p.c];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };
    const sync = () => {
      const shouldRun = !still && inView && !document.hidden;
      if (shouldRun && !running) {
        running = true;
        raf = requestAnimationFrame(loop);
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    hero.addEventListener('pointermove', onMove, { passive: true });
    hero.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', sync);

    // Only animate while the hero is on screen.
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    io.observe(hero);

    // Re-read colours when the visitor switches theme or palette.
    const mo = new MutationObserver(() => {
      colors = readColors();
      if (!running) draw();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'data-accent'] });

    const ro = new ResizeObserver(resize);
    ro.observe(hero);
    resize();
    sync();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      mo.disconnect();
      ro.disconnect();
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  return <canvas ref={ref} className="hero-canvas" aria-hidden="true" />;
}
