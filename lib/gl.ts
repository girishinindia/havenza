/* Shared WebGL helpers and shaders for the Havenza effects. */

export const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;
export const NOISE = `
    float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
    float noise(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y); }
    float fbm(vec2 p){ float v = 0.0, a = 0.5; mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
      for (int i = 0; i < 5; i++){ v += a * noise(p); p = m * p; a *= 0.5; } return v; }`;


export function makeProgram(gl: WebGLRenderingContext, vs: string, fs: string): WebGLProgram | null {
  const sh = (t: number, src: string) => {
    const o = gl.createShader(t)!; gl.shaderSource(o, src); gl.compileShader(o);
    if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(o)); return null; }
    return o;
  };
  const p = gl.createProgram()!, a = sh(gl.VERTEX_SHADER, vs), b = sh(gl.FRAGMENT_SHADER, fs);
  if (!a || !b) return null;
  gl.attachShader(p, a); gl.attachShader(p, b); gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) { console.warn(gl.getProgramInfoLog(p)); return null; }
  return p;
}

/** Full-screen quad; returns a function that binds it for drawing. */
export function quad(gl: WebGLRenderingContext, prog: WebGLProgram) {
  const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'p');
  return () => { gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0); };
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---- Page background: silk + window light ---- */
export const BG_FS = `precision highp float;
      uniform vec2 uRes; uniform float uTime; uniform vec2 uMouse; uniform float uScroll;
      ${NOISE}
      void main(){
        vec2 uv = gl_FragCoord.xy / uRes; float asp = uRes.x / uRes.y;
        vec2 p = vec2(uv.x * asp, uv.y);
        float t = uTime * 0.035;
        vec3 ivory = vec3(0.992, 0.972, 0.950);
        vec3 cream = vec3(0.960, 0.905, 0.862);
        vec3 blush = vec3(0.925, 0.800, 0.765);
        vec3 champ = vec3(0.905, 0.800, 0.720);
        float drift = uScroll * 0.35;
        vec3 col = mix(cream, ivory, smoothstep(-0.1, 1.1, uv.y + 0.18 * sin(drift) + uv.x * 0.15));

        vec2 m = (uMouse - 0.5) * 0.2;
        vec2 q = vec2(fbm(p * 0.9 + vec2(0.0, t) + m), fbm(p * 0.9 + vec2(5.2, 1.3) - t));
        vec2 r = vec2(fbm(p * 1.1 + 1.6 * q + vec2(1.7, 9.2 + drift) + t * 0.5), fbm(p * 1.1 + 1.6 * q + vec2(8.3, 2.8) - t * 0.35));
        float f = fbm(p * 0.95 + 1.8 * r);

        // soft blush & champagne silk
        col = mix(col, blush, smoothstep(0.40, 0.85, f) * 0.5);
        col = mix(col, champ, smoothstep(0.50, 0.90, r.y) * 0.22);
        // satin sheen along the folds (smooth, no hard edges)
        float sheen = smoothstep(0.52, 0.70, f) * (1.0 - smoothstep(0.70, 0.88, f));
        col += vec3(1.0, 0.95, 0.90) * sheen * 0.06;

        // diagonal window light & shade (inspired by the brand plate)
        vec2 d = normalize(vec2(1.0, 0.62));
        float s = dot(p, d) * 4.2 - t * 1.4 + drift * 0.8;
        float rays = smoothstep(0.15, 0.95, 0.5 + 0.5 * sin(s)) * smoothstep(0.1, 0.9, 0.5 + 0.5 * sin(s * 0.41 + 1.7));
        float mask = smoothstep(0.0, 1.2, uv.y * 0.9 + uv.x * 0.25 + 0.1);
        col += vec3(1.0, 0.965, 0.93) * rays * 0.08 * mask;
        col -= vec3(0.03, 0.045, 0.05) * (1.0 - rays) * 0.3 * mask;

        float v = length((uv - vec2(0.55, 0.55)) * vec2(asp * 0.7, 1.0));
        col = mix(col, col * vec3(0.965, 0.93, 0.91), smoothstep(0.7, 1.5, v));
        col += (hash(gl_FragCoord.xy + fract(uTime) * 100.0) - 0.5) * 0.012;
        gl_FragColor = vec4(col, 1.0);
      }`;


