'use client';

import { PROCESS } from '@/lib/data';
import { d } from '@/lib/ui';
import Icon from '@/components/ui/Icon';
import CardGL from '@/components/gl/CardGL';
import { useUI } from '@/components/ui/UIProvider';

const CAPABILITIES = ['Custom colours', 'Custom sizes', 'Names & initials', 'Photo-based', 'Theme-based', 'Corporate branding', 'Private label', 'OEM', 'Bulk manufacturing', 'Exclusive collections'];

export default function Bespoke() {
  const { prefillEnquiry } = useUI();
  return (
    <section id="bespoke" className="relative py-20 lg:py-28 scroll-mt-20">
      <div className="max-w-site mx-auto px-5 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-10">
        <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
          <p className="eyebrow eyebrow-line eyebrow-left reveal">Custom · Bespoke · Private label</p>
          <h2 className="reveal font-display text-[2.6rem] sm:text-5xl lg:text-[3.4rem] leading-[1.05] text-cocoa-800 mt-5" style={d(80)}>Made for you — <span className="gold-text italic">down to the last detail</span></h2>
          <p className="reveal mt-6 text-cocoa-500 font-light text-[17px] leading-relaxed" style={d(140)}>Your colours, sizes, names and themes for personal orders. Your logo, fragrance, packaging and exclusive collections for brands, hotels and restaurants — produced in the quantities you need.</p>
          <div className="reveal mt-8 flex flex-wrap gap-2" style={d(200)}>
            {CAPABILITIES.map((c) => <span key={c} className="chip">{c}</span>)}
          </div>
          <button type="button" onClick={() => prefillEnquiry('Custom & Bespoke Creations', 'business')} className="reveal btn btn-primary mt-10" style={d(260)}>
            Start a bespoke project <Icon name="arrow-right" className="w-4 h-4" />
          </button>
        </div>

        <ol className="lg:col-span-7 relative space-y-5">
          <span className="hidden sm:block absolute left-[39px] top-10 bottom-10 w-px" style={{ background: 'linear-gradient(180deg, transparent, rgba(192,138,102,.5), transparent)' }} />
          {PROCESS.map((p, i) => (
            <li key={p.n} className="lux-card reveal p-7 sm:p-8 flex gap-6" style={d(i * 90)}>
              <CardGL />
              <span className="relative shrink-0 w-[62px] h-[62px] rounded-full grid place-items-center text-rose-700"
                style={{ background: 'radial-gradient(circle at 30% 25%, #FFF9F4, #F1D9C7)', boxShadow: '0 0 0 1px rgba(192,138,102,.35), 0 0 0 6px rgba(255,250,245,.8), 0 14px 26px -12px rgba(138,90,59,.5)' }}>
                <Icon name={p.icon} className="w-6 h-6" />
              </span>
              <div>
                <p className="eyebrow">Step {p.n}</p>
                <h3 className="font-display text-3xl text-cocoa-800 mt-1">{p.t}</h3>
                <p className="mt-2 text-cocoa-500 font-light leading-relaxed">{p.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
