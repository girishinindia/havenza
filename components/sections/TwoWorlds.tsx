'use client';

import { CATEGORIES, TOTAL_B2B, TOTAL_B2C } from '@/lib/data';
import { d } from '@/lib/ui';
import Photo from '@/components/ui/Photo';
import Icon from '@/components/ui/Icon';
import CardGL from '@/components/gl/CardGL';
import LuxCanvas from '@/components/gl/LuxCanvas';
import { useUI } from '@/components/ui/UIProvider';

const Check = ({ children, dark }: { children: React.ReactNode; dark?: boolean }) => (
  <li className="flex items-center gap-2"><Icon name="check" className={`w-4 h-4 ${dark ? 'text-rose-300' : 'text-rose-500'}`} />{children}</li>
);

export default function TwoWorlds() {
  const { jumpToFilter } = useUI();
  const b2cCollections = CATEGORIES.filter((c) => c.b2c.length).length;

  return (
    <section className="relative py-16 lg:py-24">
      <div className="max-w-site mx-auto px-5 lg:px-10">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow eyebrow-line reveal">One studio · Two worlds</p>
          <h2 className="reveal font-display text-[2.6rem] sm:text-5xl lg:text-[3.6rem] leading-[1.05] text-cocoa-800 mt-5" style={d(80)}>
            For the homes you love &amp; the <span className="gold-text italic">spaces you run</span>
          </h2>
        </div>

        <div className="mt-14 grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* B2C */}
          <article className="lux-card reveal overflow-hidden p-8 sm:p-10 lg:p-12 flex flex-col" style={d(60)}>
            <CardGL />
            <div className="photo card-top-lg aspect-[16/8]"><Photo k="worlds-home" alt="Cosy living room styled with candles" /></div>
            <div className="flex items-end gap-3 badge-lift">
              <span className="icon-badge"><Icon name="sofa" /></span>
              <span className="eyebrow pb-1.5">For your home · B2C</span>
            </div>
            <h3 className="font-display text-4xl sm:text-[2.8rem] leading-tight text-cocoa-800 mt-6">Personal pieces, <em className="text-rose-600">thoughtfully</em> made</h3>
            <p className="mt-4 text-cocoa-500 font-light leading-relaxed max-w-lg">Scented and soy candles, everlasting florals, resin keepsakes, wall art and personalised gifts — for everyday rituals, festivals and the moments worth marking.</p>
            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 text-[15px] text-cocoa-600 max-w-md">
              <Check>Home styling packages</Check><Check>Personalised gifts</Check><Check>Festive collections</Check><Check>Pooja room décor</Check>
            </ul>
            <div className="mt-auto pt-10 flex flex-wrap items-center gap-4 justify-between">
              <p className="text-sm text-cocoa-400"><span className="font-display text-3xl text-cocoa-800 mr-1">{TOTAL_B2C}</span> retail products across {b2cCollections} collections</p>
              <button type="button" onClick={() => jumpToFilter('home')} className="btn btn-gold">Shop for Home <Icon name="arrow-up-right" className="w-4 h-4" /></button>
            </div>
          </article>

          {/* B2B */}
          <article className="on-dark reveal relative overflow-hidden rounded-[24px] p-8 sm:p-10 lg:p-12 flex flex-col text-pearl"
            style={{ ...d(140), background: 'linear-gradient(150deg, #4A2E1F 0%, #2F1D14 55%, #22150E 100%)', boxShadow: '0 0 0 1px rgba(226,190,159,.22) inset, 0 40px 80px -40px rgba(34,21,14,.8)' }}>
            <LuxCanvas className="opacity-70" />
            <div className="photo fade-cocoa card-top-lg aspect-[16/8] !bg-transparent"><Photo k="worlds-business" alt="Warm, grand hotel lobby" /></div>
            <div className="relative flex items-end gap-3 badge-lift">
              <span className="icon-badge" style={{ background: 'linear-gradient(145deg,#5A3A28,#2F1D14)', color: '#E9C4A4', boxShadow: '0 0 0 1px rgba(226,190,159,.35), 0 10px 20px -10px #000' }}><Icon name="building-2" /></span>
              <span className="eyebrow !text-rose-300 pb-1.5">For your business · B2B</span>
            </div>
            <h3 className="relative font-display text-4xl sm:text-[2.8rem] leading-tight text-ivory mt-6">Décor programmes, <em className="gold-text-lt">delivered at scale</em></h3>
            <p className="relative mt-4 text-pearl/90 font-light leading-relaxed max-w-lg">Room candles and signature fragrance, lobby florals, branded resin, wall installations, corporate gifting and event décor — specified, sampled and supplied for hospitality, retail and corporate teams.</p>
            <ul className="relative mt-8 grid grid-cols-2 gap-x-6 gap-y-3 text-[15px] text-pearl max-w-md">
              <Check dark>Private label &amp; OEM</Check><Check dark>Bulk supply</Check><Check dark>Custom logo products</Check><Check dark>Installation &amp; rental</Check>
            </ul>
            <div className="relative mt-auto pt-10 flex flex-wrap items-center gap-4 justify-between">
              <p className="text-sm text-pearl/80"><span className="font-display text-3xl text-ivory mr-1">{TOTAL_B2B}</span> business solutions across {CATEGORIES.length} collections</p>
              <a href="#business" className="btn btn-gold">Explore B2B <Icon name="arrow-up-right" className="w-4 h-4" /></a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
