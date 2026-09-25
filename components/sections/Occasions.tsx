'use client';

import { useRef } from 'react';
import { CATEGORIES, FESTIVALS } from '@/lib/data';
import { d } from '@/lib/ui';
import Photo from '@/components/ui/Photo';
import { FESTIVAL_IMG } from '@/lib/images';
import Icon from '@/components/ui/Icon';
import CardGL from '@/components/gl/CardGL';
import LuxCanvas from '@/components/gl/LuxCanvas';
import { useUI } from '@/components/ui/UIProvider';

const EVENT_CHIPS = ['Weddings', 'Engagements', 'Anniversaries', 'Baby showers', 'Birthdays', 'Stage & backdrops', 'Entrance décor', 'Custom installations'];
const RENTAL = CATEGORIES.find((c) => c.id === 15)!.b2b.slice(0, 8);

export default function Occasions() {
  const { openDrawer } = useUI();
  const row = useRef<HTMLDivElement>(null);
  const scroll = (dx: number) => row.current?.scrollBy({ left: dx, behavior: 'smooth' });

  return (
    <section id="occasions" className="relative py-20 lg:py-24 scroll-mt-20">
      <div className="max-w-site mx-auto px-5 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow eyebrow-line eyebrow-left reveal">Seasons, festivals &amp; celebrations</p>
            <h2 className="reveal font-display text-[2.6rem] sm:text-5xl lg:text-[3.6rem] leading-[1.05] text-cocoa-800 mt-5" style={d(80)}>Every occasion, <span className="gold-text italic">beautifully dressed</span></h2>
          </div>
          <div className="reveal flex gap-2" style={d(140)}>
            <button type="button" onClick={() => scroll(-290)} className="w-12 h-12 rounded-full grid place-items-center glass-pill text-cocoa-700 hover:text-rose-600 transition" aria-label="Previous"><Icon name="arrow-left" className="w-5 h-5" /></button>
            <button type="button" onClick={() => scroll(290)} className="w-12 h-12 rounded-full grid place-items-center glass-pill text-cocoa-700 hover:text-rose-600 transition" aria-label="Next"><Icon name="arrow-right" className="w-5 h-5" /></button>
          </div>
        </div>

        <div ref={row} className="reveal mt-10 flex gap-5 overflow-x-auto snap-row pb-6 -mx-5 px-5 lg:-mx-2 lg:px-2 pt-2">
          {FESTIVALS.map((f) => (
            <article key={f.n} className="fest-card lux-card shrink-0 w-[250px] sm:w-[270px] overflow-hidden !rounded-[26px] cursor-pointer group" onClick={() => openDrawer(10, 'b2c')}>
              <CardGL />
              <div className="photo relative h-[190px] rounded-t-[26px]">
                <Photo k={FESTIVAL_IMG[f.n]} alt={`${f.n} décor`} />
                <span className="photo-over left-5 bottom-5 w-14 h-14 rounded-2xl grid place-items-center text-cocoa-700 glass-pill group-hover:scale-110 transition duration-500"><Icon name={f.icon} className="w-6 h-6" /></span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-[1.7rem] text-cocoa-800">{f.n}</h3>
                <p className="text-[14.5px] text-cocoa-500 font-light mt-1">{f.line}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 grid lg:grid-cols-2 gap-6 lg:gap-8">
          <article className="lux-card reveal p-8 sm:p-10">
            <CardGL />
            <div className="photo card-top-md aspect-[16/8]"><Photo k="evt-wedding-table" alt="Wedding table décor with candles and dried florals" /></div>
            <div className="flex items-end gap-3 badge-lift"><span className="icon-badge"><Icon name="heart-handshake" /></span><span className="eyebrow pb-1.5">Weddings &amp; events</span></div>
            <h3 className="font-display text-3xl sm:text-4xl text-cocoa-800 mt-6">From intimate favours to grand stages</h3>
            <p className="mt-3 text-cocoa-500 font-light leading-relaxed">Wedding favours, candle and floral décor, personalised pieces and return gifts — plus stage, entrance, backdrop and centerpiece décor for planners, banquet halls, hotels and resorts.</p>
            <div className="mt-6 flex flex-wrap gap-2">{EVENT_CHIPS.map((c) => <span key={c} className="chip">{c}</span>)}</div>
            <button type="button" onClick={() => openDrawer(9)} className="mt-8 inline-flex items-center gap-2 text-[12.5px] tracking-[.2em] uppercase text-rose-700 hover:gap-3 transition-all">View wedding &amp; event range <Icon name="arrow-right" className="w-4 h-4" /></button>
          </article>

          <article className="on-dark reveal relative overflow-hidden rounded-[24px] p-8 sm:p-10 text-pearl"
            style={{ ...d(100), background: 'linear-gradient(150deg, #4A2E1F, #2A1911 60%, #1E120C)', boxShadow: '0 0 0 1px rgba(226,190,159,.22) inset, 0 40px 80px -40px rgba(34,21,14,.75)' }}>
            <div className="noir-photo" aria-hidden="true"><Photo k="evt-stage" /></div>
            <LuxCanvas className="opacity-60" />
            <div className="relative flex items-center gap-3">
              <span className="icon-badge" style={{ background: 'linear-gradient(145deg,#5A3A28,#2F1D14)', color: '#E9C4A4', boxShadow: '0 0 0 1px rgba(226,190,159,.35)' }}><Icon name="tent" /></span>
              <span className="eyebrow !text-rose-300">Décor rental · B2B</span>
            </div>
            <h3 className="relative font-display text-3xl sm:text-4xl text-ivory mt-6">Rent the look, not the storage</h3>
            <p className="relative mt-3 text-pearl/90 font-light leading-relaxed">Premium décor on rental for weddings, corporate events, hotel functions and seasonal retail — delivered, installed and collected.</p>
            <ul className="relative mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-2.5 text-[15px] text-pearl">
              {RENTAL.map((r) => <li key={r} className="flex items-center gap-2"><Icon name="check" className="w-4 h-4 text-rose-300 shrink-0" />{r}</li>)}
            </ul>
            <button type="button" onClick={() => openDrawer(15)} className="relative mt-8 inline-flex items-center gap-2 text-[12.5px] tracking-[.2em] uppercase text-rose-300 hover:gap-3 transition-all">View rental services <Icon name="arrow-right" className="w-4 h-4" /></button>
          </article>
        </div>
      </div>
    </section>
  );
}
