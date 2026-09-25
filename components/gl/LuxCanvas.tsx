'use client';

import { useEffect, useRef } from 'react';
import { LUX_FS, VERT, makeProgram, prefersReducedMotion, quad } from '@/lib/gl';

/** Flowing rose-gold contour lines for dark cocoa panels. Only animates while on screen. */
export default function LuxCanvas({ variant = 'soft', className = '' }: { variant?: 'soft' | 'full'; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const gl = canvas.getContext('webgl', { antialias: false, alpha: true, premultipliedAlpha: true, powerPreference: 'low-power' });
    if (!gl) { canvas.style.display = 'none'; return; }
    const prog = makeProgram(gl, VERT, LUX_FS);
    if (!prog) { canvas.style.display = 'none'; return; }
    const bind = quad(gl, prog);
    const u = { res: gl.getUniformLocation(prog, 'uRes'), t: gl.getUniformLocation(prog, 'uTime'), a: gl.getUniformLocation(prog, 'uAmp'), m: gl.getUniformLocation(prog, 'uMouse') };
    const amp = variant === 'full' ? 1.0 : 0.7, seed = Math.random() * 100, REDUCED = prefersReducedMotion();
    let visible = false, mx = .5, my = .5;

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { rootMargin: '100px' });
    io.observe(canvas);
    const onMove = (e: PointerEvent) => {
      if (!visible) return;
      const r = canvas.getBoundingClientRect(); mx = (e.clientX - r.left) / r.width; my = 1 - (e.clientY - r.top) / r.height;
    };
    addEventListener('pointermove', onMove, { passive: true });

    const size = () => {
      const r = canvas.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 1.5) * 0.75;
      const w = Math.max(1, Math.floor(r.width * dpr)), h = Math.max(1, Math.floor(r.height * dpr));
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); }
    };

    let raf = 0, last = 0; const t0 = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden || now - last < 1000 / 40) return;
      last = now; size();
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(prog); bind();
      gl.uniform2f(u.res, canvas.width, canvas.height);
      gl.uniform1f(u.t, (REDUCED ? 5 : (now - t0) / 1000) + seed);
      gl.uniform1f(u.a, amp); gl.uniform2f(u.m, mx, my);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf); io.disconnect(); removeEventListener('pointermove', onMove);
      // Keep the context alive: React re-runs effects in dev (Strict Mode) and the same canvas reuses it.
    };
  }, [variant]);

  return <canvas ref={ref} className={`lux-gl ${className}`} aria-hidden="true" />;
}