/* ---- Rose-gold dust particles ---- */
export const DUST_VS = `attribute vec4 a; uniform float uTime; uniform vec2 uMouse; uniform float uScroll; uniform float uPx; uniform vec2 uRes;
      varying float vA; varying float vT;
      void main(){
        float depth = a.w;
        float y = fract(a.y + uTime * 0.008 * (0.4 + depth) + uScroll * 0.06 * depth);
        float x = a.x + sin(uTime * 0.25 * (0.5 + a.z) + a.y * 12.0) * 0.02 + (uMouse.x - 0.5) * 0.04 * depth;
        gl_Position = vec4(x * 2.0 - 1.0, y * 2.0 - 1.0 + (uMouse.y - 0.5) * 0.03 * depth, 0.0, 1.0);
        gl_PointSize = (2.0 + a.z * 7.0) * (0.6 + depth) * uPx;
        vA = (0.25 + 0.55 * depth) * smoothstep(0.0, 0.12, y) * smoothstep(1.0, 0.85, y);
        vT = a.z * 6.28 + uTime * (0.6 + a.z);
      }`;
export const DUST_FS = `precision mediump float; varying float vA; varying float vT;
      void main(){
        vec2 c = gl_PointCoord - 0.5; float d = length(c);
        float disc = smoothstep(0.5, 0.0, d);
        float core = smoothstep(0.18, 0.0, d);
        float tw = 0.65 + 0.35 * sin(vT);
        vec3 gold = mix(vec3(0.78, 0.55, 0.40), vec3(1.0, 0.90, 0.80), core);
        gl_FragColor = vec4(gold, (disc * 0.45 + core * 0.55) * vA * tw);
      }`;


/* ---- Dark "lux" panels: flowing rose-gold contour silk ---- */
export const LUX_FS = `precision highp float;
      uniform vec2 uRes; uniform float uTime; uniform float uAmp; uniform vec2 uMouse;
      ${NOISE}
      void main(){
        vec2 uv = gl_FragCoord.xy / uRes; float asp = uRes.x / uRes.y;
        vec2 p = vec2(uv.x * asp, uv.y) * 0.85;
        float t = uTime * 0.045;
        vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(3.1, -t)));
        float f = fbm(p * 0.9 + 1.5 * q + (uMouse - 0.5) * 0.25);
        float c = abs(fract(f * 6.0 - t * 0.6) - 0.5);
        float lines = smoothstep(0.035, 0.0, c) * smoothstep(0.2, 0.6, f);
        float glow = smoothstep(0.3, 0.8, f);
        vec3 gold = vec3(0.886, 0.690, 0.545);
        float a = clamp(lines * 0.30 + glow * 0.14, 0.0, 1.0) * uAmp;
        vec3 col = gold * a;
        gl_FragColor = vec4(col, a);
      }`;

/* ---- Card backgrounds (light + dark) ---- */
export const CARD_FS = `precision mediump float;
      uniform vec2 uRes; uniform float uTime; uniform float uSeed; uniform float uDark; uniform float uHover; uniform vec2 uMouse; uniform float uStrength;
      float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
      float noise(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y); }
      float fbm(vec2 p){ float v = 0.0, a = 0.5; mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
        for (int i = 0; i < 4; i++){ v += a * noise(p); p = m * p; a *= 0.5; } return v; }
      void main(){
        vec2 uv = gl_FragCoord.xy / uRes; float asp = uRes.x / uRes.y;
        vec2 p = vec2(uv.x * asp, uv.y) * 1.5 + uSeed;
        float t = uTime * (0.05 + 0.04 * uHover);
        vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(4.1, -t)));
        float f = fbm(p * 0.9 + 1.7 * q);
        float sheen = smoothstep(0.42, 0.68, f) * (1.0 - smoothstep(0.68, 0.92, f));
        float c = abs(fract(f * 5.0 - t * 0.8) - 0.5);
        float lines = smoothstep(0.035, 0.0, c) * smoothstep(0.28, 0.66, f);
        float d = length((uv - uMouse) * vec2(asp, 1.0));
        float glow = exp(-d * d * 5.0) * uHover;
        vec3 gold = vec3(0.86, 0.64, 0.47), blush = vec3(0.94, 0.76, 0.71), cream = vec3(1.0, 0.95, 0.90);
        vec3 col; float a;
        if (uDark > 0.5) {
          col = mix(gold, cream, glow * 0.4);
          a = lines * (0.16 + 0.22 * uHover) + sheen * 0.07 + glow * 0.16;
        } else {
          col = mix(mix(blush, gold, lines), cream, glow * 0.55);
          a = sheen * 0.18 + lines * (0.09 + 0.16 * uHover) + glow * 0.26;
        }
        a = clamp(a * uStrength, 0.0, 0.6 * uStrength);   // uStrength 0.6 = 40% lighter
        gl_FragColor = vec4(col * a, a);
      }`;
