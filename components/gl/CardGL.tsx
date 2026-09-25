'use client';

import { useEffect, useRef } from 'react';
import { registerCard } from '@/lib/cardFx';

/** Drop inside any `.lux-card` or `.noir-card` to give it the shared liquid WebGL background. */
export default function CardGL() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => registerCard(ref.current!), []);
  return <canvas ref={ref} className="card-gl" aria-hidden="true" />;
}
