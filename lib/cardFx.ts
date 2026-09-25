/* One shared WebGL context paints the liquid background of every visible card.
   Each card owns a small 2D canvas; the shared context renders into a scratch buffer and the
   result is copied across. This keeps us far below the browser's WebGL-context limit. */

import { CARD_FS, VERT, makeProgram, prefersReducedMotion, quad } from './gl';

/** Card effect intensity: 1 = original, 0.6 = 40% lighter. */
export const CARD_STRENGTH = 0.6;

interface CardState {
  cv: HTMLCanvasElement; ctx: CanvasRenderingContext2D; el: HTMLElement; dark: number; seed: number;
  hover: number; target: number; mx: number; my: number; visible: boolean; w: number; h: number; last: number;
  off: () => void;
}

const MAXW = 720, MAXH = 720;
let engine: {
  gl: WebGLRenderingContext; glc: HTMLCanvasElement; u: Record<string, WebGLUniformLocation | null>;
  cards: Map<HTMLCanvasElement, CardState>; io: IntersectionObserver; scale: number;
} | null = null;
let failed = false;

function start() {
  if (engine || failed || typeof window === 'undefined') return engine;
  const glc = document.createElement('canvas');
  glc.width = MAXW; glc.height = MAXH;
  const gl = glc.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false, preserveDrawingBuffer: true, powerPreference: 'low-power' });
  const prog = gl && makeProgram(gl, VERT, CARD_FS);
  if (!gl || !prog) { failed = true; return null; }
  const bind = quad(gl, prog);
  const U = (n: string) => gl.getUniformLocation(prog, n);
  const u = { res: U('uRes'), t: U('uTime'), seed: U('uSeed'), dark: U('uDark'), hover: U('uHover'), mouse: U('uMouse') };
  gl.useProgram(prog); bind();
  gl.uniform1f(U('uStrength'), CARD_STRENGTH);
  gl.disable(gl.BLEND); gl.clearColor(0, 0, 0, 0);

  const cards = new Map<HTMLCanvasElement, CardState>();
  const io = new IntersectionObserver((es) => es.forEach((en) => {
    const st = cards.get(en.target as HTMLCanvasElement); if (st) st.visible = en.isIntersecting;
  }), { rootMargin: '80px' });
  const scale = Math.min(devicePixelRatio || 1, 1.5) * (innerWidth < 800 ? 0.4 : 0.5);
  engine = { gl, glc, u, cards, io, scale };

  const REDUCED = prefersReducedMotion();
  const t0 = performance.now(); let last = 0;
  const frame = (now: number) => {
    requestAnimationFrame(frame);
    if (document.hidden || now - last < 1000 / 30) return;
    last = now;
    const time = REDUCED ? 6 : (now - t0) / 1000;
    cards.forEach((st) => {
      if (!st.visible) return;
      st.hover += (st.target - st.hover) * 0.12;
      if (st.hover < 0.02 && now - st.last < 66) return; // idle cards ~15fps, hovered cards ~30fps
      st.last = now;
      const r = st.el.getBoundingClientRect();
      const w = Math.min(MAXW, Math.max(1, Math.round(r.width * scale))), h = Math.min(MAXH, Math.max(1, Math.round(r.height * scale)));
      if (st.w !== w || st.h !== h) { st.cv.width = w; st.cv.height = h; st.w = w; st.h = h; }
      gl.viewport(0, 0, w, h);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(u.res, w, h); gl.uniform1f(u.t, time + st.seed); gl.uniform1f(u.seed, st.seed);
      gl.uniform1f(u.dark, st.dark); gl.uniform1f(u.hover, st.hover); gl.uniform2f(u.mouse, st.mx, st.my);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      st.ctx.clearRect(0, 0, w, h);
      st.ctx.drawImage(glc, 0, MAXH - h, w, h, 0, 0, w, h); // GL origin is bottom-left
    });
  };
  requestAnimationFrame(frame);
  return engine;
}

/** Register a card canvas; its parent element is the card. Returns an unregister function. */
export function registerCard(cv: HTMLCanvasElement): () => void {
  const e = start();
  const el = cv.parentElement;
  const ctx = cv.getContext('2d');
  if (!e || !el || !ctx) { cv.style.display = 'none'; return () => {}; }
  const st: CardState = {
    cv, ctx, el, dark: el.classList.contains('noir-card') ? 1 : 0, seed: Math.random() * 40,
    hover: 0, target: 0, mx: .5, my: .5, visible: false, w: 0, h: 0, last: 0, off: () => {},
  };
  const enter = () => { st.target = 1; };
  const leave = () => { st.target = 0; };
  const move = (ev: PointerEvent) => { const r = el.getBoundingClientRect(); st.mx = (ev.clientX - r.left) / r.width; st.my = 1 - (ev.clientY - r.top) / r.height; };
  el.addEventListener('pointerenter', enter); el.addEventListener('pointerleave', leave); el.addEventListener('pointermove', move, { passive: true });
  st.off = () => { el.removeEventListener('pointerenter', enter); el.removeEventListener('pointerleave', leave); el.removeEventListener('pointermove', move); };
  e.cards.set(cv, st); e.io.observe(cv);
  return () => { st.off(); e.io.unobserve(cv); e.cards.delete(cv); };
}
