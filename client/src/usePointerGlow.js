import { useEffect } from 'react';

// Desktop only, one delegated listener for the whole page:
// - spotlight that follows the cursor over .card elements, plus a 3D tilt on project cards
// - .magnetic elements lean toward the cursor
// - the hero gets --px/--py (-0.5..0.5) for mouse parallax
export default function usePointerGlow() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let card = null;
    let magnet = null;

    const onMove = (e) => {
      const target = e.target;

      const nextCard = target.closest?.('.card');
      if (card && card !== nextCard) {
        card.style.removeProperty('--rx');
        card.style.removeProperty('--ry');
      }
      card = nextCard;
      if (card) {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        card.style.setProperty('--mx', `${x}px`);
        card.style.setProperty('--my', `${y}px`);
        if (card.classList.contains('project')) {
          card.style.setProperty('--ry', `${(x / r.width - 0.5) * 7}deg`);
          card.style.setProperty('--rx', `${(0.5 - y / r.height) * 7}deg`);
        }
      }

      const nextMagnet = target.closest?.('.magnetic');
      if (magnet && magnet !== nextMagnet) magnet.style.translate = '';
      magnet = nextMagnet;
      if (magnet) {
        const r = magnet.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        magnet.style.translate = `${dx * 0.3}px ${dy * 0.4}px`;
      }

      const hero = document.getElementById('home');
      if (hero && window.scrollY < hero.offsetHeight) {
        hero.style.setProperty('--px', (e.clientX / window.innerWidth - 0.5).toFixed(3));
        hero.style.setProperty('--py', (e.clientY / window.innerHeight - 0.5).toFixed(3));
      }
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    return () => document.removeEventListener('pointermove', onMove);
  }, []);
}
