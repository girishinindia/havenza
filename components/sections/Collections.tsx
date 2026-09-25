'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { CATEGORIES, FILTERS, TOTAL, pad, type Segment } from '@/lib/data';
import { d } from '@/lib/ui';
import Icon from '@/components/ui/Icon';
import CardGL from '@/components/gl/CardGL';
import { useUI } from '@/components/ui/UIProvider';

const INDEX = CATEGORIES.flatMap((c) => [
  ...c.b2c.map((n) => ({ n, c, seg: 'b2c' as Segment })),
  ...c.b2b.map((n) => ({ n, c, seg: 'b2b' as Segment })),
]);

export default function Collections() {
  const { filter, setFilter, openDrawer } = useUI();
  const [q, setQ] = useState('');
  const [showResults, setShowResults] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  const list = CATEGORIES.filter((c) => filter === 'all' || c.groups.includes(filter));
  const hits = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return INDEX.filter((x) => x.n.toLowerCase().includes(s) || x.c.title.toLowerCase().includes(s)).slice(0, 40);
  }, [q]);

  useEffect(() => {
    const down = (e: PointerEvent) => { if (!box.current?.contains(e.target as Node)) setShowResults(false); };
    document.addEventListener('pointerdown', down);
    return () => document.removeEventListener('pointerdown', down);
  }, []);

  return (
    <section id="collections" className="relative py-16 lg:py-24 scroll-mt-24">
      <div className="max-w-site mx-auto px-5 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow eyebrow-line eyebrow-left reveal">The Havenza collections</p>
            <h2 className="reveal font-display text-[2.6rem] sm:text-5xl lg:text-[3.6rem] leading-[1.05] text-cocoa-800 mt-5" style={d(80)}>Fifteen collections. <span className="gold-text italic">One signature.</span></h2>
            <p className="reveal mt-5 text-cocoa-500 font-light text-[17px] max-w-xl leading-relaxed" style={d(140)}>Browse by world, search across every product and service, or open a collection to see its full retail and business range.</p>
          </div>
          <div className="lg:col-span-5 reveal" style={d(180)}>
            <label htmlFor="search" className="sr-only">Search products and services</label>
            <div className="relative" ref={box}>
              <Icon name="search" className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-rose-600 pointer-events-none" />
              <input id="search" type="search" autoComplete="off" placeholder={`Search ${TOTAL}+ products & services…`}
                value={q} onChange={(e) => { setQ(e.target.value); setShowResults(true); }} onFocus={() => setShowResults(true)}
                className="field !rounded-full !pl-14 !py-4 !bg-white/80" />
              {showResults && q.trim() && (
                <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-30 lux-card !rounded-2xl !bg-[#FFFCF9] max-h-[380px] overflow-y-auto p-2">
                  {hits.length ? hits.map((h) => (
                    <button key={`${h.c.id}-${h.seg}-${h.n}`} type="button" onClick={() => { setShowResults(false); openDrawer(h.c.id, h.seg, h.n); }}
                      className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-blush-50 transition">
                      <span className="w-8 h-8 rounded-lg grid place-items-center bg-blush-100 text-rose-700 shrink-0"><Icon name={h.c.icon} className="w-4 h-4" /></span>
                      <span className="flex-1 min-w-0"><span className="block text-[15px] text-cocoa-800 truncate">{h.n}</span><span className="block text-xs text-cocoa-400 truncate">{h.c.title}</span></span>
                      <span className={`text-[10px] tracking-[.18em] uppercase px-2 py-1 rounded-full ${h.seg === 'b2c' ? 'bg-blush-100 text-rose-700' : 'bg-cocoa-800 text-rose-200'}`}>{h.seg === 'b2c' ? 'Home' : 'Business'}</span>
                    </button>
                  )) : (
                    <p className="px-4 py-6 text-center text-cocoa-400">No matches — <a href="#enquire" className="text-rose-700 underline">ask us for a custom piece</a>.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="reveal mt-10 flex gap-2 overflow-x-auto snap-row pb-2 -mx-5 px-5 lg:mx-0 lg:px-0" role="tablist" aria-label="Filter collections">
          {FILTERS.map((f) => (
            <button key={f.key} type="button" role="tab" aria-selected={filter === f.key} onClick={() => setFilter(f.key)}
              className={`filter-btn ${filter === f.key ? 'active' : ''}`}>{f.label}</button>
          ))}
        </div>

        <div id="grid" className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
          {list.map((c, i) => {
            const preview = (c.b2c.length ? c.b2c : c.b2b).slice(0, 4);
            return (
              <article key={`${filter}-${c.id}`} className="lux-card reveal group p-7 lg:p-8 flex flex-col cursor-pointer" style={d((i % 3) * 70)}
                role="button" tabIndex={0} aria-label={`Open ${c.title}`} onClick={() => openDrawer(c.id)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDrawer(c.id); } }}>
                <CardGL />
                <div className="flex items-start justify-between">
                  <span className="icon-badge"><Icon name={c.icon} /></span>
                  <span className="font-display text-[2.6rem] leading-none text-rose-300/80 group-hover:text-rose-400 transition">{pad(c.id)}</span>
                </div>
                <h3 className="font-display text-[1.75rem] leading-tight text-cocoa-800 mt-7">{c.title}</h3>
                <p className="mt-3 text-[15px] text-cocoa-500 font-light leading-relaxed">{c.blurb}</p>
                <div className="mt-6 flex flex-wrap gap-2">{preview.map((p) => <span key={p} className="chip">{p}</span>)}</div>
                <div className="mt-auto pt-7">
                  <div className="hairline" />
                  <div className="pt-5 flex items-center justify-between text-[11.5px] tracking-[.2em] uppercase">
                    <span className="text-cocoa-400">{c.b2c.length ? `${c.b2c.length} Home` : 'B2B only'} <span className="text-rose-400 mx-1">·</span> {c.b2b.length} Business</span>
                    <span className="flex items-center gap-1.5 text-rose-700 group-hover:gap-3 transition-all">Explore <Icon name="arrow-right" className="w-4 h-4" /></span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
