import type { CSSProperties } from 'react';

/** Stagger delay for `.reveal` elements, e.g. style={d(80)} */
export const d = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;
