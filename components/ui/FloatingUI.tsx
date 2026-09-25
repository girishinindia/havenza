'use client';

import { useEffect, useState } from 'react';
import Icon from './Icon';
import { useUI } from './UIProvider';

/** Toast notification + back-to-top button. */
export default function FloatingUI() {
  const { toast } = useUI();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 900);
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div role="status" aria-live="polite"
        className="fixed z-[70] left-1/2 bottom-8 glass-pill rounded-2xl px-5 py-4 flex items-center gap-3 text-cocoa-700 max-w-[92vw]"
        style={{ transform: `translate(-50%, ${toast.show ? '0' : '6rem'})`, opacity: toast.show ? 1 : 0, transition: 'transform .6s cubic-bezier(.2,.7,.2,1), opacity .6s cubic-bezier(.2,.7,.2,1)' }}>
        <span className="w-9 h-9 rounded-full grid place-items-center bg-blush-100 text-rose-700 shrink-0"><Icon name="check" className="w-4 h-4" /></span>
        <span className="text-[15px]">{toast.msg}</span>
      </div>

      <a href="#home" aria-label="Back to top"
        className={`fixed z-30 right-5 bottom-5 w-12 h-12 rounded-full grid place-items-center glass-pill text-cocoa-700 transition duration-500 ${showTop ? 'opacity-100' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <Icon name="arrow-up" className="w-5 h-5" />
      </a>
    </>
  );
}
