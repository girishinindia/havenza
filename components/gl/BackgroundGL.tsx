'use client';

import { useEffect, useRef } from 'react';
import { BG_FS, DUST_FS, DUST_VS, VERT, makeProgram, prefersReducedMotion, quad } from '@/lib/gl';

/** Fixed full-page background: blush silk, diagonal window light and floating rose-gold dust. */
export default function BackgroundGL() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power', premultipliedAlpha: false });
    if (!gl) { canvas.style.display = 'none'; return; }
    const REDUCED = prefersReducedMotion();

    const prog = makeProgram(gl, VERT, BG_FS), pprog = makeProgram(gl, DUST_VS, DUST_FS);
    if (!prog) { canvas.style.display = 'none'; return; }
    const bindQuad = quad(gl, prog);
    const U = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = U('uRes'), uTime = U('uTime'), uMouse = U('uMouse'), uScroll = U('uScroll');

    const N = innerWidth < 700 ? 60 : 130;
    const pdata = new Float32Array(N * 4);
    for (let i = 0; i < N * 4; i++) pdata[i] = Math.random();
    const pbuf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, pbuf); gl.bufferData(gl.ARRAY_BUFFER, pdata, gl.STATIC_DRAW);
    const PU = pprog && {
      a: gl.getAttribLocation(pprog, 'a'), t: gl.getUniformLocation(pprog, 'uTime'), m: gl.getUniformLocation(pprog, 'uMouse'),
      s: gl.getUniformLocation(pprog, 'uScroll'), px: gl.getUniformLocation(pprog, 'uPx'),
    };

    let scale = 1, W = 0, H = 0;
    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      scale = dpr * (innerWidth < 800 ? 0.55 : 0.6); // soft field → render at reduced resolution
      W = Math.max(1, Math.floor(innerWidth * scale)); H = Math.max(1, Math.floor(innerHeight * scale));
      canvas.width = W; canvas.height = H; gl.viewport(0, 0, W, H);
    };
    resize(); addEventListener('resize', resize);

    const mouse = { x: .5, y: .5, tx: .5, ty: .5 };
    const onMove = (e: PointerEvent) => { mouse.tx = e.clientX / innerWidth; mouse.ty = 1 - e.clientY / innerHeight; };
    addEventListener('pointermove', onMove, { passive: true });

    let raf = 0, last = 0; const t0 = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (document.hidden || now - last < 1000 / 45) return; // ~45fps is plenty for an ambient field
      last = now;
      const time = REDUCED ? 8 : (now - t0) / 1000;
      mouse.x += (mouse.tx - mouse.x) * 0.04; mouse.y += (mouse.ty - mouse.y) * 0.04;
      const sc = scrollY / innerHeight;

      gl.disable(gl.BLEND);
      gl.useProgram(prog); bindQuad();
      gl.uniform2f(uRes, W, H); gl.uniform1f(uTime, time); gl.uniform2f(uMouse, mouse.x, mouse.y); gl.uniform1f(uScroll, sc);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (pprog && PU) {
        gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.useProgram(pprog);
        gl.bindBuffer(gl.ARRAY_BUFFER, pbuf); gl.enableVertexAttribArray(PU.a); gl.vertexAttribPointer(PU.a, 4, gl.FLOAT, false, 0, 0);
        gl.uniform1f(PU.t, time); gl.uniform2f(PU.m, mouse.x, mouse.y); gl.uniform1f(PU.s, sc); gl.uniform1f(PU.px, scale);
        gl.drawArrays(gl.POINTS, 0, N);
      }
      if (REDUCED) cancelAnimationFrame(raf);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('resize', resize);
      removeEventListener('pointermove', onMove);
      // Keep the context alive: React re-runs effects in dev (Strict Mode) and the same canvas reuses it.
    };
  }, []);

  return <canvas id="bg-gl" ref={ref} aria-hidden="true" />;
}
