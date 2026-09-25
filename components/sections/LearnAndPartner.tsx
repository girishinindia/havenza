'use client';

import Image from 'next/image';
import { COURSES, SERVICES } from '@/lib/data';
import { d } from '@/lib/ui';
import Icon from '@/components/ui/Icon';
import CardGL from '@/components/gl/CardGL';
import LuxCanvas from '@/components/gl/LuxCanvas';
import { useUI } from '@/components/ui/UIProvider';

const MEGA = COURSES.filter((c) => c.track === 'mega');
const B2B_COURSES = COURSES.filter((c) => c.for.includes('b2b')).length;
const B2B_SERVICES = SERVICES.filter((s) => s.for.includes('b2b')).length;

const Check = ({ children, dark }: { children: React.ReactNode; dark?: boolean }) => (
  <li className="flex items-center gap-2"><Icon name="check" className={`w-4 h-4 shrink-0 ${dark ? 'text-rose-300' : 'text-rose-500'}`} />{children}</li>
);

/** Two cards, like the home/business pair: courses & services for the public (B2C) and for business (B2B). */
export default function LearnAndPartner() {
  const { prefillEnquiry } = useUI();
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative pb-16 lg:pb-24">
      <div className="max-w-site mx-auto px-5 lg:px-10">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow eyebrow-line reveal">Learn with us · Work with us</p>
          <h2 className="reveal font-display text-[2.6rem] sm:text-5xl lg:text-[3.4rem] leading-[1.05] text-cocoa-800 mt-5" style={d(80)}>
            Courses for makers &amp; <span className="gold-text italic">services for every space</span>
          </h2>
        </div>

        <div className="mt-14 grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Public / B2C */}
          <article className="lux-card reveal overflow-hidden p-8 sm:p-10 lg:p-12 flex flex-col" style={d(60)}>
            <CardGL />
            <Image src="/images/havenza-monogram.jpg" alt="" aria-hidden="true" width={1040} height={500}
              className="feather absolute -right-24 -bottom-16 w-[400px] h-auto opacity-[.16] mix-blend-multiply pointer-events-none !z-0" />
            <div className="flex items-center gap-3">
              <span className="icon-badge"><Icon name="graduation-cap" /></span>
              <span className="eyebrow">Havenza Studio · For you</span>
            </div>
            <h3 className="font-display text-4xl sm:text-[2.6rem] leading-tight text-cocoa-800 mt-7">Learn the craft, <em className="text-rose-600">start your brand</em></h3>
            <p className="mt-4 text-cocoa-500 font-light leading-relaxed max-w-lg">
              Mega certificate courses in candles, moulds, soap and resin — plus concrete &amp; Jesmonite, festive crafts, product photography and online selling. In the studio, online or for kids.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {MEGA.map((c) => (
                <button key={c.id} type="button" onClick={() => prefillEnquiry(c.name, 'personal')} className="chip hover:bg-white transition"><Icon name={c.icon} className="w-3.5 h-3.5 text-rose-600" />{c.short}</button>
              ))}
            </div>
            <ul className="mt-7 grid grid-cols-2 gap-x-6 gap-y-3 text-[15px] text-cocoa-600 max-w-md">
              <Check>Studio &amp; online classes</Check><Check>Kids &amp; hobby sessions</Check><Check>Kits &amp; supplies</Check><Check>Business mentoring</Check>
            </ul>
            <div className="mt-auto pt-10 flex flex-wrap items-center gap-4 justify-between">
              <p className="text-sm text-cocoa-400"><span className="font-display text-3xl text-cocoa-800 mr-1">{COURSES.length}</span> courses · {MEGA.length} mega certificates</p>
              <button type="button" onClick={() => go('learn')} className="btn btn-gold">Explore courses <Icon name="arrow-up-right" className="w-4 h-4" /></button>
            </div>
          </article>

          {/* Business / B2B */}
          <article className="on-dark reveal relative overflow-hidden rounded-[24px] p-8 sm:p-10 lg:p-12 flex flex-col text-pearl"
            style={{ ...d(140), background: 'linear-gradient(150deg, #4A2E1F 0%, #2F1D14 55%, #22150E 100%)', boxShadow: '0 0 0 1px rgba(226,190,159,.22) inset, 0 40px 80px -40px rgba(34,21,14,.8)' }}>
            <LuxCanvas className="opacity-70" />
            <div className="relative flex items-center gap-3">
              <span className="icon-badge" style={{ background: 'linear-gradient(145deg,#5A3A28,#2F1D14)', color: '#E9C4A4', boxShadow: '0 0 0 1px rgba(226,190,159,.35), 0 10px 20px -10px #000' }}><Icon name="briefcase" /></span>
              <span className="eyebrow !text-rose-300">Training &amp; services · For business</span>
            </div>
            <h3 className="relative font-display text-4xl sm:text-[2.6rem] leading-tight text-ivory mt-7">Your partner from <em className="gold-text-lt">mould to market</em></h3>
            <p className="relative mt-4 text-pearl/90 font-light leading-relaxed max-w-lg">
              Private label and OEM, custom moulds and 3D masters, corporate gifting, packaging, photography, installation and rental — plus team workshops and pro training for your staff.
            </p>
            <ul className="relative mt-7 grid grid-cols-2 gap-x-6 gap-y-3 text-[15px] text-pearl max-w-md">
              <Check dark>Private label &amp; OEM</Check><Check dark>Moulds &amp; 3D masters</Check>
              <Check dark>Corporate team workshops</Check><Check dark>Bulk craft supplies</Check>
            </ul>
            <div className="relative mt-auto pt-10 flex flex-wrap items-center gap-4 justify-between">
              <p className="text-sm text-pearl/80"><span className="font-display text-3xl text-ivory mr-1">{B2B_SERVICES}</span> business services · {B2B_COURSES} pro courses</p>
              <button type="button" onClick={() => go('services')} className="btn btn-gold">Explore services <Icon name="arrow-up-right" className="w-4 h-4" /></button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
