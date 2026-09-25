'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { CATEGORIES, catById, pad, type Segment } from '@/lib/data';
import Icon from './Icon';
import { useUI } from './UIProvider';

export default function CollectionDrawer() {
  const { drawer, closeDrawer, prefillEnquiry } = useUI();
  const c = catById(drawer.catId);
  const [tab, setTab] = useState<Segment>('b2c');
  const closeRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Pick the requested tab (or the first one that has items) each time the drawer opens
  useEffect(() => {
    if (!drawer.open) return;
    setTab(drawer.tab ?? (c.b2c.length ? 'b2c' : 'b2b'));
    const t = setTimeout(() => closeRef.current?.focus(), 300);
    return () => clearTimeout(t);
  }, [drawer.nonce]); // eslint-disable-line react-hooks/exhaustive-deps

  // Lock page scroll while open
  useEffect(() => {
    document.body.style.overflow = drawer.open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawer.open]);

  useEffect(() => {
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') closeDrawer(); };
    document.addEventListener('keydown', key);
    return () => document.removeEventListener('keydown', key);
  }, [closeDrawer]);

  // Scroll a highlighted item into view
  useEffect(() => {
    if (!drawer.open || !drawer.highlight) return;
    const t = setTimeout(() => listRef.current?.querySelector('.hl')?.scrollIntoView({ block: 'center', behavior: 'smooth' }), 350);
    return () => clearTimeout(t);
  }, [drawer.nonce, tab]); // eslint-disable-line react-hooks/exhaustive-deps

  const items = c[tab];

  return (
    <>
      <div className={`fixed inset-0 z-50 bg-cocoa-900/40 backdrop-blur-[3px] ${drawer.open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        style={{ transition: 'opacity .5s cubic-bezier(.2,.7,.2,1)' }} onClick={closeDrawer} />
      <aside id="drawer" className={`fixed top-0 right-0 z-[60] h-full w-full max-w-[560px] translate-x-full flex flex-col ${drawer.open ? 'open' : ''}`}
        style={{ background: 'linear-gradient(170deg, #FFFCF9, #F7EAE1)' }} role="dialog" aria-modal="true" aria-labelledby="dTitle" aria-hidden={!drawer.open}>
        <div className="relative px-7 sm:px-10 pt-8 pb-6 overflow-hidden">
          <Image src="/images/havenza-monogram.jpg" alt="" aria-hidden="true" width={1040} height={500}
            className="feather absolute -right-28 -top-10 w-[380px] h-auto opacity-[.14] mix-blend-multiply pointer-events-none" />
          <div className="relative flex items-start justify-between gap-4">
            <span className="icon-badge"><Icon name={c.icon} /></span>
            <button ref={closeRef} type="button" onClick={closeDrawer} className="w-11 h-11 rounded-full grid place-items-center glass-pill text-cocoa-700 hover:rotate-90 transition duration-500" aria-label="Close"><Icon name="x" className="w-5 h-5" /></button>
          </div>
          <p className="relative eyebrow mt-6">Collection {pad(c.id)} of {CATEGORIES.length}</p>
          <h3 id="dTitle" className="relative font-display text-4xl text-cocoa-800 mt-2 leading-tight">{c.title}</h3>
          <p className="relative mt-3 text-cocoa-500 font-light leading-relaxed">{c.blurb}</p>
          <div className="relative mt-6 flex gap-8 border-b border-rose-300/40" role="tablist">
            {c.b2c.length > 0 && <button type="button" role="tab" aria-selected={tab === 'b2c'} className={`tab-btn ${tab === 'b2c' ? 'active' : ''}`} onClick={() => setTab('b2c')}>For home · {c.b2c.length}</button>}
            <button type="button" role="tab" aria-selected={tab === 'b2b'} className={`tab-btn ${tab === 'b2b' ? 'active' : ''}`} onClick={() => setTab('b2b')}>For business · {c.b2b.length}</button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-7 sm:px-10 pb-8">
          <ul ref={listRef} key={`${c.id}-${tab}-${drawer.nonce}`} className="grid sm:grid-cols-2 gap-2.5">
            {items.map((n, i) => {
              const hl = n === drawer.highlight;
              return (
                <li key={n} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] text-cocoa-700 ${hl ? 'bg-blush-100 hl' : 'bg-white/70'}`}
                  style={{ boxShadow: `0 0 0 ${hl ? '1.5px #C08A66' : '1px rgba(192,138,102,.16)'} inset, 0 6px 14px -10px rgba(67,42,29,.25)`, animation: `fadeUp .5s ${i * 25}ms both cubic-bezier(.2,.7,.2,1)` }}>
                  <span className="w-6 h-6 rounded-full grid place-items-center shrink-0" style={{ background: 'linear-gradient(145deg,#F7E4D6,#E2BE9F)' }}><Icon name="check" className="w-3.5 h-3.5 text-cocoa-700" /></span>{n}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="px-7 sm:px-10 py-6 border-t border-rose-300/30 flex flex-wrap gap-3 items-center justify-between bg-white/40">
          <p className="text-sm text-cocoa-400">Custom sizes, colours &amp; branding available.</p>
          <button type="button" className="btn btn-primary" onClick={() => prefillEnquiry(c.title, tab === 'b2b' ? 'business' : 'personal')}>Enquire now <Icon name="arrow-right" className="w-4 h-4" /></button>
        </div>
      </aside>
    </>
  );
}
