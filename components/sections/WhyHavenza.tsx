import { WHY } from '@/lib/data';
import { d } from '@/lib/ui';
import Icon from '@/components/ui/Icon';
import CardGL from '@/components/gl/CardGL';

export default function WhyHavenza() {
  return (
    <section id="why" className="relative py-20 lg:py-28 scroll-mt-20">
      <div className="max-w-site mx-auto px-5 lg:px-10">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow eyebrow-line reveal">Why Havenza</p>
          <h2 className="reveal font-display text-[2.6rem] sm:text-5xl lg:text-[3.6rem] leading-[1.05] text-cocoa-800 mt-5" style={d(80)}>Crafted like art. <span className="gold-text italic">Delivered like a partner.</span></h2>
        </div>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
          {WHY.map((w, i) => (
            <article key={w.t} className="lux-card reveal p-8 lg:p-9" style={d((i % 3) * 80)}>
              <CardGL />
              <span className="icon-badge"><Icon name={w.icon} /></span>
              <h3 className="font-display text-[1.75rem] text-cocoa-800 mt-7">{w.t}</h3>
              <p className="mt-3 text-cocoa-500 font-light leading-relaxed">{w.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
