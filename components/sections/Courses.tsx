'use client';

import { useEffect, useState } from 'react';
import { AUDIENCE_LABEL, COURSES, COURSE_FORMATS, type CourseFormat } from '@/lib/data';
import { d } from '@/lib/ui';
import Photo from '@/components/ui/Photo';
import { COURSE_IMG } from '@/lib/images';
import Icon from '@/components/ui/Icon';
import CardGL from '@/components/gl/CardGL';
import { useUI } from '@/components/ui/UIProvider';

/** Havenza Studio — craft courses & workshops. Filterable by format; the mega menu can pre-select a format. */
export default function Courses() {
  const { prefillEnquiry } = useUI();
  const [format, setFormat] = useState<'all' | 'mega' | 'business' | CourseFormat>('all');

  useEffect(() => {
    const on = (e: Event) => setFormat((e as CustomEvent<CourseFormat>).detail);
    window.addEventListener('havenza:course-format', on);
    return () => window.removeEventListener('havenza:course-format', on);
  }, []);

  const list = COURSES.filter((c) => format === 'all' || (format === 'mega' ? c.track === 'mega' : format === 'business' ? c.for.includes('b2b') : c.formats.includes(format)));

  return (
    <section id="learn" className="relative py-20 lg:py-28 scroll-mt-20">
      <div className="max-w-site mx-auto px-5 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow eyebrow-line eyebrow-left reveal">Havenza Studio · Courses &amp; workshops</p>
            <h2 className="reveal font-display text-[2.6rem] sm:text-5xl lg:text-[3.6rem] leading-[1.05] text-cocoa-800 mt-5" style={d(80)}>
              Learn the craft <span className="gold-text italic">behind the beauty</span>
            </h2>
            <p className="reveal mt-5 text-cocoa-500 font-light text-[17px] max-w-xl leading-relaxed" style={d(140)}>
              Candle making, resin art, florals, fragrance and styling — taught by our makers in the studio, online, for kids, and as certificate programmes for new craft businesses.
            </p>
          </div>
          <div className="lg:col-span-5 reveal grid grid-cols-2 gap-3" style={d(180)}>
            {COURSE_FORMATS.map((f) => (
              <div key={f.key} className="glass-pill rounded-2xl px-4 py-3 flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl grid place-items-center bg-blush-100 text-rose-700 shrink-0"><Icon name={f.icon} className="w-[18px] h-[18px]" /></span>
                <span className="leading-tight min-w-0"><span className="block text-[13px] font-medium text-cocoa-700">{f.label}</span><span className="block text-[11.5px] text-cocoa-400">{f.line}</span></span>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal mt-10 flex gap-2 overflow-x-auto snap-row pb-2 -mx-5 px-5 lg:mx-0 lg:px-0" role="tablist" aria-label="Filter courses">
          {[{ key: 'all' as const, label: `All courses · ${COURSES.length}` }, { key: 'mega' as const, label: 'Mega courses' }, ...COURSE_FORMATS, { key: 'business' as const, label: 'For business teams' }].map((f) => (
            <button key={f.key} type="button" role="tab" aria-selected={format === f.key} onClick={() => setFormat(f.key)}
              className={`filter-btn ${format === f.key ? 'active' : ''}`}>{f.label}</button>
          ))}
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
          {list.map((c, i) => (
            <article key={`${format}-${c.id}`} className="lux-card reveal group p-7 lg:p-8 flex flex-col" style={d((i % 3) * 70)}>
              <CardGL />
              <div className="photo card-top aspect-[3/2]">
                <Photo k={COURSE_IMG(c.id)} alt={c.name} />
                {c.track === 'mega' && <span className="photo-over top-4 left-4 text-[10px] tracking-[.22em] uppercase text-ivory rounded-full px-3 py-1.5" style={{ background: 'linear-gradient(135deg,rgba(85,55,38,.92),rgba(47,29,20,.92))' }}>Mega course</span>}
              </div>
              <div className="flex items-end justify-between gap-4 badge-lift">
                <span className="icon-badge"><Icon name={c.icon} /></span>
                <span className="text-[10.5px] tracking-[.16em] uppercase text-rose-700 bg-blush-100 rounded-full px-3 py-1.5 text-right">{c.level}</span>
              </div>
              <h3 className="font-display text-[1.75rem] leading-tight text-cocoa-800 mt-5">{c.name}</h3>
              <div className="mt-2 flex gap-1.5">
                {c.for.map((x) => <span key={x} className={`text-[9.5px] tracking-[.16em] uppercase px-2 py-0.5 rounded-full ${x === 'b2c' ? 'bg-blush-100 text-rose-700' : 'bg-cocoa-800 text-rose-200'}`}>{AUDIENCE_LABEL[x]}</span>)}
              </div>
              <p className="mt-3 text-[15px] text-cocoa-500 font-light leading-relaxed">{c.blurb}</p>
              <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-1.5 text-[13.5px] text-cocoa-600">
                {c.modules.slice(0, 4).map((m) => <li key={m} className="flex gap-2"><span className="sparkle text-rose-400 mt-[.5em] shrink-0" style={{ width: '.5em', height: '.5em' }} />{m}</li>)}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                {COURSE_FORMATS.filter((f) => c.formats.includes(f.key)).map((f) => (
                  <span key={f.key} className="chip"><Icon name={f.icon} className="w-3.5 h-3.5 text-rose-600" />{f.short}</span>
                ))}
              </div>
              <div className="mt-auto pt-7">
                <div className="hairline" />
                <div className="pt-5 flex items-center justify-between text-[11.5px] tracking-[.2em] uppercase">
                  <span className="text-cocoa-400 flex items-center gap-1.5"><Icon name="clock" className="w-3.5 h-3.5" />{c.duration}</span>
                  <button type="button" onClick={() => prefillEnquiry(c.name, c.for.includes('b2c') ? 'personal' : 'business')} className="flex items-center gap-1.5 text-rose-700 group-hover:gap-3 transition-all uppercase tracking-[.2em]">
                    Enrol <Icon name="arrow-right" className="w-4 h-4" />
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
