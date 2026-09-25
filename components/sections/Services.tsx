'use client';

import { useState } from 'react';
import { AUDIENCE_LABEL, SERVICES, catById, type Segment } from '@/lib/data';
import { d } from '@/lib/ui';
import Icon from '@/components/ui/Icon';
import CardGL from '@/components/gl/CardGL';
import { useUI } from '@/components/ui/UIProvider';

/** All Havenza services, filterable by audience (public / business). */
export default function Services() {
  const { openDrawer, prefillEnquiry } = useUI();
  const [aud, setAud] = useState<'all' | Segment>('all');
  const list = SERVICES.filter((s) => aud === 'all' || s.for.includes(aud));

  return (
    <section id="services" className="relative py-20 lg:py-24 scroll-mt-20">
      <div className="max-w-site mx-auto px-5 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow eyebrow-line eyebrow-left reveal">Havenza services</p>
            <h2 className="reveal font-display text-[2.6rem] sm:text-5xl lg:text-[3.6rem] leading-[1.05] text-cocoa-800 mt-5" style={d(80)}>
              Beyond products — <span className="gold-text italic">done for you</span>
            </h2>
          </div>
          <div className="reveal flex gap-2 overflow-x-auto snap-row" role="tablist" aria-label="Filter services" style={d(140)}>
            {([['all', `All services · ${SERVICES.length}`], ['b2c', 'For you'], ['b2b', 'For business']] as const).map(([k, label]) => (
              <button key={k} type="button" role="tab" aria-selected={aud === k} onClick={() => setAud(k)} className={`filter-btn ${aud === k ? 'active' : ''}`}>{label}</button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
          {list.map((s, i) => (
            <article key={`${aud}-${s.id}`} className="lux-card reveal group p-7 lg:p-8 flex flex-col" style={d((i % 3) * 70)}>
              <CardGL />
              <div className="flex items-start justify-between gap-4">
                <span className="icon-badge"><Icon name={s.icon} /></span>
                <div className="flex gap-1.5">
                  {s.for.map((x) => <span key={x} className={`text-[9.5px] tracking-[.16em] uppercase px-2 py-1 rounded-full ${x === 'b2c' ? 'bg-blush-100 text-rose-700' : 'bg-cocoa-800 text-rose-200'}`}>{AUDIENCE_LABEL[x]}</span>)}
                </div>
              </div>
              <h3 className="font-display text-[1.7rem] leading-tight text-cocoa-800 mt-7">{s.name}</h3>
              <p className="mt-1 text-[12px] tracking-[.16em] uppercase text-rose-600">{s.audience}</p>
              <p className="mt-3 text-[15px] text-cocoa-500 font-light leading-relaxed">{s.blurb}</p>
              <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-1.5 text-[13.5px] text-cocoa-600">
                {s.includes.slice(0, 4).map((m) => <li key={m} className="flex gap-2"><span className="sparkle text-rose-400 mt-[.5em] shrink-0" style={{ width: '.5em', height: '.5em' }} />{m}</li>)}
              </ul>
              <div className="mt-auto pt-7">
                <div className="hairline" />
                <div className="pt-5 flex items-center justify-between text-[11.5px] tracking-[.2em] uppercase">
                  <button type="button" onClick={() => openDrawer(s.related[0], 'b2b')} className="text-cocoa-400 hover:text-rose-700 transition uppercase tracking-[.2em]">
                    {catById(s.related[0]).short}
                  </button>
                  <button type="button" onClick={() => prefillEnquiry(catById(s.related[0]).title, s.for.includes('b2b') ? 'business' : 'personal')}
                    className="flex items-center gap-1.5 text-rose-700 group-hover:gap-3 transition-all uppercase tracking-[.2em]">
                    Enquire <Icon name="arrow-right" className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
