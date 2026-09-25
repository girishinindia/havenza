'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { CATEGORIES, TOTAL, TOTAL_B2B } from '@/lib/data';
import { d } from '@/lib/ui';
import Icon from '@/components/ui/Icon';
import { useUI, type FilterKey } from '@/components/ui/UIProvider';

const PILLARS: [string, FilterKey][] = [['Home Décor', 'home'], ['Hotel Décor', 'hospitality'], ['Office Décor', 'hospitality'], ['Gifts & More', 'gifting']];

const Chip = ({ icon, title, sub, className }: { icon: string; title: string; sub: string; className: string }) => (
  <div className={`absolute glass-pill rounded-2xl px-4 py-3 flex items-center gap-3 ${className}`}>
    <span className="w-9 h-9 rounded-xl grid place-items-center bg-blush-100 text-rose-700"><Icon name={icon} className="w-[18px] h-[18px]" /></span>
    <span className="leading-tight"><span className="block text-[13px] font-medium text-cocoa-700">{title}</span><span className="block text-[11.5px] text-cocoa-400">{sub}</span></span>
  </div>
);

export default function Hero() {
  const { jumpToFilter } = useUI();
  const mono = useRef<HTMLDivElement>(null);

  const tilt = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !mono.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    mono.current.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 8}deg) translateZ(0)`;
  };

  return (
    <section className="relative">
      <div className="max-w-site mx-auto px-5 lg:px-10 pt-10 sm:pt-14 lg:pt-16 pb-16 lg:pb-24 grid lg:grid-cols-12 gap-10 lg:gap-6 items-center">
        <div className="lg:col-span-6 relative z-10">
          <p className="eyebrow eyebrow-line eyebrow-left reveal">Handcrafted décor &amp; gifting</p>
          <h1 className="reveal font-display font-medium text-cocoa-800 leading-[.95] tracking-[-.01em] text-[3.2rem] sm:text-[4.3rem] lg:text-[5rem] xl:text-[5.8rem] mt-6" style={d(80)}>
            Create your<br /><span className="gold-text italic font-normal">beautiful</span> space.
          </h1>
          <p className="reveal mt-7 max-w-xl text-[17px] leading-relaxed text-cocoa-500 font-light" style={d(160)}>
            Candles, florals, resin art, wall décor and personalised gifts — made with a maker’s care for your home, and scaled with a manufacturer’s discipline for hotels, restaurants, offices and events.
          </p>
          <div className="reveal mt-9 flex flex-wrap gap-3" style={d(240)}>
            <a href="#collections" className="btn btn-primary">Explore Collections <Icon name="arrow-right" className="w-4 h-4" /></a>
            <a href="#business" className="btn btn-ghost">Business Solutions</a>
          </div>

          <dl className="reveal mt-12 grid grid-cols-2 sm:grid-cols-4 gap-y-6 max-w-2xl" style={d(320)}>
            <div className="pr-4 sm:border-r border-rose-300/40">
              <dt className="text-[11px] tracking-[.22em] uppercase text-cocoa-400">Collections</dt>
              <dd className="font-display text-4xl text-cocoa-800 mt-1"><span data-count={CATEGORIES.length}>{CATEGORIES.length}</span></dd>
            </div>
            <div className="sm:px-5 sm:border-r border-rose-300/40">
              <dt className="text-[11px] tracking-[.22em] uppercase text-cocoa-400">Products &amp; services</dt>
              <dd className="font-display text-4xl text-cocoa-800 mt-1"><span data-count={TOTAL}>{TOTAL}</span>+</dd>
            </div>
            <div className="pr-4 sm:px-5 sm:border-r border-rose-300/40">
              <dt className="text-[11px] tracking-[.22em] uppercase text-cocoa-400">Business solutions</dt>
              <dd className="font-display text-4xl text-cocoa-800 mt-1"><span data-count={TOTAL_B2B}>{TOTAL_B2B}</span></dd>
            </div>
            <div className="sm:pl-5">
              <dt className="text-[11px] tracking-[.22em] uppercase text-cocoa-400">Custom &amp; OEM</dt>
              <dd className="font-display text-4xl text-cocoa-800 mt-1">1<span className="text-rose-500 mx-1 text-2xl align-middle">→</span>∞</dd>
            </div>
          </dl>
        </div>

        {/* Hero visual */}
        <div className="lg:col-span-6 relative reveal overflow-x-clip lg:overflow-visible -mx-5 px-5 lg:mx-0 lg:px-0" style={d(200)}>
          <div className="relative mx-auto w-full max-w-[640px] aspect-[1/0.92]" style={{ perspective: 1200 }}
            onPointerMove={tilt} onPointerLeave={() => { if (mono.current) mono.current.style.transform = ''; }}>
            <div className="absolute inset-[4%] orbit orbit-spin" />
            <div className="absolute inset-[13%] orbit orbit-spin-rev" style={{ borderStyle: 'dashed', borderColor: 'rgba(192,138,102,.22)' }} />
            <div className="absolute inset-[18%] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,250,245,.95) 0%, rgba(255,246,238,.5) 45%, transparent 72%)' }} />
            <div ref={mono} className="absolute inset-0 grid place-items-center transition-transform duration-700 ease-out will-change-transform" style={{ transformStyle: 'preserve-3d' }}>
              <Image src="/images/havenza-monogram.jpg" alt="Havenza H monogram in rose gold with blush leaves" width={1040} height={500} priority
                sizes="(max-width: 1024px) 110vw, 760px" className="mono-mask w-[118%] max-w-none h-auto select-none" draggable={false} />
            </div>
            <Chip icon="hand" title="Handmade" sub="Made to order" className="left-0 sm:-left-2 top-[12%] float-a" />
            <Chip icon="hotel" title="Hospitality-grade" sub="Hotels · Cafés · Spas" className="right-0 sm:-right-2 top-[42%] float-b" />
            <Chip icon="package" title="Private label · OEM" sub="Bulk manufacturing" className="left-[10%] bottom-[4%] float-c" />
          </div>
        </div>
      </div>

      {/* Pillars strip (echoes the logo tagline) */}
      <div className="max-w-site mx-auto px-5 lg:px-10 pb-8">
        <div className="hairline" />
        <ul className="grid grid-cols-2 md:grid-cols-4 text-center">
          {PILLARS.map(([label, f], i) => (
            <li key={label}>
              <button type="button" onClick={() => jumpToFilter(f)}
                className={`w-full py-5 text-[12px] tracking-[.3em] uppercase text-cocoa-600 hover:text-rose-600 transition ${i ? 'md:border-l border-rose-300/40' : ''}`}>{label}</button>
            </li>
          ))}
        </ul>
        <div className="hairline" />
      </div>
    </section>
  );
}
