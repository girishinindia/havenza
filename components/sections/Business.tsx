'use client';

import { INDUSTRIES, TOTAL_B2B } from '@/lib/data';
import { d } from '@/lib/ui';
import Icon from '@/components/ui/Icon';
import CardGL from '@/components/gl/CardGL';
import LuxCanvas from '@/components/gl/LuxCanvas';
import { useUI } from '@/components/ui/UIProvider';

const STATS: [string, string, boolean?][] = [
  [String(TOTAL_B2B), 'B2B solutions'], [String(INDUSTRIES.length), 'Industries served'], ['OEM', '& private label', true],
  ['Logo', 'Branded products'], ['Rental', 'Event & display décor'],
];

export default function Business() {
  const { openDrawer, prefillEnquiry } = useUI();
  return (
    <section id="business" className="on-dark relative py-20 lg:py-28 mt-16 lg:mt-24 overflow-hidden scroll-mt-20"
      style={{ background: 'linear-gradient(170deg, #3B2418 0%, #2A1911 50%, #1E120C 100%)' }}>
      <LuxCanvas variant="full" />
      <div className="relative max-w-site mx-auto px-5 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow eyebrow-line eyebrow-left !text-rose-300 reveal">Havenza for business</p>
            <h2 className="reveal font-display text-[2.6rem] sm:text-5xl lg:text-[3.6rem] leading-[1.05] text-ivory mt-5" style={d(80)}>
              Décor partners to the <span className="gold-text-lt italic">hospitality &amp; corporate</span> world
            </h2>
          </div>
          <div className="lg:col-span-5 reveal" style={d(160)}>
            <p className="text-pearl/90 font-light text-[17px] leading-relaxed">From a single boutique café to a multi-property hotel group — one partner for candles, fragrance, florals, art, gifting and installations, with consistent quality from sample to scale.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button type="button" onClick={() => prefillEnquiry('', 'business')} className="btn btn-gold">Talk to our trade team</button>
              <a href="#bespoke" className="btn btn-ghost-dark">How we work</a>
            </div>
          </div>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {INDUSTRIES.map((x, i) => (
            <article key={x.name} className="noir-card reveal p-6 lg:p-7 flex flex-col cursor-pointer group" style={d((i % 4) * 70)}
              role="button" tabIndex={0} onClick={() => openDrawer(x.open, 'b2b')}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDrawer(x.open, 'b2b'); } }}>
              <CardGL />
              <div className="flex items-center justify-between">
                <span className="w-12 h-12 rounded-2xl grid place-items-center text-rose-200" style={{ background: 'linear-gradient(145deg, rgba(226,190,159,.18), rgba(226,190,159,.04))', boxShadow: '0 0 0 1px rgba(226,190,159,.25) inset' }}>
                  <Icon name={x.icon} className="w-[22px] h-[22px]" />
                </span>
                <Icon name="arrow-up-right" className="w-5 h-5 text-rose-300/80 group-hover:text-rose-200 group-hover:rotate-45 transition duration-500" />
              </div>
              <h3 className="font-display text-[1.6rem] leading-tight text-ivory mt-6">{x.name}</h3>
              <ul className="mt-4 space-y-2 text-[14.5px] text-pearl/90">
                {x.items.map((it) => (
                  <li key={it} className="flex gap-2"><span className="sparkle text-rose-300/80 mt-[.55em] shrink-0" style={{ width: '.45em', height: '.45em' }} />{it}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* B2B capabilities strip */}
        <div className="reveal mt-14 rounded-3xl p-px" style={{ background: 'linear-gradient(120deg, rgba(226,190,159,.5), rgba(226,190,159,.05) 40%, rgba(226,190,159,.4))' }}>
          <div className="rounded-[23px] px-6 sm:px-10 py-8 grid grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 text-center" style={{ background: 'linear-gradient(160deg, rgba(47,29,20,.92), rgba(30,18,12,.92))' }}>
            {STATS.map(([v, l, gold], i) => (
              <div key={l} className={i === STATS.length - 1 ? 'col-span-2 lg:col-span-1' : ''}>
                <p className={`font-display text-4xl ${gold ? 'gold-text-lt' : 'text-ivory'}`}>{v}</p>
                <p className="mt-1 text-[11px] tracking-[.22em] uppercase text-rose-200">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
