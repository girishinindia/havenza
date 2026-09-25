'use client';

import { useEffect } from 'react';

/** Page-wide behaviours: reveal-on-scroll, number count-up and the cursor sheen on cards. */
export default function PageEffects() {
  useEffect(() => {
    // Reveal on scroll (also picks up elements React adds later, e.g. after filtering collections)
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target as HTMLElement;
      el.classList.add('in'); io.unobserve(el);
      const d = parseInt(getComputedStyle(el).getPropertyValue('--d')) || 0;
      // once revealed, hand transitions back to the card's own hover timing
      setTimeout(() => el.classList.add('done'), 1100 + d);
    }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    const watch = (root: ParentNode) => root.querySelectorAll('.reveal:not(.in)').forEach((el) => io.observe(el));
    watch(document);
    const mo = new MutationObserver((ms) => ms.forEach((m) => m.addedNodes.forEach((n) => {
      if (n.nodeType !== 1) return;
      const el = n as HTMLElement;
      if (el.matches('.reveal:not(.in)')) io.observe(el);
      watch(el);
    })));
    mo.observe(document.body, { childList: true, subtree: true });

    // Count-up numbers
    const cio = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (!en.isIntersecting) return; cio.unobserve(en.target);
      const el = en.target as HTMLElement, end = +(el.dataset.count || 0), t0 = performance.now(), dur = 1600;
      const step = (t: number) => {
        const p = Math.min(1, (t - t0) / dur);
        el.textContent = String(Math.round(end * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }), { threshold: 0.6 });
    document.querySelectorAll('[data-count]').forEach((el) => cio.observe(el));

    // Cursor sheen position on cards
    const onMove = (e: PointerEvent) => {
      const c = (e.target as Element)?.closest?.('.lux-card, .noir-card') as HTMLElement | null;
      if (!c) return;
      const r = c.getBoundingClientRect();
      c.style.setProperty('--mx', `${e.clientX - r.left}px`);
      c.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    document.addEventListener('pointermove', onMove, { passive: true });

    return () => { io.disconnect(); mo.disconnect(); cio.disconnect(); document.removeEventListener('pointermove', onMove); };
  }, []);
  return null;
}
